<template>
   <div class="layout_card_content">

       <div class="table-operator">
           <div class="left_button">
               <a-button type="primary" @click="exportDep">
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
                        <a-col :md="8">
                            <a-form-model-item label="评价等级">
                              <a-select v-model="formParmas.assessLevel">
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

                        <template v-if="advanced">
                            <a-col :md="8" v-if="formParmas.cycle == '1012'">
                                <a-form-model-item label="考核季度">
                                <a-select v-model="formParmas.quarter" @change="changeQuarter">
                                    <a-select-option v-for="item in quarterList" :key="item.id">
                                        {{item.name}}
                                    </a-select-option>
                                  </a-select>
                                </a-form-model-item>
                            </a-col>
                            <a-col :md="8">
                            <a-form-model-item label="企业名称">
                                  <a-input v-model="formParmas.deptName"/>
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

import {DeptAssess,BaseList,ExportDeptAssess} from '@/network/api'



export default {
  data() {
      const columns = [
      { title: '序号', fixed: 'left',width: 80,customRender:(text, row, index)=>{
        return <span>{index+1}</span>;
      },align:'center'},
      {
        title: '企业名称',
        dataIndex: 'deptName',
        key: 'deptName',
        align:'center',
        ellipsis:true,
      },
      {
        title: '管辖区',
        dataIndex: 'areaName',
        key: 'areaName',
        align:'center',
        ellipsis:true,
      },
      {
        title: '得分',
        dataIndex: 'points',
        key: 'points',
        align:'center',
        ellipsis:true,
  
      },
      {
        title: '评价等级',
        dataIndex: 'assessLevelName',
        key: 'assessLevelName',
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
        assessLevel:'',
        pageNum:1,
        pageSize:20,
        cycle:'',
        year:'',
        mouthDate:'',
        begintime :'',
        endtime :'',
        quarter:'',
        deptName:''
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
      this.getType(1015);
      
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
      this.formParmas.begintime = this.$moment(start).unix();
      this.formParmas.endtime = this.$moment(end).unix();
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
      }else if(this.formParmas.quarter == 4){
        start = this.formParmas.year + '-' + '10'+ '-' + '01';
        end = this.$moment(this.formParmas.year + '-' + '12').endOf('month').format("YYYY-MM-DD");
      }
      this.formParmas.begintime = this.$moment(start).unix();
      this.formParmas.endtime = this.$moment(end).unix();
    },
   
    changeMouth(){
      let start = this.formParmas.mouthDate + '-' + '01';
      let end = this.$moment(this.formParmas.mouthDate).endOf('month').format("YYYY-MM-DD");
     
      this.formParmas.begintime = this.$moment(start).unix();
      this.formParmas.endtime = this.$moment(end).unix();
    },
    getData(){
         this.loading = true;
        DeptAssess(this.formParmas).then(res=>{
             this.loading = false;
            if(res.data.code == 0){
                let data = res.data.data;
                this.tableData = data;
                this.tableData.forEach((cur,index)=>{
                  this.$set(cur,'index',index+'a')
                })
                this.pagination.total = res.data.total;
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
            if(val==1015){
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
      this.getData();
    },
    resetData(){
      this.formParmas.pageNum = 1;
      this.pagination.current = 1;
      this.formParmas.assessLevel = '';
      this.formParmas.begintime = '';
      this.formParmas.endtime = '';
      this.formParmas.mouthDate = '';
      this.formParmas.quarter = '';
      this.formParmas.deptName = '';
      this.formParmas.year = this.$moment().format("YYYY");
      this.getYear();
      this.getData()
    },
    record(key){
          return key.index
    },
 

    exportDep(){

      let params = {
        endtime:this.formParmas.endtime,
        begintime:this.formParmas.begintime,
        deptName:this.formParmas.deptName
      };
      ExportDeptAssess(params).then(res=>{
          if(window.navigator.msSaveBlob){
            const blobObject = new Blob([res.data]);
            window.navigator.msSaveBlob(blobObject, '企业评价.xls');
          }else{
            let blob = new Blob([res.data]); // 假设文件为pdf
            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = '企业评价.xls';
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