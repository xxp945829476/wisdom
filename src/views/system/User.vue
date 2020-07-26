<template>
   <div class="layout_card_content">
      <div class="layout_card_search">
          <a-form-model layout="inline" :model="form">
            <a-row :gutter="24">
              <a-col :md="6" :sm="24">
                <a-form-model-item label="账号">
                  <a-input v-model="form.fieldA" placeholder="" />
                </a-form-model-item>
              </a-col>
              <a-col :md="6" :sm="24">
                <a-form-model-item label="性别">
                  <a-input v-model="form.fieldB" placeholder="" />
                </a-form-model-item>
              </a-col>
             
             

              <template v-if="advanced">
                <a-col :md="6" :sm="24">
                  <a-form-model-item label="姓名">
                    <a-input v-model="form.fieldB" placeholder="" />
                  </a-form-model-item>
                </a-col>
                <a-col :md="6" :sm="24">
                  <a-form-model-item label="手机号码">
                    <a-input v-model="form.fieldB" placeholder="" />
                  </a-form-model-item>
                </a-col>
                <a-col :md="6" :sm="24">
                  <a-form-model-item label="状态">
                    <a-input v-model="form.fieldB" placeholder="" />
                  </a-form-model-item>
                </a-col>
              </template>
               

              <a-col :md="6" :sm="24">
                  <span class="table-page-search-submitButtons" @click="toggleSearch">
                     <a-button type="primary" icon="search" class="search_btn">查询</a-button>
                     <a-button icon="reload" class="reload_btn">重置</a-button>
                      <a>
                        {{advanced ? '收起' : '展开'}}
                        <a-icon :type="advanced ? 'up' : 'down'"/>
                      </a>
                  </span>
              </a-col>
            </a-row>

           
            
          </a-form-model>
      </div>

        <div class="table-operator">
             <a-button type="primary" icon="plus" @click="showModal">
              新增
            </a-button>
             <a-button type="primary" icon="export">
              导出
            </a-button>
        </div>
        <a-table :columns="columns" :data-source="data" bordered :row-selection="rowSelection">
          <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>

        <a-modal v-model="visible" @ok="handleOk" v-dialogDrag="dialog" v-fullscreen='fullscreen'>
          <div slot="title">
            标题
            <span class="fullscreen_model">
              <a-icon type="fullscreen" class="fullscreen_icon" />
              <a-icon type="fullscreen-exit" class="fullscreen_exit_icon" />
            </span>
          </div>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </a-modal>
   </div>
</template>

<script>
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'name' },
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
    ellipsis: true,
  },
  {
    title: 'Long Column Long Column Long Column',
    dataIndex: 'address',
    key: 'address 2',
    ellipsis: true,
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
import toggleSearch from '@/utils/toggleSearch.js';
export default {
  mixins: [toggleSearch],
  data() {
    return {
      fullscreen:true,
      dialog:true,
      form: {
        fieldA: '',
        fieldB: '',
      },
      advanced:false,
      data,
      columns,
      rowSelection,
      visible: false,
    }
  },
  methods:{
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },
  }
}
</script>