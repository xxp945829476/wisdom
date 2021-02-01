<template>
  <a-modal v-model="quanVisible" :maskClosable="false" :keyboard="false" width="800px" v-dialogDrag="dialog" v-fullscreen>
    <div slot="title">
      {{title}}
      <span class="fullscreen_model">
        <a-icon type="fullscreen" class="fullscreen_icon" />
        <a-icon type="fullscreen-exit" class="fullscreen_exit_icon" />
      </span>
    </div>
    <a-spin :spinning="spinning">
    <div>
     
      

        <a-form-model  layout="vertical" :model="addForm" ref="ruleForm" :rules="rules">
          
            <a-row :gutter="40">
                <a-col :md="12">
              
                        <a-form-model-item label="考核对象" prop="assessObj">
                            <a-select v-model="addForm.assessObj" placeholder="请选择考核对象" @change="changeAssessObj">
                                    <a-select-option v-for="item in assessList" :key="item.id" :name="item.name">
                                        {{item.name}}
                                    </a-select-option>
                                </a-select>
                            </a-form-model-item>
                
                </a-col>
                <a-col :md="12">
                    <a-form-model-item label="生效时间" prop="effectiveTime">
                         <a-date-picker style="width:100%" show-time placeholder="请选择生效时间" v-model="addForm.effectiveTime" format="YYYY-MM-DD HH:mm:ss"  valueFormat="YYYY-MM-DD HH:mm:ss"/>
                    </a-form-model-item>
                </a-col>

                <a-col :md="12">
                    <a-form-model-item label="考核名称" prop="assessName">
                        <a-input v-model="addForm.assessName"  placeholder="请输入考核名称"/>
                    </a-form-model-item>
                </a-col>

                <a-col :md="12">
                    <a-form-model-item label="考核编号" prop="assessCode">
                        <a-input v-model="addForm.assessCode"  placeholder="请输入考核编号"/>
                    </a-form-model-item>
                </a-col>

                <a-col :md="12">
                    <a-form-model-item label="条目名称" prop="entryName">
                        <a-input v-model="addForm.entryName"  placeholder="请输入条目名称"/>
                    </a-form-model-item>
                </a-col>

                <a-col :md="12">
                    <a-form-model-item label="条目序号" prop="entryCode">
                        <a-input v-model="addForm.entryCode"  placeholder="请输入条目序号"/>
                    </a-form-model-item>
                </a-col>

                <a-col :md="12">
                    <a-form-model-item label="加减选项" prop="addOrReduce">
                       <a-select v-model="addForm.addOrReduce" placeholder="请选择加减选项">
                            <a-select-option v-for="item in pointsList" :key="item.id">
                                {{item.name}}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-col>
                
                <a-col :md="12">
                    <a-form-model-item label="分数" prop="points">
                      
                        <a-input-number  style="width:100%" v-model="addForm.points" placeholder="请输入分数"/>
                    </a-form-model-item>
                </a-col>
                <a-col :md="24">
                    <a-form-model-item label="考核内容" prop="remark">
                        <a-textarea
                        v-model="addForm.remark"
                        placeholder="请输入考核内容"
                        :auto-size="{ minRows: 5 }"
                        />
                    </a-form-model-item>
                </a-col>
                
                <a-col :md="24">
                    <a-form-model-item label="依据文件" prop="assessFile">
                        <a-row type="flex" justify="start" class="upload_enclosure">
                            <a-col flex="100px">
                                <a-upload
                                    name="avatar"
                                    list-type="picture-card"
                                    class="avatar-uploader"
                                    :show-upload-list="false"
                                    :before-upload="uploadOne"
                                >
                                   <img v-if="addForm.assessFile" :src="pathUrl.imgurl + addForm.assessFile" alt="avatar" />
                                    <div v-else>
                                        <a-icon :type="loading ? 'loading' : 'plus'" />
                                        <div class="ant-upload-text">
                                            上传
                                        </div>
                                    </div>
                                </a-upload>
                                <p>选择文件图片</p>
                            </a-col>

                           
                            
                        </a-row>
                        
                    </a-form-model-item>
                </a-col>
            </a-row>        
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
import {BaseList,AddAssess,EditAssess,uploadOne,ShowImg} from '@/network/api'

import debounce from 'lodash/debounce'
import pathUrl from "@/network/requestUrl";

