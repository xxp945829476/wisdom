<template>
   <div class="layout_card_content layout_card_content_page">
        <div class="table-operator table-operator_1">
           <div class="left_button">
               <a-button type="primary" icon="plus" @click="addMenu(0)">
                  新增
                </a-button>
           </div>

            <!-- <div class="right_btn">
                  <a-button type="primary" class="search_btn">查询</a-button>
                  <a-button class="reload_btn">重置</a-button>
            </div> -->

            <!-- <div class="layout_card_search layout_card_search_1">
                    <a-form-model layout="inline" :model="form">
                      <a-row :gutter="24">
                        <a-col :md="24" :sm="24">
                          <a-form-model-item label="角色名称">
                            <a-input v-model="form.fieldA" placeholder="" />
                          </a-form-model-item>
                        </a-col>
                      </a-row>
                    </a-form-model>
            </div> -->
       </div>


       <a-table bordered :columns="columns" :data-source="tableData" size="middle" :rowKey='record' :pagination="false" :loading="loading" :scroll="{y:height}">
            <span slot="action" slot-scope="text,record">
                <a @click="addMenu(1,record)">编辑</a>
                <a-divider type="vertical" />
                <a @click="addMenu(2,record)">添加下级</a>
            </span>
         </a-table>

        <!--  新增编辑-->
        <modalMenu ref="add_menu" @triggerData="getData" :originalData='originalData'></modalMenu>
         
   </div>
</template>

<script>

import modalMenu from './modalMenu.vue'
import {menuList,GetMenuList} from '@/network/api'
import {buildTree} from '@/utils/utils.js'

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
      },
      {
        title: '图标',
        dataIndex: 'menuIcon',
        key: 'menuIcon',
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
     
    return {
      loading:false,
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
      menuVisible:false,
      height:'',
      tableData:[],
      columns,
      rowSelection,
      originalData:[],
      allMeunList:[],
    }
  },
  components:{
    modalMenu
  },
  created(){
    this.init()
  },
  mounted(){
    this.$nextTick(()=>{
      this.height = document.documentElement.clientHeight - 250
    });
  },
  methods:{
      init(){
        this.GetMenuList();
      },
      getData(val){
        let params = {
                pageSize: 999,
                pageNum: 1,
                menuType: ''
            };
        this.loading = true;
        menuList(params).then(res=>{
            this.loading = false;
            if(res.data.code == 0){
                
                let data = JSON.parse(JSON.stringify(res.data.data.records));
                let screenList = this.screen(data)

                 data = [...data,...screenList]
                  
                    let new_arr=[];
                    let json_arr=[];

                    for (let index = 0; index < data.length; index++) {
                        const element = data[index];
                        if (new_arr.indexOf(element['id']) ==-1) {
                           new_arr.push(element['id']);   //如果没有找到就把这个name放到arr里面，以便下次循环时用
                            json_arr.push(element);
                        }
                    } //去重

                    
                this.originalData = json_arr;

                let new_json_arr = JSON.parse(JSON.stringify(json_arr))
                 
                let buildData = buildTree(new_json_arr);
                buildData.sort(function(a,b){
                  return a.sort - b.sort;
                })
                this.tableData = buildData;
            }else{
                this.$message.warning('加载失败')
            };
            
        });
      },
      GetMenuList(){
            let params = {
                menuType: 7
            }
            GetMenuList(params).then(res=>{
               if(res.data.code == 0){
                  this.allMeunList = res.data.data;
                  this.getData();
               }
            });
      },
      screen(data){
            let arr = [];
            let newData = [];
            data.forEach(cur=>{
                arr.push(cur.pid)
            });

            let newArr = Array.from(new Set(arr)) //去掉相同的pid
     

            this.recursionData(newArr,newData) //选择上级菜单
          
            console.log(newData)

            return  newData
        },
        recursionData(newArr,newData){
              newArr.forEach(cur=>{
                this.allMeunList.forEach(ele=>{
                    if(cur == ele.id){
                        newData.push(ele)
                        if(ele.pid != '0'){
                            this.recursionData([ele.pid],newData)
                        };
                    };
                });
            });

      },
      record(key){
          return key.name
      },
      addMenu(val,record){
        console.log(record)
        this.$refs.add_menu.addMenu(val,record)
      }
  }
}
</script>