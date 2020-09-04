<template>
    <div style="overflow:hidden">
        <a-row :gutter="10">
            <a-col :md="12" :sm="24">
                <a-spin :spinning="spinning">
                <div class="layout_card_content lr_layout">
                    <div class="table-operator">
                    <a-row :gutter="10">
                        <a-col :md="8">
                            <div class="layout_card_search layout_card_search_w">
                                    <a-form-model layout="inline" :model="formParmas" @submit="searchData" @submit.native.prevent>
                                        <a-row :gutter="24">
                                            <a-col :md="24" :sm="24">
                                                <a-form-model-item>
                                                    <a-input v-model="formParmas.deptName" placeholder="" allow-clear/>
                                                </a-form-model-item>
                                            </a-col>
                                        </a-row>
                                    </a-form-model>
                            </div>
                        </a-col>

                        <a-col :md="5">
                        <span class="table-page-search-submitButtons">
                            <a-button type="primary" class="search_btn" @click="searchData">查询</a-button>
                        </span>
                        </a-col>

                        <a-col :md="11" class="right_operator_btn">
                            <a-button type="primary" icon="plus" @click="addDepart(0)" class="but_margin_right">
                            新增
                            </a-button>
                             <a-button>
                            批量删除
                            </a-button>
                        </a-col>
                    </a-row>
                    </div>

                    
                        <div>
                            <a-tree :tree-data="treeData" checkable show-line @select="onSelect" @check="onCheck" :replaceFields="replaceFields">
                                <template slot="custom" slot-scope="item">
                                    <span>{{ item.deptName }}</span>
                                    <span class="tree_btn">
                                        <a @click.stop="addDepart(1,item)">编辑</a>
                                            <a-divider type="vertical" />
                                        <a @click.stop="addDepart(2,item)">添加下级</a>
                                    </span>
                                
                                </template>
                            </a-tree>
                        </div>
                   
                </div>
                 </a-spin>
            </a-col>

            <a-col :md="12" :sm="24">
                <div class="lr_layout right_layout">
                    <div class="right_layout_t">创建用户账号</div>
                    <div class="creat_account">
                         <!-- <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <a-form-model-item label="用户账号">
                                <a-input v-model="form.name" />
                            </a-form-model-item>

                            <a-form-model-item label="登录密码">
                                <a-input v-model="form.name" />
                            </a-form-model-item>

                            <a-form-model-item label="确认密码">
                                <a-input v-model="form.name" />
                            </a-form-model-item>

                            <a-form-model-item label="用户名称">
                                <a-input v-model="form.name" />
                            </a-form-model-item>

                            <a-form-model-item label="角色选择">
                                <a-input v-model="form.name" />
                            </a-form-model-item>

                            <a-form-model-item label="有效期">
                                <a-input v-model="form.name" />
                            </a-form-model-item>
                            
                      
                            <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
                            <a-button type="primary" @click="onSubmit">
                                取消
                            </a-button>
                            <a-button class="button_left">
                                确定
                            </a-button>
                            </a-form-model-item>
                        </a-form-model> -->
                    </div>
                </div>
            </a-col>
        </a-row>


        <modalDepart ref="add_depart" @triggerData="getData" :originalData='originalData'></modalDepart>
    </div>
   
</template>

<script>

import {DepartmentList,AddDepartment,BaseList} from '@/network/api'
import modalDepart from './modalDepart.vue'
import {buildTree} from '@/utils/utils.js'



export default {
  data() {
    return {
      spinning:false,
      formParmas: {
        deptName: '',
        pageNum:1,
        pageSize:999,
      },
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
      replaceFields:{
        children:'children',
        title:'deptName',  
        key:'id'
      },
      originalData:[],
      treeData:[],//左侧树data
    }
  },
  components:{
      modalDepart
  },
  created(){
      this.init()
  },
  mounted(){

  },
  methods:{
    init(){
      this.getData();
    },
    getData(val){
        //val 1 搜索
        this.spinning = true
        DepartmentList(this.formParmas).then(res=>{
            this.spinning = false;
            if(res.data.code == 0){
                let data = JSON.parse(JSON.stringify(res.data.data.records));
                this.originalData = data;
                
                data.forEach(cur=>{
                    this.$set(cur,'scopedSlots', {title: 'custom' })
                });
                if(val != 1){
                    data = buildTree(data);
                }
                this.treeData = data;
            }else{
                this.$message.warning('加载失败')
            };
            
        });
    },
    
    onSubmit() {
        console.log('submit!', this.form);
    },
    onSelect(selectedKeys, info) {
      console.log('selected', selectedKeys);
    },
    onCheck(checkedKeys, info) {
      console.log('onCheck', checkedKeys, info);
    },
    addDepart(val,items){
        this.$refs.add_depart.addDepart(val,items);
    },
    searchData(){
        if(this.formParmas.deptName){
            this.getData(1)
        }else{
             this.getData()
        };
    },
  }
}
</script>