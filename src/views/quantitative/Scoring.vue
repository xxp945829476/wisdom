<template>
   <div class="layout_card_content">

       <div class="table-operator">
           <div class="left_button">
               <a-button type="primary" icon="plus" v-if="isAdd" @click="addQuan">
                  新增考核
                </a-button>
           </div>

            <div class="right_btn">
                 <a-button type="primary" class="search_btn" @click="searchData">查询</a-button>
                  <a-button class="reload_btn" @click="resetData">重置</a-button>
                  <a @click="toggleSearch" v-if="formParmas.cycle == '1012'">
                      <a-icon :type="advanced ? 'up' : 'down'"/>
                  </a>
            </div>

           <div class="layout_card_search">
                <a-form-model layout="inline" :model="formParmas" @submit="searchData" @submit.native.prevent>
                    <a-row :gutter="24">
                        <a-col :md="8">
                            <a-form-model-item label="考核类型">
                              <a-select v-model="formParmas.assessObj">
                                    <a-select-option v-for="item in objList" :key="item.id">
                                        {{item.name}}
                                    </a-select-option>
                                </a-select>
                            </a-form-model-item>
                        </a-col>
                        <a-col :md="8">
                            <a-form-model-item label="考核周期">
                                 <a-select v-model="formParmas.cycle">
                                    <a-select-option v-for="item in cycleList" :key="item.id">
                                        {{item.name}}
                                    </a-select-option>
                                  </a-select>
                            </a-form-model-item>
                        </a-col>
                        <a-col :md="8">
                            <a-form-model-item label="考核年份" v-if="formParmas.cycle == '1011'">
                                  <a-input v-model="formParmas.year" @change="getYear"/>
                            </a-form-model-item>

                            <a-form-model-item label="考核年份" v-if="formParmas.cycle == '1012'">
                                  <a-input v-model="formParmas.year" @change="getYear"/>
                            </a-form-model-item>

                            <a-form-model-item label="考核月份" v-else-if="formParmas.cycle == '1013'">
                                   <a-month-picker @change="changeMouth" v-model="formParmas.mouthDate" format="YYYY-MM"  valueFormat="YYYY-MM" />
                            </a-form-model-item>
                        </a-col>

                        <template v-if="advanced&&formParmas.cycle == '1012'">
                            <a-col :md="8">
                                <a-form-model-item label="考核季度">
                                <a-select v-model="formParmas.quarter" @change="changeQuarter">
                                    <a-select-option v-for="item in quarterList" :key="item.id">
                                        {{item.name}}
                                    </a-select-option>
                                  </a-select>
                                </a-form-model-item>
                            </a-col>
                        </template>
                    </a-row>
                </a-form-model>
           </div>
       </div>
        

        <a-table :columns="columns" bordered :data-source="tableData" @change="changeTable" :rowKey='record' size="middle" :pagination="pagination" :loading="loading" :scroll="{y:height}">
               
        </a-table>

       <modalScoring ref="add_quan" @triggerData="getData"></modalScoring>

   </div>
</template>

<script>

import modalScoring from './modalScoring.vue'

import {AssessPointList,BaseList,EditDepartment,ExportDepartment} from '@/network/api'



export default {
  data() {
      const columns = [
      { title: '序号', fixed: 'left',width: 80,customRender:(text, row, index)=>{
        return <span>{index+1}</span>;
      },align:'center'},
      {
        title: '考核类型',
        dataIndex: 'assessObjTypeName',
        key: 'assessObjTypeName',
        align:'center',
        ellipsis:true,
      },
      {
        title: '考核对象',
        dataIndex: 'assessObjName',
        key: 'assessObjName',
        align:'center',
        ellipsis:true,
      },
      {
        title: '加减分数',
        dataIndex: 'points',
        key: 'points',
        align:'center',
        ellipsis:true,
  
      },
      {
        title: '计分时间',
        dataIndex: 'createTime',
        key: 'createTime',
        align:'center',
        ellipsis:true,
  
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
        assessObj : '',
        pageNum:1,
        pageSize:20,
        cycle:'',
        year:'',
        mouthDate:'',
        searchStartTime :'',
        searchEndTime :'',
        quarter:'',
      },
      advanced:false,
      tableData:[],
      cycleList:[],
      objList:[],
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
      modalScoring
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
      this.getType(1000);
      
      this.getType(1010);
      this.formParmas.year = this.$moment().format("YYYY");
      this.getYear();
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
    getYear(){
      let start = this.formParmas.year + '-' + '01'+ '-' + '01';
      let end = this.formParmas.year + '-' + '12'+ '-' + '31'
      this.formParmas.searchStartTime = this.$moment(start).unix();
      this.formParmas.searchEndTime = this.$moment(end).unix();
    },
    changeQuarter(){
      let start = ''
      let end = ''
      if(this.formParmas.quarter == 1){
        start = this.formParmas.year + '-' + '01'+ '-' + '01';
        end = this.$moment(this.formParmas.year + '-' + '03').endOf('month').format("YYYY-MM-DD");
      }else if(this.formParmas.quarter == 2){
        start = this.formParmas.year + '-' + '04'+ '-' + '01';
        end = this.$moment(this.formParmas.year + '-' + '06').endOf('month').format("YYYY-MM-DD");
      }else if(this.formParmas.quarter == 3){
        start = this.formParmas.year + '-' + '07'+ '-' + '01';
        end = this.$moment(this.formParmas.year + '-' + '09').endOf('month').format("YYYY-MM-DD");
      }else if(this.formParmas.quarter == 4 ){
        start = this.formParmas.year + '-' + '10'+ '-' + '01';
        end = this.$moment(this.formParmas.year + '-' + '12').endOf('month').format("YYYY-MM-DD");
      }
      this.formParmas.searchStartTime = this.$moment(start).unix();
      this.formParmas.searchEndTime = this.$moment(end).unix();
    },
   
    changeMouth(){
      let start = this.formParmas.mouthDate + '-' + '01';
      let end = this.$moment(this.formParmas.mouthDate).endOf('month').format("YYYY-MM-DD");
     
      this.formParmas.searchStartTime = this.$moment(start).unix();
      this.formParmas.searchEndTime = this.$moment(end).unix();
    },
    getData(){
         this.loading = true;
        AssessPointList(this.formParmas).then(res=>{
             this.loading = false;
            if(res.data.code == 0){
                let data = res.data.data.records;
                this.tableData = data;
                this.tableData.forEach(cur=>{
                    cur.createTime = this.$moment.unix(cur.createTime).format('YYYY-MM-DD hh:mm:ss') 
                });
                this.pagination.total = res.data.data.total;
            }else{
                this.$message.warning('加载失败')
            };
            
        });
    },
    getType(val){
        let params = {
              pid: val
            };
        BaseList(params).then(res=>{
          if(res.data.code == 0){
            if(val==1000){
              this.objList = res.data.data
            }else if(val==1010){
              this.cycleList = res.data.data
              this.formParmas.cycle = '1011'
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
      this.formParmas.assessObj = '';
      this.formParmas.searchStartTime = '';
      this.formParmas.searchEndTime = '';
      this.formParmas.mouthDate = '';
      this.formParmas.quarter = '';
      this.formParmas.year = this.$moment().format("YYYY");
      this.getData()
    },
    record(key){
          return key.id
    },
    addQuan(){
      this.$refs.add_quan.addQuan()
    },
   
    viewDetails(record){
      this.$refs.add_business_details.viewDetails(record)
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