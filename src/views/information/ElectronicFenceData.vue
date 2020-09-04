<template>
   <div class="layout_card_content">
        <div class="table-operator">
          <a-row :gutter="24">
            <a-col :md="7">
                <a-button type="primary" icon="plus">
                  新增
                </a-button>
                <a-button type="primary" icon="export">
                  导出
                </a-button>
            </a-col>
            <a-col :md="13">
              <div class="layout_card_search">
                    <a-form-model layout="inline" :model="form">
                      <a-row :gutter="24">
                        <a-col :md="8" :sm="24">
                          <a-form-model-item label="企业名称">
                            <a-input v-model="form.fieldA" placeholder="" />
                          </a-form-model-item>
                        </a-col>
                        <a-col :md="8" :sm="24">
                          <a-form-model-item label="车牌号码">
                            <a-input v-model="form.fieldB" placeholder="" />
                          </a-form-model-item>
                        </a-col>
                        <a-col :md="8" :sm="24">
                            <a-form-model-item label="sim卡号">
                              <a-input v-model="form.fieldB" placeholder="" />
                            </a-form-model-item>
                          </a-col>
                      </a-row>
                    </a-form-model>
              </div>
            </a-col>
            <a-col :md="4">
              <span class="table-page-search-submitButtons">
                  <a-button type="primary" icon="search" class="search_btn">查询</a-button>
                  <a-button icon="reload" class="reload_btn">重置</a-button>
              </span>
            </a-col>
          </a-row>
             
        </div>
        <a-table :columns="columns" :data-source="data" :scroll="{ y: height }" :row-selection="rowSelection" bordered>
          <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>
   </div>
</template>

<script>
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'name' },
    width: '20%',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 80,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address 1',
    width: '20%',
  },
  {
    title: 'Long Column Long Column Long Column',
    dataIndex: 'address',
    key: 'address 2',
    ellipsis: true,
    width: '20%',
  },
  {
    title: 'Long Column Long Column',
    dataIndex: 'address',
    key: 'address 3',
    ellipsis: true,
  },
  {
    title: 'Long Column',
    dataIndex: 'address',
    key: 'address 4',
    ellipsis: true,
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
   {
    key: '4',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
   {
    key: '5',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
   {
    key: '6',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
   {
    key: '7',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
   {
    key: '8',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
   {
    key: '9',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
   {
    key: '10',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
   {
    key: '11',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
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
      height:'',
      form: {
        fieldA: '',
        fieldB: '',
      },
      data,
      columns,
      rowSelection
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.height = document.documentElement.clientHeight - 286
    })
  },
  methods:{
  }
}
</script>