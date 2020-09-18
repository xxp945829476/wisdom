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
                        </a-col>
                    </a-row>
                    </div>

                    
                        <div class="tree_mian">
                            <a-tree :tree-data="treeData" default-expand-all v-if="!spinning" show-line :replaceFields="replaceFields" @select="onSelect" :selectedKeys="selectedKeys">
                                <template slot="custom" slot-scope="item">
                                    <span>{{ item.deptName }}</span>
                                    <span class="tree_btn">
                                        <a @click.stop="addDepart(1,item)">编辑</a>
                                        <a-divider type="vertical" />
                                        <!-- <a @click.stop="sureDeleteDepart(item.id)">删除</a>
                                        <a-divider type="vertical" /> -->
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
                    <a-spin :spinning="spinningUser">
                    <div class="creat_account">
                            
                         <a-form-model :model="formUserParmas" :label-col="labelCol" :wrapper-col="wrapperCol" v-if="deptId" ref="ruleUserForm">
                            <a-form-model-item label="用户账号" prop="account">
                                <a-input v-model="formUserParmas.account" />
                            </a-form-model-item>

                            <a-form-model-item label="登录密码" prop="password">
                                <a-input v-model="formUserParmas.password" />
                            </a-form-model-item>

                            <a-form-model-item label="角色分配" prop="roleId">
                                <a-select v-model="formUserParmas.roleId">
                                    <a-select-option v-for="item in roleList" :key="item.id">
                                        {{item.roleName}}
                                    </a-select-option>
                                </a-select>
                            </a-form-model-item>

                            <!-- <a-form-model-item label="有效期">
                                <a-input v-model="form.name" />
                            </a-form-model-item>
                             -->
                      
                            <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
                                <a-button type="primary" @click="cancelUserData">
                                    取消
                                </a-button>
                                <a-button class="button_left" type="primary" @click="saveUserData">
                                    保存
                                </a-button>
                            </a-form-model-item>
                        </a-form-model>

                        <div v-else class="empty_data">
                            <a-empty>
                                 <span slot="description">请选择相应的部门</span>
                            </a-empty>
                        </div>
                    </div>
                    </a-spin>
                </div>
            </a-col>
        </a-row>


        <modalDepart ref="add_depart" @triggerData="getData" :originalData='originalData'></modalDepart>
    </div>
   
</template>

<script>

import {DepartmentList,DelDepartment,addUser,RoleList} from '@/network/api'
import modalDepart from './modalDepart.vue'
import {buildTree} from '@/utils/utils.js'



export default {
  data() {
    return {
      spinningUser:false,
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
      formUserParmas:{
          account:'',
          password:'',
          roleId:''
      },
      selectedKeys:[],
      deptId:'',
      roleList:[]
    }
  },
  components:{
      modalDepart
  },
  created(){
      this.init();
  },
  mounted(){

  },
  methods:{
    init(){
      this.getData();
      this.getRoleList();
    },
    getData(val){
        //val 1 搜索
        this.spinning = true
        DepartmentList(this.formParmas).then(res=>{
            this.spinning = false;
            if(res.data.code == 0){
                this.originalData = JSON.parse(JSON.stringify(res.data.data.records));
                let data = JSON.parse(JSON.stringify(res.data.data.records));
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
    getRoleList(){
      let params = {
        roleName: '',
        pageNum:1,
        pageSize:999,
      };
        RoleList(params).then(res=>{
            if(res.data.code == 0){
                this.roleList = res.data.data.records;
            }else{
                this.$message.warning('加载失败')
            };
            
        });
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
    sureDeleteDepart(id){
        let that = this;
      this.$confirm({
        title: '确定删除吗?',
        content: '将要删除此部门及下级部门',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          that.delDepart(id)
        },
        onCancel() {
          
        },
      });  
    },
    delDepart(id){
        this.spinning = true;
        DelDepartment(id).then((res)=>{
             this.spinning = false;
            if(res.data.code == 0){
                this.getData();
                this.$message.success('删除成功')
            }else{
                this.$message.warning('删除失败')
            }
        });
    },
    saveUserData(){
        this.spinningUser = true;
        this.formUserParmas['deptId'] = this.deptId;
        addUser(this.formUserParmas).then((res)=>{
            this.spinningUser = false;
            if(res.data.code == 0){
                this.$message.success('创建用户账号成功');
                this.$refs.ruleUserForm.resetFields();
            }else{
                this.$message.warning('创建用户账号失败')
            };
        }); 
    },
    cancelUserData(){
        this.deptId = "";
        his.$refs.ruleUserForm.resetFields();
        this.selectedKeys = [];
    },
    onSelect(selectedKeys, info){
        console.log(selectedKeys)
        this.selectedKeys = selectedKeys;
        this.deptId = selectedKeys[0];
    }
  }
}
</script>