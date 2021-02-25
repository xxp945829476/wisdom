<template>
   <div class="layout_card_content">

       <div class="table-operator">
           <div class="left_button">
               <a-button type="primary" icon="plus" v-if="isAdd" @click="addCase(0)">
                  新增案件
                </a-button>
                <a-button @click="exportBlack">
                  导出
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
                         <a-col :md="12">
                            <a-form-model-item label="企业名称">
                                  <a-input v-model="formParmas.deptName"/>
                            </a-form-model-item>
                        </a-col>

                        <a-col :md="12">
                            <a-form-model-item label="车牌号码">
                                 <a-input v-model="formParmas.vehicleNo"/>
                            </a-form-model-item>
                        </a-col>

                
                    </a-row>
                </a-form-model>
           </div>
       </div>
        

        <a-table :columns="columns" bordered :data-source="tableData" @change="changeTable" :rowKey='record' size="middle" :pagination="pagination" :loading="loading" :scroll="{x:2000,y:height}">
               
               
               <span slot="status" slot-scope="text,record">
                     
                     <a-badge  v-if="text=='0'"  status="processing" text="待处理" />
                     <a-badge  v-else-if="text=='1'"  status="processing" text="待处罚" />
                     <a-badge  v-else  status="default" text="已结案" />
                </span>

                <span slot="action" slot-scope="text,record">
                  
                    <a @click="addCase(1,record)">编辑</a>
                    <template v-if="record.status!='0'&&record.status!='1'">
                      <a-divider type="vertical" />
                    <a @click="addCase(2,record)">查看</a>
                    </template>
                    

                </span>
        </a-table>

       <modalCase ref="add_case" @triggerData="getData"></modalCase>
  
   


   </div>
</template>

<script>

import modalCase from './modalCase.vue'

import {CaseList,BaseList,RemoveVehicleBlack,ExportVehicleBlack} from '@/network/api'






export default {
  data() {
      const columns = [
      { title: '序号', fixed: 'left',width: 80,customRender:(text, row, index)=>{
        return <span>{index+1}</span>;
      },align:'center'},
      {
        title: '执法单号',
        dataIndex: 'caseNo',
        key: 'caseNo',
        align:'center',
        ellipsis:true,
      },
      {
        title: '车牌号码',
        dataIndex: 'vehicleNo',
        key: 'vehicleNo',
        align:'center',
        ellipsis:true,
      },
      {
        title: '企业名称',
        dataIndex: 'deptName',
        key: 'deptName',
        align:'center',
        ellipsis:true,
      },
      {
        title: '驾驶员',
        dataIndex: 'driverName',
        key: 'driverName',
        align:'center',
        ellipsis:true,
      },
      {
        title: '驾驶证号',
        dataIndex: 'driverLicenseNo',
        key: 'driverLicenseNo',
        align:'center',
        ellipsis:true,
  
      },
      {
        title: '经办人',
        dataIndex: 'agentName',
        key: 'agentName',
        align:'center',
        ellipsis:true,
  
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        align:'center',
        ellipsis:true,
        scopedSlots: { customRender: 'status' },
      },
      {
        title: '检查时间',
        dataIndex: 'checkTime',
        key: 'checkTime',
        align:'center',
        ellipsis:true,
      },
      {
        title: '检查地点',
        dataIndex: 'checkArea',
        key: 'checkArea',
        align:'center',
        ellipsis:true,
      },
      {
        title: '辖区',
        dataIndex: 'areaName',
        key: 'areaName',
        align:'center',
        ellipsis:true,
  
      },
      {
        title: '核准证编号',
        dataIndex: 'approvalCertificateNo',
        key: 'approvalCertificateNo',
        align:'center',
        ellipsis:true,
  
      },
      {
        title: '出土工地',
        dataIndex: 'fromFieldName',
        key: 'fromFieldName',
        align:'center',
        ellipsis:true,
  
      },
      {
        title: '消纳场',
        dataIndex: 'toFieldName',
        key: 'toFieldName',
        align:'center',
        ellipsis:true,
  
      },
      {
        title: '违章类型',
        dataIndex: 'violationTypeName',
        key: 'violationTypeName',
        align:'center',
        ellipsis:true,
  
      },
      {
        title: '暂扣证件',
        dataIndex: 'withholdCertificateName',
        key: 'withholdCertificateName',
        align:'center',
        ellipsis:true,
  
      },
      {
        title: '操作',
        key: 'action',
        width:'200px',
        align:'center',
        fixed:'right',
        scopedSlots: { customRender: 'action' },
      },
    ];
      
    return {
      remark:'',
      dlID:'',
      visibleRemark:false,
      loading:false,
      businessVisible:false,
      dialog:true,
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
      roleVisible:false,
      height:'',
      formParmas: {
        caseNo:'',
        vehicleNo : '',
        pageNum:1,
        pageSize:20,
        deptName:''
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
      jsRemove:false,
      isExport:false
    }
  },
  components:{
      modalCase
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
        if(cur.menuPermission == 'sys:vehicleblacklist:add'){
          this.isAdd = true;
        }else if(cur.menuPermission == 'sys:vehicleblacklist:remove'){
          this.isRemove = true;
        }
      })
    },
   
   
   
    getData(){
         this.loading = true;
        CaseList(this.formParmas).then(res=>{
             this.loading = false;
            if(res.data.code == 0){
                let data = res.data.data.records;
                this.tableData = data;
                this.tableData.forEach(cur=>{
                    cur.checkTime = this.$moment.unix(cur.checkTime).format('YYYY-MM-DD hh:mm:ss')
                    cur.violationTime = this.$moment.unix(cur.violationTime).format('YYYY-MM-DD hh:mm:ss')
                    cur.dealTime = this.$moment.unix(cur.dealTime).format('YYYY-MM-DD hh:mm:ss')
                 
                      
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
      this.formParmas.deptName = '';
      this.getData()
    },
    record(key){
          return key.id
    },
    addCase(val,record){
      this.$refs.add_case.addCase(val,record)
    },
   
    viewDetails(record){
      this.$refs.view_details.viewDetails(record)
    },

    removeBlack(id){
      let that = this;

      that.visibleRemark = true;
      this.dlID = id;
      
    },
    removeBlackOK(){
      let parmas = {
        id:this.dlID,
        removeRemark:this.remark
      }
        RemoveVehicleBlack(parmas).then(res=>{
            if(res.data.code == 0){
                this.getData()
                this.visibleRemark = false;
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
    exportBlack(){

      let params = {
        searchStartTime:this.formParmas.searchStartTime,
        searchEndTime:this.formParmas.searchEndTime,
        status:this.formParmas.status,
        reasonType:this.formParmas.reasonType,
      };
      ExportVehicleBlack(params).then(res=>{
          if(window.navigator.msSaveBlob){
            const blobObject = new Blob([res.data]);
            window.navigator.msSaveBlob(blobObject, '车辆黑名单.xls');
          }else{
            let blob = new Blob([res.data]); // 假设文件为pdf
            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = '车辆黑名单.xls';
            link.click();
            link.remove();
          }
         
      });
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