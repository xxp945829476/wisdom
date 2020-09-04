<template>
  <a-modal v-model="depsartVisible" :title="title" :maskClosable="false" width="800px" v-dialogDrag="dialog">
        <div>
            <a-form-model :model="addForm" ref="ruleForm" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules">
                        <a-form-model-item label="上级部门">
                            <!-- <a-input v-model="addForm.pidName" :disabled="superiorDisbled"/> -->
                          
                            <a-select v-model="addForm.pid" :disabled="superiorDisbled">
                              <a-select-option :value="list.id" v-for="list in originalData" :key="list.id">
                                
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
                            :field-names="{ label: 'areaName', value: 'areaId', children: 'children' }"
                            :options="areaList"
                            @change="changeArea"
                            v-model="addForm.jurisdiction"
                            placeholder="请选择所属管辖区"
                          />
                        </a-form-model-item>
                        
                    </a-form-model>
        </div>
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

import {BaseList,AreaList,AddDepartment} from '@/network/api'
import {buildAreaTree} from '@/utils/utils.js'
import debounce from 'lodash/debounce'

export default {
  data() {
    return {
      title:'新增部门',
      dialog:true,
      depsartVisible:false,
      superiorDisbled:true,
      addForm: {
        id:'',
        pid:'',
        pidName:'',
        deptName:'',
        deptType:'',
        province:'',
        city:'',
        region:'',
        jurisdiction:[],
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
      }
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
      if(val == 0 || val == 2){
        this.$nextTick(()=>{
          this.$refs.ruleForm.resetFields();
        })
      };
      if(val == 0){
        this.title = '新增部门';
      }else if(val == 1){
        this.title = '编辑部门';
        this.addForm.id = items.id;
        this.addForm.pid = items.id;
        this.addForm.deptName = items.deptName;
        this.addForm.deptType = items.deptType;
        this.addForm.province = items.province;
        this.addForm.city = items.city;
        this.addForm.region = items.region;
        this.addForm.jurisdiction = [this.addForm.province,this.addForm.city,this.addForm.region];
      }else{
        this.title = '新增下级部门'
        this.addForm.pidName = items.deptName;
        this.addForm.pid = items.id;
      }
      this.getDepType();
      this.getAreaList();
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
        AreaList().then(res=>{
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
    },
    save(){
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.onSubmit();
        } else {
          return false;
        };
      });
     
    },
    onSubmit(){
      AddDepartment(this.addForm).then(res=>{
          if(res.data.code == 0){
            this.depsartVisible = false;
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