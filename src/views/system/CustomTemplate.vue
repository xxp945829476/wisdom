<template>
   <div class="layout_card_content">
        <div class="table-operator">
           <div class="left_button">
                <a-button type="primary" icon="plus" @click="addTemplate" v-if="isAdd">
                  新增证件模板
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
                          <a-form-model-item label="证件名称">
                            <a-input v-model="formParmas.account" placeholder="" />
                          </a-form-model-item>
                        </a-col>
                      </a-row>
                    </a-form-model>
            </div>
       </div>

        <a-table :columns="columns" bordered size="middle" :rowKey='record' :data-source="tableData" @change="changeTable" :row-selection="{ onChange: onSelectChange }" :pagination="pagination" :scroll="{x:800,y:height}" :loading="loading">
                <span slot="activition" slot-scope="text,record">
                    <span v-if="text==0">有效</span>
                    <span v-else>无效</span>
                     <a-divider type="vertical" />
                    <span v-if="record.workflowStatus==0">未停用</span>
                    <span v-else>已停用</span>
                </span>
                <span  slot="approvalFormPhoto" slot-scope="text,record">
                    <a v-if="text" @click="download(record.approvalFormPhotoName,text)">{{record.approvalFormPhotoName}}</a>
                    <a v-if="!text && record.activition == 0 " >
                       <a-popover v-model="record.visible" trigger="click">
                         <span slot="content" >
                           <div>
                             <a-upload
                              name="file"
                              :before-upload="upload"
                              :showUploadList="false"
                              :data="record"
                            >
                            <a-button> <a-icon type="upload" /> 上传 </a-button>
                            </a-upload>
                           </div>
                         </span>
                            
                           <span @click="popover(record.id)">
                             上传
                           </span>
                              
                        </a-popover>
                     
                    </a>
                    <span v-if="record.activition != 0 && !text">待上传</span>
                </span>
                <span slot="action" slot-scope="text,record">
                    <template v-if="isEdit">
                       <span class="yellow" @click="cancellation(record)" v-if="record.activition == 0">注销</span>
                        <a @click="cancellation(record)" v-else>恢复</a>
                        <a-divider type="vertical" />
                        <span class="yellow" @click="enable(record)" v-if="record.workflowStatus == 0">停用</span>
                        <a @click="enable(record)" v-else>启用</a>
                    </template>
                   
                </span>
        </a-table>


        <!-- 新增证件模板 -->
         <a-modal v-model="templateVisible" title="新增证件模板" :maskClosable="false" :keyboard="false" width="800px" v-dialogDrag="dialog">
           <div>
               <a-radio-group name="radioGroup" v-model="templateSelect">
                <a-radio :value="1">
                  使用默认模板
                </a-radio>
                <a-radio :value="2">
                  复制已有模板
                </a-radio>
              </a-radio-group>
           </div>
           <a-spin :spinning="spinning">
           <a-row :gutter="15" v-if="templateSelect==2">
              <a-col :md="8" v-for="item in copyList" :key="item.id" @click="editTemplate(2,item)">
                <a-row type="flex" class="copy_template" align="middle">
                  <a-col class="copy_template_icon">
                    <i class="iconbiaodanmoban iconfont"></i>
                  </a-col>
                  <a-col flex="auto" class="ellipsis">
                    {{item.workflowName}}
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
           </a-spin>
            <template slot="footer">
              <a-button key="submit" type="primary" @click="editTemplate(1)">
                  自定义模板
              </a-button>
            </template>
         </a-modal>

         <!-- 绘制模板 -->
         <editTemplate ref="edit_template" @close='close'></editTemplate>
   </div>
</template>

<script>

import modalUser from './modalUser.vue'
import editTemplate from './template/template.vue'
import pathUrl from "@/network/requestUrl"
import {ListAllWorkflow,DelUser,DelUserBatch,EditWorkflow ,uploadOne,Download} from '@/network/api'



