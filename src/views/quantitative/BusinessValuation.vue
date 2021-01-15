<template>
   <div class="layout_card_content">

       <div class="table-operator">
           <div class="left_button">
               <a-button type="primary">
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
                            <a-form-model-item label="评价周期">
                                 <a-select v-model="formParmas.deptBusinessType" allowClear>
                                    <a-select-option v-for="item in depList" :key="item.id">
                                        {{item.name}}
                                    </a-select-option>
                                  </a-select>
                            </a-form-model-item>
                        </a-col>
                        <a-col :md="8">
                            <a-form-model-item label="评价时间">
                            <a-input v-model="formParmas.deptName" placeholder=""/>
                            </a-form-model-item>
                        </a-col>
                        <a-col :md="8">
                            <a-form-model-item label="评价等级">
                            <a-input v-model="formParmas.deptName" placeholder=""/>
                            </a-form-model-item>
                        </a-col>
                        <template v-if="advanced">
                            <a-col :md="8">
                                <a-form-model-item label="企业名称">
                                <a-input v-model="formParmas.deptName" placeholder=""/>
                                </a-form-model-item>
                            </a-col>
                            <a-col :md="8">
                                <a-form-model-item label="管辖区">
                                <a-input v-model="formParmas.deptName" placeholder=""/>
                                </a-form-model-item>
                            </a-col>
                        </template>
                        
                    </a-row>
                </a-form-model>
           </div>
       </div>
        

        <a-table :columns="columns" bordered :data-source="tableData" @change="changeTable" :rowKey='record' size="middle" :pagination="pagination" :loading="loading" :scroll="{y:height}">
                <a slot="deptName" slot-scope="text,record" @click="viewDetails(record)">
                    {{record.deptName}}
                </a>
                <span slot="deptJurisdictionalArea" slot-scope="text,record">
                    {{record.provinceName}}{{record.cityName}}{{record.regionName}}
                </span>
                <span slot="activition" slot-scope="text,record">
                    <a-badge v-if="record.activition == 0" status="success" text="有效" />
                    <a-badge v-else status="error" text="无效"></a-badge>
                </span>
                <span slot="action" slot-scope="text,record">
                    <a>编辑</a>
                    
                    
                </span>
        </a-table>

       <modalScoring ref="add_quan" @triggerData="getData"></modalScoring>

   </div>
</template>

<script>

import modalScoring from './modalScoring.vue'

import {DepartmentList,BaseList,EditDepartment,ExportDepartment} from '@/network/api'



export default {
  data() {
      const columns = [
      { title: '序号', fixed: 'left',width: 80,customRender:(text, row, index)=>{
        return <span>{index+1}</span>;
      },align:'center'},
      {
        title: '企业名称',
        dataIndex: 'deptAbbreviation',
        key: 'deptAbbreviation',
        align:'center',
        ellipsis:true,
      },
      {
        title: '管辖区',
        dataIndex: 'deptName',
        key: 'deptName',
        align:'center',
        ellipsis:true,
      },
      {
        title: '得分',
        dataIndex: 'deptBusinessTypeName',
        key: 'deptBusinessTypeName',
        align:'center',
        ellipsis:true,
      },
      {
        title: '评价等级',
        align:'center',
        ellipsis:true,
        scopedSlots: { customRender: 'deptJurisdictionalArea' },
  
      },
      {
        title: '备注',
        dataIndex: 'points',
        key: 'points',
        align:'center',
        ellipsis:true,
  
      }
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
        deptName: '',
        pageNum:1,
        pageSize:20,
        deptType:'3',
        deptBusinessType:''
      },
      advanced:false,
      tableData:[],
      depList:[],
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
      isEdit:false,
      isExport:false
    }
  },
  components:{
      modalScoring
  },
  created(){
    // this.init();
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
      this.getDepType();
    },
    permissionControl(){
     
      let permission =  JSON.parse(this.$getStorage('permission'));
      
      console.log(permission)
      permission.forEach(cur=>{
        if(cur.menuPermission == 'sys:dept:add'){
          this.isAdd = true;
        }else if(cur.menuPermission == 'sys:dept:edit'){
          this.isEdit = true;
        }else if(cur.menuPermission == 'sys:dept:export'){
          this.isExport = true;
        }
      })
    },
    getData(){
         this.loading = true;
        DepartmentList(this.formParmas).then(res=>{
             this.loading = false;
            if(res.data.code == 0){
                let data = res.data.data.records;
                this.tableData = data;
                this.tableData.forEach(cur=>{
                    cur.createTime = this.$moment.unix(cur.createTime).format('YYYY-MM-DD') 
                });
                this.pagination.total = res.data.data.total;
            }else{
                this.$message.warning('加载失败')
            };
            
        });
    },
    getDepType(){
        let params = {
              pid: "77"
            };
        BaseList(params).then(res=>{
          if(res.data.code == 0){
            this.depList = res.data.data
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
      this.formParmas.deptName = '';
      this.formParmas.deptBusinessType = '';
      this.getData()
    },
    record(key){
          return key.id
    },
    addQuan(val,record){
      this.$refs.add_quan.addQuan(val,record)
    },
    cancellation(obj){
       //注销

       let params = {
        id:obj.id,
        activition:obj.activition == 0 ? 1 : 0
       };

        EditDepartment(params).then(res=>{

            if(res.data.code == 0){
              this.getData();
              this.$message.success('操作成功');
            }else{
              this.$message.warning('操作失败')
            };
        });
    },
    viewDetails(record){
      this.$refs.add_business_details.viewDetails(record)
    },
    exportDep(){

      let params = {
        deptName:this.formParmas.deptName,
        deptType:this.formParmas.deptType
      };
      ExportDepartment(params).then(res=>{
          if(window.navigator.msSaveBlob){
            const blobObject = new Blob([res.data]);
            window.navigator.msSaveBlob(blobObject, '企业信息.xls');
          }else{
            let blob = new Blob([res.data]); // 假设文件为pdf
            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = '企业信息.xls';
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