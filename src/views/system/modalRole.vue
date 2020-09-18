<template>
  <a-modal v-model="roleVisible" :title="title" :maskClosable="false" :keyboard="false" width="700px" v-dialogDrag="dialog">
     <a-spin :spinning="spinning">
      <div>
          <a-form-model :model="addForm" ref="ruleForm" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules">
                      <a-form-model-item label="角色名称" prop="roleName">
                          <a-input v-model="addForm.roleName" placeholder="请输入角色名称"/>
                      </a-form-model-item>

                      <a-form-model-item label="角色编码" prop="roleCode">
                          <a-input v-model="addForm.roleCode" placeholder="请输入角色编码"/>
                      </a-form-model-item>

                      <a-form-model-item label="所属部门" prop="deptId">
                          <a-select v-model="addForm.deptId" placeholder="请选择部门">
                              <a-select-option v-for="item in depData" :key="item.id">
                                  {{item.deptName}}
                              </a-select-option>
                          </a-select>
                      </a-form-model-item>

                      <a-form-model-item label="描述" prop="roleDescribe">
                          <a-textarea v-model="addForm.roleDescribe" />
                      </a-form-model-item>
                      
                  </a-form-model>
      </div>
     </a-spin>
      <template slot="footer">
          <a-button key="back" @click="roleVisible=false">
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
  @param {Boolean} roleVisible - 弹框显示隐藏
  @method addRole - 弹框显示方法
*/

import {AddRole,DepartmentList,EditRole} from '@/network/api'
import debounce from 'lodash/debounce'

export default {
  data() {
    return {
      spinning:false,
      title:'新增角色',
      dialog:true,
      roleVisible:false,
      addForm: {
        id:'',
        deptId: undefined,
        roleName: '',
        roleCode: '',
        roleDescribe: '',
      },
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
      depData:[],
      rules:{
        roleName:[
          { required: true, message: '请输入角色名称', trigger: 'blur' },
        ],
        roleCode:[
          { required: true, message: '请输入角色编码', trigger: 'blur' },
        ],
        deptId:[
          { required: true, message: '请选择部门', trigger: 'change' },
        ],
      },
      isEdit:0,
    }
  },
  created(){
     this.save = debounce(this.save,500)//保存防止重复点击
  },
  methods:{
    addRole(val,record){
      console.log(record)
      //val 0 新增 1 编辑
      this.roleVisible = true;
      this.isEdit = val;
      this.$nextTick(()=>{
        this.$refs.ruleForm.resetFields();//对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
        if(val == 0){
          this.title = '新增角色';
          this.addForm.id = '';
        }else{
          this.title = '编辑角色';
          this.addForm = {
            id:record.id,
            deptId: record.deptId,
            roleName: record.roleName,
            roleCode: record.roleCode,
            roleDescribe: record.roleDescribe,
          }
        }
      });
      

      this.getDepartmentList()
    },
    getDepartmentList(){
            let params = {
              deptName: '',
              pageNum:1,
              pageSize:999,
            };
            this.spinning = true;      
          DepartmentList(params).then(res=>{
            this.spinning = false;
            if(res.data.code == 0){
                this.depData = res.data.data.records;
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
      AddRole(this.addForm).then(res=>{
        this.spinning = false;
          if(res.data.code == 0){
            this.roleVisible = false;
            this.$message.success('保存成功');
            this.$emit('triggerData');
          }else{
            this.$message.warning('保存失败')
          };
      });
    },
    onEditSubmit(){
      this.spinning = true;
      EditRole(this.addForm).then(res=>{
        this.spinning = false;
          if(res.data.code == 0){
            this.roleVisible = false;
            this.$message.success('保存成功');
            this.$emit('triggerData');
          }else{
            this.$message.warning('保存失败')
          };
      });
    }
  }
}
</script>