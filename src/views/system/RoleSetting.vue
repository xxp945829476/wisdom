<template>
   <div class="layout_card_content">

        <div class="table-operator">
           <div class="left_button">
               <a-button type="primary" icon="plus" @click="addRole(0)">
                  新增
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
                          <a-form-model-item label="角色名称">
                            <a-input v-model="formParmas.roleName " placeholder="请输入角色名称" allow-clear />
                          </a-form-model-item>
                        </a-col>
                      </a-row>
                    </a-form-model>
            </div>
       </div>

        <!-- <div class="sel_tips">
           <a-icon type="info-circle" /><span>已选择&nbsp;&nbsp;<a>2</a>&nbsp;&nbsp;项</span><a>清空</a>
        </div> -->
        <a-table :columns="columns" bordered :data-source="tableData" :rowKey='record' :pagination="pagination" @change="changeTable" :scroll="{y:height}" size="middle" :loading="loading">
                <span slot="action" slot-scope="text,record">
                    <a @click="empower(record)">授权</a>
                    <a-divider type="vertical" />
                    <a @click="addRole(1,record)">编辑</a>
                    <!-- <a-divider type="vertical" />
                    <a>删除</a> -->
                </span>
        </a-table>


        <!-- 新增编辑 -->
        <modalRole ref="add_role" @triggerData="getData"></modalRole>
        <!-- 授权 -->
        <modalEmpowerRole ref="empower"></modalEmpowerRole>
   </div>
</template>

<script>

import modalRole from './modalRole.vue'
import modalEmpowerRole from './modalEmpowerRole.vue'
import {RoleList} from '@/network/api'



export default {
  data() {
      const columns = [
      {
        title: '角色编码',
        dataIndex: 'roleCode',
        key: 'roleCode ',
        align:'center',
        ellipsis:true,
      },
      {
        title: '角色名称',
        dataIndex: 'roleName',
        key: 'roleName',
        align:'center',
        ellipsis:true,
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime ',
        align:'center',
        ellipsis:true,
      },
      {
        title: '操作',
        key: 'action',
        width:'400px',
        align:'center',
        scopedSlots: { customRender: 'action' },
      },
    ];
     
    return {
      loading:false,
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
      height:'',
      formParmas: {
        roleName:'',
        pageNum:1,
        pageSize:20,
      },
      advanced:false,
      tableData:[],
      columns,
      pagination:{
        total:0,
        showSizeChanger: true,
        current:1,
        pageSize:20,
        size:'middle',
        pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
        showQuickJumper:true,
        showTotal:total => `共 ${total} 条`
      }
    }
  },
  components:{
    modalRole,
    modalEmpowerRole
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
        RoleList(this.formParmas).then(res=>{
            this.loading = false;
            if(res.data.code == 0){
                this.tableData = res.data.data.records;
                this.tableData.forEach(cur=>{
                    cur.createTime = this.$moment.unix(cur.createTime).format('YYYY-MM-DD HH:mm:ss') 
                });
                this.pagination.total = res.data.data.total;
            }else{
                this.$message.warning('加载失败')
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
      this.formParmas.roleName = '';
      this.getData()
    },
    tableHeight(){
      this.height = document.documentElement.clientHeight - 295
    },
    addRole(val,record){
      this.$refs.add_role.addRole(val,record)
    },
    record(key){
          return key.id
    },
    empower(record){
      this.$refs.empower.empower(record)
    },
    changeTable(pagination){
      this.pagination.current = pagination.current
      this.getData()
    }
  }
}
</script>