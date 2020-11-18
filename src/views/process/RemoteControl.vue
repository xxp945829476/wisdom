<template>
  <div>
    <a-row type="flex">
      <a-col :flex="leftWidth" class="left_content" ref="left_content">
        <a-form-model :model="form" layout="inline" class="left_search" :label-col="labelCol" :wrapper-col="wrapperCol" @submit="onSearch" @submit.native.prevent>
          <a-form-model-item>
            <a-input-search
              v-model="form.keyName"
              placeholder="查找地区、公司、车辆"
              enter-button="搜索"
              @search="onSearch"
            />
          </a-form-model-item>
        </a-form-model>

        <a-spin :spinning="spinning">  
        <div class="left_tree left_tree_1">
          <a-tree
            v-model="checkedKeys"
            :show-line="true"
            defaultExpandAll
            :tree-data="treeData"
            @select="selectCar"
            :selectedKeys="selectedKeys"
            v-if="!spinning"
            :replaceFields="replaceFields"
          >
             
          </a-tree> 
        </div>
        </a-spin>
      </a-col>

      <a-col flex="auto">
          <div class=" layout_card_content layout_card_content_p">
        <div class="table-operator">
            <div class="left_button">
                  <a-button type="primary" @click="issueControl">
                    终端控制
                  </a-button>
            </div>

              <div class="right_btn">
                 <a-button type="primary" class="search_btn" @click="searchData" htmlType="submit">查询</a-button>
                 <a-button class="reload_btn" @click="resetData">重置</a-button>
                  
            </div>

            <div class="layout_card_search layout_card_search_report">
                   <a-form-model layout="inline" :model="formParmas" @submit="searchData" @submit.native.prevent>
                      <a-row :gutter="24">
                         
                          <a-col :md="12">
                              <a-form-model-item label="开始时间">
                                 <a-date-picker show-time placeholder="请选择开始时间" v-model="formParmas.startTime" :disabled-date="disabledStartDate" format="YYYY-MM-DD HH:mm:ss" :allowClear="false"  valueFormat="YYYY-MM-DD HH:mm:ss"/>
                              </a-form-model-item>
                          </a-col>
                          <a-col :md="12">
                              <a-form-model-item label="结束时间">
                                 <a-date-picker show-time  placeholder="请选择结束时间" v-model="formParmas.endTime" :disabled-date="disabledEndDate" format="YYYY-MM-DD HH:mm:ss" :allowClear="false" valueFormat="YYYY-MM-DD HH:mm:ss"/>
                              </a-form-model-item>
                          </a-col>

                         
                          
                      </a-row>
                  </a-form-model>
            </div>
        </div>

        <a-table :columns="columns" bordered :data-source="tableData" @change="changeTable" :rowKey='record' size="middle" :pagination="pagination" :loading="loading" :scroll="{y:height}">
              <span slot="controlType" slot-scope="text,record">
                    <span v-if="text==36609">锁定控制</span>
                    <span v-else-if="text==36610">限速控制</span>
                    <span v-if="text==36611">限举控制</span>
                    <span v-if="text==36612">管控设置</span>
                </span>
              <span slot="controlOrder" slot-scope="text,record">
                <span v-if="record.controlType==36610">限速{{record.spLimit}}(km/h)</span>
                <span v-else-if="record.controlType==36612">
                  <span v-if="record.controlOrder==1">终端管控开启</span>
                  <span v-else>终端管控关闭</span>
                </span>
                <span v-else-if="record.controlType==36609">
                  <span v-if="record.controlOrder==1">车辆锁定</span>
                  <span v-else>解除车辆锁定</span>
                </span>
                <span v-else-if="record.controlType==36611">
                  <span v-if="record.controlOrder==1">车辆限举</span>
                  <span v-else>解除车辆限举</span>
                </span>

              </span>
                
        </a-table>

        </div>
      </a-col>
    </a-row>

    <modalControl ref="issue_control" @triggerData="getData"></modalControl>
  </div>
</template>

<script>
import modalControl from './modalControl.vue'
import {IndexTree,ControlList} from "@/network/api"


