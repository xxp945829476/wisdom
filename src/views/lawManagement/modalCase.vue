<template>
    <a-modal v-model="caseVisible" :maskClosable="false" width="80%" :keyboard="false" v-dialogDrag="dialog" v-fullscreen>
        <div slot="title">
        {{title}}
        <span class="fullscreen_model">
            <a-icon type="fullscreen" class="fullscreen_icon" />
            <a-icon type="fullscreen-exit" class="fullscreen_exit_icon" />
        </span>
        </div>
        <div class="case_steps">
            <a-steps :current="current">
            <a-step v-for="item in steps" :key="item.title" :title="item.title" />
            </a-steps>
        </div>
        <a-spin :spinning="spinning">
        <div v-if="current==0">
             <h2 class="case_title">基本信息：</h2>
            <a-form-model :model="addForm" ref="ruleForm" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-row :gutter="40">
                    <a-col :md="6">
                       <a-form-model-item label="执法单号" prop="deptId">
                            <a-select v-model="addForm.deptId" placeholder="请选择所属企业">
                              <a-select-option v-for="item in depList" :key="item.id">
                                  {{item.deptName}}
                              </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="6">
                        <a-form-model-item label="车牌号码" prop="driverName">
                            <a-input v-model="addForm.driverName" placeholder="请输入人员姓名"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="6">
                        <a-form-model-item label="驾驶员" prop="driverTel">
                            <a-input v-model="addForm.driverTel" placeholder="请输入联系电话"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="6">
                        <a-form-model-item label="企业名称" prop="driverIdNo">
                          <a-input v-model="addForm.driverIdNo" placeholder="请输入身份证号"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="6">
                        <a-form-model-item label="驾驶证号" prop="driverLicenseNo">
                            <a-input v-model="addForm.driverLicenseNo" placeholder="请输入驾驶证号"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="6">
                       <a-form-model-item label="经办人" prop="deptId">
                            <a-select v-model="addForm.deptId" placeholder="请选择所属企业">
                              <a-select-option v-for="item in depList" :key="item.id">
                                  {{item.deptName}}
                              </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="6">
                        <a-form-model-item label="检查时间" prop="driverLicenseNo">
                            <a-input v-model="addForm.driverLicenseNo" placeholder="请输入驾驶证号"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="6">
                        <a-form-model-item label="检查地点" prop="driverLicenseNo">
                            <a-input v-model="addForm.driverLicenseNo" placeholder="请输入驾驶证号"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="6">
                        <a-form-model-item label="辖区" prop="driverLicenseNo">
                            <a-input v-model="addForm.driverLicenseNo" placeholder="请输入驾驶证号"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="6">
                        <a-form-model-item label="核准证编号" prop="driverLicenseNo">
                            <a-input v-model="addForm.driverLicenseNo" placeholder="请输入驾驶证号"/>
                        </a-form-model-item>
                    </a-col>
                     <a-col :md="6">
                        <a-form-model-item label="出土工地" prop="driverLicenseNo">
                            <a-input v-model="addForm.driverLicenseNo" placeholder="请输入驾驶证号"/>
                        </a-form-model-item>
                    </a-col>
                     <a-col :md="6">
                        <a-form-model-item label="消纳场" prop="driverLicenseNo">
                            <a-input v-model="addForm.driverLicenseNo" placeholder="请输入驾驶证号"/>
                        </a-form-model-item>
                    </a-col>
                    

                    
                   
                </a-row>        
            </a-form-model>

             <h2 class="case_title">违章类型：</h2>
             <a-radio-group v-model="value" style="width:100%;margin-bottom:20px">
  
                    <a-row>
                    <a-col :span="4">
                        <a-radio value="A">
                        BSD一级报警多媒体
                        </a-radio>
                    </a-col>
                    <a-col :span="4">
                        <a-radio value="B">
                        无证运输
                        </a-radio>
                    </a-col>
                    <a-col :span="4">
                        <a-radio value="C">
                        无放大号牌
                        </a-radio>
                    </a-col>
                    <a-col :span="4">
                        <a-radio value="D">
                        处置卡过期
                        </a-radio>
                    </a-col>
                    <a-col :span="4">
                        <a-radio value="E">
                        密闭不严
                        </a-radio>
                    </a-col>
                    </a-row>
                </a-radio-group>

             <h2 class="case_title">暂扣证件：</h2>
             <a-checkbox-group style="width:100%;margin-bottom:20px">
                    <a-row>
                    <a-col :span="4">
                        <a-checkbox value="A">
                        驾驶证
                        </a-checkbox>
                    </a-col>
                    <a-col :span="4">
                        <a-checkbox value="B">
                        行驶证
                        </a-checkbox>
                    </a-col>
                    <a-col :span="4">
                        <a-checkbox value="C">
                        从业资格证
                        </a-checkbox>
                    </a-col>
                    <a-col :span="4">
                        <a-checkbox value="D">
                        处置备案卡
                        </a-checkbox>
                    </a-col>
                    <a-col :span="4">
                        <a-checkbox value="E">
                        临时卡
                        </a-checkbox>
                    </a-col>
                    </a-row>
                </a-checkbox-group>
        </div>
        <caseHandling  v-if="current==1"></caseHandling>
        </a-spin>
        <template slot="footer">
          <a-button  type="primary" @click="preStep" v-if="current>0">
            上一步
            </a-button>
            <a-button  type="primary" @click="save">
            下一步
            </a-button>
            <a-button key="submit" type="primary" @click="save">
            完成
            </a-button>
        </template>
    </a-modal>
