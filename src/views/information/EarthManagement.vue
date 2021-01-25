<template>
   <div>
    <a-row type="flex">
      <a-col :flex="leftWidth" class="left_content" ref="left_content">
        <a-form-model :model="treeParmas" layout="inline" class="left_search" :label-col="labelCol" :wrapper-col="wrapperCol" @submit="onSearch" @submit.native.prevent>
          <a-form-model-item>
            <a-input-search
              v-model="treeParmas.keyName"
              placeholder="请输入土场名称"
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
                <a-button type="primary" icon="plus" @click="addSite(0)" v-if="isAdd">
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
                              <a-form-model-item label="有无围栏">
                                 <a-select v-model="formParmas.ef" allowClear>

                                    <a-select-option value="1">
                                        有
                                    </a-select-option>

                                    <a-select-option value="2">
                                        无
                                    </a-select-option>

                                  </a-select>
                              </a-form-model-item>
                          </a-col>

                           <a-col :md="8">
                              <a-form-model-item label="土场名称">
                                 <a-input v-model="formParmas.fieldName" placeholder="" allowClear/>
                              </a-form-model-item>
                          </a-col>

                         

                          <template v-if="advanced">

                             <a-col :md="8">
                              <a-form-model-item label="施工状态">
                                 <a-select v-model="formParmas.fieldStatus" allowClear>
                                    <a-select-option value="1">
                                        未施工
                                    </a-select-option>

                                    <a-select-option value="2">
                                        施工中
                                    </a-select-option>

                                    <a-select-option value="3">
                                        已过期
                                    </a-select-option>
                                  </a-select>
                              </a-form-model-item>
                          </a-col>

                            <a-col :md="8">
                              <a-form-model-item label="注销状态">
                                <a-select v-model="formParmas.activition" allowClear>
                                    <a-select-option value="0">
                                        有效
                                    </a-select-option>

                                    <a-select-option value="1">
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
          

          <a-table :columns="columns" bordered :data-source="tableData" @change="changeTable" :rowKey='record' size="middle" :pagination="pagination" :loading="loading" :scroll="{x:1200,y:height}">
                  <a slot="fieldName" slot-scope="text,record" >
                    {{text}}
                  </a>

                  <a slot="mapView" slot-scope="text,record" @click="drawDence(record)">
                    查看地图
                  </a>

                  
                 

                  <span slot="ef" slot-scope="text,record">
                    <span v-if="record.electronicFence">有</span>
                    <span v-else>无</span>
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

                   <span slot="construction" slot-scope="text,record">
                    <a-badge v-if="compareTime(record.fieldStartTime,record.fieldExpireTime) == 1" status="default" text="未施工" />
                    <a-badge v-else-if="compareTime(record.fieldStartTime,record.fieldExpireTime) == 2" status="success" text="施工中"></a-badge>
                    <a-badge v-else status="error" text="已过期"></a-badge>
                  </span>
                  <span slot="action" slot-scope="text,record">
                    <template v-if="isEdit">
                       <a @click="addSite(1,record)">编辑</a>
                        <a-divider type="vertical" />
                    
                        <span class="yellow" @click="cancellation(record)" v-if="record.activition == 0">注销</span>
                        <a @click="cancellation(record)" v-else>恢复</a>
                        
              
              
                        <template v-if="record.permitStatus == 0 && record.activition == 0" >
                          <a-divider type="vertical" />
                          <a @click="viewDetails(record,2)">审核</a>
                        </template>
                    </template>
                     
                        
                
                   
                      
                  </span>
          </a-table>

          
        </div>
      </a-col>
    </a-row>

    <modalEarth ref="add_site" @triggerData="updateData"></modalEarth>
    <modalSiteDetails ref="view_details" @triggerData="getData"></modalSiteDetails>
    <drawFenceMap ref="draw_fence"></drawFenceMap>


    
   </div>
   
</template>

