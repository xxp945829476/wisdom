<template>
   <div>
    <a-row type="flex">
      <a-col :flex="leftWidth" class="left_content" ref="left_content">
        <a-form-model :model="form" layout="inline" class="left_search" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-model-item label="搜索">
            <a-input v-model="form.name" />
          </a-form-model-item>
        </a-form-model>

        <div class="left_tree left_tree_1">
          <a-tree
            v-model="checkedKeys"
            :show-line="true"
            checkable
            :tree-data="treeData"
          >
          </a-tree> 
        </div>
      </a-col>

      <a-col flex="auto">
        <div class=" layout_card_content layout_card_content_p">
        <div class="table-operator">
            <div class="left_button">
                <a-button type="primary" icon="plus" @click="addvehicle">
                    新增
                  </a-button>
                  <a-button>
                    导出
                  </a-button>
            </div>

              <div class="right_btn">
                    <a-button type="primary" class="search_btn">查询</a-button>
                    <a-button class="reload_btn">重置</a-button>
                    <a @click="toggleSearch">
                      <a-icon :type="advanced ? 'up' : 'down'"/>
                    </a>
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
                              <a-form-model-item label="车牌号码">
                                  <a-input v-model="form.fieldA" placeholder="" />
                              </a-form-model-item>
                          </a-col>

                          <a-col :md="8">
                              <a-form-model-item label="sim卡号">
                              <a-input v-model="form.fieldA" placeholder="" />
                              </a-form-model-item>
                          </a-col>

                          <template v-if="advanced">
                            <a-col :md="8">
                              <a-form-model-item label="审核状态">
                              <a-input v-model="form.fieldA" placeholder="" />
                              </a-form-model-item>
                            </a-col>
                          </template>
                          
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

          
        </div>
      </a-col>
    </a-row>

    <modalVehicle ref="add_vehicle"></modalVehicle>
   </div>
   
</template>

<script>

import modalVehicle from './modalVehicle.vue'


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
const treeData = [
  {
    title: '广州市',
    key: '0-0',
    children: [
      {
        title: '广州市昌岗道路运输有限责任公司',
        key: '0-0-0',
        children: [
          { title: '粤ACP217', key: '0-0-0-0' },
          { title: '粤ADK837', key: '0-0-0-1' },
          { title: '粤ADU438', key: '0-0-0-2' },
        ],
      },
      {
        title: '广东轲达建设工程有限公司',
        key: '0-0-1'
      }
    ],
  }
];

export default {
  data() {
      const columns = [
      { title: '序号', fixed: 'left',width: 80, dataIndex: 'name', key: 'name', customRender:(text, row, index)=>{
        return <a href="javascript:;">{index}</a>;
      },align:'center'},
      {
        title: '车牌号码',
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
        title: '管辖区',
        dataIndex: 'type',
        key: 'address 2',
        align:'center',
        ellipsis:true,
        width:100
      },
      {
        title: '车辆状态',
        dataIndex: 'jurisdiction',
        key: 'address 3',
        align:'center',
        ellipsis:true,
        width:100
      },
      {
        title: '主设备名称',
        dataIndex: 'corporation',
        key: 'address 4',
        align:'center',
        ellipsis:true,
        width:100
      },
      {
        title: '从设备名称',
        dataIndex: 'address',
        key: 'address 5',
        align:'center',
        ellipsis:true,
        width:300
      },
      {
        title: 'sim卡号',
        dataIndex: 'address',
        key: 'address 6',
        align:'center',
        ellipsis:true,
        width:100
      },
      {
        title: '入库时间',
        dataIndex: 'address',
        key: 'address 7',
        align:'center',
        ellipsis:true,
        width:100
      },
      {
        title: '年检时间',
        dataIndex: 'address',
        key: 'address 8',
        align:'center',
        ellipsis:true,
        width:100
      },
      {
        title: '车辆新旧',
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
      treeData,
      checkedKeys: [],
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
    modalVehicle
  },
  created(){},
  mounted(){
    this.$nextTick(()=>{
      this.height = document.documentElement.clientHeight - 339
    })
  },
  methods:{
    addvehicle(){
      this.$refs.add_vehicle.addvehicle()
    }
  }
}
</script>