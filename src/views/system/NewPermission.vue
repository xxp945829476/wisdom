<template>
    <div class="layout_card_content">
        <div class="table-operator">
             <a-button type="primary" icon="plus">
              新增
            </a-button>
        </div>
         <a-table bordered :columns="columns" :data-source="data" :row-selection="rowSelection" :rowKey='record'>
            <span slot="action" slot-scope="text">
                <a>编辑</a>
                <a-divider type="vertical" />
                 <a-dropdown :trigger="['click']">
                    <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                       更多<a-icon type="down" />
                    </a>
                    <a-menu slot="overlay">
                        <a-menu-item key="0">
                            <span>详情</span>
                        </a-menu-item>
                        <a-menu-item key="0">
                            <span>添加下级</span>
                        </a-menu-item>
                        <a-menu-item key="0">
                            <span>删除</span>
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
            </span>
         </a-table>
    </div>
</template>

<script>
const columns = [
  {
    title: '菜单名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '图标',
    dataIndex: 'meta.icon',
    key: 'icon',
  },
  {
    title: '组件',
    dataIndex: 'component',
    key: 'component',
  },
  {
    title: '路径',
    dataIndex: 'path',
    key: 'path',
  },
  {
    title: '操作',
    key: 'action',
    width:'140px',
    scopedSlots: { customRender: 'action' },
  },
];

const data = [
    {
    "path": '/system',
    "name": '系统管理',
    "component": 'Home',
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
    return {
      data,
      columns,
      rowSelection,
    };
  },
  methods:{
      record(key){
          return key.name
      }
  }
};
</script>