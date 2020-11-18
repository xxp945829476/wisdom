<template>
  <a-modal v-model="selectVisible" title="下发名单" :maskClosable="false"  :keyboard="false" width="900px" v-dialogDrag="dialog" class="model_table">

      <div>
        <div class="modal_search">
            <a-form-model layout="inline" :model="formParmas" @submit="modalSearch" @submit.native.prevent>
              <a-row :gutter="10">
                <a-col :md="12">
                  <a-form-model-item label="设备名称">
                    <a-input v-model="formParmas.deviceName" placeholder="请输入设备名称" />
                  </a-form-model-item>
                </a-col>


                <a-col :md="12" :sm="24">
          
                     <a-button type="primary" class="search_btn" @click="modalSearch">查询</a-button>
                     <a-button class="reload_btn" @click="resetSearch">重置</a-button>
              
              </a-col>
              </a-row>
            </a-form-model>
          </div>

         <a-table :columns="columns" bordered :data-source="tableData" :rowSelection="{ selectedRowKeys: selectedRowKeys,onChange: onSelectChange, type: 'radio' }" @change="changeTable" :rowKey='record' size="middle" :pagination="pagination" :loading="loading" :customRow="rowClick" :scroll="{y:height}" >

        </a-table>
      </div>
      <template slot="footer">
          <a-button key="back"  @click="selectVisible = false">
          取消
          </a-button>
          <a-button key="submit" type="primary" @click="save">
          下发
          </a-button>
      </template>
  </a-modal>
</template>

<script>
/*!
  @param {Boolean} dialog - 弹框是否拖动
  @param {Boolean} menuVisible - 弹框显示隐藏
  @param {Boolean} superiorDisbled - 上级菜单是否禁用
  @method addRole - 弹框显示方法
*/

import {SiteEquipmentList,SendBlacklist} from '@/network/api'
import debounce from 'lodash/debounce'

export default {
  data() {
    const columns = [
      {
        title: '工地名称',
        dataIndex: 'fieldName',
        key: 'fieldName',
        align:'center',
        ellipsis:true,
      },
      {
        title: '设备名称',
        dataIndex: 'deviceName',
        key: 'deviceName',
        align:'center',
        ellipsis:true,
      },
      {
        title: 'SIM号',
        dataIndex: 'simNo',
        key: 'simNo',
        align:'center',
        ellipsis:true,
      },
      {
        title: '设施名称',
        dataIndex: 'facilityName',
        key: 'facilityName',
        align:'center',
        ellipsis:true,
    
      }
    ];
     
    return {
      rowClick: record => ({
        // 事件
        on: {
          click: (event) => {
            // 点击改行时要做的事情
            // ......
           this.selectedRowKeys = [record.id];
            this.saveParams.fieldId= record.fieldId;
            this.saveParams.deviceId= record.id;
          }
        }
      }),
      selectedRowKeys:[],
      dialog:true,
      selectVisible:false,
      loading:false,
      height:'',
      tableData:[],
      formParmas: {
        pageNum:1,
        pageSize:15,
        simNo:'',
        deviceType:'',
        activition:'',
        deviceOperator:'',
        vehicleNo:'',
        bindStatus:1,
        deviceName:'',
        fieldId:''
      },
      columns,
      pagination:{
        total:0,
        size:'middle',
        showLessItems:true,
        current:1,
        pageSize:15,
        showTotal:total => `共 ${total} 条`
      },
      saveParams:{
        deviceId:'',
        fieldId:'',
      },
    }
  },
  props:{
     
  },
  created(){
     this.save = debounce(this.save,500)//保存防止重复点击
  },
  methods:{
    getData(){
         this.loading = true;
        SiteEquipmentList(this.formParmas).then(res=>{
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
    isSue(){
      this.selectVisible = true;
      this.selectedRowKeys = [];
      this.saveParams.fieldId = '';
      this.saveParams.deviceId = '';
      this.getData();
      this.$nextTick(()=>{
        this.height = parseFloat($('.ant-modal-body').css('maxHeight'))-190
      })
      
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
    onSelectChange(val,row){

      this.selectedRowKeys = val;
      this.saveParams.fieldId= row[0].fieldId;
      this.saveParams.deviceId= row[0].id;
    },
   
    save(){
      if(this.saveParams.deviceId==''){
         this.$message.warning('请选择设备')
         return false
      };
      SendBlacklist(this.saveParams).then(res=>{
        if(res.data.code==0){
           this.selectVisible = false;
           this.$message.warning('下发成功')
        }else{
          this.$message.warning('下发失败')
        };
      }).catch(error=>{
        this.$message.warning('下发失败')
      });
    },
    modalSearch(){
      this.pagination.current = 1;
      this.formParmas.pageNum = 1;
      this.getData()
    },
    resetSearch(){
      this.pagination.current = 1;
      this.formParmas.pageNum = 1;
      this.formParmas.deviceName = '';
      this.getData()
    }
  }
}
</script>