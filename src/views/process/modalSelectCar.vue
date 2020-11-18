<template>
  <a-modal v-model="selectVisible" title="选择车辆" :maskClosable="false" :keyboard="false" width="80%" v-dialogDrag="dialog">
      <div>
        <div class="modal_search">
            <a-form-model layout="inline" :model="formParmas" @submit="modalSearch" @submit.native.prevent>
              <a-row :gutter="10">
                <a-col :md="12">
                  <a-form-model-item label="车牌号">
                    <a-input v-model="formParmas.vehicleNo" placeholder="请输入车牌号" />
                  </a-form-model-item>
                </a-col>


                <a-col :md="12" :sm="24">
          
                     <a-button type="primary" class="search_btn" @click="modalSearch">查询</a-button>
                     <a-button class="reload_btn" @click="resetSearch">重置</a-button>
              
              </a-col>
              </a-row>
            </a-form-model>
          </div>
        <a-row type="flex">
          <a-col flex="600">
            <a-table :columns="columns" bordered :rowKey='record' :data-source="tableData" :rowSelection="{ selectedRowKeys: selectedRowKeys,onChange: onSelectChange,}" :pagination="pagination" @change="changeTable" :scroll="{ y:height}" :loading='loading'>
            <template slot="ol" slot-scope="text,record">
                  <span v-if="record.ol==1">在线</span>
                  <span v-else>离线</span>
            </template>
         </a-table>
          </a-col>
          <a-col flex="300px">
            <div class="already_sel" >
              <h3>已选车辆({{selectedList.length}})</h3>
              <ul :style="{height:height-40 + 'px'}">
                <li v-for="item in selectedList" :key="item.id">{{item.vehicleNo}}</li>
              </ul>
            </div>
            
          </a-col>
        </a-row>
         
      </div>
      <template slot="footer">
          <a-button key="back" @click="selectVisible=false">
          取消
          </a-button>
          <a-button key="submit" type="primary" @click="sure">
          确定
          </a-button>
      </template>
  </a-modal>
</template>

<script>
/*!
  @param {Boolean} dialog - 弹框是否拖动
  @param {Boolean} roleVisible - 弹框显示隐藏
  @method addRole - 弹框显示方法
*/


import {IndexVehicleList} from '@/network/api'


export default {
  data() {
    const columns = [
      { title: '序号', width: 80, fixed: 'left',customRender:(text, row, index)=>{
        return <a href="javascript:;">{index}</a>;
      },align:'center'},
      { title: '车牌号码', dataIndex: 'vehicleNo', key: 'vehicleNo',ellipsis:true,align:'center',},
      { title: '车辆状态', dataIndex: 'ol', key: 'ol',ellipsis:true,align:'center',scopedSlots: { customRender: 'ol' },},
      { title: '车辆类型', dataIndex: 'vehicleTypeName', key: 'vehicleTypeName',ellipsis:true,align:'center',},
    ]
    return {
      columns,
      loading:false,
      tableData:[],
      dialog:true,
      selectVisible:false,
      labelCol: { span: 5 },
      height:'',
      wrapperCol: { span: 16 },
      pagination:{
        total:0,
        size:'small',
        showLessItems:false,
        current:1,
        pageSize:20,
        showTotal:total => `共 ${total} 条`
      },
      formParmas:{
        pageNum:1,
        pageSize:20,
        vehicleId:'',
        vehicleNos:[],
        vehicleNo:'',
        vehicleStatus :2,
        vehicleType:'52',
      },
      selectedRowKeys:[],
      selectedList:[],
    }
  },
  created(){
    
  },
  methods:{
      selCar(val){
          
          this.selectVisible = true;
          if(val==0){
            this.selectedList = [];
            this.selectedRowKeys = [];
          };
          this.getData();
          this.$nextTick(()=>{
            this.height = parseFloat($('.ant-modal-body').css('maxHeight'))-190
          })
      },
      getData(){
        this.loading = true;

        IndexVehicleList(this.formParmas).then(res=>{
          this.loading = false;
          this.flag = false;
          if(res.data.code == 0){
          
            this.tableData = res.data.data.records;
            this.pagination.total = res.data.data.total;

           

          }else{
            this.$message.warning(res.data.message)
          }
          console.log(this.tableData)
        });
      },
      record(key){
          return key.vehicleId
      },
      changeTable(pagination){
        this.pagination.current = pagination.current;
        this.pagination.pageSize = pagination.pageSize;
        this.formParmas.pageSize = pagination.pageSize;
        this.formParmas.pageNum = pagination.current;
        this.getData()
      },
      sure(){
        this.selectVisible = false;
        this.$emit('getVehicleNo',this.selectedList)
      },
      onSelectChange(val,row){
        this.selectedRowKeys = val;
        this.selectedList = row;
      },
      modalSearch(){
        this.pagination.current = 1;
        this.formParmas.pageNum = 1;
        this.getData()
      },
      resetSearch(){
        this.pagination.current = 1;
        this.formParmas.pageNum = 1;
        this.formParmas.vehicleNo = '';
        this.getData();
      }

    
    }
  
}
</script>