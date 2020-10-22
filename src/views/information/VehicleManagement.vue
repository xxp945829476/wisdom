<template>
   <div>
    <a-row type="flex">
      <a-col :flex="leftWidth" class="left_content" ref="left_content">
        <a-form-model :model="treeParmas" layout="inline" class="left_search" :label-col="labelCol" :wrapper-col="wrapperCol" @submit="onSearch" @submit.native.prevent>
          <a-form-model-item>
            <a-input-search
              v-model="treeParmas.deptName"
              placeholder="请输入部门名称"
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
              @select="selectArea"
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
                <a-button type="primary" icon="plus" @click="addvehicle(0)" v-if="isAdd">
                    新增
                  </a-button>
                  <!-- <a-button>
                    导出
                  </a-button> -->
            </div>

              <div class="right_btn">
                 <a-button type="primary" class="search_btn" @click="searchData" htmlType="submit">查询</a-button>
                  <a-button class="reload_btn" @click="resetData">重置</a-button>
                  <a @click="toggleSearch">
                      <a-icon :type="advanced ? 'up' : 'down'"/>
                  </a>
            </div>

            <div class="layout_card_search">
                   <a-form-model layout="inline" :model="formParmas" @submit="searchData" @submit.native.prevent>
                      <a-row :gutter="24">
                         <a-col :md="8">
                              <a-form-model-item label="审核状态">
                                <a-select v-model="formParmas.permitStatus" allowClear>
                                    <a-select-option value="0">
                                        待审核
                                    </a-select-option>

                                    <a-select-option value="1">
                                        审核通过
                                    </a-select-option>

                                    <a-select-option value="2">
                                        审核不通过
                                    </a-select-option>

                                  </a-select>
                              </a-form-model-item>
                            </a-col>
                          
                          <a-col :md="8">
                              <a-form-model-item label="车牌号码">
                                  <a-input v-model="formParmas.vehicleNo" placeholder="" />
                              </a-form-model-item>
                          </a-col>

                          <a-col :md="8">
                              <a-form-model-item label="sim卡号">
                                 <a-input v-model="formParmas.simNo" placeholder="" />
                              </a-form-model-item>
                          </a-col>

                          <template v-if="advanced">
                           <a-col :md="8">
                             <a-form-model-item label="经销商">
                                  <a-select v-model="formParmas.distributor" allowClear>
                                    <a-select-option v-for="item in distributorList" :key="item.id">
                                        {{item.deptName}}
                                    </a-select-option>
                                  </a-select>
                              </a-form-model-item>
                          </a-col>
                          </template>
                          
                      </a-row>
                  </a-form-model>
            </div>
        </div>
          

          <a-table :columns="columns" bordered :data-source="tableData" @change="changeTable" :rowKey='record' size="middle" :pagination="pagination" :loading="loading" :scroll="{x:1200,y:height}">
                  <a slot="vehicleNo" slot-scope="text,record" @click="viewVehicle(record,1)">
                    {{text}} {{record.vehicleLicenceColorName}}
                  </a>
                  <span slot="vehicleNewOld" slot-scope="text,record">
                    <span v-if="record.vehicleNewOld=='1'">新</span>
                    <span v-else-if="record.vehicleNewOld=='2'">旧</span>
                  </span>
                  <span slot="activition" slot-scope="text,record">
                    <a-badge v-if="record.activition == 0" status="success" text="有效" />
                    <a-badge v-else status="error" text="无效"></a-badge>
                  </span>
                  <span slot="permitStatus" slot-scope="text,record">
                    <a-badge v-if="record.permitStatus == 0" status="default" text="待审核" />
                    <a-badge v-else-if="record.permitStatus == 1" status="success" text="审核通过" />
                    <a-badge v-else-if="record.permitStatus == 2" status="error" text="审核不通过" />
                  </span>
                  <span slot="action" slot-scope="text,record">
                  <span  v-if="isEdit">
                     <a @click="addvehicle(1,record)">编辑</a>
                      
                         <template v-if="record.deviceMaster==0 && record.deviceSlave==0">
                          <a-divider type="vertical" />
                          <span class="yellow" @click="cancellation(record)" v-if="record.activition == 0">注销</span>
                          <a @click="cancellation(record)" v-else>恢复</a>
                          <!-- <template v-if="record.activition == 0">
                            <a-divider type="vertical" />
                            <a @click="bundling(record)">绑定</a>
                          </template> -->
                        
                        </template>
                        <template v-else>
                          <!-- <a @click="unbundling(record)">解绑</a> -->
                          <template v-if="record.permitStatus == 0" >
                            <a-divider type="vertical" />
                            <a @click="viewVehicle(record,2)">审核</a>
                          </template>
                          
                        </template>
                  </span>
                     
                    
                     
                   
                      
                  </span>
          </a-table>

          
        </div>
      </a-col>
    </a-row>

    <modalVehicle ref="add_vehicle" @triggerData="getData"></modalVehicle>
    <modalVehicleDetails ref="view_vehicle" @triggerData="getData"></modalVehicleDetails>


    <!-- 选择解绑设备 -->
    <a-modal v-model="selectVisible" title="选择解绑设备" :maskClosable="false" :keyboard="false" width="400px" v-dialogDrag="dialog">
      <div>
         <a-checkbox-group :options="plainOptions"  v-model="selectValue"/>
      </div>

      <template slot="footer">
            <a-button key="back" @click="selectVisible=false">
            取消
            </a-button>
            <a-button key="submit" type="primary" @click="unbundlingOK('')">
            确定
            </a-button>
        </template>
    </a-modal>

    <!-- 绑定设备 -->
    <a-modal v-model="bindVisible" title="绑定设备" :maskClosable="false" :keyboard="false" width="500px" v-dialogDrag="dialog">
      <div>
        <a-spin :spinning="spinSelect">
          <a-descriptions>
            <a-descriptions-item label="车牌号码">
              {{VehicleNo}}
            </a-descriptions-item>
          </a-descriptions>
          <a-form-model :model="deviceForm" ref="devicRuleForm" :rules="devicRules">
            <a-form-model-item label="设备名称-主" prop="deviceMaster">
                <a-select v-model="deviceForm.deviceMaster" 
                :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body;}">
                  <template v-for="item in devicelist">
                    <a-select-option :value="item.id" :key="item.id" v-if="item.deviceMasterSlave == 22">
                            {{item.deviceName}}
                    </a-select-option>
                  </template>  
                  
                </a-select>
            </a-form-model-item>

            <a-form-model-item label="设备名称-从" prop="deviceSlave">
                <a-select v-model="deviceForm.deviceSlave" 
                :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body;}" allowClear>
                  <template v-for="item in devicelist">
                    <a-select-option :value="item.id" :key="item.id" v-if="item.deviceMasterSlave == 23">
                            {{item.deviceName}}
                    </a-select-option>
                  </template>  
                </a-select>
            </a-form-model-item>
          </a-form-model>
        </a-spin>
      </div>

      <template slot="footer">
            <a-button key="back" @click="bindVisible=false">
            取消
            </a-button>
            <a-button key="submit" type="primary" @click="bundlingOK">
            确定
            </a-button>
        </template>
    </a-modal>
   </div>
   
