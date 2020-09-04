<template>
   <div class="layout_card_content">
        <div class="table-operator">
           <div class="left_button">
                <a-button type="primary" icon="plus" @click="addUser">
                  新增
                </a-button>
                <a-button>
                  批量删除
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

        <div class="sel_tips">
           <a-icon type="info-circle" /><span>已选择&nbsp;&nbsp;<a>2</a>&nbsp;&nbsp;项</span><a>清空</a>
        </div>

        <a-table :columns="columns" bordered :data-source="data" :row-selection="rowSelection" :pagination="pagination" :scroll="{x:800,y:height}">
                <span slot="action" slot-scope="text">
                    <a>编辑</a>
                    <a-divider type="vertical" />
                    <a>删除</a>
                </span>
        </a-table>

        <modalUser ref="add_user"></modalUser>
   </div>
</template>

<script>

import modalUser from './modalUser.vue'

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
      { title: '序号', width: 80, dataIndex: 'name', key: 'name', customRender:(text, row, index)=>{
        return <a href="javascript:;">{index}</a>;
      },align:'center'},
      {
        title: '用户账号',
        dataIndex: 'age',
        key: 'age',
        align:'center',
        ellipsis:true,
      },
      {
        title: '用户名称',
        dataIndex: 'address',
        key: 'address 1',
        align:'center',
        ellipsis:true,
      },
      {
        title: '上级部门',
        dataIndex: 'address',
        key: 'address 2',
        align:'center',
        ellipsis:true,
      },
      {
        title: '联系电话',
        dataIndex: 'address',
        key: 'address 3',
        align:'center',
        ellipsis:true,
      },
      {
        title: '状态',
        dataIndex: 'address',
        key: 'address 4',
        align:'center',
        ellipsis:true,
      },
      {
        title: '有效期',
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
        scopedSlots: { customRender: 'action' },
      },
    ];
      const data = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: '政府角色',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: '政府角色',
          tags: ['loser'],
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: '政府角色',
          tags: ['cool', 'teacher'],
        },
        {
          key: '4',
          name: 'Joe Black',
          age: 32,
          address: '政府角色',
          tags: ['cool', 'teacher'],
        },
        {
          key: '5',
          name: 'Joe Black',
          age: 32,
          address: '政府角色',
          tags: ['cool', 'teacher'],
        },
        {
          key: '6',
          name: 'Joe Black',
          age: 32,
          address: '政府角色',
          tags: ['cool', 'teacher'],
        },
        {
          key: '7',
          name: 'Joe Black',
          age: 32,
          address: '政府角色',
          tags: ['cool', 'teacher'],
        },
        {
          key: '8',
          name: 'Joe Black',
          age: 32,
          address: '政府角色',
          tags: ['cool', 'teacher'],
        },
        {
          key: '9',
          name: 'Joe Black',
          age: 32,
          address: '政府角色',
          tags: ['cool', 'teacher'],
        },
        {
          key: '10',
          name: 'Joe Black',
          age: 32,
          address: '政府角色',
          tags: ['cool', 'teacher'],
        },
        {
          key: '11',
          name: 'Joe Black',
          age: 32,
          address: '政府角色',
          tags: ['cool', 'teacher'],
        },
      ];
    return {
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
    modalUser
  },
  created(){},
  mounted(){
    this.$nextTick(()=>{
      this.height = document.documentElement.clientHeight - 339
    })
  },
  methods:{
    addUser(){
      this.$refs.add_user.addUser()
    }
  }
}
</script>