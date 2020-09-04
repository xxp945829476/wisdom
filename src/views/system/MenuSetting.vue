<template>
   <div class="layout_card_content">
        <div class="table-operator">
           <div class="left_button">
               <a-button type="primary" icon="plus" @click="addMenu(0)">
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

            <div class="layout_card_search layout_card_search_1">
                    <a-form-model layout="inline" :model="form">
                      <a-row :gutter="24">
                        <a-col :md="24" :sm="24">
                          <a-form-model-item label="角色名称">
                            <a-input v-model="form.fieldA" placeholder="" />
                          </a-form-model-item>
                        </a-col>
                      </a-row>
                    </a-form-model>
            </div>
       </div>


       <a-table bordered :columns="columns" :data-source="data" :row-selection="rowSelection" :rowKey='record' :pagination="false">
            <span slot="action" slot-scope="text">
                <a @click="addMenu(1)">编辑</a>
                <a-divider type="vertical" />
                <a>删除</a>
                <a-divider type="vertical" />
                <a>添加下级</a>
            </span>
         </a-table>

        <!--  新增编辑-->
        <modalMenu ref="add_menu"></modalMenu>
         
   </div>
</template>

<script>

import modalMenu from './modalMenu.vue'

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
  {
    title: '菜单名称',
    dataIndex: 'name',
    key: 'name',
    align:'center',
  },
  {
    title: '菜单类型',
    dataIndex: 'type',
    key: 'type',
    align:'center',
  },
  {
    title: '图标',
    dataIndex: 'meta.icon',
    key: 'icon',
    align:'center',
  },
  {
    title: '组件',
    dataIndex: 'component',
    key: 'component',
    align:'center',
  },
  {
    title: '路径',
    dataIndex: 'path',
    key: 'path',
    align:'center',
  },
  {
    title: '操作',
    key: 'action',
    width:'240px',
    align:'center',
    scopedSlots: { customRender: 'action' },
  },
];


     const data = [
    {
    "path": '/system',
    "name": '系统管理',
    "component": 'Home',
    "type":'菜单',
    "meta":{
        icon: 'setting'
    },
    "children":[
            {
                "path": '/user',
                "name": '用户管理',
                "component": 'system/User',
                "meta":{
                   
                }
            },
            {
                "path": '/roleUser',
                "name": '角色管理',
                "component": 'system/RoleUser',
                "meta":{
                      
                    },
            },
            {
                "path": '/newPermission',
                "name": '菜单管理',
                "component": 'system/NewPermission',
                "meta":{
                      
                    },
            }
      
    ]
  },
  {
    "path": '/tb',
    "name": '图表设置',
    "component": 'Home',
    "meta":{
            icon: 'global'
        },
    "children":[
        {
            "path": '/eacrts',
            "name": '图表',
            "component": 'Eacrts',
            "meta":{
               
            },
        }
      
    ]
  }
];
    return {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
      menuVisible:false,
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
    modalMenu
  },
  created(){},
  mounted(){
    this.$nextTick(()=>{
      this.height = document.documentElement.clientHeight - 339
    })
  },
  methods:{
      record(key){
          return key.name
      },
      addMenu(val){
        this.$refs.add_menu.addMenu(val)
      }
  }
}
</script>