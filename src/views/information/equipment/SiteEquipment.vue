<template>
   <div class="layout_card_content">

       <div class="table-operator">
           <div class="left_button">
               <a-button type="primary" icon="plus" @click="addEquipment(0)" v-if="isAdd">
                  新增
                </a-button>
                <!-- <a-button>
                  导出
                </a-button> -->
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
                            <a-form-model-item label="SIM号">
                            <a-input v-model="formParmas.simNo" placeholder="" />
                            </a-form-model-item>
                        </a-col>
                        
                        <a-col :md="8">
                            <a-form-model-item label="设备名称">
                            <a-input v-model="formParmas.deviceName" placeholder="" />
                            </a-form-model-item>
                        </a-col>

                        <a-col :md="8">
                            <a-form-model-item label="绑定状态">
                              <a-select v-model="formParmas.bindStatus" allowClear>
                                  <a-select-option value='0'>
                                      未绑定
                                  </a-select-option>
                                  <a-select-option value='1'>
                                      已绑定
                                  </a-select-option>
                              </a-select>
                            </a-form-model-item>
                        </a-col>
                        <template v-if="advanced">

                          
                          <a-col :md="8">
                            <a-form-model-item label="设备类型" allowClear>
                              <a-select v-model="formParmas.deviceType" placeholder="请选择设备类型" allowClear>
                                  <a-select-option v-for="item in typeList" :key="item.id">
                                      {{item.name}}
                                  </a-select-option>
                              </a-select>
                            </a-form-model-item>
                        </a-col>
                        
                        <a-col :md="8">
                            <a-form-model-item label="有效状态">
                              <a-select v-model="formParmas.activition" allowClear>
                                  <a-select-option value='0'>
                                      有效
                                  </a-select-option>
                                  <a-select-option value='1'>
                                      无效
                                  </a-select-option>
                              </a-select>
                            </a-form-model-item>
                        </a-col>
                        </template>
                    </a-row>
                </a-form-model>
           </div>
       </div>
        

        <a-table :columns="columns" bordered :data-source="tableData" @change="changeTable" :rowKey='record' size="middle" :pagination="pagination" :loading="loading" :scroll="{x:1500,y:height}">
                <a slot="deviceName" slot-scope="text,record" @click="viewDetails(record)">
                    {{record.deviceName}}
                </a>
                <span slot="bindStatus" slot-scope="text,record">
                    <a-badge v-if="record.facilityId == 0" status="error" text="未绑定" />
                    <a-badge v-else status="success" text="已绑定"></a-badge>
                </span>
                <span slot="activition" slot-scope="text,record">
                    <a-badge v-if="record.activition == 0" status="success" text="有效" />
                    <a-badge v-else status="error" text="无效"></a-badge>
                </span>
                <span slot="action" slot-scope="text,record">
                  <template v-if="isEdit">
                    <a @click="addEquipment(1,record)">编辑</a>
                    <a-divider type="vertical" />
                    <a @click="unbundling(record)" v-if="record.facilityId != '0'">解绑</a>
                    <template v-else>
                    <a @click="cancellation(record)" v-if="record.activition == 1">恢复</a>
                    <span class="yellow" @click="cancellation(record)" v-else>注销</span>
                    </template>
                  </template>
                    
                    
                </span>
        </a-table>

      <modalSiteEquipment ref="add_equipment" @triggerData="getData"></modalSiteEquipment>
      <modalSiteEquipmentDetails ref="view_equipment"></modalSiteEquipmentDetails>

      
   </div>
</template>

<script>

import modalSiteEquipment from './modalSiteEquipment.vue'
import modalSiteEquipmentDetails from './modalSiteEquipmentDetails.vue'

import {SiteEquipmentList,BaseList,EditSiteEquipment,bindDevice,UnbindSiteEquipment,Vehiclelist} from '@/network/api'



