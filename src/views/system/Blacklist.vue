<template>
   <div class="layout_card_content">
        <div class="table-operator">
           <div class="left_button">
                <a-button type="primary" icon="plus" @click="addUser(0)" v-if="isAdd">
                  加入黑名单
                </a-button>
           </div>
            

            <div class="right_btn">
                 <a-button type="primary" class="search_btn" @click="searchData">查询</a-button>
                  <a-button class="reload_btn" @click="resetData">重置</a-button>
            </div>
           
            <div class="layout_card_search layout_card_search_1">
                    <a-form-model layout="inline" :model="formParmas" @submit="searchData" @submit.native.prevent>
                      <a-row :gutter="24">
                        <a-col :md="24" :sm="24">
                          <a-form-model-item label="车牌号">
                            <a-input v-model="formParmas.vehicleNo" placeholder="" />
                          </a-form-model-item>
                        </a-col>
                      </a-row>
                    </a-form-model>
            </div>
       </div>

        <a-table :columns="columns" bordered size="middle" :rowKey='record' :data-source="tableData" @change="changeTable" :pagination="pagination" :scroll="{x:800,y:height}" :loading="loading">
                
                <span slot="action" slot-scope="text,record">
                    <template v-if="isEdit">
                      <a @click="addUser(1,record)">编辑</a>
                      <a-divider type="vertical" />
                    </template>
                    <span @click="delBlackList(record)" class="yellow" v-if="isDelete">删除</span>
                </span>
        </a-table>

        <a-modal v-model="backlistVisible" :title="title" :maskClosable="false" :keyboard="false" width="700px" v-dialogDrag="dialog">
          <a-spin :spinning="spinning">
          <a-form-model :model="backParmas" ref="ruleForm" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules">
            <a-form-model-item label="黑名单类型" prop="blacklistType">
                <a-select v-model="backParmas.blacklistType" placeholder="请选择类型">
                      <a-select-option v-for="item in typeList" :key="item.id">
                          {{item.name}}
                      </a-select-option>
                </a-select>
            </a-form-model-item>

            <a-form-model-item label="场地" prop="fieldId">
                <a-select v-model="backParmas.fieldId" placeholder="请选择场地">
                      <a-select-option v-for="item in fieldList" :key="item.id">
                          {{item.fieldName}}
                      </a-select-option>
                </a-select>
            </a-form-model-item>
            
            <a-form-model-item label="车牌号" prop="vehicleNo">
                <a-input v-model="backParmas.vehicleNo" placeholder="请输入车牌号"/>
            </a-form-model-item>
          </a-form-model>
          </a-spin>
          <template slot="footer">
            <a-button key="back" @click="backlistVisible=false">
            取消
            </a-button>
            <a-button key="submit" type="primary" @click="save">
            保存
            </a-button>
        </template>
        </a-modal>
   </div>
</template>

<script>


import {BaseList,SiteList,BlackList,DelBlacklist,AddBlacklist,EditBlacklist} from '@/network/api'