export default {
  data() {
    return {
      layout:'Vertical',
      loading:false,
      spinning:false,
      dialog:true,
      pathUrl,
      quanVisible:false,
      addForm: {
        addOrReduce:undefined,
        assessCode:'',
        assessFile:'',
        assessName:'',
        assessObj:undefined,
        assessObjName:'',
        effectiveTime:'',
        entryCode:'',
        entryName:'',
        id:'',
        points:'',
        remark:'',
      },
      assessList:[],
      pointsList:[],
      rules:{
        assessObj:[
          { required: true, message: '请选择考核对象', trigger: 'change' },
        ],
        effectiveTime:[
          { required: true, message: '请选择生效时间', trigger: 'change' },
        ],
        assessName:[
          { required: true, message: '请输入考核名称', trigger: 'blur' },
        ],
        assessCode:[
          { required: true, message: '请输入考核编号', trigger: 'blur' },
        ],
        entryName:[
          { required: true, message: '请输入条目名称', trigger: 'blur' },
        ],
        entryCode:[
          { required: true, message: '请输入条目序号', trigger: 'blur' },
        ],
        addOrReduce:[
          { required: true, message: '请选择加减选项', trigger: 'change' },
        ],
        points:[
          { required: true, message: '请输入分数', trigger: 'blur' },
        ],
        remark:[
          { required: true, message: '请输入考核内容', trigger: 'blur' },
        ],
        assessFile:[
          { required: true, message: '上传文件', trigger: 'change' },
        ],
      },
     title:'新增考核依据',
      isEdit:0,
      imageUrl:''

    }
  },
  created(){
      this.save = debounce(this.save,500)//保存防止重复点击
  },
  methods:{
    addQuan(val,record){
       console.log(record)
            this.quanVisible = true;
            this.isEdit = val
          this.$nextTick(()=>{
              this.$refs.ruleForm.resetFields();
              if(val == 0){
                 this.title = '新增考核依据';
                  this.addForm.id = '';
                  this.addForm.assessFile = '';
              }else{
                this.title = '编辑考核依据';
                this.addForm.addOrReduce = record.addOrReduce;
                this.addForm.assessCode = record.assessCode;
                this.addForm.assessName = record.assessName;
                this.addForm.assessObj = record.assessObj;
                this.addForm.effectiveTime = record.effectiveTime;
                this.addForm.entryCode = record.entryCode;
                this.addForm.entryName = record.entryName;
                this.addForm.id = record.id;
                this.addForm.points = record.points;
                this.addForm.remark = record.remark;
                this.addForm.assessFile = record.assessFile;
              }
             document.querySelector('.ant-modal-body').scrollTop = 0;    
          })
          
         
        this.getType(1000,1);
        this.getType(1006,2)

    },
    getType(id,val){

        let params = {
              pid: id
            };
        BaseList(params).then(res=>{
          if(res.data.code == 0){
              if(val == 1){
                  this.assessList = res.data.data
              }else if(val == 2){
                  this.pointsList = res.data.data
              }
            
          };
        });
    },
    changeAssessObj(value,param){
      //param自定义参数
      this.addForm.assessObjName = param.data.attrs.name
    },
    uploadOne(file, fileList){
        let param = new FormData()
        param.append('file',file);
        this.loading = true;
        uploadOne(param).then(res=>{
            this.loading = false;
            if(res.data.code == 0){
                this.addForm.assessFile = res.data.data.path;
            };
        })
        return false
    },
    

    save(){

      let params = JSON.parse(JSON.stringify(this.addForm));
      if(params.effectiveTime){
            params.effectiveTime = this.$moment(params.effectiveTime).unix();
        }else{
            params.effectiveTime = 0
        };
      
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if(this.isEdit == 0){
             this.onSubmit(params);
          }else{
            this.onEditSubmit(params);
          };
         
        } else {
          return false;
        };
      });
     
    },
    onSubmit(params){
      this.spinning = true;

      AddAssess(params).then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            this.quanVisible = false;
            this.$message.success('保存成功');
            this.$emit('triggerData');
          }else{
            this.$message.warning('保存失败')
          };
      });
    },
     onEditSubmit(params){
      this.spinning = true;
      EditAssess(params).then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            this.quanVisible = false;
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