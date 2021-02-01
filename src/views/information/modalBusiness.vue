<template>
  <a-modal v-model="businessVisible" :maskClosable="false" :keyboard="false" width="80%" v-dialogDrag="dialog" v-fullscreen>
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
                <a-col :md="8">
                    <a-form-model-item label="企业名称" prop="deptName">
                        <a-input v-model="addForm.deptName" placeholder="请输入企业名称"/>
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="企业简称" prop="deptAbbreviation">
                        <a-input v-model="addForm.deptAbbreviation"  placeholder="请输入企业简称"/>
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="企业类型" prop="deptBusinessType">
                       <a-select v-model="addForm.deptBusinessType" placeholder="请选择企业类型">
                            <a-select-option v-for="item in depList" :key="item.id">
                                {{item.name}}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="管辖区" prop="jurisdiction">
                       <a-cascader
                            change-on-select
                            :field-names="{ label: 'areaName', value: 'areaId', children: 'children' }"
                            :options="areaList"
                            @change="changeArea"
                            v-model="addForm.jurisdiction"
                            placeholder="请选择管辖区"
                        />
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="企业地址">
                        <a-input v-model="addForm.deptAddress" placeholder="请输入企业地址"/>
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="企业编号">
                        <a-input v-model="addForm.deptCode" placeholder="请输入企业编号"/>
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="企业法人">
                        <a-input v-model="addForm.deptLegalPerson" placeholder="请输入企业法人"/>
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="负责人">
                        <a-input v-model="addForm.deptChargePerson" placeholder="请输入负责人"/>
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="负责人电话">
                        <a-input v-model="addForm.deptChargePersonTel" placeholder="请输入负责人电话"/>
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="车管联系人">
                        <a-input v-model="addForm.deptVehicleManagementContact" placeholder="请输入车管联系人" />
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="车管联系人电话">
                        <a-input v-model="addForm.deptVehicleManagementContactTel" placeholder="请输入车管联系人电话" />
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="备注">
                        <a-input v-model="addForm.deptRemark " />
                    </a-form-model-item>
                </a-col>
                <a-col :md="24">
                    <a-form-model-item label="上传附件">
                        <a-row type="flex" justify="start" class="upload_enclosure">
                            <a-col flex="100px">
                                <a-upload
                                    name="avatar"
                                    list-type="picture-card"
                                    class="avatar-uploader"
                                    :show-upload-list="false"
                                    :before-upload="uploadOne"
                                >
                                    <img v-if="imageUrl" :src="imageUrl" alt="avatar" class="img_style"/>
                                    <div v-else>
                                        <a-icon :type="loading ? 'loading' : 'plus'" />
                                        <div class="ant-upload-text">
                                            上传
                                        </div>
                                    </div>
                                </a-upload>
                                <p>法人身份证</p>
                            </a-col>

                            <a-col flex="100px">
                                <a-upload
                                    name="avatar"
                                    list-type="picture-card"
                                    class="avatar-uploader"
                                    :show-upload-list="false"
                                   :before-upload="uploadOneLicenseUrl"
                                >
                                    <img v-if="imageLicenseUrl" :src="imageLicenseUrl" alt="avatar" />
                                    <div v-else>
                                        <a-icon :type="loading ? 'loading' : 'plus'" />
                                        <div class="ant-upload-text">
                                            上传
                                        </div>
                                    </div>
                                </a-upload>
                                  <p>营业执照</p>
                            </a-col>

                            <a-col flex="100px">
                                <a-upload
                                    name="avatar"
                                    list-type="picture-card"
                                    class="avatar-uploader"
                                    :show-upload-list="false"
                                    :before-upload="uploadQualificationsUrl"
                                >
                                    <img v-if="imageQualificationsUrl" :src="imageQualificationsUrl" alt="avatar" />
                                    <div v-else>
                                        <a-icon :type="loading ? 'loading' : 'plus'" />
                                        <div class="ant-upload-text">
                                            上传
                                        </div>
                                    </div>
                                </a-upload>
                                  <p>资质证明</p>
                            </a-col>

                            <a-col flex="100px">
                                <a-upload
                                    name="avatar"
                                    list-type="picture-card"
                                    class="avatar-uploader"
                                    :show-upload-list="false"
                                    :before-upload="uploadOTherUrl"
                                >
                                    <img v-if="imageOtherUrl" :src="imageOtherUrl" class="img_style" alt="avatar" />
                                    <div v-else>
                                        <a-icon :type="loading ? 'loading' : 'plus'" />
                                        <div class="ant-upload-text">
                                            上传
                                        </div>
                                    </div>
                                </a-upload>
                                  <p>其他</p>
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
import {BaseList,AreaList,AddDepartment,EditDepartment,uploadOne,ShowImg} from '@/network/api'
import {buildAreaTree,getBobimg} from '@/utils/utils.js'
import debounce from 'lodash/debounce'

