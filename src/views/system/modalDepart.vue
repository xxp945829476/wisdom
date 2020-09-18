<template>
  <a-modal v-model="depsartVisible" :title="title" :maskClosable="false" width="800px" v-dialogDrag="dialog">
        <a-spin :spinning="spinning">
        <div>
            <a-form-model :model="addForm" ref="ruleForm" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules">
                        <a-form-model-item label="上级部门" prop="pid">
                            <a-select v-model="addForm.pid" :disabled="superiorDisbled">
                              <a-select-option v-for="item in originalData" :key="item.id">
                                  {{item.deptName}}
                              </a-select-option>
                            </a-select>
                        </a-form-model-item>

                        <a-form-model-item label="部门名称" prop="deptName">
                            <a-input v-model="addForm.deptName" placeholder="请输入部门名称" />
                        </a-form-model-item>

                        <a-form-model-item label="部门类型" prop="deptType">
                            <a-radio-group v-model="addForm.deptType">
                                <a-radio :value="item.id" v-for="item in depList" :key="item.id">
                                  {{item.name}}
                                </a-radio>
                            </a-radio-group>
                        </a-form-model-item>

                        <a-form-model-item label="所属管辖区" prop="jurisdiction">
                            <a-cascader
                            change-on-select
                            :field-names="{ label: 'areaName', value: 'areaId', children: 'children' }"
                            :options="areaList"
                            @change="changeArea"
                            v-model="addForm.jurisdiction"
                            placeholder="请选择所属管辖区"
                          />
                        </a-form-model-item>
                        
                    </a-form-model>
        </div>
        </a-spin>
        <template slot="footer">
            <a-button key="back" @click="depsartVisible=false">
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
  @param {Boolean} depsartVisible - 弹框显示隐藏
  @param {Boolean} superiorDisbled - 上级菜单是否禁用
  @method addRole - 弹框显示方法
*/

import {BaseList,AreaList,AddDepartment,EditDepartment} from '@/network/api'
import {buildAreaTree} from '@/utils/utils.js'
import debounce from 'lodash/debounce'

export default {
  data() {
    return {
      spinning:false,
      title:'新增部门',
      dialog:true,
      isEdit:0,
      depsartVisible:false,
      superiorDisbled:true,
      addForm: {
        id:'',
        pid:'',
        deptName:'',
        deptType:'',
        province:'',
        city:'',
        region:'',
        jurisdiction:[],
        realAreaId:''
      },
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
      depList:[],
      areaList:[],
      rules:{
        deptName:[
          { required: true, message: '请输入部门名称', trigger: 'blur' },
        ],
        deptType:[
           { required: true, message: '请选中部门类型', trigger: 'change' },
        ],
        jurisdiction:[
          { required: true, message: '请选择所属管辖区', trigger: 'change' },
        ]
      },
    }
  },
  props:{
     originalData: Array,
  },
  created(){
    this.save = debounce(this.save,500)//保存防止重复点击
  },
  methods:{
    addDepart(val,items){
      console.log(this.originalData)
      //val 0新增  1编辑 2添加下级
      this.depsartVisible = true;
      this.isEdit = val;

          
      

      this.$nextTick(()=>{
        this.$refs.ruleForm.resetFields();//对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
        if(val == 0){
          this.addForm.id = '';
          this.title = '新增部门';
          this.addForm.realAreaId = ''
        }else if(val == 1){
          this.title = '编辑部门';
          this.addForm.id = items.id;
          this.addForm.pid = items.pid == '0' ? '' : items.pid;
          this.addForm.deptName = items.deptName;
          this.addForm.deptType = items.deptType;
          this.addForm.province = items.province;
          this.addForm.city = items.city;
          this.addForm.region = items.region;
          this.addForm.realAreaId = items.realAreaId;
          this.addForm.jurisdiction = [this.addForm.province,this.addForm.city,this.addForm.region];
        }else{
            this.title = '新增下级部门';
            this.addForm.id = '';
            this.addForm.pid = items.id;
            this.addForm.realAreaId = ''
        };
      });
      
      this.getDepType();//获取部门类型
      this.getAreaList();//获取地区
      
    },
    getDepType(){
        let params = {
              pid: "1"
            };
        BaseList(params).then(res=>{
          if(res.data.code == 0){
            this.depList = res.data.data
          };
        });
    },
    getAreaList(){
        this.spinning = true;
        AreaList().then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            let data = res.data.data;
            this.areaList = buildAreaTree(data)
          };
        });
    },
    changeArea(value){
      this.addForm.province = value[0];
      this.addForm.city = value[1];
      this.addForm.region = value[2];
      if(this.addForm.province && !this.addForm.region && !this.addForm.region){
        this.addForm.realAreaId = value[0];
      };
      if(this.addForm.city && !this.addForm.region){
        this.addForm.realAreaId = value[1];
      };
      if(!this.addForm.city){
        this.addForm.city = 0
      }
      if(this.addForm.region){
        this.addForm.realAreaId = value[2];
      }else{
         this.addForm.region = 0;
      };
    },
    save(){
      
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if(this.isEdit == 0 || this.isEdit == 2){
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
      AddDepartment(this.addForm).then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            this.depsartVisible = false;
            this.$message.success('保存成功');
            this.$emit('triggerData');
          }else{
            this.$message.warning('保存失败')
          };
      });
    },
     onEditSubmit(){
       this.spinning = true;
      EditDepartment(this.addForm).then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            this.depsartVisible = false;
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