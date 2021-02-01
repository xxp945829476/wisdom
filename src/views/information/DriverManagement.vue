<template>
   <div class="layout_card_content">

       <div class="table-operator">
           <div class="left_button">
               <a-button type="primary" icon="plus" @click="addDriver(0)" v-if="isAdd">
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
                            <a-form-model-item label="所属企业">
                            <a-input v-model="formParmas.deptId" placeholder="" />
                            </a-form-model-item>
                        </a-col>
                        <a-col :md="12">
                            <a-form-model-item label="人员姓名">
                                <a-input v-model="formParmas.driverName" placeholder="" />
                            </a-form-model-item>
                        </a-col>
                    </a-row>
                </a-form-model>
           </div>
       </div>
        

        <a-table :columns="columns" bordered :data-source="tableData"  @change="changeTable" :rowKey='record' size="middle" :pagination="pagination" :loading="loading" :scroll="{x:1200,y:height}">
                <span slot="driverPhoto" slot-scope="text,record">
                  <template v-if="text">
                      <!-- <img :src="pathUrl.imgurl + text" class="img_width"/> -->
                      <a @click="viewImg(text)" class="view_img">查看</a>
                  </template>
                </span>
                
                <span slot="action" slot-scope="text,record">
                    <a @click="addDriver(1,record)" v-if="isEdit">编辑</a>
                    <!-- <a-divider type="vertical" />
                    <a>删除</a> -->
                </span>
        </a-table>

       <modalDriver ref="add_driver" @triggerData="getData"></modalDriver>

       <a-modal title="人员照片" v-model="viewVisible" :maskClosable="false" :footer="null" width="400px" v-dialogDrag="dialog">
         <div class="text_center">
           <img :src="pathUrl.imgurl + imgUrl" class="img_style"/>
         </div>
       </a-modal>
   </div>
</template>

<script>

import modalDriver from './modalDriver.vue'
import {driverList} from '@/network/api'
import pathUrl from "@/network/requestUrl";

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

export default {
  data() {
      const columns = [
      { title: '序号', fixed: 'left',width: 80,customRender:(text, row, index)=>{
        return <span>{index}</span>;
      },align:'center'},
      {
        title: '所属企业',
        dataIndex: 'deptName',
        key: 'deptName',
        align:'center',
        ellipsis:true,
        width:240
      },
      {
        title: '人员姓名',
        dataIndex: 'driverName',
        key: 'driverName',
        align:'center',
        ellipsis:true,
      },
      {
        title: '联系电话',
        dataIndex: 'driverTel',
        key: 'driverTel',
        align:'center',
        ellipsis:true,
      },
      {
        title: '身份证号',
        dataIndex: 'driverIdNo',
        key: 'driverIdNo',
        align:'center',
        ellipsis:true,
      },
      {
        title: '驾驶证号',
        dataIndex: 'driverLicenseNo',
        key: 'driverLicenseNo',
        align:'center',
        ellipsis:true,
      },
      {
        title: '人员照片',
        dataIndex: 'driverPhoto',
        key: 'driverPhoto',
        align:'center',
        ellipsis:true,
        scopedSlots: { customRender: 'driverPhoto' },
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
      const data = [
        {
          key: '1',
          abbreviation: '张松工程',
          name: '广州市鸿基道路运输有限公司',
          address: '广州市鸿基道路运输有限公司',
          type: '渣土公司',
          jurisdiction:'南京市',
          corporation:'xxx'
        }
      ];
    return {
      imgUrl:'',
      viewVisible:false,
      loading:false,
      businessVisible:false,
      dialog:true,
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
      roleVisible:false,
      height:'',
      formParmas: {
        deptId: '',
        driverName: '',
        pageNum:1,
        pageSize:20,
      },
      advanced:false,
      data,
      columns,
      rowSelection,
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
      tableData:[],
      pathUrl,
      isAdd:false,
      isEdit:false
    }
  },
  components:{
    modalDriver
  },
  created(){
    this.init()
  },
  mounted(){
    this.$nextTick(()=>{
      this.tableHeight();
    })
  },
  methods:{
    tableHeight(){
      this.height = document.documentElement.clientHeight - 295
    },
    init(){
      this.permissionControl();
      this.getData();
    },
    permissionControl(){
     
      let permission =  JSON.parse(this.$getStorage('permission'));
      

      permission.forEach(cur=>{
        if(cur.menuPermission == 'sys:driver:add'){
          this.isAdd = true;
        }else if(cur.menuPermission == 'sys:driver:edit'){
          this.isEdit = true;
        };
      })
    },
    getData(){
        this.loading = true;
        driverList(this.formParmas).then(res=>{
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
    addDriver(val,record){
      this.$refs.add_driver.addDriver(val,record)
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
      
      this.getData()
    },
    changeTable(pagination){
      this.pagination.current = pagination.current;
      this.formParmas.pageNum = pagination.current;
      this.formParmas.pageSize = pagination.pageSize;
      this.pagination.pageSize = pagination.pageSize;
      this.getData()
    },
    viewImg(val){
      this.viewVisible = true;
      this.imgUrl = val;
    }
  }
}
</script>