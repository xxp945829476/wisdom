<template>
   <div class="layout_card_content">

       <div class="table-operator">
           <div class="left_button">
               <a-button type="primary" icon="plus" v-if="isAdd" @click="addQuan(0)">
                  新增考核依据
                </a-button>
                <a-button @click="delQuanBatch" v-if="isDelete">
                  批量删除
                </a-button>
           </div>

            <div class="right_btn">
                 <a-button type="primary" class="search_btn" @click="searchData">查询</a-button>
                  <a-button class="reload_btn" @click="resetData">重置</a-button>
            </div>

           <div class="layout_card_search">
                <a-form-model layout="inline" :model="formParmas" @submit="searchData" @submit.native.prevent>
                    <a-row :gutter="24">
                        <a-col :md="12">
                            <a-form-model-item label="条目名称">
                            <a-input v-model="formParmas.entryName" placeholder=""/>
                            </a-form-model-item>
                        </a-col>
                        <a-col :md="12">
                            <a-form-model-item label="考核对象">
                                 <a-select v-model="formParmas.assessObj" allowClear>
                                    <a-select-option v-for="item in assessObjList" :key="item.id">
                                        {{item.name}}
                                    </a-select-option>
                                  </a-select>
                            </a-form-model-item>
                        </a-col>
                    </a-row>
                </a-form-model>
           </div>
       </div>
        

        <a-table :columns="columns" bordered :data-source="tableData" @change="changeTable" :rowKey='record' size="middle" :pagination="pagination" :row-selection="{ onChange: onSelectChange }" :loading="loading" :scroll="{x:1800,y:height}">
               <span slot="assessFile" slot-scope="text,record">
                  <template v-if="text">
                      <a @click="viewImg(text)" class="view_img">查看</a>
                  </template>
                </span>
                <span slot="action" slot-scope="text,record">
                    <a v-if="isEdit" @click="addQuan(1,record)">编辑</a>
                     <a-divider type="vertical" />
                    <span @click="delQuan(record)" class="yellow" v-if="isDelete">删除</span>
                </span>
        </a-table>

       <modalQuan ref="add_quan" @triggerData="getData"></modalQuan>

        <a-modal title="依据文件" v-model="viewVisible" :maskClosable="false" :footer="null" width="600px" v-dialogDrag="dialog">
         <div class="text_center">
           <img :src="pathUrl.imgurl + imgUrl" class="img_style"/>
         </div>
       </a-modal>

   </div>
</template>

<script>

import modalQuan from './modalQuan.vue'
import pathUrl from "@/network/requestUrl";

import {GetAssessList,BaseList,DelAssess} from '@/network/api'



