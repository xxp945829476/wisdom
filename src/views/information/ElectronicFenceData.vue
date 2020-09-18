<template>
   <div>
    <a-row type="flex">
      <a-col :flex="leftWidth" class="left_content" ref="left_content">
        <a-form-model :model="form" layout="inline" class="left_search" :label-col="labelCol" :wrapper-col="wrapperCol" @submit="onSearch" @submit.native.prevent>
          <a-form-model-item>
            <a-input-search
              v-model="form.areaName"
              placeholder="请输入"
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
            :tree-data="treeData"
            :replaceFields="replaceFields"
            @select="sleectArea"
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
                <a-button type="primary" icon="plus" @click="addEletronic(0)">
                    新增
                  </a-button>
            </div>

              <div class="right_btn">
                    <a-button type="primary" class="search_btn" @click="searchData">查询</a-button>
                    <a-button class="reload_btn" @click="resetData">重置</a-button>
              </div>

            <div class="layout_card_search">
                  <a-form-model layout="inline" :model="formParmas" @submit="searchData" @submit.native.prevent>
                      <a-row :gutter="24">
                          <a-col :md="12">
                              <a-form-model-item label="管辖区名称">
                              <a-input v-model="formParmas.regionName" placeholder="" />
                              </a-form-model-item>
                          </a-col>
                          <a-col :md="12">
                              <a-form-model-item label="管辖区类型">
                                  <a-select v-model="formParmas.fieldType">
                                        <a-select-option v-for="item in fieldTypeData" :key="item.id">
                                            {{item.name}}
                                        </a-select-option>
                                  </a-select>
                              </a-form-model-item>
                          </a-col>
                      </a-row>
                  </a-form-model>
            </div>
        </div>
          


          <a-table :columns="columns" bordered :data-source="tableData" @change="changeTable" size="middle" :rowKey='record' :pagination="pagination" :scroll="{x:1200,y:height}" :loading="loading">
                  <a slot="address" slot-scope="text,record" @click="drawDence(record)">经纬度点击地图查看</a>
                  <span slot="action" slot-scope="text,record">
                      <a @click="addEletronic(1,record)">编辑</a>
                      <a-divider type="vertical" />
                      <span class="yellow" @click="cancellation(record)" v-if="record.disabled == 0">注销</span>
                      <a @click="cancellation(record)" v-else>启用</a>
                  </span>
          </a-table>

          
        </div>
      </a-col>
    </a-row>

    <modalElectronic ref="add_eletronic" :originalData="originalData" @triggerData="getData"></modalElectronic>
    <drawFence ref="draw_fence"></drawFence>
   </div>
   
</template>

<script>
import {AreaList,Fencelist,BaseList,EditElectronic} from '@/network/api'
import modalElectronic from './modalElectronic.vue'
import {buildAreaTree} from '@/utils/utils.js'
import drawFence from './drawFence.vue'







export default {
  data() {
      const columns = [
      { title: '序号', fixed: 'left',width: 80, customRender:(text, row, index)=>{
        return <span>{index}</span>;
      },align:'center'},
      {
        title: '管辖区名称',
        dataIndex: 'regionName',
        key: 'regionName',
        align:'center',
        ellipsis:true,
        width:120
      },
      {
        title: '管辖区类型',
        dataIndex: 'fieldTypeName',
        key: 'fieldTypeName',
        align:'center',
        ellipsis:true,
        width:200
      },
      {
        title: '管辖区范围',
        dataIndex: 'address',
        key: 'address',
        align:'center',
        scopedSlots: { customRender: 'address' },
        ellipsis:true,
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        align:'center',
        ellipsis:true,
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
      loading:false,
      spinning:false,
      leftWidth:'280px',
      treeData:[],
      checkedKeys: [],
      businessVisible:false,
      dialog:true,
      labelCol: { span: 4 },
      wrapperCol: { span: 24 },
      roleVisible:false,
      height:'',
      form: {
        areaName: '',
      },
      formParmas:{
        fieldType:'',
        region:'',
        pageNum:1,
        pageSize:20,
        regionName:null,
      },
      replaceFields:{
        children:'children',
        title:'areaName',
        key:'areaId'
      },
      advanced:false,
      tableData:[],
      columns,
      originalData:[],
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
      fieldTypeData:[]
    }
  },
  components:{
    modalElectronic,
    drawFence
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
      this.getData();
      this.getAreaList();//获取地区
      this.getElectronicType();//获取管辖区类型
    },
    getData(){
        this.loading = true;
        Fencelist(this.formParmas).then(res=>{
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
    getElectronicType(){
        let params = {
              pid: "10"
            };
        BaseList(params).then(res=>{
          if(res.data.code == 0){
            this.fieldTypeData = res.data.data
          };
        });
    },
    getAreaList(val){
        //val 1 搜索
        this.spinning = true;
        AreaList(this.form).then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            this.originalData = JSON.parse(JSON.stringify(res.data.data));
            let data = JSON.parse(JSON.stringify(res.data.data));
            if(val){
              this.treeData = data;
            }else{
              this.treeData = buildAreaTree(data)
            };
          };
        });
    },
    onSearch(){
      if(this.form.areaName){
        this.getAreaList(1)
      }else{
        this.getAreaList()
      };
    },
    addEletronic(val,record){
      this.$refs.add_eletronic.addEletronic(val,record)
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
      this.formParmas.fieldType = '';
      this.formParmas.regionName = '';
      this.getData()
    },
    changeTable(pagination){
      this.pagination.current = pagination.current
      this.getData()
    },
    sleectArea(selectedKeys){
      this.formParmas.pageNum = 1;
      this.pagination.current = 1;
      this.formParmas.region = selectedKeys[0];
      this.getData()
    },
    drawDence(record){
      console.log(record)
         this.$refs.draw_fence.drawDence(record,1,record.fieldType)
    },
    cancellation(obj){
      //注销

       let params = {
        id:obj.id,
        disabled:obj.disabled == 0 ? 1 : 0
       };

        EditElectronic(params).then(res=>{

            if(res.data.code == 0){
              this.getData();
              this.$message.success('注销成功');
            }else{
              this.$message.warning('注销失败')
            };
        })
    }
  }
}
</script>