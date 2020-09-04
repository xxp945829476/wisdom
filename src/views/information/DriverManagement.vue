<template>
   <div class="layout_card_content">

       <div class="table-operator">
           <div class="left_button">
               <a-button type="primary" icon="plus" @click="addDriver">
                  新增
                </a-button>
                <a-button>
                  导出
                </a-button>
           </div>

            <div class="right_btn">
                  <a-button type="primary" class="search_btn">查询</a-button>
                  <a-button class="reload_btn">重置</a-button>
            </div>

           <div class="layout_card_search">
                <a-form-model layout="inline" :model="form">
                    <a-row :gutter="24">
                        <a-col :md="12">
                            <a-form-model-item label="所属企业">
                            <a-input v-model="form.fieldA" placeholder="" />
                            </a-form-model-item>
                        </a-col>
                        <a-col :md="12">
                            <a-form-model-item label="人员姓名">
                                <a-input v-model="form.fieldA" placeholder="" />
                            </a-form-model-item>
                        </a-col>
                    </a-row>
                </a-form-model>
           </div>
       </div>
        

        <div class="sel_tips">
           <a-icon type="info-circle" /><span>已选择&nbsp;&nbsp;<a>2</a>&nbsp;&nbsp;项</span><a>清空</a>
        </div>

        <a-table :columns="columns" bordered :data-source="data" :row-selection="rowSelection" :pagination="pagination" :scroll="{x:1200,y:height}">
                <span slot="action" slot-scope="text">
                    <a>编辑</a>
                    <a-divider type="vertical" />
                    <a>注销</a>
                </span>
        </a-table>

       <modalDriver ref="add_driver"></modalDriver> 
   </div>
</template>

<script>

import modalDriver from './modalDriver.vue'

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
      { title: '序号', fixed: 'left',width: 80, dataIndex: 'name', key: 'name', customRender:(text, row, index)=>{
        return <a href="javascript:;">{index}</a>;
      },align:'center'},
      {
        title: '所属企业',
        dataIndex: 'abbreviation',
        key: 'abbreviation',
        align:'center',
        ellipsis:true,
        width:240
      },
      {
        title: '人员姓名',
        dataIndex: 'name',
        key: 'address 1',
        align:'center',
        ellipsis:true,
      },
      {
        title: '联系电话',
        dataIndex: 'type',
        key: 'address 2',
        align:'center',
        ellipsis:true,
      },
      {
        title: '身份证号',
        dataIndex: 'jurisdiction',
        key: 'address 3',
        align:'center',
        ellipsis:true,
      },
      {
        title: '驾驶证号',
        dataIndex: 'corporation',
        key: 'address 4',
        align:'center',
        ellipsis:true,
      },
      {
        title: '人员照片',
        dataIndex: 'address',
        key: 'address 5',
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
      businessVisible:false,
      dialog:true,
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
      roleVisible:false,
      height:'',
      form: {
        fieldA: '',
        fieldB: '',
      },
      advanced:false,
      data,
      columns,
      rowSelection,
      pagination:{
        total:40,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
        showQuickJumper:true,
        showTotal:total => `共 ${total} 条`
      }
    }
  },
  components:{
    modalDriver
  },
  created(){},
  mounted(){
    this.$nextTick(()=>{
      this.height = document.documentElement.clientHeight - 339
    })
  },
  methods:{
    addDriver(){
      this.$refs.add_driver.addDriver()
    }
  }
}
</script>