export default {
  data() {
      const columns = [
      { title: '序号', fixed: 'left',width: 80,customRender:(text, row, index)=>{
        return <span>{index}</span>;
      },align:'center'},
      {
        title: '工地名称',
        dataIndex: 'fieldName',
        key: 'fieldName',
        align:'center',
        ellipsis:true,
        width:200
      },
      {
        title: '设备名称',
        dataIndex: 'deviceName',
        key: 'deviceName',
        align:'center',
        ellipsis:true,
        width:140,
        scopedSlots: { customRender: 'deviceName' },
      },
      {
        title: 'SIM号',
        dataIndex: 'simNo',
        key: 'simNo',
        align:'center',
        ellipsis:true,
        width:160,
      },
      {
        title: '设备ID',
        dataIndex: 'deviceId',
        key: 'deviceId',
        align:'center',
        ellipsis:true,
    
      },
      {
        title: '设备类型',
        dataIndex: 'typeName',
        key: 'typeName',
        align:'center',
        ellipsis:true,
        
      },
      {
        title: '设备绑定状态',
        align:'center',
        ellipsis:true,
      
        scopedSlots: { customRender: 'bindStatus' },
      },
      {
        title: '设施名称',
        dataIndex: 'facilityName',
        key: 'facilityName',
        align:'center',
        ellipsis:true,
        
      },
      {
        title: '视频逻辑通道名称',
        dataIndex: 'vehicleNums',
        key: 'vehicleNums',
        align:'center',
        ellipsis:true,
        
      },
      {
        title: 'IMEI号',
        dataIndex: 'devideImeiNo',
        key: 'devideImeiNo',
        align:'center',
        ellipsis:true,
       
      },
      {
        title: '有效状态',
        dataIndex: 'activition',
        key: 'activition',
        align:'center',
        ellipsis:true,
        scopedSlots: { customRender: 'activition' },
      },
      {
        title: '操作',
        key: 'action',
        width:'200px',
        align:'center',
        fixed: 'right',
        scopedSlots: { customRender: 'action' },
      },
    ];
      
    return {
      spinSelect:false,
      bindVisible:false,
      loading:false,
      businessVisible:false,
      dialog:true,
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
      roleVisible:false,
      height:'',
      formParmas: {
        pageNum:1,
        pageSize:20,
        simNo:'',
        deviceType:'',
        activition:'',
        deviceOperator:'',
        vehicleNo:'',
        bindStatus:'',
        deviceName:'',
      },
      advanced:false,
      tableData:[],
      typeList:[],
      operaterList:[],//运营商
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
      equipmentForm:{
        vehicleId:'',
        id:'',
        deviceMasterSlave:'',
      },

      simNo:'',
      deviceId:'',
      vehiclelist:[],
      isAdd:false,
      isEdit:false
    }
  },
  components:{
    modalSiteEquipment,
    modalSiteEquipmentDetails
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
      this.permissionControl();
      this.getData();
      this.getType(17,2);
      this.getType(24,3);
    },
    permissionControl(){
     
      let permission =  JSON.parse(this.$getStorage('permission'));
      
      console.log(permission)
      permission.forEach(cur=>{
        if(cur.menuPermission == 'sys:fieldDevice:add'){
          this.isAdd = true;
        }else if(cur.menuPermission == 'sys:fieldDevice:edit'){
          this.isEdit = true;
        }
      })
    },
    getData(){
         this.loading = true;
        SiteEquipmentList(this.formParmas).then(res=>{
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
    getVehiclelist(){
         let params = {
          pageNum:1,
          pageSize:999,
         };
         this.spinSelect = true;
        Vehiclelist(params).then(res=>{
            if(res.data.code == 0){
              this.spinSelect = false;
                let data = res.data.data.records;
                this.vehiclelist = data;
            }else{
                this.$message.warning('加载失败')
            };
            
        });
    },
    getType(id,val){
        let params = {
              pid: id
            };
        BaseList(params).then(res=>{
          if(res.data.code == 0){
              if(val == 2){
                  this.typeList = res.data.data
              }else if(val == 3){
                  this.operaterList = res.data.data
              }
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
      this.formParmas.simNo = '';
      this.formParmas.deviceType = '';
      this.formParmas.activition = '';
      this.formParmas.deviceOperator = '';
      this.formParmas.vehicleNo = '';
      this.formParmas.bindStatus = '';
      this.formParmas.deviceName = '';
      this.getData()
    },
    record(key){
          return key.id
    },
    addEquipment(val,record){
      this.$refs.add_equipment.addEquipment(val,record)
    },
    cancellation(obj){
       //注销

       let params = {
        id:obj.id,
        activition:obj.activition == 0 ? 1 : 0
       };

        EditSiteEquipment(params).then(res=>{

            if(res.data.code == 0){
              this.getData();
              this.$message.success('操作成功');
            }else{
              this.$message.warning('操作失败')
            };
        });
    },
    viewDetails(record){
      this.$refs.view_equipment.viewDetails(record)
    },
    changeTable(pagination){
      this.pagination.current = pagination.current;
       this.formParmas.pageNum = pagination.current;
      this.formParmas.pageSize = pagination.pageSize;
      this.pagination.pageSize = pagination.pageSize;
      this.getData()
    },
    unbundling(obj){
      let params = {
         id:obj.id,
         facilityId:obj.facilityId,
      };
       UnbindSiteEquipment(params).then(res=>{
            if(res.data.code == 0){
              this.getData();
              this.$message.success('解绑成功');
            }else{
              this.$message.warning('解绑失败')
            };
        })
    },
    bundling(obj){
      this.bindVisible = true;
      this.simNo = obj.simNo;
      this.deviceId = obj.deviceId;
      this.equipmentForm.deviceMasterSlave = obj.deviceMasterSlave
      this.equipmentForm.id = obj.id;
      this.getVehiclelist();
      this.$nextTick(()=>{
         this.$refs.equipmentRuleForm.resetFields();
      })
    },
    bundlingOK(){
       this.$refs.equipmentRuleForm.validate(valid => {
         if (valid) {
           bindDevice(this.equipmentForm).then(res=>{
              if(res.data.code == 0){
                this.getData();
                this.bindVisible = false;
                this.$message.success('绑定成功');
              }else{
                this.$message.warning('解定失败')
              };
          });
         }
          
       });
    }
  }
}
</script>