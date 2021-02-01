<template>
   <div class="layout_card_content">

       <div class="table-operator">
           <div class="left_button">
               <a-button type="primary" icon="plus" v-if="isAdd" @click="addQuan">
                  新增黑名单
                </a-button>
           </div>

            <div class="right_btn">
                 <a-button type="primary" class="search_btn" @click="searchData">查询</a-button>
                  <a-button class="reload_btn" @click="resetData">重置</a-button>
                  <a @click="toggleSearch">
                      <a-icon :type="advanced ? 'up' : 'down'"/>
                  </a>
            </div>

           <div class="layout_card_search">
                <a-form-model layout="inline" :model="formParmas" @submit="searchData" @submit.native.prevent>
                    <a-row :gutter="24">
                         <a-col :md="8">
                            <a-form-model-item label="车辆名称">
                                  <a-input v-model="formParmas.vehicleNo"/>
                            </a-form-model-item>
                        </a-col>

                        <a-col :md="8">
                            <a-form-model-item label="黑名单类型">
                              <a-select v-model="formParmas.reasonType">
                                    <a-select-option v-for="item in typeList" :key="item.id">
                                        {{item.name}}
                                    </a-select-option>
                                </a-select>
                            </a-form-model-item>
                        </a-col>
                        <a-col :md="8">
                            <a-form-model-item label="黑名单状态">
                                 <a-select v-model="formParmas.status">
                                    <a-select-option v-for="item in statusList" :key="item.id">
                                        {{item.name}}
                                    </a-select-option>
                                  </a-select>
                            </a-form-model-item>
                        </a-col>

                        <template v-if="advanced">
                            <a-col :md="16">
                                <a-form-model-item label="时间选择">
                                  <a-range-picker :allowClear="false"  v-model="formParmas.date" @change="changeDate" format="YYYY-MM-DD"  valueFormat="YYYY-MM-DD"/>
                                </a-form-model-item>
                            </a-col>
                        </template>
                    </a-row>
                </a-form-model>
           </div>
       </div>
        

        <a-table :columns="columns" bordered :data-source="tableData" @change="changeTable" :rowKey='record' size="middle" :pagination="pagination" :loading="loading" :scroll="{y:height}">
               
               
               <span slot="status" slot-scope="text,record">
                 
                     <a-badge  v-if="record.removeUser=='0'" status="success" text="生效" />
                     <a-badge   v-else status="error" text="移除" />
                </span>

                <span slot="action" slot-scope="text,record">
                  
                    <a>查看</a>
                    <a-divider type="vertical" />
                    <a  class="yellow" @click="removeBlack(record.id)">移除</a>
                          
             
                  </span>
        </a-table>

       <modalBack ref="add_quan" @triggerData="getData"></modalBack>

   </div>
</template>

<script>

import modalBack from './modalBack.vue'

import {VehicleBlackList,BaseList,RemoveVehicleBlack,ExportDepartment} from '@/network/api'



export default {
  data() {
      const columns = [
      { title: '序号', fixed: 'left',width: 80,customRender:(text, row, index)=>{
        return <span>{index+1}</span>;
      },align:'center'},
      {
        title: '车辆名称',
        dataIndex: 'vehicleNo',
        key: 'vehicleNo',
        align:'center',
        ellipsis:true,
      },
      {
        title: '所属企业',
        dataIndex: 'deptName',
        key: 'deptName',
        align:'center',
        ellipsis:true,
      },
      {
        title: '黑名单类型',
        dataIndex: 'reasonName',
        key: 'reasonName',
        align:'center',
        ellipsis:true,
  
      },
      {
        title: '经办人',
        dataIndex: 'createUserName',
        key: 'createUserName',
        align:'center',
        ellipsis:true,
  
      },
      {
        title: '移除经办人',
        dataIndex: 'removeUserName',
        key: 'removeUserName',
        align:'center',
        ellipsis:true,
      },
      {
        title: '状态',
        align:'center',
        ellipsis:true,
        scopedSlots: { customRender: 'status' },
      },
       {
        title: '生效时间',
        dataIndex: 'entryTime',
        key: 'entryTime',
        align:'center',
        ellipsis:true,
  
      },
      {
        title: '操作',
        key: 'action',
        width:'240px',
        align:'center',
        scopedSlots: { customRender: 'action' },
      },
    ];
      
    return {
      loading:false,
      businessVisible:false,
      dialog:true,
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
      roleVisible:false,
      height:'',
      formParmas: {
        vehicleNo : '',
        pageNum:1,
        pageSize:20,
        searchStartTime:'',
        searchEndTime:'',
        status:'',
        reasonType:'',
        date:[]
      },
      advanced:false,
      tableData:[],
      statusList:[
        {id:0,name:'已移除'},
        {id:1,name:'已生效'},
      ],
      typeList:[],
      quarterList:[
        {id:1,name:'一季度'},
        {id:2,name:'二季度'},
        {id:3,name:'三季度'},
        {id:4,name:'四季度'},
      ],
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
    }
  },
  components:{
      modalBack
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
      this.getType();
      
     

    },
    permissionControl(){
     
      let permission =  JSON.parse(this.$getStorage('permission'));
      
      console.log(permission)
      permission.forEach(cur=>{
        if(cur.menuPermission == 'sys:assesspoint:add'){
          this.isAdd = true;
        }
      })
    },
   
   
   
    getData(){
         this.loading = true;
        VehicleBlackList(this.formParmas).then(res=>{
             this.loading = false;
            if(res.data.code == 0){
                let data = res.data.data.records;
                this.tableData = data;
                this.tableData.forEach(cur=>{
                    cur.entryTime = this.$moment.unix(cur.entryTime).format('YYYY-MM-DD hh:mm:ss') 
                });
                this.pagination.total = res.data.data.total;
            }else{
                this.$message.warning('加载失败')
            };
            
        });
    },
    getType(){
        let params = {
              pid: 1020
            };
        BaseList(params).then(res=>{
          if(res.data.code == 0){

              this.typeList = res.data.data
            
            
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
      this.formParmas.vehicleNo = '';
      this.formParmas.searchStartTime = '';
      this.formParmas.searchEndTime = '';
      this.formParmas.status = '';
      this.formParmas.reasonType = '';
       this.formParmas.date = [];
      this.getData()
    },
    record(key){
          return key.id
    },
    addQuan(){
      this.$refs.add_quan.addQuan()
    },
   
    viewDetails(record){
      this.$refs.view_details.viewDetails(record)
    },

    removeBlack(id){
      let that = this;

 
      this.$confirm({
        title: '确定移除吗?',
        content: '',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
            that.removeBlackOK(id)
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    },
    removeBlackOK(val){
      let parmas = {
        id:val
      }
        RemoveVehicleBlack(parmas).then(res=>{
            if(res.data.code == 0){
                this.getData()
                this.$message.success('移除成功')
            }else{
                this.$message.warning(res.data.message)
            };
            
        });
    },

    changeDate(val){
      console.log(val)
      this.formParmas.searchStartTime = this.$moment(val[0]).unix();
      this.formParmas.searchEndTime = this.$moment(val[1]).unix();
    },
   
    changeTable(pagination){
      this.pagination.current = pagination.current;
      this.formParmas.pageNum = pagination.current;
      this.formParmas.pageSize = pagination.pageSize;
      this.pagination.pageSize = pagination.pageSize;
      this.getData()
    }
  }
}
</script>