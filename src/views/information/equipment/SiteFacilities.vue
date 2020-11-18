<template>
   <div>
    <a-row type="flex">
      <a-col :flex="leftWidth" class="left_content" ref="left_content">
        <a-form-model :model="treeParmas" layout="inline" class="left_search" :label-col="labelCol" :wrapper-col="wrapperCol" @submit="onSearch" @submit.native.prevent>
          <a-form-model-item>
            <a-input-search
              v-model="treeParmas.keyName"
              placeholder="请输入工地名称"
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
                <a-button type="primary" icon="plus" @click="addFacilities(0,siteParams)" v-if="isAdd">
                    新增
                  </a-button>
                  <!-- <a-button>
                    导出
                  </a-button> -->
            </div>

              <div class="right_btn">
                 <a-button type="primary" class="search_btn" @click="searchData" htmlType="submit">查询</a-button>
                  <a-button class="reload_btn" @click="resetData">重置</a-button>
            </div>

            <div class="layout_card_search">
                   <a-form-model layout="inline" :model="formParmas" @submit="searchData" @submit.native.prevent>
                      <a-row :gutter="24">
                           <a-col :md="12">
                              <a-form-model-item label="设施名称">
                                 <a-input v-model="formParmas.fieldName" placeholder="" allowClear/>
                              </a-form-model-item>
                          </a-col>

                          <a-col :md="12">
                              <a-form-model-item label="设备名称">
                                 <a-input v-model="formParmas.fieldName" placeholder="" allowClear/>
                              </a-form-model-item>
                          </a-col>
                          
                      </a-row>
                  </a-form-model>
            </div>
        </div>
          

          <a-table :columns="columns" bordered :data-source="tableData" @change="changeTable" :rowKey='record' size="middle" :pagination="pagination" :loading="loading" :scroll="{x:1500,y:height}">
                  <a slot="facilityName" slot-scope="text,record" @click="viewDetails(record,1)">
                    {{text}}
                  </a>
                  <span slot="monitor" slot-scope="text,record">
                    <a @click="monitorMap(record)">监控</a>
                  </span>
                  <span slot="action" slot-scope="text,record">
                      <a @click="addFacilities(1,record)" v-if="isEdit">编辑</a>
                  </span>
          </a-table>

          
        </div>
      </a-col>
    </a-row>

 
    <modalSiteFacilities ref="add_facilities" @triggerData = "getData"></modalSiteFacilities>

     <modalSiteFacilitiesDetails ref="view_details"></modalSiteFacilitiesDetails>

    
   </div>
   
</template>

<script>

import modalSiteFacilities from './modalSiteFacilities.vue'
import modalSiteFacilitiesDetails from './modalSiteFacilitiesDetails.vue'
import {SiteleftList,FacilityList,BaseList,SiteEdit,Devicelist} from '@/network/api'




