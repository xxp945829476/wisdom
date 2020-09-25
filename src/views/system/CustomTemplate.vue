<template>
   <div class="layout_card_content">
        <div class="table-operator">
           <div class="left_button">
                <a-button type="primary" icon="plus" @click="addTemplate">
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
                <span slot="disabled" slot-scope="text">
                    <span v-if="text==0">激活</span>
                    <span v-else>禁用</span>
                </span>
                <span slot="action" slot-scope="text,record">
                    <a @click="addUser(1,record)">注销</a>
                    <a-divider type="vertical" />
                    <span @click="delUser(record)" class="yellow">启用</span>
                </span>
        </a-table>

        <modalUser ref="add_user" @triggerData="getData"></modalUser>

        <!-- 新增证件模板 -->
         <a-modal v-model="templateVisible" title="新增证件模板" :maskClosable="false" :keyboard="false" width="70%" v-dialogDrag="dialog">
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
            <template slot="footer">
              <a-button key="submit" type="primary" @click="editTemplate">
                  自定义模板
              </a-button>
            </template>
         </a-modal>

         <!-- 绘制模板 -->
         <editTemplate ref="edit_template"></editTemplate>
   </div>
</template>

<script>

import modalUser from './modalUser.vue'
import editTemplate from './template/template.vue'

import {UserList,DelUser,DelUserBatch} from '@/network/api'



export default {
  data() {
      const columns = [
      { title: '序号', width: 80, customRender:(text, row, index)=>{
        return <span>{index}</span>;
      },align:'center'},
      {
        title: '证件模板',
        dataIndex: 'account',
        key: 'account',
        align:'center',
        ellipsis:true,
      },
      {
        title: '创建人',
        dataIndex: 'deptName',
        key: 'deptName',
        align:'center',
        ellipsis:true,
      },
      {
        title: '状态',
        dataIndex: 'disabled',
        key: 'disabled',
        align:'center',
        ellipsis:true,
        scopedSlots: { customRender: 'disabled' },
      },
      {
        title: '创建时间',
        dataIndex: 'disabled0',
        key: 'disabled0',
        align:'center',
        ellipsis:true,
      },
       {
        title: '发布时间',
        dataIndex: 'disabled1',
        key: 'disabled1',
        align:'center',
        ellipsis:true,
      },
      {
        title: '运输资格审批表',
        dataIndex: 'disabled2',
        key: 'disabled2',
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
        showLessItems:true,
        current:1,
        pageSize:20,
        pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
        showQuickJumper:true,
        showTotal:total => `共 ${total} 条`
      }
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
      this.getData();
    },
    getData(){
        this.loading = true;
        UserList(this.formParmas).then(res=>{
            this.loading = false;
            if(res.data.code == 0){
                this.tableData = res.data.data.records;
                this.pagination.total = res.data.data.total;
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
    },
    changeTable(pagination){
      this.pagination.current = pagination.current
      this.getData()
    },
    editTemplate(){
      this.$refs.edit_template.editTemplate()
    }
  }
}
</script>