export default {
  data() {
    return {
      layout:'Vertical',
      loading:false,
      spinning:false,
      dialog:true,
      businessVisible:false,
      addForm: {
        id:'',
        deptAbbreviation: '',
        deptName: '',
        deptBusinessType:undefined,
        deptType:3,
        deptCode:'',
        deptLegalPerson:'',
        deptAddress:'',
        deptChargePerson:'',
        deptChargePersonTel:'',
        deptVehicleManagementContact:'',
        deptVehicleManagementContactTel:'',
        jurisdiction:[],
        province:'',
        city:'',
        region:'',
        deptLegalPersonIdcard:'',
        deptBusinessLicense:'',
        deptQualificationCertificate:'',
        deptOther:''
      },
      rules:{
        deptName:[
          { required: true, message: '请输入企业名称', trigger: 'blur' },
        ],
        deptBusinessType:[
          { required: true, message: '请选择企业类型', trigger: 'blur' },
        ],
        deptAbbreviation:[
          { required: true, message: '请选择企业简称', trigger: 'blur' },
        ],
        jurisdiction:[
          { required: true, message: '请选择管辖区', trigger: 'blur' },
        ],
      },
      depList:[],
      areaList:[],
      isEdit:0,
      title:'',
      imageUrl:'',
      imageLicenseUrl:'',
      imageQualificationsUrl:'',
      imageOtherUrl:'',
      realAreaId:'',
    }
  },
  created(){
      this.save = debounce(this.save,500)//保存防止重复点击
  },
  methods:{
    addBusiness(val,record){
       
        //val 0新增 1编辑
      this.businessVisible = true;
      this.isEdit = val;
      this.addForm.deptType = 3;
      this.$nextTick(()=>{
          this.$refs.ruleForm.resetFields();
          if(val==0){
              this.title = '新增企业';
              this.addForm.id = '';
              this.addForm.realAreaId = '';
              this.imageUrl = '';
              this.imageLicenseUrl = '';
              this.imageQualificationsUrl = '';
              this.imageOtherUrl = '';
              this.addForm.deptRemark = '';
              this.addForm.deptLegalPersonIdcard = '';
              this.addForm.deptBusinessLicense = '';
              this.addForm.deptQualificationCertificate = '';
              this.addForm.deptOther = '';
          }else{
              
              this.title = '编辑企业';
              this.addForm.id = record.id;
              this.addForm.realAreaId =  record.realAreaId;
              this.addForm.deptAbbreviation = record.deptAbbreviation;
              this.addForm.deptAddress = record.deptAddress;
              this.addForm.deptName = record.deptName;
              this.addForm.deptBusinessType = record.deptBusinessType == 0 ? '' : record.deptBusinessType;
              this.addForm.jurisdiction = [record.province,record.city,record.region];
              this.addForm.deptCode = record.deptCode;
              this.addForm.deptLegalPerson = record.deptLegalPerson;
              this.addForm.deptChargePerson = record.deptChargePerson;
              this.addForm.deptChargePersonTel = record.deptChargePersonTel;
              this.addForm.deptVehicleManagementContact = record.deptVehicleManagementContact;
              this.addForm.deptVehicleManagementContactTel = record.deptVehicleManagementContactTel;
              this.addForm.deptRemark = record.deptRemark;
              this.addForm.deptLegalPersonIdcard = record.deptLegalPersonIdcard;
              this.addForm.deptBusinessLicense = record.deptBusinessLicense;
              this.addForm.deptQualificationCertificate = record.deptQualificationCertificate;
              this.addForm.deptOther = record.deptOther;
              this.imageUrl = '';
              this.imageLicenseUrl = '';
              this.imageQualificationsUrl = '';
              this.imageOtherUrl = '';
         
            if(this.addForm.deptLegalPersonIdcard != '0'){
                this.showImg(this.addForm.deptLegalPersonIdcard,1)
            };
            if(this.addForm.deptBusinessLicense != '0'){
                this.showImg(this.addForm.deptBusinessLicense,2)
            };
            if(this.addForm.deptQualificationCertificate != '0'){
                this.showImg(this.addForm.deptQualificationCertificate,3)
            };
            if(this.addForm.deptOther != '0'){
                this.showImg(this.addForm.deptOther,4)
            };
              
            
          };
          document.querySelector('.ant-modal-body').scrollTop = 0;
      });

      this.getDepType();
      this.getAreaList();
    },
    getDepType(){
        let params = {
              pid: "77"
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
    uploadOne(file, fileList){

        let param = new FormData()
        param.append('file',file);
        this.loading = true;
        uploadOne(param).then(res=>{
            this.loading = false;
            if(res.data.code == 0){
                this.addForm.deptLegalPersonIdcard = res.data.data.id;
                this.showImg(res.data.data.id,1) 
            }
            
        })
        return false
    },
    uploadOneLicenseUrl(file, fileList){
        let param = new FormData()
        param.append('file',file);
        this.loading = true;
        uploadOne(param).then(res=>{
            this.loading = false;
            if(res.data.code == 0){
                this.addForm.deptBusinessLicense = res.data.data.id;
                this.showImg(res.data.data.id,2) 
            }
            
        })
        return false
    },
    uploadQualificationsUrl(file, fileList){
        let param = new FormData()
        param.append('file',file);
        this.loading = true;
        uploadOne(param).then(res=>{
            this.loading = false;
            if(res.data.code == 0){
                this.addForm.deptQualificationCertificate = res.data.data.id;
                this.showImg(res.data.data.id,3) 
            }
            
        })
        return false
    },
    uploadOTherUrl(file, fileList){
        let param = new FormData()
        param.append('file',file);
        this.loading = true;
        uploadOne(param).then(res=>{
            this.loading = false;
            if(res.data.code == 0){
                this.addForm.deptOther = res.data.data.id;
                this.showImg(res.data.data.id,4) 
            }
            
        })
        return false
    },
    showImg(id,val){
        //val 1 法人身份证 2 营业执照
        ShowImg(id).then(res=>{
            if(val == 1){
                this.imageUrl = getBobimg(res.data);
            }else if(val == 2){
                this.imageLicenseUrl = getBobimg(res.data);
            }else if(val == 3){
                this.imageQualificationsUrl = getBobimg(res.data);
            }else{
                this.imageOtherUrl = getBobimg(res.data);
            }
            
            
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
      this.spinning = true;
      AddDepartment(this.addForm).then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            this.businessVisible = false;
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
            this.businessVisible = false;
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