export default {
  data() {
      const columns = [
      { title: '序号', fixed: 'left',width: 80, dataIndex: 'name', key: 'name', customRender:(text, row, index)=>{
        return <span>{index}</span>;
      },align:'center'},
      {
        title: '所在工地',
        dataIndex: 'fieldName',
        key: 'fieldName',
        align:'center',
        ellipsis:true,
        width:200,
      },
      {
        title: '设施名称',
        dataIndex: 'facilityName',
        key: 'facilityName',
        align:'center',
        ellipsis:true,
        width:150,
        scopedSlots: { customRender: 'facilityName' },
      },
      {
        title: '绑定设备名称',
        dataIndex: 'deviceName',
        key: 'deviceName',
        align:'center',
        ellipsis:true,
        width:200
      },
      {
        title: '监控',
        dataIndex: 'monitor',
        key: 'monitor',
        align:'center',
        ellipsis:true,
        width:110,
        scopedSlots: { customRender: 'monitor' },
      },
      {
        title: '负责人',
        dataIndex: 'facilityFzr',
        key: 'facilityFzr',
        align:'center',
        ellipsis:true,
      },
      {
        title: '联系电话',
        dataIndex: 'facilityFzrTel',
        key: 'facilityFzrTel',
        align:'center',
        ellipsis:true,
        width:150
      },
      {
        title: '品牌',
        dataIndex: 'facilityBrand',
        key: 'facilityBrand',
        align:'center',
        ellipsis:true,
      },
      {
        title: '所在位置',
        dataIndex: 'facilityPositionName',
        key: 'facilityPositionName',
        align:'center',
        ellipsis:true,
        width:200
      },
      
      
      {
        title: '操作',
        key: 'action',
        width:'150px',
        align:'center',
        fixed: 'right',
        scopedSlots: { customRender: 'action' },
      },
    ];

    return {
      selectedKeys:[],
      loading:false,
      leftWidth:'280px',
      spinning:false,
      spinSelect:false,
      treeData:[],
      checkedKeys: [],
      dialog:true,
      labelCol: { span: 4 },
      wrapperCol: { span: 24 },
      roleVisible:false,
      height:'',
      formParmas: {
        pageNum:1,
        pageSize:20,
        id:'',
        areaId:'',
        facilityName:'',
        deviceName:'',
        fieldId:'',
      },
      treeParmas: {
        keyName: '',
        permitStatus:1,
      },
      replaceFields:{
        children:'childs',
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
      siteParams:{
        siteName:'',
        siteId:'',
        lat:'',
        lng:'',
      },
      isAdd:false,
      isEdit:false
    }
  },
  components:{
    modalSiteFacilities,
    modalSiteFacilitiesDetails
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
      this.getType();
    },
    permissionControl(){
     
      let permission =  JSON.parse(this.$getStorage('permission'));
      
      console.log(permission)
      permission.forEach(cur=>{
        if(cur.menuPermission == 'sys:facility:add'){
          this.isAdd = true;
        }else if(cur.menuPermission == 'sys:facility:edit'){
          this.isEdit = true;
        }
      })
    },
    compareTime(start,end){
      let time = parseInt(new Date().getTime() / 1000);
      let val;
      if(time<start){
        val = 1
      }else if(time>=start&&time<=end){
        val = 2
      }else if(time>end){
        val = 3
      };
      return val
    },
    getData(){
         this.loading = true;
        FacilityList(this.formParmas).then(res=>{
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
        SiteleftList(this.treeParmas).then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            this.treeData = res.data.data;
          };
        });
    },
    getType(){
      let params = {
              pid: 48
            };
        BaseList(params).then(res=>{
          if(res.data.code == 0){
              this.distributorList = res.data.data
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
      this.formParmas.fieldName = '';
      this.formParmas.ef = '';
      this.formParmas.fieldStatus = '';
      this.formParmas.permitStatus = '';
      this.formParmas.activition = '';
      this.formParmas.id = '';
      this.selectedKeys = [];
      
      this.getData()
    },
    addFacilities(val,record){
      if(val == 0){
        if(this.siteParams.siteId){
          this.$refs.add_facilities.addFacilities(val,record)
        }else{
          this.$message.warning('请选择工地')
        }
      }else{
        this.$refs.add_facilities.addFacilities(val,record)
      }
      
    },
    viewDetails(record,val){
      this.$refs.view_details.viewDetails(record,val)
    },
    changeTable(pagination){
      this.pagination.current = pagination.current;
      this.formParmas.pageNum = pagination.current;
      this.formParmas.pageSize = pagination.pageSize;
      this.pagination.pageSize = pagination.pageSize;
      this.getData()
    },
    selectArea(selectedKeys,e){
      this.siteParams.siteId = '';
      this.siteParams.siteName = '';
      this.siteParams.lat = '';
      this.siteParams.lng = '';
      this.formParmas.pageNum = 1;
      this.pagination.current = 1;
      this.formParmas.fieldId = selectedKeys[0];
      this.formParmas.areaId = '';
      this.selectedKeys = selectedKeys;
      this.loopTree(this.treeData, selectedKeys[0]);
      this.getData();
    },
    loopTree(arr,val){
       arr.forEach(cur=>{
        if(cur.areaId == val){
          this.formParmas.areaId = cur.areaId;
          this.formParmas.fieldId = '';
        };
        if(!cur.areaId && cur.id == val){
          this.siteParams.siteId = cur.id;
          this.siteParams.siteName = cur.keyName;
          this.siteParams.lat = cur.lat;
          this.siteParams.lng = cur.lng;
        }
        if(cur.childs){
          this.loopTree(cur.childs,val)
        }
      });
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
    
    
    monitorMap(record){
      console.log(record.id)
      window.open('/MonitoringDisplay?id='+record.id);
      // this.$setStorage('positionData',JSON.stringify(record.electronicFence));
    },
    
    updateData(){
      this.getData();
      this.getTree();
    }
  }
}
</script>