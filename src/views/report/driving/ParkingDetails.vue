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
            checkable
            defaultExpandAll
            :tree-data="treeData"
            @check="location"
            :selectable="false"
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
                  <a-button type="primary" @click="exportReport">
                    导出
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
                                 <a-date-picker show-time placeholder="请选择开始时间" v-model="formParmas.begintime" :disabled-date="disabledStartDate" format="YYYY-MM-DD HH:mm:ss" :allowClear="false"  valueFormat="YYYY-MM-DD HH:mm:ss"/>
                              </a-form-model-item>
                          </a-col>
                          <a-col :md="12">
                              <a-form-model-item label="结束时间">
                                 <a-date-picker show-time  placeholder="请选择结束时间" v-model="formParmas.endtime" :disabled-date="disabledEndDate" format="YYYY-MM-DD HH:mm:ss" :allowClear="false" valueFormat="YYYY-MM-DD HH:mm:ss"/>
                              </a-form-model-item>
                          </a-col>

                         
                          
                      </a-row>
                  </a-form-model>
            </div>
        </div>

        <a-table :columns="columns" bordered :data-source="tableData" @change="changeTable" :rowKey='record' size="middle" :pagination="pagination" :loading="loading" :scroll="{x:1200,y:height}">
              
        </a-table>

        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import {IndexTree,ParkingDetail,ExportParkingDetail} from "@/network/api"


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
      },
      {
        title: '所属企业',
        dataIndex: 'deptName',
        key: 'deptName',
        align:'center',
        ellipsis:true,
        width:200,
      },
      {
        title: '车辆颜色',
        dataIndex: 'vehicleLicenseColor',
        key: 'vehicleLicenseColor',
        align:'center',
        ellipsis:true,
      },
      {
        title: '开始时间',
        dataIndex: 'startTime',
        key: 'startTime',
        align:'center',
        ellipsis:true,
        width:160,
      },
      {
        title: '结束时间',
        dataIndex: 'endTime',
        key: 'endTime',
        align:'center',
        ellipsis:true,
        width:160,
      },
       {
        title: '时长',
        dataIndex: 'parkingTime',
        key: 'parkingTime',
        align:'center',
        ellipsis:true,
      },
      ,
      {
        title: '停止位置',
        dataIndex: 'startPos',
        key: 'startPos',
        align:'center',
        ellipsis:true,
        width:240,
      },
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
        begintime:'',
        endtime:'',
        currentPage:1,
        pageRecords:20,
        parkTime:0,
        geoaddress:1,
        toMap:2,
        handle:3,
        armType:'',
        vehicleNo:[]
      },
    }
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
      this.formParmas.begintime = day + ' ' + '00:00:00'
      this.formParmas.endtime = day + ' ' + '23:59:59'
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
    location(checkedKeys){
      this.formParmas.currentPage = 1;
      this.pagination.current = 1;
      this.formParmas.vehicleNo = [];
      checkedKeys.forEach(cur=>{
        this.loopCar(this.treeData,cur)
      });

      this.getData();
    },
    loopCar(arr,cur){
      
        arr.forEach(ele=>{
          if(ele.vehicleId && ele.id == cur){
            this.formParmas.vehicleNo.push(ele.keyName)
          };
          if(ele.nexts){
            this.loopCar(ele.nexts,cur)
          };
        });
    },
    getData(){
        this.loading = true;
        ParkingDetail(this.formParmas).then(res=>{
            this.loading = false;
            if(res.data.code == 0){
                this.tableData = res.data.data;
                
                this.pagination.total = res.data.total;
                 if(this.tableData.length>0){
                  this.tableData.forEach((cur,index)=>{
                    this.$set(cur,'keyIdex',index+'a')
                  })
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
      this.formParmas.currentPage = pagination.current;
      this.formParmas.pageRecords = pagination.pageSize;
      this.pagination.pageSize = pagination.pageSize;
      this.getData()
    },
    record(key){
          return key.keyIdex
    },
    searchData(){
      this.formParmas.currentPage = 1;
      this.pagination.current = 1;
      this.getData()
    },
    resetData(){
      this.getDay();
      this.formParmas.currentPage = 1;
      this.pagination.current = 1;
      this.checkedKeys = [];
      this.formParmas.vehicleNo = [];
      this.getData()
    },
    disabledStartDate(startValue) {
      
      const endValue = this.$moment(this.formParmas.endtime);
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    disabledEndDate(endValue) {
      const startValue = this.$moment(this.formParmas.begintime);
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },
    exportReport(){

      let params = {
        begintime:this.formParmas.begintime,
        endtime:this.formParmas.endtime,
        geoaddress:1,
        toMap:2,
        handle:3,
        armType:'',
        parkTime:0,
        vehicleNo:this.formParmas.vehicleNo,
        currentPage:1,
        pageRecords:999999,
      };
      ExportParkingDetail(params).then(res=>{
          if(window.navigator.msSaveBlob){
            const blobObject = new Blob([res.data]);
            window.navigator.msSaveBlob(blobObject, '停车明细报表.xls');
          }else{
            let blob = new Blob([res.data]); // 假设文件为pdf
            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = '停车明细报表.xls';
            link.click();
            link.remove();
          }
         
      });
    },

  }
  
}
</script>