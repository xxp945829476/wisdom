<template>
  <a-modal v-model="businessVisible" :maskClosable="false" :footer="null" width="80%" v-dialogDrag="dialog" v-fullscreen>
    <div slot="title">
      企业详情
      <span class="fullscreen_model">
        <a-icon type="fullscreen" class="fullscreen_icon" />
        <a-icon type="fullscreen-exit" class="fullscreen_exit_icon" />
      </span>
    </div>
    <div>
        <a-descriptions bordered layout="vertical">
            <a-descriptions-item label="企业名称">
                {{commonFun(addForm.deptName)}}
            </a-descriptions-item>
            <a-descriptions-item label="企业简称">
                {{commonFun(addForm.deptAbbreviation)}}
            </a-descriptions-item>
            <a-descriptions-item label="企业类型">
                {{commonFun(addForm.deptTypeName)}}
            </a-descriptions-item>
            <a-descriptions-item label="管辖区">
                {{commonFun(addForm.jurisdictionName)}}
            </a-descriptions-item>
            <a-descriptions-item label="企业地址">
                {{commonFun(addForm.deptAddress)}}
            </a-descriptions-item>
            <a-descriptions-item label="企业编号">
                {{commonFun(addForm.deptCode)}}
            </a-descriptions-item>
            <a-descriptions-item label="企业法人">
                {{commonFun(addForm.deptLegalPerson)}}
            </a-descriptions-item>
            <a-descriptions-item label="负责人">
                {{commonFun(addForm.deptChargePerson)}}
            </a-descriptions-item>
            <a-descriptions-item label="负责人电话">
                {{commonFun(addForm.deptChargePersonTel)}}
            </a-descriptions-item>
            <a-descriptions-item label="车管联系人">
                {{commonFun(addForm.deptVehicleManagementContactTel)}}
            </a-descriptions-item>
            <a-descriptions-item label="车管联系人电话">
                {{commonFun(addForm.deptVehicleManagementContactTel)}}
            </a-descriptions-item>
            <a-descriptions-item label="备注">
                {{commonFun(addForm.deptRemark)}}
            </a-descriptions-item>

            <a-descriptions-item label="法人身份证" :span="3">
                <img :src="imageUrl" class="img_style">
            </a-descriptions-item>
            <a-descriptions-item label="营业执照" :span="3">
                <img :src="imageLicenseUrl" class="img_style">
            </a-descriptions-item>
            <a-descriptions-item label="资质证明" :span="3">
                <img :src="imageQualificationsUrl" class="img_style">
            </a-descriptions-item>
            <a-descriptions-item label="其他" :span="3">
                <img :src="imageOtherUrl" class="img_style">
            </a-descriptions-item>
            
        </a-descriptions>
    </div>
  </a-modal>
</template>

<script>
import {ShowImg} from '@/network/api'
import {getBobimg} from '@/utils/utils.js'


export default {
  data() {
    return {
      dialog:true,
      businessVisible:false,
      addForm: {
        id:'',
        deptAbbreviation: '',
        deptName: '',
        deptType:undefined,
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
      imageUrl:'',
      imageLicenseUrl:'',
      imageQualificationsUrl:'',
      imageOtherUrl:'',
    }
  },
  created(){
  },
  methods:{
    commonFun(val){
       return val && val != 0 ? val : '---'
    },  
    viewDetails(record){
       
        //val 0新增 1编辑
      this.businessVisible = true;
      

              this.addForm.id = record.id;
              this.addForm.deptAbbreviation = record.deptAbbreviation;
              this.addForm.deptName = record.deptName;
              this.addForm.deptAddress = record.deptAddress;
              this.addForm.deptTypeName = record.deptTypeName;
              this.addForm.jurisdictionName = record.realAreaName +','+record.cityName+','+record.realAreaName;
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

            this.$nextTick(()=>{
                document.querySelector('.ant-modal-body').scrollTop = 0;
            })
            

     

    //   this.getDepType();
    //   this.getAreaList();
    },

    changeArea(value){
      this.addForm.province = value[0];
      this.addForm.city = value[1];
      this.addForm.region = value[2];
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

    
  }
}
</script>