export default {
  data() {
    const columns = [
      { title: '序号', fixed: 'left',width: 80, dataIndex: 'name', key: 'name', customRender:(text, row, index)=>{
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
        title: '设备号',
        dataIndex: 'deviceNo',
        key: 'deviceNo',
        align:'center',
        ellipsis:true,
      },
      {
        title: '下发时间',
        dataIndex: 'createTime',
        key: 'createTime',
        align:'center',
         width:150,
        ellipsis:true,
      },
      {
        title: '下发类型',
        dataIndex: 'controlType',
        key: 'controlType',
        align:'center',
        ellipsis:true,
        scopedSlots: { customRender: 'controlType' },
      },
      {
        title: '管控原因',
        dataIndex: 'reason',
        key: 'reason',
        align:'center',
        width:160,
        ellipsis:true,
      },
      {
        title: '指令',
        dataIndex: 'controlOrder',
        key: 'controlOrder',
        align:'center',
        ellipsis:true,
        scopedSlots: { customRender: 'controlOrder' },
      },
      {
        title: '解除事件',
        dataIndex: 'removeEvent',
        key: 'removeEvent',
        align:'center',
        ellipsis:true,
      },
      {
        title: '解除时间',
        dataIndex: 'removeTime',
        key: 'removeTime',
        align:'center',
        ellipsis:true,}
    ];
    return {
      height:'',
      loading:false,
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
      leftWidth:'280px',
      spinning:false,
      form:{
        keyName:'',
        vehicleType:''
      },
      checkedKeys: [],
      treeData:[],
      labelCol: { span: 4 },
      wrapperCol: { span: 24 },
      replaceFields:{
        children:'nexts',
        title:'keyName',
        key:'id'
      },
      tableData:[],
      formParmas: {
        pageNum:1,
        pageSize:20,
        vehicleNo:'',
        searchStartTime:'',
        searchEndTime:'',
        startTime:'',
        endTime:'',
      },
      DevIDNO:'',
      selectedKeys:[],
    }
  },
  components:{
    modalControl
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
      this.getDay();
      this.getVehicleList();
      this.getData();
    },
    getDay(){
       let day = this.$moment().format("YYYY-MM-DD");
      this.formParmas.startTime = day + ' ' + '00:00:00'
      this.formParmas.endTime = day + ' ' + '23:59:59'
    },
    getVehicleList(){
      this.spinning = true;
           IndexTree(this.form).then(res=>{
             this.spinning = false;
             if(res.data.code == 0){
                this.treeData = res.data.data;
             };

           });
    },
    onSearch(){
      this.getVehicleList()
    },

    getData(){
        this.loading = true;
        
        this.formParmas.searchStartTime = this.$moment(this.formParmas.startTime).unix()
        this.formParmas.searchEndTime = this.$moment(this.formParmas.endTime).unix()
     
        ControlList(this.formParmas).then(res=>{
            this.loading = false;
            if(res.data.code == 0){
                this.tableData = res.data.data.records;
                this.pagination.total = res.data.data.total;
                if(this.tableData.length>0){
                  this.tableData.forEach(cur=>{
                     cur.createTime = this.$moment.unix(cur.createTime).format('YYYY-MM-DD hh:mm:ss') 
                  });
                };
            }else{
                this.$message.warning(res.data.message)
            };
            
        }).catch(error=>{
           this.tableData = []
           this.loading = false;
        })
    },
    changeTable(pagination){
      this.pagination.current = pagination.current;
      this.formParmas.pageNum = pagination.current;
      this.formParmas.pageSize = pagination.pageSize;
      this.pagination.pageSize = pagination.pageSize;
      this.getData()
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
      this.getDay();
      this.formParmas.pageNum = 1;
      this.pagination.current = 1;
      this.checkedKeys = [];
      this.selectedKeys = [];
      this.formParmas.vehicleNo = '';
      this.getData()
    },
    disabledStartDate(startValue) {
      
      const endValue = this.$moment(this.formParmas.endTime);
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    disabledEndDate(endValue) {
      const startValue = this.$moment(this.formParmas.startTime);
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },
  

    issueControl(){
     
      this.$refs.issue_control.issueControl(this.DevIDNO)
      
      
    },
    selectCar(selectedKeys){
      console.log(selectedKeys)
      this.selectedKeys = selectedKeys;
      this.loopCar(this.treeData,selectedKeys[0]);
      this.getData();
    },
     loopCar(arr,cur){
        arr.forEach(ele=>{
          if(ele.vehicleId && ele.id == cur){
            this.formParmas.vehicleNo = ele.keyName
          };
          if(ele.nexts){
            this.loopCar(ele.nexts,cur)
          };
        });
    },
   

  }
  
}
</script>