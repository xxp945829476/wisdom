<template>
  <a-modal v-model="quanVisible" :maskClosable="false" :keyboard="false" width="600px" v-dialogDrag="dialog" v-fullscreen>
    <div slot="title">
      {{title}}
      <span class="fullscreen_model">
        <a-icon type="fullscreen" class="fullscreen_icon" />
        <a-icon type="fullscreen-exit" class="fullscreen_exit_icon" />
      </span>
    </div>
    <a-spin :spinning="spinning">
    <div>
        <a-form-model  :model="addForm" ref="ruleForm" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
          
              
                        <a-form-model-item label="考核对象" prop="deptBusinessType">
                            <a-select v-model="addForm.deptBusinessType" placeholder="请选择考核对象">
                                    <a-select-option v-for="item in depList" :key="item.id">
                                        {{item.name}}
                                    </a-select-option>
                                </a-select>
                            </a-form-model-item>
                
              
              
                    <a-form-model-item label="基础分数" prop="deptAbbreviation">
                        <a-input v-model="addForm.deptAbbreviation"  placeholder="请输入生效时间"/>
                    </a-form-model-item>
             

                
                    <a-form-model-item label="扣分数" prop="deptAbbreviation">
                        <a-input v-model="addForm.deptAbbreviation"  placeholder="请输入考核名称"/>
                    </a-form-model-item>
              

               
                    <a-form-model-item label="加分数" prop="deptAbbreviation">
                        <a-input v-model="addForm.deptAbbreviation"  placeholder="请输入考核编号"/>
                    </a-form-model-item>

                

       
        </a-form-model>
    </div>
    </a-spin>
    <template slot="footer">
        <a-button key="back" @click="businessVisible = false">
        取消
        </a-button>
        <a-button key="submit" type="primary" @click="save">
        保存
        </a-button>
    </template>
  </a-modal>
</template>

<script>
import {BaseList,AreaList,AddDepartment,EditDepartment,uploadOne,ShowImg} from '@/network/api'
import {buildAreaTree,getBobimg} from '@/utils/utils.js'
import debounce from 'lodash/debounce'

export default {
  data() {
    return {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
      loading:false,
      spinning:false,
      dialog:true,
      quanVisible:false,
      addForm: {
        
      },
      rules:{
        deptName:[
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        deptBusinessType:[
          { required: true, message: '请选择', trigger: 'blur' },
        ],
        deptAbbreviation:[
          { required: true, message: '请选择', trigger: 'blur' },
        ],
        jurisdiction:[
          { required: true, message: '请选择', trigger: 'blur' },
        ],
      },
     title:'新增考核依据',
      isEdit:0,

    }
  },
  created(){
      this.save = debounce(this.save,500)//保存防止重复点击
  },
  methods:{
    addQuan(val,record){
            this.quanVisible = true;

          this.$nextTick(()=>{
              this.$refs.ruleForm.resetFields();
             document.querySelector('.ant-modal-body').scrollTop = 0;    
          })
          
         
      

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
     
    },
     onEditSubmit(){
      
    },
  }
}
</script>