export default {
  data() {
      const columns = [
      // { title: '序号', fixed: 'left',width: 80,customRender:(text, row, index)=>{
      //   return <span>{index+1}</span>;
      // },align:'center'},
      {
        title: '考核对象',
        dataIndex: 'assessObjName',
        key: 'assessObjName',
        align:'center',
        ellipsis:true,
      },
      {
        title: '考核名称',
        dataIndex: 'assessName',
        key: 'assessName',
        align:'center',
        ellipsis:true,
      },
      {
        title: '条目名称',
        dataIndex: 'entryName',
        key: 'entryName',
        align:'center',
        ellipsis:true,
      },
      {
        title: '加减分',
        dataIndex: 'addOrReduceName',
        key: 'addOrReduceName',
        align:'center',
        ellipsis:true,
      },
       {
        title: '分数',
        dataIndex: 'points',
        key: 'points',
        align:'center',
        ellipsis:true,
      },
      {
        title: '考核能容',
        dataIndex: 'remark',
        key: 'remark',
        align:'center',
        width:'300px',
        ellipsis:true,
  
      },
      {
        title: '生效时间',
        dataIndex: 'effectiveTime',
        key: 'effectiveTime',
        align:'center',
        width:'200px',
        ellipsis:true,
  
      },
      {
        title: '依据文件',
        dataIndex: 'assessFile',
        key: 'assessFile',
        align:'center',
        ellipsis:true,
        scopedSlots: { customRender: 'assessFile' },
      },
      {
        title: '操作',
        key: 'action',
        align:'center',
        width:'200px',
        fixed: 'right',
        scopedSlots: { customRender: 'action' },
      },
    ];
      
    return {
      delList:[],
      dialog:true,
      pathUrl,
      viewVisible:false,
      loading:false,
      businessVisible:false,
      dialog:true,
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
      roleVisible:false,
      height:'',
      formParmas: {
        assessObj: '',
        pageNum:1,
        pageSize:20,
        entryName:'',
        id:''
      },
      advanced:false,
      tableData:[],
      assessObjList:[],
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
      imgUrl:'',
      isAdd:false,
      isEdit:false,
      isDelete:false,
      ids:[]
    }
  },
  components:{
      modalQuan
  },
  created(){
    this.init();
  },
  mounted(){
   this.$nextTick(()=>{
      this.tableHeight()
    })
  },
  methods:{
    tableHeight(){
      this.height = document.documentElement.clientHeight - 295
    },
    init(){
      this.permissionControl()
      this.getData();
      this.getDepType();
    },
    permissionControl(){
     
      let permission =  JSON.parse(this.$getStorage('permission'));
      
      console.log(permission)
      permission.forEach(cur=>{
        if(cur.menuPermission == 'sys:assessbasis:add'){
          this.isAdd = true;
        }else if(cur.menuPermission == 'sys:assessbasis:edit'){
          this.isEdit = true;
        }else if(cur.menuPermission == 'sys:assessbasis:del'){
          this.isDelete = true;
        }
      })
    },
    getData(){
         this.loading = true;
        GetAssessList(this.formParmas).then(res=>{
             this.loading = false;
            if(res.data.code == 0){
                let data = res.data.data.records;
                this.tableData = data;
                this.tableData.forEach(cur=>{
                    cur.effectiveTime = this.$moment.unix(cur.effectiveTime).format('YYYY-MM-DD hh:mm:ss') 
                });
                this.pagination.total = res.data.data.total;
            }else{
                this.$message.warning('加载失败')
            };
            
        });
    },
    getDepType(){
        let params = {
              pid: "1000"
            };
        BaseList(params).then(res=>{
          if(res.data.code == 0){
            this.assessObjList = res.data.data
          };
        });
    },
    searchData(){
      this.formParmas.pageNum = 1;
      this.pagination.current = 1;
      this.getData()
    },
    resetData(){
      this.formParmas.pageNum = 1;
      this.pagination.current = 1;
      this.formParmas.entryName = '';
      this.formParmas.assessObj = '';
      this.getData()
    },
    record(key){
          return key.id
    },
    addQuan(val,record){
      this.$refs.add_quan.addQuan(val,record)
    },
    
    viewDetails(record){
      this.$refs.add_business_details.viewDetails(record)
    },
    
    changeTable(pagination){
      this.pagination.current = pagination.current;
      this.formParmas.pageNum = pagination.current;
      this.formParmas.pageSize = pagination.pageSize;
      this.pagination.pageSize = pagination.pageSize;
      this.getData()
    },
    viewImg(val){
      this.viewVisible = true;
      this.imgUrl = val;
    },
    delQuan(record){
      let that = this;
      this.ids = [record.id];
 
      this.$confirm({
        title: '确定删除吗?',
        content: '',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
            that.delQuanOK()
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    },
    delQuanBatch(){
      let that = this;
      console.log(this.delList)
      this.ids = this.delList
      if(that.delList.length<=0){
            that.$message.warning('请选择条目');
            return false
        };

      this.$confirm({
        title: '确定删除吗?',
        content: '',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          that.delQuanOK()
        },
        onCancel() {
          
        },
      });
    },
    onSelectChange(selectedRowKeys,selectedRows){
      this.delList = selectedRowKeys;
    },
    delQuanOK(){
     
      this.loading = true;
        DelAssess(this.ids).then(res=>{
            this.loading = false;
            if(res.data.code == 0){
                this.getData()
                this.$message.success('删除成功')
            }else{
                this.$message.warning(res.data.message)
            };
            
        });
    }
  }
}
</script>