<template>
    <a-modal v-model="driverVisible" :maskClosable="false" width="80%" :keyboard="false" v-dialogDrag="dialog" v-fullscreen>
        <div slot="title">
        {{title}}
        <span class="fullscreen_model">
            <a-icon type="fullscreen" class="fullscreen_icon" />
            <a-icon type="fullscreen-exit" class="fullscreen_exit_icon" />
        </span>
        </div>
        <a-spin :spinning="spinning">
        <div>
             
            <a-form-model :layout="'vertical'" :model="addForm" ref="ruleForm" :rules="rules">
                <a-row :gutter="40">
                    <a-col :md="8">
                       <a-form-model-item label="所属企业" prop="deptId">
                            <a-select v-model="addForm.deptId">
                              <a-select-option v-for="item in depList" :key="item.id">
                                  {{item.deptName}}
                              </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="人员姓名" prop="driverName">
                            <a-input v-model="addForm.driverName" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="联系电话" prop="driverTel">
                            <a-input v-model="addForm.driverTel" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="身份证号" prop="driverIdNo">
                          <a-input v-model="addForm.driverIdNo" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="驾驶证号" prop="driverLicenseNo">
                            <a-input v-model="addForm.driverLicenseNo" />
                        </a-form-model-item>
                    </a-col>
                    
                    <a-col :md="24">
                        <a-form-model-item label="人员照片">
                            <a-row type="flex" justify="start" class="upload_enclosure">
                                <a-col flex="100px">
                                    <a-upload
                                        name="avatar"
                                        list-type="picture-card"
                                        class="avatar-uploader"
                                        :show-upload-list="false"
                                        :before-upload="uploadOne"
                                    >
                                        <img v-if="addForm.driverPhoto != 0" :src="pathUrl.imgurl + addForm.driverPhoto" alt="avatar" />
                                        <div v-else>
                                            <a-icon :type="loading ? 'loading' : 'plus'" />
                                            <div class="ant-upload-text">
                                                上传
                                            </div>
                                        </div>
                                    </a-upload>
                                </a-col>

                                
                            </a-row>
                            
                        </a-form-model-item>
                    </a-col>
                </a-row>        
            </a-form-model>
        </div>
        </a-spin>
        <template slot="footer">
            <a-button key="back">
            取消
            </a-button>
            <a-button key="submit" type="primary" @click="save">
            保存
            </a-button>
        </template>
    </a-modal>
</template>

<script>
import {DepartmentList,AddDriver,EditDriver,uploadOne} from '@/network/api'
import pathUrl from "@/network/requestUrl";
import debounce from 'lodash/debounce'
export default {
  data() {
    return {
      title:'新增人员',
      loading:false,
      dialog:true,
      driverVisible:false,
      addForm:{
        id: '',
        deptId:'',
        driverName:'',
        driverTel:'',
        driverIdNo:'',
        driverLicenseNo:'',
        driverPhoto:'',
      },
      labelCol: { span: 5 },
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
      }
    }
  },
  created(){
      this.save = debounce(this.save,500)//保存防止重复点击
  },
  methods:{
    addDriver(val,record){
      this.isEdit = val
      this.driverVisible = true;
      this.$nextTick(()=>{
          this.$refs.ruleForm.resetFields();
          if(val == 0){
              this.title = '新增人员';
              this.addForm.id = '';
              this.addForm.driverPhoto = '';
          }else{
            this.title = '编辑人员';
            this.addForm.id = record.id;
            this.addForm.deptId = record.deptId;
            this.addForm.driverName = record.driverName;
            this.addForm.driverTel = record.driverTel;
            this.addForm.driverIdNo = record.driverIdNo;
            this.addForm.driverLicenseNo = record.driverLicenseNo;
            this.addForm.driverPhoto = record.driverPhoto;
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

      AddDriver(this.addForm).then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            this.driverVisible = false;
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
            this.driverVisible = false;
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