<template>
   <div class="layout_card_content">

       <div class="table-operator">
           <div class="left_button">
               <a-button type="primary" icon="plus" @click="addBusiness(0)" v-if="isAdd">
                  新增
                </a-button>
                <a-button @click="exportDep" v-if="isExport">
                  导出
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
                            <a-form-model-item label="企业名称">
                            <a-input v-model="formParmas.deptName" placeholder=""/>
                            </a-form-model-item>
                        </a-col>
                        <a-col :md="12">
                            <a-form-model-item label="企业类型">
                                 <a-select v-model="formParmas.deptBusinessType" allowClear>
                                    <a-select-option v-for="item in depList" :key="item.id">
                                        {{item.name}}
                                    </a-select-option>
                                  </a-select>
                            </a-form-model-item>
                        </a-col>
                    </a-row>
                </a-form-model>
           </div>
       </div>
        

        <a-table :columns="columns" bordered :data-source="tableData" @change="changeTable" :rowKey='record' size="middle" :pagination="pagination" :loading="loading" :scroll="{x:1800,y:height}">
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
                    <a @click="addBusiness(1,record)" v-if="isEdit">编辑</a>
                    <a-divider type="vertical" />
                    <template v-if="isEdit">
                      <a @click="cancellation(record)" v-if="record.activition == 1">恢复</a>
                      <span class="yellow" @click="cancellation(record)" v-else>注销</span>
                    </template>
                    <a-divider type="vertical" />
                    <a>删除</a>
                </span>
        </a-table>

       <modalBusiness ref="add_business" @triggerData="getData"></modalBusiness>
       <modalBusinessDetails ref="add_business_details"></modalBusinessDetails>
   </div>
</template>

<script>

import modalBusiness from './modalBusiness.vue'
import modalBusinessDetails from './modalBusinessDetails.vue'
import {DepartmentList,BaseList,EditDepartment,ExportDepartment} from '@/network/api'



export default {
  data() {
      const columns = [
      { title: '序号', fixed: 'left',width: 80,customRender:(text, row, index)=>{
        return <span>{index}</span>;
      },align:'center'},
      {
        title: '企业简称',
        dataIndex: 'deptAbbreviation',
        key: 'deptAbbreviation',
        align:'center',
        ellipsis:true,
        width:120,
      },
      {
        title: '企业名称',
        dataIndex: 'deptName',
        key: 'deptName',
        align:'center',
        ellipsis:true,
        width:200,
        scopedSlots: { customRender: 'deptName' },
      },
      {
        title: '企业类型',
        dataIndex: 'deptBusinessTypeName',
        key: 'deptBusinessTypeName',
        align:'center',
        ellipsis:true,
        width:200,
      },
      {
        title: '管辖区',
        align:'center',
        ellipsis:true,
        width:160,
        scopedSlots: { customRender: 'deptJurisdictionalArea' },
  
      },
      {
        title: '积分',
        dataIndex: 'points',
        key: 'points',
        align:'center',
        ellipsis:true,
  
      },
      {
        title: '企业法人',
        dataIndex: 'deptLegalPerson',
        key: 'deptLegalPerson',
        align:'center',
        ellipsis:true,
     
      },
      {
        title: '企业地址',
        dataIndex: 'deptAddress',
        key: 'deptAddress',
        align:'center',
        ellipsis:true,
        width:200,
      },
      {
        title: '负责人',
        dataIndex: 'deptChargePerson',
        key: 'deptChargePerson ',
        align:'center',
        ellipsis:true,
      },
      {
        title: '负责人电话',
        dataIndex: 'deptChargePersonTel',
        key: 'deptChargePersonTel',
        align:'center',
        ellipsis:true,
      },
      {
        title: '车辆数',
        dataIndex: 'vehicleNums',
        key: 'vehicleNums',
        align:'center',
        ellipsis:true,
      },
      {
        title: '新增时间',
        dataIndex: 'createTime',
        key: 'createTime',
        align:'center',
        ellipsis:true,
      },
      {
        title: '有效状态',
        dataIndex: 'activition',
        key: 'activition',
        align:'center',
        ellipsis:true,
        scopedSlots: { customRender: 'activition' },
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
    modalBusiness,
    modalBusinessDetails
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
    addBusiness(val,record){
      this.$refs.add_business.addBusiness(val,record)
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