export default {
  data() {
      const columns = [
      { title: '序号', width: 80, customRender:(text, row, index)=>{
        return <span>{index}</span>;
      },align:'center'},
      {
        title: '证件模板',
        dataIndex: 'workflowName',
        key: 'workflowName',
        align:'center',
        ellipsis:true,
      },
      {
        title: '创建人',
        dataIndex: 'account',
        key: 'account',
        align:'center',
        ellipsis:true,
      },
      {
        title: '状态',
        dataIndex: 'activition',
        key: 'activition',
        align:'center',
        ellipsis:true,
        scopedSlots: { customRender: 'activition' },
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        align:'center',
        ellipsis:true,
      },
      {
        title: '运输资格审批表',
        dataIndex: 'approvalFormPhoto',
        key: 'approvalFormPhoto',
        align:'center',
        ellipsis:true,
        scopedSlots: { customRender: 'approvalFormPhoto' },
      },
      {
        title: '操作',
        key: 'action',
        width:'200px',
        align:'center',
        scopedSlots: { customRender: 'action' },
        fixed: 'right',
      },
    ];
      
    return {
      spinning:false,
      pathUrl,
      dialog:true,
      templateSelect:1,
      templateVisible:false,
      delList:[],
      loading:false,
      dialog:true,
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
      roleVisible:false,
      height:'',
      formParmas: {
        account:'',
        pageNum: 1,
        pageSize: 20,
      },
      tableData:[],
      columns,
      pagination:{
        total:0,
        size:'middle',
        showSizeChanger: true,
        showLessItems:false,
        current:1,
        pageSize:20,
        pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
        showQuickJumper:true,
        showTotal:total => `共 ${total} 条`
      },
      id:'',
      copyList:'',
      isAdd:'',
      isEdit:'',
    }
  },
  components:{
    modalUser,
    editTemplate
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
    },
    permissionControl(){
     
      let permission =  JSON.parse(this.$getStorage('permission'));
      
      console.log(permission)
      permission.forEach(cur=>{
        if(cur.menuPermission == 'sys:workflow:add'){
          this.isAdd = true;
        }else if(cur.menuPermission == 'sys:workflow:edit'){
          this.isEdit = true;
        }
      })
    },
    getData(){
        this.loading = true;
        ListAllWorkflow(this.formParmas).then(res=>{
            this.loading = false;
            if(res.data.code == 0){
                this.tableData = res.data.data.records;
                 this.tableData.forEach(cur=>{
                    this.$set(cur,'visible',false)
                    cur.createTime = this.$moment.unix(cur.createTime).format('YYYY-MM-DD HH:mm:ss') 
                });
                this.pagination.total = res.data.data.total;
            }else{
                this.$message.warning('加载失败')
            };
            
        });
    },
    getDataCopy(){
        let  formParmas = {
        account:'',
        pageNum: 1,
        pageSize: 9999,
      };
      this.spinning = true;
        ListAllWorkflow(formParmas).then(res=>{
           this.spinning = false;
            if(res.data.code == 0){
                this.copyList = res.data.data.records;
            }else{
                this.$message.warning('加载失败')
            };
            
        });
    },
    delUser(record){
      let that = this;
      this.$confirm({
        title: '确定删除吗?',
        content: '',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
            that.delUserOK(record)
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    },
    delUserOK(record){
      let params = {
        id:record.id,
        deptId:record.deptId
      }
       this.loading = true;
        DelUser(params).then(res=>{
            this.loading = false;
            if(res.data.code == 0){
                this.getData()
                this.$message.success('删除成功')
            }else{
                this.$message.warning('删除失败')
            };
            
        });
    },
    onSelectChange(selectedRowKeys){
      this.delList = selectedRowKeys;
    },
    delUserBatch(){
      let that = this;

      if(that.delList.length<=0){
            that.$message.warning('请选择用户');
            return false
        };

      this.$confirm({
        title: '确定删除吗?',
        content: '',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          that.delUserBatchOK()
        },
        onCancel() {
          
        },
      });
    },
    delUserBatchOK(){
         this.loading = true;
        DelUserBatch(this.delList).then(res=>{
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
      this.pagination.current = 1;
      this.getData()
    },
    resetData(){
      this.formParmas.pageNum = 1;
      this.pagination.current = 1;
      this.formParmas.account = '';
      this.getData()
    },
    addTemplate(){
      this.templateVisible = true;
      this.getDataCopy()
    },
    changeTable(pagination){
      this.pagination.current = pagination.current;
      this.formParmas.pageNum = pagination.current;
      this.formParmas.pageSize = pagination.pageSize;
      this.pagination.pageSize = pagination.pageSize;
      this.getData()
    },
    editTemplate(val,items){
      this.$refs.edit_template.editTemplate(val,items)
    },
    cancellation(obj){
      //注销

       let params = {
        id:obj.id,
        activition:obj.activition == 0 ? 1 : 0
       };

        EditWorkflow(params).then(res=>{

            if(res.data.code == 0){
              this.getData();
              this.$message.success('操作成功');
            }else{
              this.$message.warning('操作失败')
            };
        })
    },
    enable(obj){
       let params = {
        id:obj.id,
        workflowStatus:obj.workflowStatus == 0 ? 1 : 0
       };

        EditWorkflow(params).then(res=>{

            if(res.data.code == 0){
              this.getData();
              this.$message.success('操作成功');
            }else{
              this.$message.warning('操作失败')
            };
        })
    },
    upload(file, fileList){

       let param = new FormData()
        param.append('file',file);
        param.append('approvalFormPhotoName',file.name);
        console.log(fileList)
        uploadOne(param).then(res=>{
            if(res.data.code == 0){
                this.uploadOk(res.data.data.path,file.name)
            };
        })
        return false
    },
    uploadOk(val,name){

       let params = {
        id:this.id,
        approvalFormPhoto: val,
        approvalFormPhotoName:name
       };

        EditWorkflow(params).then(res=>{

            if(res.data.code == 0){
              this.getData();
              this.$message.success('上传成功');
            }else{
              this.$message.warning('上传失败')
            };
        })
    },
    popover(id){
      this.id = id;
    },
    download(name,val){
        Download({
            "fileName": name,
            "path" : val
        }).then(res=>{
   
        
          const csvData = new Blob([res.data]);
          let a = document.createElement('a');
                document.body.appendChild(a);
                a.style = 'display: none';
                const url = window.URL.createObjectURL(csvData);
                a.href = url;
                a.download = name;
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
        })
    },
    close(){
      this.templateVisible = false;
      this.getData();
    }
  }
}
</script>