export default {
  data() {
      const columns = [
      { title: '序号', width: 80, customRender:(text, row, index)=>{
        return <span>{index}</span>;
      },align:'center'},
      {
        title: '车牌号',
        dataIndex: 'vehicleNo',
        key: 'vehicleNo',
        align:'center',
        ellipsis:true,
      },
      {
        title: '类型',
        dataIndex: 'blacklistTypeName',
        key: 'blacklistTypeName',
        align:'center',
        ellipsis:true,
      },
      {
        title: '场地名称',
        dataIndex: 'fieldName',
        key: 'fieldName',
        align:'center',
        ellipsis:true,
      },
      {
        title: '操作',
        key: 'action',
        width:'200px',
        align:'center',
        scopedSlots: { customRender: 'action' },
      },
    ];
      
    return {
      spinning:false,
      backlistVisible:false,
      title:'加入黑名单',
      dialog:true,
      rules:{
        blacklistType:[
          { required: true, message: '请选择类型', trigger: 'change' },
        ],
        fieldId:[
          { required: true, message: '请选择场地', trigger: 'change' },
        ],
        vehicleNo:[
          { required: true, message: '请输入车牌号', trigger: 'blur' },
        ],
      },
      backParmas:{
        blacklistType:undefined,
        vehicleNo:'',
        fieldId:undefined,
        id:'',
      },
      fieldList:[],
      typeList:[],
      editIs:0,

      delList:[],
      loading:false,
      dialog:true,
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
      roleVisible:false,
      height:'',
      formParmas: {
        vehicleNo:'',
        pageNum: 1,
        pageSize: 20,
      },
      tableData:[],
      columns,
      pagination:{
        total:0,
        size:'middle',
        showSizeChanger: true,
        showLessItems:true,
        current:1,
        pageSize:20,
        pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
        showQuickJumper:true,
        showTotal:total => `共 ${total} 条`
      },
      isAdd:false,
      isEdit:false,
      isDelete:false
    }
  },
  components:{
    
  },
  created(){
    this.init()
  },
  mounted(){
    this.$nextTick(()=>{
      this.tableHeight()
    })
  },
  methods:{
    init(){
      this.permissionControl();
      this.getData();
      this.getType(101);
      
    },
    permissionControl(){
     
      let permission =  JSON.parse(this.$getStorage('permission'));
      
      permission.forEach(cur=>{
        if(cur.menuPermission == 'sys:user:add'){
          this.isAdd = true;
        }else if(cur.menuPermission == 'sys:user:edit'){
          this.isEdit = true;
        }else if(cur.menuPermission == 'sys:user:del'){
          this.isDelete = true;
        }
      })
    },
    getData(){
        this.loading = true;
        BlackList(this.formParmas).then(res=>{
            this.loading = false;
            if(res.data.code == 0){
                this.tableData = res.data.data.records;
                this.pagination.total = res.data.data.total;
            }else{
                this.$message.warning('加载失败')
            };
            
        });
    },
    getType(id){
        let params = {
              pid: id
            };
        BaseList(params).then(res=>{
          if(res.data.code == 0){
              this.typeList = res.data.data
          };
        });
    },
    getSiteList(id){
        let params = {
              pageNum:1,
              pageSize:999,
            };
            this.spinning =true;
        SiteList(params).then(res=>{
          this.spinning =false;
          if(res.data.code == 0){
              this.fieldList = res.data.data.records;
          };
        });
    },
    delBlackList(record){
      let that = this;
      this.$confirm({
        title: '确定删除吗?',
        content: '',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
            that.delListOK(record)
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    },
    delListOK(record){
      
       this.loading = true;
        DelBlacklist(record.id).then(res=>{
            this.loading = false;
            if(res.data.code == 0){
                this.getData()
                this.$message.success('删除成功')
            }else{
                this.$message.warning('删除失败')
            };
            
        });
    },
    
    tableHeight(){
      this.height = document.documentElement.clientHeight - 295
    },
    record(key){
          return key.id
    },
    searchData(){
      this.formParmas.pageNum = 1;
      this.pagination.vehicleNo = 1;
      this.getData()
    },
    resetData(){
      this.formParmas.pageNum = 1;
      this.pagination.current = 1;
      this.formParmas.vehicleNo = '';
      this.getData()
    },
    addUser(val,record){
      this.editIs = val;
      this.backlistVisible = true;
      console.log(record)
      this.$nextTick(()=>{
        this.$refs.ruleForm.resetFields();
        if(val==0){
          this.backParmas.id = '';
          this.title = '加入黑名单'
        }else{
          this.title = '编辑黑名单'
          this.backParmas.blacklistType = record.blacklistType;
          this.backParmas.vehicleNo = record.vehicleNo;
          this.backParmas.fieldId = record.fieldId;
          this.backParmas.id = record.id;
        }
      })
      this.getSiteList();
    },
    changeTable(pagination){
      this.pagination.current = pagination.current;
      this.formParmas.pageNum = pagination.current;
      this.getData()
    },
    save(){

      this.$refs.ruleForm.validate(valid => {
        if (valid) {

          if(this.editIs == 0){
             this.onSubmit();
          }else{
            this.onEditSubmit();
          };
         
        } else {
          return false;
        };
      });
     
    },
    onSubmit(){
      this.spinning = true;
      AddBlacklist(this.backParmas).then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            this.backlistVisible = false;
            this.$message.success('保存成功');
            this.getData()
          }else{
            this.$message.warning('保存失败')
          };
      });
    },
     onEditSubmit(){
       this.spinning = true;
      EditBlacklist(this.backParmas).then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            this.backlistVisible = false;
            this.$message.success('保存成功');
           this.getData()
          }else{
            this.$message.warning('保存失败')
          };
      });
    },
  }
}
</script>