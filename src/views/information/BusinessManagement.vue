<template>
   <div class="layout_card_content">

       <div class="table-operator">
           <div class="left_button">
               <a-button type="primary" icon="plus" @click="addBusiness">
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
                        <a-col :md="8">
                            <a-form-model-item label="企业名称">
                            <a-input v-model="form.fieldA" placeholder="" />
                            </a-form-model-item>
                        </a-col>
                        <a-col :md="8">
                            <a-form-model-item label="企业类型">
                                <a-select default-value="lucy">
                                    <a-select-option value="jack">
                                        Jack
                                    </a-select-option>
                                    <a-select-option value="lucy">
                                        Lucy
                                    </a-select-option>
                                    <a-select-option value="Yiminghe">
                                        yiminghe
                                    </a-select-option>
                                </a-select>
                            </a-form-model-item>
                        </a-col>

                        <a-col :md="8">
                            <a-form-model-item label="管辖区">
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

       <modalBusiness ref="add_business"></modalBusiness> 
   </div>
</template>

<script>

import modalBusiness from './modalBusiness.vue'

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
        title: '企业简称',
        dataIndex: 'abbreviation',
        key: 'abbreviation',
        align:'center',
        ellipsis:true,
        width:120
      },
      {
        title: '企业名称',
        dataIndex: 'name',
        key: 'address 1',
        align:'center',
        ellipsis:true,
        width:200
      },
      {
        title: '企业类型',
        dataIndex: 'type',
        key: 'address 2',
        align:'center',
        ellipsis:true,
        width:100
      },
      {
        title: '管辖区',
        dataIndex: 'jurisdiction',
        key: 'address 3',
        align:'center',
        ellipsis:true,
        width:100
      },
      {
        title: '企业法人',
        dataIndex: 'corporation',
        key: 'address 4',
        align:'center',
        ellipsis:true,
        width:100
      },
      {
        title: '企业地址',
        dataIndex: 'address',
        key: 'address 5',
        align:'center',
        ellipsis:true,
        width:300
      },
      {
        title: '负责人',
        dataIndex: 'address',
        key: 'address 6',
        align:'center',
        ellipsis:true,
        width:100
      },
      {
        title: '负责人电话',
        dataIndex: 'address',
        key: 'address 7',
        align:'center',
        ellipsis:true,
        width:100
      },
      {
        title: '车辆数',
        dataIndex: 'address',
        key: 'address 8',
        align:'center',
        ellipsis:true,
        width:100
      },
      {
        title: '新增时间',
        dataIndex: 'address',
        key: 'address 9',
        align:'center',
        ellipsis:true,
        width:100
      },
      {
        title: '有效状态',
        dataIndex: 'address',
        key: 'address 10',
        align:'center',
        ellipsis:true,
        width:100
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
    modalBusiness
  },
  created(){},
  mounted(){
    this.$nextTick(()=>{
      this.height = document.documentElement.clientHeight - 339
    })
  },
  methods:{
    addBusiness(){
      this.$refs.add_business.addBusiness()
    }
  }
}
</script>