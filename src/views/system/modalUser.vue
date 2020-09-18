<template>
  <a-modal v-model="userVisible" :title="title" :maskClosable="false" :keyboard="false" width="700px" v-dialogDrag="dialog">
    <a-spin :spinning="spinning">
    <div>
        <a-form-model :model="formUserParmas" ref="ruleForm" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules">
                    <a-form-model-item label="用户账号" prop="account">
                        <a-input v-model="formUserParmas.account" />
                    </a-form-model-item>

                    <a-form-model-item label="登录密码" prop="password" v-if="isEdit==0">
                        <a-input v-model="formUserParmas.password" />
                    </a-form-model-item>                

                    <a-form-model-item label="所属部门" prop="deptId">
                        <a-select v-model="formUserParmas.deptId">
                              <a-select-option v-for="item in depList" :key="item.id">
                                  {{item.deptName}}
                              </a-select-option>
                        </a-select>
                    </a-form-model-item>

                    <a-form-model-item label="角色分配" prop="roleId">
                        <a-select v-model="formUserParmas.roleId">
                              <a-select-option v-for="item in roleList" :key="item.id">
                                  {{item.roleName}}
                              </a-select-option>
                        </a-select>
                    </a-form-model-item>

                    <a-form-model-item label="是否启用">
                          <a-radio-group v-model="formUserParmas.disabled">
                            <a-radio value="0">
                            激活
                            </a-radio>
                            <a-radio value="1">
                            禁用
                            </a-radio>
                        </a-radio-group>
                    </a-form-model-item>

                </a-form-model>
    </div>
    </a-spin>
    <template slot="footer">
        <a-button key="back" @click="userVisible = false">
        取消
        </a-button>
        <a-button key="submit" type="primary" @click="save">
        保存
        </a-button>
    </template>
  </a-modal>
</template>

<script>
/*!
  @param {Boolean} dialog - 弹框是否拖动
  @param {Boolean} useVisible - 弹框显示隐藏
  @method addRole - 弹框显示方法
*/

import {addUser,DepartmentList,RoleList,EditUser} from '@/network/api'
import debounce from 'lodash/debounce'

export default {
  data() {
    return {
      title:'新增用户',
      spinning:false,
      dialog:true,
      userVisible:false,
      formUserParmas:{
          account:'',
          password:'',
          roleId:'',
          disabled:'0',
          deptId:'',
          id:'',
      },
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
      depList:[],
      roleList:'',
      rules:{
        account:[
          { required: true, message: '请输入用户账号', trigger: 'blur' },
        ],
        password:[
          { required: true, message: '请输入登录密码', trigger: 'blur' },
        ],
        roleId:[
          { required: true, message: '请选择角色', trigger: 'change' },
        ],
        deptId:[
          { required: true, message: '请选择部门', trigger: 'change' },
        ],
      },
      isEdit:0
    }
  },
  created(){
    this.save = debounce(this.save,500)//保存防止重复点击
  },
  methods:{
    addUser(val,record){
      this.userVisible = true;
      this.isEdit = val;
      this.$nextTick(()=>{
         this.$refs.ruleForm.resetFields();
         if(val == 0){
           this.title = '新增用户';
           this.formUserParmas.disabled = "0";
           this.formUserParmas.id = ""
         }else{
            this.title = '编辑用户';
            this.formUserParmas ={
              account:record.account,
              password:record.password,
              roleId:record.roleId,
              disabled: JSON.stringify(record.disabled),
              deptId:record.deptId,
              id:record.id,
            };
         };
      })
      this.getDepartmentList();
      this.getRoleList();
    },
    getDepartmentList(){
      let params = {
        deptName: '',
        pageNum:1,
        pageSize:999,
      };
      this.spinning = true
        DepartmentList(params).then(res=>{
            this.spinning = false;
            if(res.data.code == 0){
                this.depList = res.data.data.records;
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
    save(){
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if(this.isEdit == 0){
             this.onSubmit();
          }else{
            this.onEditSubmit();
          };
         
        } else {
          return false;
        };
      });
     
    },
    onSubmit(){
      this.spinning = true;
      addUser(this.formUserParmas).then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            this.userVisible = false;
            this.$message.success('保存成功');
            this.$emit('triggerData');
          }else{
            this.$message.warning('保存失败')
          };
      });
    },
    onEditSubmit(){
       this.spinning = true;
      EditUser(this.formUserParmas).then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            this.userVisible = false;
            this.$message.success('保存成功');
            this.$emit('triggerData');
          }else{
            this.$message.warning('保存失败')
          };
      });
    },
    
  }
}
</script>