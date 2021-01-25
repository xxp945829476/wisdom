<template>
   <div>
    <a-row type="flex">
      <a-col :flex="leftWidth" class="left_content" ref="left_content">
        <a-form-model :model="treeParmas" layout="inline" class="left_search" :label-col="labelCol" :wrapper-col="wrapperCol" @submit="onSearch" @submit.native.prevent>
          <a-form-model-item>
            <a-input-search
              v-model="treeParmas.workflowName"
              placeholder="请输入证件名称"
              enter-button="搜索"
              @search="onSearch"
            />
          </a-form-model-item>
        </a-form-model>

        <div class="left_tree left_tree_1">
          <a-spin :spinning="spinning">
            <a-tree
            defaultExpandAll
              v-model="checkedKeys"
              :show-line="true"
              :replaceFields="replaceFields"
              :tree-data="treeData"
              @select="selectCard"
              :selectedKeys="selectedKeys"
              v-if="!spinning"
            >
            </a-tree>
          </a-spin>
        </div>
      </a-col>

      <a-col flex="auto">
        <div class=" layout_card_content layout_card_content_p">
        <div class="table-operator">
            <div class="left_button">
                <a-button type="primary" icon="plus" @click="addBpm(0,formParmas)">
                    新增
                  </a-button> 
                  <a-button>
                    导出
                  </a-button>
            </div>

              <div class="right_btn">
                 <a-button type="primary" class="search_btn" @click="searchData" htmlType="submit">查询</a-button>
                  <a-button class="reload_btn" @click="resetData">重置</a-button>
            </div>

            <div class="layout_card_search">
                   <a-form-model layout="inline" :model="formParmas" @submit="searchData" @submit.native.prevent>
                      <a-row :gutter="24">
                           <a-col :md="12">
                              <a-form-model-item label="证件名称">
                                 <a-input v-model="formParmas.workflowName" placeholder="" allowClear/>
                              </a-form-model-item>
                          </a-col>

                          <a-col :md="12">
                              <a-form-model-item label="证件状态">
                                   <a-select v-model="formParmas.tmplStatus" allowClear>
                                    <a-select-option value="0">
                                        审核中
                                    </a-select-option>

                                    <a-select-option value="1">
                                        审核通过
                                    </a-select-option>

                                    <a-select-option value="2">
                                        审核拒绝
                                    </a-select-option>


                                  </a-select>
                              </a-form-model-item>
                          </a-col>
                          
                      </a-row>
                  </a-form-model>
            </div>
        </div>
          

          <a-table :columns="columns" bordered :data-source="tableData" :rowKey='record' size="middle" :pagination="pagination" @change="changeTable" :loading="loading" :scroll="{y:height}">
                  <a slot="tmplStatus" slot-scope="text,record">
                    <a-badge v-if="text == 0" status="processing" text="审核中" />
                    <a-badge v-else-if="text == 1" status="success" text="审批通过" />
                    <a-badge v-else status="processing" text="审核拒绝" />
                  </a>
                  <span slot="action" slot-scope="text,record">
                      <a @click="addBpm(1,record)">查看</a>
                      <a-divider type="vertical" />
                      <a @click="printing(record)">打印</a>
                  </span>
          </a-table>

          
        </div>
      </a-col>
    </a-row>

 
   <modalMyCard ref="add_facilities" @triggerData = "getData"></modalMyCard>
   <modalPrinting ref="print_facilities" ></modalPrinting>


    
   </div>
   
</template>

<script>

import modalMyCard from './modalMyCard.vue'
import modalPrinting from './modalPrinting.vue'
import {ListWorkflow,ListMyLaunchWorkflow} from '@/network/api'




export default {
  data() {
      const columns = [
      { title: '序号', fixed: 'left',width: 80, dataIndex: 'name', key: 'name', customRender:(text, row, index)=>{
        return <span>{index}</span>;
      },align:'center'},
      {
        title: '证件名称',
        dataIndex: 'workflowName',
        key: 'workflowName',
        align:'center',
        ellipsis:true,
      },
      {
        title: '证件状态',
        dataIndex: 'tmplStatus',
        key: 'tmplStatus',
        align:'center',
        ellipsis:true,
        scopedSlots: { customRender: 'tmplStatus' },
      },
      // {
      //   title: '有效状态',
      //   dataIndex: 'calcelStatus',
      //   key: 'calcelStatus',
      //   align:'center',
      //   ellipsis:true,
      // },
      {
        title: '待审批',
        dataIndex: 'nextCanOperateDeptName',
        key: 'nextCanOperateDeptName',
        align:'center',
        ellipsis:true,
      },
      {
        title: '操作',
        key: 'action',
        width:'150px',
        align:'center',
        scopedSlots: { customRender: 'action' },
      },
    ];

    return {
      selectedKeys:[],
      loading:false,
      leftWidth:'280px',
      spinning:false,
      treeData:[],
      checkedKeys: [],
      labelCol: { span: 4 },
      wrapperCol: { span: 24 },
      height:'',
      formParmas: {
        workflowId:'',
        deptId:'',
        tmplStatus:'',
        workflowName:'',
        pageNum: 1,
        pageSize: 20,
      },
      treeParmas: {
        workflowName: '',
        pageNum: 1,
        pageSize: 999,
      },
      replaceFields:{
        title:'workflowName',
        key:'id'
      },
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
    modalMyCard,
    modalPrinting
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
    tableHeight(){
      this.height = document.documentElement.clientHeight - 295
    },
    init(){
      this.getTree();
      this.getData();
    },
    getData(){
         this.loading = true;
        ListMyLaunchWorkflow(this.formParmas).then(res=>{
             this.loading = false;
            if(res.data.code == 0){
                let data = res.data.data.records;
                this.tableData = data;

                this.pagination.total = res.data.data.total;
            }else{
                this.$message.warning('加载失败')
            };
            
        });
    },
    getTree(){
        this.spinning = true;
        ListWorkflow(this.treeParmas).then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            this.treeData = res.data.data.records;
          };
        });
    },
    onSearch(){
      this.getTree()
    },
    record(key){
      return key.tmplId
    },
    searchData(){
      this.formParmas.pageNum = 1;
      this.pagination.current = 1;
      this.getData()
    },
    resetData(){
      this.formParmas.pageNum = 1;
      this.pagination.current = 1;
     
      this.formParmas.workflowId = '';
      this.formParmas.tmplStatus = '';
      this.formParmas.workflowName = '';
      this.selectedKeys = [];
      
      this.getData()
    },
    addBpm(val,record){
      if(val == 0){
        if(this.formParmas.workflowId){
          this.$refs.add_facilities.addBpm(val,record)
        }else{
          this.$message.warning('请选择证件')
        }
      }else{
        this.$refs.add_facilities.addBpm(val,record)
      }
      
    },

    selectCard(selectedKeys,e){

      this.formParmas.workflowId = selectedKeys[0];
      this.selectedKeys = selectedKeys;
      this.getData();
    },
    cancellation(obj){
      //注销

       let params = {
        id:obj.id,
        activition:obj.activition == 0 ? 1 : 0
       };

        SiteEdit(params).then(res=>{

            if(res.data.code == 0){
              this.getData();
              this.$message.success('注销成功');
            }else{
              this.$message.warning('注销失败')
            };
        })
    },
    changeTable(pagination){
      this.pagination.current = pagination.current;
      this.formParmas.pageNum = pagination.current;
      this.formParmas.pageSize = pagination.pageSize;
      this.pagination.pageSize = pagination.pageSize;
      this.getData()
    },
    printing(record){
      this.$refs.print_facilities.addBpm(record)
    }
    
  }
}
</script>