</template>

<script>
import {DepartmentList,AddDriver,EditDriver,uploadOne} from '@/network/api'
import pathUrl from "@/network/requestUrl";
import debounce from 'lodash/debounce'
import caseHandling from './caseHandling.vue'
export default {
  data() {
    return {
      title:'新增人员',
      loading:false,
      dialog:true,
      caseVisible:false,
      addForm:{
        id: '',
        deptId:undefined,
        driverName:'',
        driverTel:'',
        driverIdNo:'',
        driverLicenseNo:'',
        driverPhoto:'',
      },
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
      spinning:false,
      depList:[],
      isEdit:0,
      pathUrl,
      rules:{
        deptId:[
          { required: true, message: '请选择企业', trigger: 'change' },
        ],
        driverName:[
          { required: true, message: '请输入人员姓名', trigger: 'blur' },
        ],
        driverTel:[
          { required: true, message: '请输入人员电话', trigger: 'blur' },
        ],
      },
      current: 0,
      steps: [
        {
          title: '案件录入',
        },
        {
          title: '案件处理',
        },
        {
          title: '案件处罚',
        },
         {
          title: '案件结案',
        },
         {
          title: '案件卷宗',
        },
      ],
    }
  },
  created(){
      this.save = debounce(this.save,500)//保存防止重复点击
  },
  components:{
    caseHandling
  },
  methods:{
    addCase(val,record){
      this.isEdit = val
      this.caseVisible = true;
      this.$nextTick(()=>{
          this.$refs.ruleForm.resetFields();
          if(val == 0){
              this.title = '新增案件';
              this.addForm.id = '';

          }else{
            this.title = '编辑案件';
           
          }
      });
      this.getDepart();
    },
    getDepart(){
         let params = {
            deptName: '',
            pageNum:1,
            pageSize:999,
            deptType:3
         };
         this.spinning = true;
         DepartmentList(params).then(res=>{
             this.spinning = false;
            if(res.data.code == 0){
                this.depList = res.data.data.records;
            }else{
                this.$message.warning('加载失败')
            };
            
        });
    },

    uploadOne(file, fileList){
        let param = new FormData()
        param.append('file',file);
        this.loading = true;
        uploadOne(param).then(res=>{
            this.loading = false;
            if(res.data.code == 0){
                this.addForm.driverPhoto = res.data.data.path;
            };
        })
        return false
    },
    
    save(){
      this.current++
      // this.$refs.ruleForm.validate(valid => {
      //   if (valid) {
      //     if(this.isEdit == 0){
      //        this.onSubmit();
      //     }else{
      //       this.onEditSubmit();
      //     };
         
      //   } else {
      //     return false;
      //   };
      // });
     
    },
    onSubmit(){
      this.spinning = true;

      AddDriver(this.addForm).then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            this.caseVisible = false;
            this.$message.success('保存成功');
            this.$emit('triggerData');
          }else{
            this.$message.warning('保存失败')
          };
      });
    },
     onEditSubmit(){
       this.spinning = true;
      EditDriver(this.addForm).then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            this.caseVisible = false;
            this.$message.success('保存成功');
            this.$emit('triggerData');
          }else{
            this.$message.warning('保存失败')
          };
      });
    },
    preStep(){

         this.current--
      
     
    }
  }
}
</script>