</template>

<script>

import modalVehicle from './modalVehicle.vue'
import modalVehicleDetails from './modalVehicleDetails.vue'
import {ListEnterprise,Vehiclelist,BaseList,EditVehicle,UnbindVehicle,BindVehicle,Devicelist,DepartmentList} from '@/network/api'




export default {
  data() {
      const columns = [
      { title: '序号', fixed: 'left',width: 80, dataIndex: 'name', key: 'name', customRender:(text, row, index)=>{
        return <span>{index}</span>;
      },align:'center'},
      {
        title: '车牌号码',
        dataIndex: 'vehicleNo',
        key: 'vehicleNo',
        align:'center',
        ellipsis:true,
        width:130,
        scopedSlots: { customRender: 'vehicleNo' },
      },
      {
        title: '企业名称',
        dataIndex: 'deptName',
        key: 'deptName',
        align:'center',
        ellipsis:true,
        width:200
      },
      {
        title: '管辖区',
        dataIndex: 'areaName',
        key: 'areaName',
        align:'center',
        ellipsis:true,
        width:100
      },
      {
        title: '车辆状态',
        dataIndex: 'permitStatus',
        key: 'permitStatus',
        align:'center',
        ellipsis:true,
        width:110,
        scopedSlots: { customRender: 'permitStatus' },
      },
      {
        title: '主设备名称',
        dataIndex: 'masterName',
        key: 'masterName',
        align:'center',
        ellipsis:true,
        width:150
      },
      {
        title: '从设备名称',
        dataIndex: 'slaveName',
        key: 'slaveName',
        align:'center',
        ellipsis:true,
        width:150
      },
      {
        title: 'sim卡号',
        dataIndex: 'simNo',
        key: 'simNo',
        align:'center',
        ellipsis:true,
        width:100
      },
      {
        title: '入库时间',
        dataIndex: 'createTime',
        key: 'createTime',
        align:'center',
        ellipsis:true,
        width:100,
      },
      {
        title: '年检时间',
        dataIndex: 'yearlyInspectionTime',
        key: 'yearlyInspectionTime',
        align:'center',
        ellipsis:true,
        width:100
      },
      {
        title: '车辆新旧',
        align:'center',
        ellipsis:true,
        width:100,
        scopedSlots: { customRender: 'vehicleNewOld' },
      },
      {
        title: '有效状态',
        dataIndex: 'activition',
        key: 'activition',
        align:'center',
        ellipsis:true,
        width:100,
        scopedSlots: { customRender: 'activition' },
      },
      {
        title: '操作',
        key: 'action',
        width:'240px',
        align:'center',
        fixed: 'right',
        scopedSlots: { customRender: 'action' },
      },
    ];

    return {
      bindVisible:false,
      selectValue:[],
      plainOptions:[],
      selectVisible:false,
      selectedKeys:[],
      loading:false,
      leftWidth:'280px',
      spinning:false,
      spinSelect:false,
      treeData:[],
      checkedKeys: [],
      businessVisible:false,
      dialog:true,
      labelCol: { span: 4 },
      wrapperCol: { span: 24 },
      roleVisible:false,
      height:'',
      formParmas: {
        simNo :'',
        vehicleNo:'',
        pageNum:1,
        pageSize:20,
        distributor:'',
        permitStatus:'',
        deptId:'',
        realAreaId:'',
      },
      treeParmas: {
        deptName: '',
        pageNum:1,
        pageSize:999,
        deptType:''
      },
      replaceFields:{
        children:'depts',
        title:'keyName',
        key:'id'
      },
      advanced:false,
      tableData:[],
      distributorList:[],
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
      devicelist:[],
      deviceForm:{
        deviceMaster:'',
        deviceSlave:'',
        id:'',
      },
      devicRules:{
        deviceMaster:[
          { required: true, message: '请选择主设备', trigger: 'change' },
        ],
      },
      VehicleNo:'',
      isAdd:false,
      isEdit:false,
    }
  },
  components:{
    modalVehicle,
    modalVehicleDetails
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
      this.permissionControl();
      this.getTree();
      this.getData();
      this.getDepart();
    },
    permissionControl(){
     
      let permission =  JSON.parse(this.$getStorage('permission'));
      
      console.log(permission)
      permission.forEach(cur=>{
        if(cur.menuPermission == 'sys:vehicle:add'){
          this.isAdd = true;
        }else if(cur.menuPermission == 'sys:vehicle:edit'){
          this.isEdit = true;
        }
      })
    },
    getData(){
         this.loading = true;
        Vehiclelist(this.formParmas).then(res=>{
             this.loading = false;
            if(res.data.code == 0){
                let data = res.data.data.records;
                this.tableData = data;
                this.tableData.forEach(cur=>{
                    cur.createTime = this.$moment.unix(cur.createTime).format('YYYY-MM-DD');
                    
                    cur.yearlyInspectionTime = cur.yearlyInspectionTime != 0 ? this.$moment.unix(cur.yearlyInspectionTime).format('YYYY-MM-DD') : '';
                    cur.manufactureTime = cur.manufactureTime != 0 ? this.$moment.unix(cur.manufactureTime).format('YYYY-MM-DD') : '';

                    cur.expireTime = cur.expireTime != 0 ? this.$moment.unix(cur.expireTime).format('YYYY-MM-DD') : ''; 
                });
                this.pagination.total = res.data.data.total;
            }else{
                this.$message.warning('加载失败')
            };
            
        });
    },
    getTree(){
        this.spinning = true;
        ListEnterprise(this.treeParmas).then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            this.treeData = res.data.data;
          };
        });
    },
    getDevice(){
      this.spinSelect = true;
         let params = {
            pageNum:1,
            pageSize:999,
            deviceMasterSlave:'',
         } 
         Devicelist(params).then(res=>{
            this.spinSelect = false;
            if(res.data.code == 0){
                this.devicelist = res.data.data.records;
            }else{
                this.$message.warning('加载失败')
            };
            
        });
    },
    getDepart(){
          let params = {
            deptName: '',
            pageNum:1,
            pageSize:999,
            deptType:3,
            deptBusinessType:82
         };
        DepartmentList(params).then(res=>{
          if(res.data.code == 0){
              this.distributorList = res.data.data.records
          };
        });
    },
    onSearch(){
      this.getTree()
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
      this.formParmas.simNo = '';
      this.formParmas.vehicleNo = '';
      this.formParmas.distributor = '';
      this.formParmas.permitStatus = '';
      this.formParmas.deptId = '';
      this.formParmas.realAreaId = '';
      this.selectedKeys = []
      this.getData()
    },
    addvehicle(val,record){
      this.$refs.add_vehicle.addvehicle(val,record)
    },
    viewVehicle(record,val){
      this.$refs.view_vehicle.viewVehicle(record,val)
    },
    changeTable(pagination){
      this.pagination.current = pagination.current;
      this.formParmas.pageNum = pagination.current;
      this.getData()
    },
    selectArea(selectedKeys,e){
      this.formParmas.pageNum = 1;
      this.pagination.current = 1;
      this.formParmas.deptId = selectedKeys[0];
      this.formParmas.realAreaId = '';
      this.selectedKeys = selectedKeys;
      this.treeData.forEach(cur=>{
        if(cur.areaId == selectedKeys[0]){
          this.formParmas.realAreaId = cur.areaId;
          this.formParmas.deptId = ''
        }
      })
      this.getData();
    },
    cancellation(obj){
      //注销

       let params = {
        id:obj.id,
        activition:obj.activition == 0 ? 1 : 0
       };

        EditVehicle(params).then(res=>{

            if(res.data.code == 0){
              this.getData();
              this.$message.success('注销成功');
            }else{
              this.$message.warning('注销失败')
            };
        })
    },
    unbundling(obj){
      //解绑

      this.curData = obj;
      if(obj.deviceMaster != '0' && obj.deviceSlave != '0'){
        this.selectVisible = true;
        this.plainOptions = [
          { label: obj.masterName + ' (主设备)', value: obj.deviceMaster},
          { label: obj.slaveName + ' (从设备)', value: obj.deviceSlave},
        ];
      }else{
        this.unbundlingOK(obj)
      }
    },
    unbundlingOK(obj){
     
       let params = {
            vehicleId:'',
            slaveDeviceId:'',
            masterDeviceId:'',
          };

       if(obj){
         params = {
            vehicleId:obj.id,
            slaveDeviceId:obj.deviceSlave,
            masterDeviceId:obj.deviceMaster,
          };
       }else{
         //主从设备都存在
         params.vehicleId = this.curData.id;
         this.selectValue.forEach(cur=>{
           if(cur == this.curData.deviceMaster){
             params.masterDeviceId = cur
           };
           if(cur == this.curData.deviceSlave){
             params.slaveDeviceId = cur
           };
         });
       };

        

      UnbindVehicle(params).then(res=>{
            if(res.data.code == 0){
              this.getData();
              this.selectVisible = false;
              this.$message.success('解绑成功');
            }else{
              this.$message.warning('解绑失败')
            };
        })
    },
    bundling(obj){
      this.VehicleNo = obj.vehicleNo;
      this.deviceForm.id = obj.id;
      this.getDevice();
      this.bindVisible = true;
      this.$nextTick(()=>{
         this.$refs.devicRuleForm.resetFields();
      })
    },
    bundlingOK(){
       this.$refs.devicRuleForm.validate(valid => {
         if (valid) {
           BindVehicle(this.deviceForm).then(res=>{
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