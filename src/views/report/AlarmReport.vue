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
            :tree-data="treeData"
            @check="location"
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
                  <a-button type="primary">
                    导出
                  </a-button>
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
                              <a-form-model-item label="车牌号码">
                                  <a-input v-model="formParmas.vehicleNo" placeholder="" />
                              </a-form-model-item>
                          </a-col>

                          <a-col :md="8">
                              <a-form-model-item label="开始时间">
                                 <a-input v-model="formParmas.simNo" placeholder="" />
                              </a-form-model-item>
                          </a-col>
                          <a-col :md="8">
                              <a-form-model-item label="结束时间">
                                 <a-input v-model="formParmas.simNo" placeholder="" />
                              </a-form-model-item>
                          </a-col>

                          <template v-if="advanced">
                           <a-col :md="8">
                              <a-form-model-item label="报警类型">
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
                          </template>
                          
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
import {IndexTree} from "@/network/api"
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
        title: '报警类型',
        dataIndex: 'deptName',
        key: 'deptName',
        align:'center',
        ellipsis:true,
        width:200
      },
      {
        title: '报警级别',
        dataIndex: 'areaName',
        key: 'areaName',
        align:'center',
        ellipsis:true,
        width:100
      },
      {
        title: '报警时间',
        dataIndex: 'permitStatus',
        key: 'permitStatus',
        align:'center',
        ellipsis:true,
        width:110,
        scopedSlots: { customRender: 'permitStatus' },
      },
      {
        title: '报警位置',
        dataIndex: 'masterName',
        key: 'masterName',
        align:'center',
        ellipsis:true,
        width:150
      },
      {
        title: '持续时间',
        dataIndex: 'slaveName',
        key: 'slaveName',
        align:'center',
        ellipsis:true,
        width:150
      },
      {
        title: '责任人管辖区',
        dataIndex: 'simNo',
        key: 'simNo',
        align:'center',
        ellipsis:true,
        width:100
      },
      {
        title: '案发地管辖区',
        dataIndex: 'createTime',
        key: 'createTime',
        align:'center',
        ellipsis:true,
        width:100,
      },
      {
        title: '申诉状态',
        dataIndex: 'yearlyInspectionTime',
        key: 'yearlyInspectionTime',
        align:'center',
        ellipsis:true,
        width:100
      },
      {
        title: '设备标识',
        align:'center',
        ellipsis:true,
        width:100,
        scopedSlots: { customRender: 'vehicleNewOld' },
      },
      {
        title: '报警来源',
        dataIndex: 'activition',
        key: 'activition',
        align:'center',
        ellipsis:true,
        width:100,
        scopedSlots: { customRender: 'activition' },
      },
      {
        title: '结束GPS时间',
        dataIndex: 'activition1',
        key: 'activition1',
        align:'center',
        ellipsis:true,
        width:100,
        scopedSlots: { customRender: 'activition' },
      },
      {
        title: '开始经度',
        dataIndex: 'activition2',
        key: 'activition2',
        align:'center',
        ellipsis:true,
        width:100,
        scopedSlots: { customRender: 'activition' },
      },
      {
        title: '开始维度',
        dataIndex: 'activition3',
        key: 'activition3',
        align:'center',
        ellipsis:true,
        width:100,
        scopedSlots: { customRender: 'activition' },
      },
      {
        title: '结束经度',
        dataIndex: 'activition4',
        key: 'activition4',
        align:'center',
        ellipsis:true,
        width:100,
        scopedSlots: { customRender: 'activition' },
      },
      {
        title: '结束维度',
        dataIndex: 'activition5',
        key: 'activition5',
        align:'center',
        ellipsis:true,
        width:100,
        scopedSlots: { customRender: 'activition' },
      },
      {
        title: '处理状态',
        dataIndex: 'activition6',
        key: 'activition6',
        align:'center',
        ellipsis:true,
        width:100,
        scopedSlots: { customRender: 'activition' },
      },
      {
        title: '处理意见',
        dataIndex: 'activition7',
        key: 'activition7',
        align:'center',
        ellipsis:true,
        width:100,
        scopedSlots: { customRender: 'activition' },
      },
      {
        title: '报警速度',
        dataIndex: 'activition8',
        key: 'activition8',
        align:'center',
        ellipsis:true,
        width:100,
        scopedSlots: { customRender: 'activition' },
      },
      {
        title: '驾驶员',
        dataIndex: 'activition9',
        key: 'activition9',
        align:'center',
        ellipsis:true,
        width:100,
        scopedSlots: { customRender: 'activition' },
      },
      {
        title: '公司名称',
        dataIndex: 'activition10',
        key: 'activition10',
        align:'center',
        ellipsis:true,
        width:100,
        scopedSlots: { customRender: 'activition' },
      },
      {
        title: '车辆类型',
        dataIndex: 'activition11',
        key: 'activition11',
        align:'center',
        ellipsis:true,
        width:100,
        scopedSlots: { customRender: 'activition' },
      },
      {
        title: '设备套件名称',
        dataIndex: 'activition12',
        key: 'activition12',
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
        simNo :'',
        vehicleNo:'',
        pageNum:1,
        pageSize:20,
        distributor:'',
        permitStatus:'',
        deptId:'',
        realAreaId:'',
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
      this.getVehicleList()
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

  }
  
}
</script>