<script>

import modalEarth from './modalEarth.vue'
import modalSiteDetails from './modalSiteDetails.vue'
import {SiteleftList,SiteList,BaseList,SiteEdit,Devicelist} from '@/network/api'
import drawFenceMap from './drawFenceMap.vue'




export default {
  data() {
      const columns = [
      { title: '序号', fixed: 'left',width: 80, dataIndex: 'name', key: 'name', customRender:(text, row, index)=>{
        return <span>{index}</span>;
      },align:'center'},
      {
        title: '土场名称',
        dataIndex: 'fieldName',
        key: 'fieldName',
        align:'center',
        ellipsis:true,
        width:200,
        scopedSlots: { customRender: 'fieldName' },
      },
      {
        title: '管辖区',
        dataIndex: 'areaName',
        key: 'areaName',
        align:'center',
        ellipsis:true,
        width:150
      },
      {
        title: '土场地址',
        dataIndex: 'fieldAddress',
        key: 'fieldAddress',
        align:'center',
        ellipsis:true,
        width:240
      },
      {
        title: '地图显示',
        align:'center',
        ellipsis:true,
        width:100,
        scopedSlots: { customRender: 'mapView' },
      },
      // {
      //   title: '设备状态（在线/总数）',
      //   dataIndex: 'slaveName',
      //   key: 'slaveName',
      //   align:'center',
      //   ellipsis:true,
      //   width:150
      // },
      // {
      //   title: '今日作业车次',
      //   dataIndex: 'simNo',
      //   key: 'simNo',
      //   align:'center',
      //   ellipsis:true,
      //   width:100
      // },
      {
        title: '有无围栏',
        dataIndex: 'ef',
        key: 'ef',
        align:'center',
        ellipsis:true,
        width:100,
        scopedSlots: { customRender: 'ef' },
      },
      {
        title: '审核状态',
        align:'center',
        ellipsis:true,
        width:100,
        scopedSlots: { customRender: 'permitStatus' },
      },
     
      {
        title: '施工状态',
        dataIndex: 'activition',
        key: 'activition',
        align:'center',
        ellipsis:true,
        width:100,
        scopedSlots: { customRender: 'construction' },
      },
       {
        title: '有效状态',
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
        fieldName :'',
        ef:'',
        pageNum:1,
        pageSize:20,
        fieldStatus:'',
        permitStatus:'',
        activition:'',
        id:'',
        areaId:'',
        fieldType:771
      },
      treeParmas: {
        keyName: '',
        fieldType:771
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
      isAdd:false,
      isEdit:false
    }
  },
  components:{
    modalEarth,
    modalSiteDetails,
    drawFenceMap
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
    drawDence(record){
      console.log(record)
         this.$refs.draw_fence.drawDence(record,1,record.fieldType)
    },
    init(){
      this.permissionControl();
      this.getTree();
      this.getData();
      this.getType();
    },
    permissionControl(){
     
      let permission =  JSON.parse(this.$getStorage('permission'));
      
      permission.forEach(cur=>{
        if(cur.menuPermission == 'sys:field:add'){
          this.isAdd = true;
        }else if(cur.menuPermission == 'sys:field:edit'){
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
        SiteList(this.formParmas).then(res=>{
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
      this.selectedKeys = []
      this.getData()
    },
    addSite(val,record){
      this.$refs.add_site.addSite(val,record)
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
      this.formParmas.pageNum = 1;
      this.pagination.current = 1;
      this.formParmas.id = selectedKeys[0];
      this.formParmas.areaId = '';
      this.selectedKeys = selectedKeys;
      this.treeData.forEach(cur=>{
        if(cur.areaId == selectedKeys[0]){
          this.formParmas.areaId = cur.areaId;
          this.formParmas.id = '';
        }
      });
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
    
    

    
    updateData(){
      this.getData();
      this.getTree();
    },
  }
}
</script>