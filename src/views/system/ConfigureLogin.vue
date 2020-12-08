<template>
  <div class="configure_login_box">
    <div class="configure_login_form">
      <a-spin :spinning="spinning">
      <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" ref="ruleForm" :rules="rules">
        <a-form-model-item label="导航系统名称" prop="sysLoginName">
          <a-input v-model="form.sysHomeName" :maxLength="16" placeholder="请输入导航系统名称" style="width:80%"/>
          <span class="configure_login_tip">最多16个字</span>
        </a-form-model-item>
         <a-form-model-item label="登陆页系统名称" prop="sysLoginName">
          <a-input v-model="form.sysLoginName" placeholder="请输入登陆页系统名称"/>
        </a-form-model-item>
        <a-form-model-item label="技术支持" prop="sysCopyright">
          <a-input v-model="form.sysCopyright" prefix="©" placeholder="请输入技术支持"/>
        </a-form-model-item>
        <a-form-model-item label="备案号">
          <a-input v-model="form.sysRecordNo" placeholder="请输入备案号"/>
        </a-form-model-item>
        <a-form-model-item label="备案号链接">
          <a-input v-model="form.sysCopyrightUrl" placeholder="请输入备案号链接"/>
        </a-form-model-item>
        <a-form-model-item label="上传图片">
          <a-row type="flex" justify="start" class="upload_enclosure">
             <a-col flex="100px">
                <a-upload
                    name="avatar"
                    list-type="picture-card"
                    class="avatar-uploader"
                    :show-upload-list="false"
                    :before-upload="uploadOne"
                >
                    <img v-if="form.sysLoginImage != 0" :src="pathUrl.imgurl + form.sysLoginImage" class="login_image" alt="avatar" />
                    <div v-else>
                        <a-icon :type="loading ? 'loading' : 'plus'" />
                        <div class="ant-upload-text">
                            上传背景图
                        </div>
                    </div>
                </a-upload>
            </a-col>
            <!-- <a-col flex="100px">
                <a-upload
                    name="avatar"
                    list-type="picture-card"
                    class="avatar-uploader"
                    :show-upload-list="false"
                    :before-upload="uploadOne"
                >
                    <img v-if="form.sysLogo != 0" :src="pathUrl.imgurl + form.sysLogo" alt="avatar" />
                    <div v-else>
                        <a-icon :type="loading ? 'loading' : 'plus'" />
                        <div class="ant-upload-text">
                            上传logo
                        </div>
                    </div>
                </a-upload>
            </a-col> -->
          </a-row>
        </a-form-model-item>

        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="save">
            保存
          </a-button>
        </a-form-model-item>
      </a-form-model>
      </a-spin>
    </div>
  </div>
</template>

<script>
import pathUrl from "@/network/requestUrl";
import {uploadOne,SetLogin,GetLogin} from '@/network/api'
import debounce from 'lodash/debounce'
export default {
  data() {
    return {
      spinning:false,
      pathUrl,
      form:{
        id:'',
        sysCopyright:'',
        sysCopyrightUrl:'',
        sysHomeName:'',
        sysLoginImage:'',
        sysLoginName:'',
        sysLogo:'',
        sysRecordNo:'',
      },
      rules:{
        sysHomeName: [{ required: true, message: '请输入导航系统名称', trigger: 'blur' }],
        sysLoginName: [{ required: true, message: '请输入登陆页系统名称', trigger: 'blur' }],
        sysCopyright: [{ required: true, message: '请输入技术支持', trigger: 'blur' }],
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      loading:false
    }
  },
  created(){
    this.save = debounce(this.save,500)//保存防止重复点击
    this.getData();
  },
  methods:{
    getData(){
      this.spinning = true;
      GetLogin().then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            if(res.data.data){
              this.form = res.data.data;
            }
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
                this.form.sysLoginImage = res.data.data.path;
            };
        })
        return false
    },
    save(){
      
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
         
            this.form.sysCopyright = this.form.sysCopyright
            this.onSubmit();
          
         
        } else {
          return false;
        };
      });
    },
    onSubmit(){
       this.spinning = true;
      SetLogin(this.form).then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            this.getData()
            this.$message.success('保存成功');
          }else{
            this.$message.warning('保存失败')
          };
      });
    }
  }
}
</script>