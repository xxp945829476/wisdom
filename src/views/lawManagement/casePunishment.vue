<template>
  <div>
    <h2 class="case_title">案件信息：</h2>
     <a-row type="flex" justify="space-between" :gutter="16">
      <a-col :span="6">
        <label class="case_lable">违章类型：</label>
        <span class="case_span">{{saveData.violationTypeName}}</span>
      </a-col>
      <a-col :span="6">
        <label class="case_lable">车辆：</label>
        <span class="case_span">{{saveData.vehicleNo}}</span>
      </a-col>
      <a-col :span="6">
        <label class="case_lable">违章时间：</label>
        <span class="case_span">{{saveData.checkTime}}</span>
      </a-col>
      <a-col :span="6">
        <label class="case_lable">驾驶员：</label>
        <span class="case_span">{{saveData.driverName}}</span>
      </a-col>
      <a-col :span="24" style="margin-top:15px">
       <label class="case_lable">运输公司：</label>
        <span class="case_span">{{saveData.deptName}}</span>
      </a-col>
    </a-row>

    <h2 class="case_title case_title_top">处罚信息：</h2>
    <div>
      <a-row type="flex" justify="space-between" align="middle" :gutter="16">
        <a-col :span="4" style="display:flex">
          <label class="case_lable">企业：</label>
          <span class="case_span case_span_es" title="">{{saveData.deptName}}</span>
        </a-col>
         <a-col :span="4">
          <label class="case_lable">扣分：</label>
         <a-input-number class="case_inputNumber"  v-model="enterpriseParams.points" />
          <em class="case_em">分</em>
        </a-col> 

         <a-col :span="4">
           
          <label class="case_lable">罚款：</label>
           <a-input-number class="case_inputNumber"  v-model="enterpriseParams.fine"  />
          <em class="case_em">元</em>
        </a-col>
         <a-col :span="4">
           <a-row type="flex" align="middle">
              <a-col :span="9">
                <label class="case_lable">整改结果：</label>
              </a-col>
              <a-col :span="4" class="case_upload">
           
                <a-upload
                  name="avatar"
                  list-type="picture-card"
                  class="avatar-uploader"
                  :show-upload-list="false"
                  :before-upload="uploadEnterpriseOne"
                >
            
                <img style="height:60px;width: 100%" v-if="enterpriseParams.rectificationResults != 0" :src="pathUrl.imgurl + enterpriseParams.rectificationResults" alt="avatar" />
                <div v-else>
                    <a-icon :type="loading ? 'loading' : 'plus'" />
                </div>
              </a-upload>

              </a-col>
           </a-row>
          
             
          
        </a-col>
         <a-col :span="4">
          <a-row type="flex" align="middle">
              <a-col :span="11   ">
                <label class="case_lable">罚金缴纳单：</label>
              </a-col>
              <a-col :span="4" class="case_upload">
           
                <a-upload
                  name="avatar"
                  list-type="picture-card"
                  class="avatar-uploader"
                  :show-upload-list="false"
                  :before-upload="uploadEnterpriseTwo"
                >
            
                <img style="height:60px;width: 100%" v-if="enterpriseParams.finePaymentForm != 0" :src="pathUrl.imgurl + enterpriseParams.finePaymentForm" alt="avatar" />
                <div v-else>
                    <a-icon :type="loading ? 'loading' : 'plus'" />
                </div>
              </a-upload>

              </a-col>
           </a-row>
        </a-col>
         <a-col :span="4">
    
           <a-row type="flex" align="middle">
              <a-col :span="10">
                <label class="case_lable">其他材料：</label>
              </a-col>
              <a-col :span="4" class="case_upload">
           
                <a-upload
                  name="avatar"
                  list-type="picture-card"
                  class="avatar-uploader"
                  :show-upload-list="false"
                  :before-upload="uploadEnterpriseOther"
                >
            
                <img style="height:60px;width: 100%" v-if="enterpriseParams.otherFile != 0" :src="pathUrl.imgurl + enterpriseParams.otherFile" alt="avatar" />
                <div v-else>
                    <a-icon :type="loading ? 'loading' : 'plus'" />
                </div>
              </a-upload>

              </a-col>
           </a-row>
        </a-col>
      </a-row>

      <a-row type="flex" justify="space-between" align="middle" :gutter="16">
        <a-col :span="4" style="display:flex">
          <label class="case_lable">车辆：</label>
          <span class="case_span case_span_es" title="">{{saveData.vehicleNo}}</span>
        </a-col>
         <a-col :span="4">
          <label class="case_lable">扣分：</label>
         <a-input-number class="case_inputNumber"  v-model="vehicleParams.points" />
          <em class="case_em">分</em>
        </a-col> 

         <a-col :span="4">
           
          <label class="case_lable">罚款：</label>
           <a-input-number class="case_inputNumber"  v-model="vehicleParams.fine"  />
          <em class="case_em">元</em>
        </a-col>
         <a-col :span="4">
           <a-row type="flex" align="middle">
              <a-col :span="9">
                <label class="case_lable">整改结果：</label>
              </a-col>
              <a-col :span="4" class="case_upload">
           
                <a-upload
                  name="avatar"
                  list-type="picture-card"
                  class="avatar-uploader"
                  :show-upload-list="false"
                  :before-upload="uploadVehicleOne"
                >
            
                <img style="height:60px;width: 100%" v-if="vehicleParams.rectificationResults != 0" :src="pathUrl.imgurl + vehicleParams.rectificationResults" alt="avatar" />
                <div v-else>
                    <a-icon :type="loading ? 'loading' : 'plus'" />
                </div>
              </a-upload>

              </a-col>
           </a-row>
          
             
          
        </a-col>
         <a-col :span="4">
          <a-row type="flex" align="middle">
              <a-col :span="11   ">
                <label class="case_lable">罚金缴纳单：</label>
              </a-col>
              <a-col :span="4" class="case_upload">
           
                <a-upload
                  name="avatar"
                  list-type="picture-card"
                  class="avatar-uploader"
                  :show-upload-list="false"
                  :before-upload="uploadVehicleTwo"
                >
            
                <img style="height:60px;width: 100%" v-if="vehicleParams.finePaymentForm != 0" :src="pathUrl.imgurl + vehicleParams.finePaymentForm" alt="avatar" />
                <div v-else>
                    <a-icon :type="loading ? 'loading' : 'plus'" />
                </div>
              </a-upload>

              </a-col>
           </a-row>
        </a-col>
         <a-col :span="4">
    
           <a-row type="flex" align="middle">
              <a-col :span="10">
                <label class="case_lable">其他材料：</label>
              </a-col>
              <a-col :span="4" class="case_upload">
           
                <a-upload
                  name="avatar"
                  list-type="picture-card"
                  class="avatar-uploader"
                  :show-upload-list="false"
                  :before-upload="uploadVehicleOther"
                >
            
                <img style="height:60px;width: 100%" v-if="vehicleParams.otherFile != 0" :src="pathUrl.imgurl + vehicleParams.otherFile" alt="avatar" />
                <div v-else>
                    <a-icon :type="loading ? 'loading' : 'plus'" />
                </div>
              </a-upload>

              </a-col>
           </a-row>
        </a-col>
      </a-row>


      <a-row type="flex" justify="space-between" align="middle" :gutter="16">
        <a-col :span="4" style="display:flex">
          <label class="case_lable">驾驶员：</label>
          <span class="case_span case_span_es" title="">{{saveData.driverName}}</span>
        </a-col>
         <a-col :span="4">
          <label class="case_lable">扣分：</label>
         <a-input-number class="case_inputNumber"  v-model="driverParams.points" />
          <em class="case_em">分</em>
        </a-col> 

         <a-col :span="4">
           
          <label class="case_lable">罚款：</label>
           <a-input-number class="case_inputNumber"  v-model="driverParams.fine"  />
          <em class="case_em">元</em>
        </a-col>
         <a-col :span="4">
           <a-row type="flex" align="middle">
              <a-col :span="9">
                <label class="case_lable">整改结果：</label>
              </a-col>
              <a-col :span="4" class="case_upload">
           
                <a-upload
                  name="avatar"
                  list-type="picture-card"
                  class="avatar-uploader"
                  :show-upload-list="false"
                  :before-upload="uploadDriverOne"
                >
            
                <img style="height:60px;width: 100%" v-if="driverParams.rectificationResults != 0" :src="pathUrl.imgurl + driverParams.rectificationResults" alt="avatar" />
                <div v-else>
                    <a-icon :type="loading ? 'loading' : 'plus'" />
                </div>
              </a-upload>

              </a-col>
           </a-row>
          
             
          
        </a-col>
         <a-col :span="4">
          <a-row type="flex" align="middle">
              <a-col :span="11   ">
                <label class="case_lable">罚金缴纳单：</label>
              </a-col>
              <a-col :span="4" class="case_upload">
           
                <a-upload
                  name="avatar"
                  list-type="picture-card"
                  class="avatar-uploader"
                  :show-upload-list="false"
                  :before-upload="uploadDriverTwo"
                >
            
                <img style="height:60px;width: 100%" v-if="driverParams.finePaymentForm != 0" :src="pathUrl.imgurl + driverParams.finePaymentForm" alt="avatar" />
                <div v-else>
                    <a-icon :type="loading ? 'loading' : 'plus'" />
                </div>
              </a-upload>

              </a-col>
           </a-row>
        </a-col>
         <a-col :span="4">
    
           <a-row type="flex" align="middle">
              <a-col :span="10">
                <label class="case_lable">其他材料：</label>
              </a-col>
              <a-col :span="4" class="case_upload">
           
                <a-upload
                  name="avatar"
                  list-type="picture-card"
                  class="avatar-uploader"
                  :show-upload-list="false"
                  :before-upload="uploadDriverOther"
                >
            
                <img style="height:60px;width: 100%" v-if="driverParams.otherFile != 0" :src="pathUrl.imgurl + driverParams.otherFile" alt="avatar" />
                <div v-else>
                    <a-icon :type="loading ? 'loading' : 'plus'" />
                </div>
              </a-upload>

              </a-col>
           </a-row>
        </a-col>
      </a-row>

      <a-row type="flex" justify="space-between" align="middle" :gutter="16">
        <a-col :span="4" style="display:flex">
          <label class="case_lable">工地：</label>
          <span class="case_span case_span_es" title="">{{saveData.fromFieldName}}</span>
        </a-col>
         <a-col :span="4">
          <label class="case_lable">扣分：</label>
         <a-input-number class="case_inputNumber"  v-model="fieldParams.points" />
          <em class="case_em">分</em>
        </a-col> 

         <a-col :span="4">
           
          <label class="case_lable">罚款：</label>
           <a-input-number class="case_inputNumber"  v-model="fieldParams.fine"  />
          <em class="case_em">元</em>
        </a-col>
         <a-col :span="4">
           <a-row type="flex" align="middle">
              <a-col :span="9">
                <label class="case_lable">整改结果：</label>
              </a-col>
              <a-col :span="4" class="case_upload">
           
                <a-upload
                  name="avatar"
                  list-type="picture-card"
                  class="avatar-uploader"
                  :show-upload-list="false"
                  :before-upload="uploadFieldOne"
                >
            
                <img style="height:60px;width: 100%" v-if="fieldParams.rectificationResults != 0" :src="pathUrl.imgurl + fieldParams.rectificationResults" alt="avatar" />
                <div v-else>
                    <a-icon :type="loading ? 'loading' : 'plus'" />
                </div>
              </a-upload>

              </a-col>
           </a-row>
          
             
          
        </a-col>
         <a-col :span="4">
          <a-row type="flex" align="middle">
              <a-col :span="11   ">
                <label class="case_lable">罚金缴纳单：</label>
              </a-col>
              <a-col :span="4" class="case_upload">
           
                <a-upload
                  name="avatar"
                  list-type="picture-card"
                  class="avatar-uploader"
                  :show-upload-list="false"
                  :before-upload="uploadFieldTwo"
                >
            
                <img style="height:60px;width: 100%" v-if="fieldParams.finePaymentForm != 0" :src="pathUrl.imgurl + fieldParams.finePaymentForm" alt="avatar" />
                <div v-else>
                    <a-icon :type="loading ? 'loading' : 'plus'" />
                </div>
              </a-upload>

              </a-col>
           </a-row>
        </a-col>
         <a-col :span="4">
    
           <a-row type="flex" align="middle">
              <a-col :span="10">
                <label class="case_lable">其他材料：</label>
              </a-col>
              <a-col :span="4" class="case_upload">
           
                <a-upload
                  name="avatar"
                  list-type="picture-card"
                  class="avatar-uploader"
                  :show-upload-list="false"
                  :before-upload="uploadFieldOther"
                >
            
                <img style="height:60px;width: 100%" v-if="fieldParams.otherFile != 0" :src="pathUrl.imgurl + fieldParams.otherFile" alt="avatar" />
                <div v-else>
                    <a-icon :type="loading ? 'loading' : 'plus'" />
                </div>
              </a-upload>

              </a-col>
           </a-row>
        </a-col>
      </a-row>


      <a-row type="flex" justify="space-between" align="middle" :gutter="16">
        <a-col :span="4" style="display:flex">
          <label class="case_lable">消纳场：</label>
          <span class="case_span case_span_es" title="">{{saveData.toFieldName}}</span>
        </a-col>
         <a-col :span="4">
          <label class="case_lable">扣分：</label>
         <a-input-number class="case_inputNumber"  v-model="earthParams.points" />
          <em class="case_em">分</em>
        </a-col> 

         <a-col :span="4">
           
          <label class="case_lable">罚款：</label>
           <a-input-number class="case_inputNumber"  v-model="earthParams.fine"  />
          <em class="case_em">元</em>
        </a-col>
         <a-col :span="4">
           <a-row type="flex" align="middle">
              <a-col :span="9">
                <label class="case_lable">整改结果：</label>
              </a-col>
              <a-col :span="4" class="case_upload">
           
                <a-upload
                  name="avatar"
                  list-type="picture-card"
                  class="avatar-uploader"
                  :show-upload-list="false"
                  :before-upload="uploadEarthOne"
                >
            
                <img style="height:60px;width: 100%" v-if="earthParams.rectificationResults != 0" :src="pathUrl.imgurl + earthParams.rectificationResults" alt="avatar" />
                <div v-else>
                    <a-icon :type="loading ? 'loading' : 'plus'" />
                </div>
              </a-upload>

              </a-col>
           </a-row>
          
             
          
        </a-col>
         <a-col :span="4">
          <a-row type="flex" align="middle">
              <a-col :span="11   ">
                <label class="case_lable">罚金缴纳单：</label>
              </a-col>
              <a-col :span="4" class="case_upload">
           
                <a-upload
                  name="avatar"
                  list-type="picture-card"
                  class="avatar-uploader"
                  :show-upload-list="false"
                  :before-upload="uploadEarthTwo"
                >
            
                <img style="height:60px;width: 100%" v-if="earthParams.finePaymentForm != 0" :src="pathUrl.imgurl + earthParams.finePaymentForm" alt="avatar" />
                <div v-else>
                    <a-icon :type="loading ? 'loading' : 'plus'" />
                </div>
              </a-upload>

              </a-col>
           </a-row>
        </a-col>
         <a-col :span="4">
    
           <a-row type="flex" align="middle">
              <a-col :span="10">
                <label class="case_lable">其他材料：</label>
              </a-col>
              <a-col :span="4" class="case_upload">
           
                <a-upload
                  name="avatar"
                  list-type="picture-card"
                  class="avatar-uploader"
                  :show-upload-list="false"
                  :before-upload="uploadEarthOther"
                >
            
                <img style="height:60px;width: 100%" v-if="earthParams.otherFile != 0" :src="pathUrl.imgurl + earthParams.otherFile" alt="avatar" />
                <div v-else>
                    <a-icon :type="loading ? 'loading' : 'plus'" />
                </div>
              </a-upload>

              </a-col>
           </a-row>
        </a-col>
      </a-row>


    </div>
    <h2 class="case_title case_title_top">处罚备注：</h2>
    <div>
       <a-textarea
        v-model="saveData.punishRemark"
        placeholder="请输入处罚备注"
        :auto-size="{ minRows: 5 }"
        />
    </div>
    
  </div>
</template>

<script>
import {uploadOne,AddPunish,EditPunish,SavePunish,EditCase} from '@/network/api'
import pathUrl from "@/network/requestUrl";
export default {
  data() {
    return {
      pathUrl,
      remark:'',
      loading:false,
      enterpriseParams:{
        caseId:'',
        id:'',
        fine:'',
        points:'',
        finePaymentForm:'',
        rectificationResults:'',
        otherFile:'',
        punishObjId:this.saveData.deptId,
        punishObjName:this.saveData.deptName,
        punishObjType:'1001'
      },
      vehicleParams:{
        caseId:'',
        id:'',
        fine:'',
        points:'',
        finePaymentForm:'',
        rectificationResults:'',
        otherFile:'',
        punishObjId:'',
        punishObjName:this.saveData.vehicleNo,
        punishObjType:'1003'
      },
      driverParams:{
        caseId:'',
        id:'',
        fine:'',
        points:'',
        finePaymentForm:'',
        rectificationResults:'',
        otherFile:'',
        punishObjId:this.saveData.driverId,
        punishObjName:this.saveData.driverName,
        punishObjType:'1002'
      },
      fieldParams:{
        caseId:'',
        id:'',
        fine:'',
        points:'',
        finePaymentForm:'',
        rectificationResults:'',
        otherFile:'',
        punishObjId:this.saveData.fromFieldId,
        punishObjName:this.saveData.fromFieldName,
        punishObjType:'1004'
      },
      earthParams:{
        caseId:'',
        id:'',
        fine:'',
        points:'',
        finePaymentForm:'',
        rectificationResults:'',
        otherFile:'',
        punishObjId:this.saveData.toFieldId,
        punishObjName:this.saveData.toFieldName,
        punishObjType:'1005'
      }
    }
  },
  props:{
    saveId:{
      type: String,
      default: ''
    },
    saveData:{
      type:Object,
      default: {}
    }
  },
  created(){
    if(this.saveData.casePunishes){
      this.saveData.casePunishes.forEach(cur=>{
        if(cur.punishObjType == '1001'){
          this.enterpriseParams = cur
        }else if(cur.punishObjType == '1003'){
          this.vehicleParams = cur
        }else if(cur.punishObjType == '1002'){
          this.driverParams = cur
        }else if(cur.punishObjType == '1004'){
          this.fieldParams = cur
        }else if(cur.punishObjType == '1005'){
          this.earthParams = cur
        }
      })
    }
  },
  methods:{
   uploadEnterpriseOne(file, fileList){
        let param = new FormData()
        param.append('file',file);
        console.log(fileList)
        uploadOne(param).then(res=>{
            
            if(res.data.code == 0){
                this.loading = false;
                if(res.data.code == 0){
                    this.enterpriseParams.rectificationResults = res.data.data.path;
                };
            };
        })
        return false
    },
    uploadEnterpriseTwo(file, fileList){
        let param = new FormData()
        param.append('file',file);
        console.log(fileList)
        uploadOne(param).then(res=>{
            
            if(res.data.code == 0){
                this.loading = false;
                if(res.data.code == 0){
                    this.enterpriseParams.finePaymentForm = res.data.data.path;
                };
            };
        })
        return false
    },
    uploadEnterpriseOther(file, fileList){
        let param = new FormData()
        param.append('file',file);
        console.log(fileList)
        uploadOne(param).then(res=>{
            
            if(res.data.code == 0){
                this.loading = false;
                if(res.data.code == 0){
                    this.enterpriseParams.otherFile = res.data.data.path;
                };
            };
        })
        return false
    },
    uploadVehicleOne(file, fileList){
        let param = new FormData()
        param.append('file',file);
        console.log(fileList)
        uploadOne(param).then(res=>{
            
            if(res.data.code == 0){
                this.loading = false;
                if(res.data.code == 0){
                    this.vehicleParams.rectificationResults = res.data.data.path;
                };
            };
        })
        return false
    },
    uploadVehicleTwo(file, fileList){
        let param = new FormData()
        param.append('file',file);
        console.log(fileList)
        uploadOne(param).then(res=>{
            
            if(res.data.code == 0){
                this.loading = false;
                if(res.data.code == 0){
                    this.vehicleParams.finePaymentForm = res.data.data.path;
                };
            };
        })
        return false
    },
    uploadVehicleOther(file, fileList){
        let param = new FormData()
        param.append('file',file);
        console.log(fileList)
        uploadOne(param).then(res=>{
            
            if(res.data.code == 0){
                this.loading = false;
                if(res.data.code == 0){
                    this.vehicleParams.otherFile = res.data.data.path;
                };
            };
        })
        return false
    },
    uploadDriverOne(file, fileList){
        let param = new FormData()
        param.append('file',file);
        console.log(fileList)
        uploadOne(param).then(res=>{
            
            if(res.data.code == 0){
                this.loading = false;
                if(res.data.code == 0){
                    this.driverParams.rectificationResults = res.data.data.path;
                };
            };
        })
        return false
    },
    uploadDriverTwo(file, fileList){
        let param = new FormData()
        param.append('file',file);
        console.log(fileList)
        uploadOne(param).then(res=>{
            
            if(res.data.code == 0){
                this.loading = false;
                if(res.data.code == 0){
                    this.driverParams.finePaymentForm = res.data.data.path;
                };
            };
        })
        return false
    },
    uploadDriverOther(file, fileList){
        let param = new FormData()
        param.append('file',file);
        console.log(fileList)
        uploadOne(param).then(res=>{
            
            if(res.data.code == 0){
                this.loading = false;
                if(res.data.code == 0){
                    this.driverParams.otherFile = res.data.data.path;
                };
            };
        })
        return false
    },
    uploadFieldOne(file, fileList){
        let param = new FormData()
        param.append('file',file);
        console.log(fileList)
        uploadOne(param).then(res=>{
            
            if(res.data.code == 0){
                this.loading = false;
                if(res.data.code == 0){
                    this.fieldParams.rectificationResults = res.data.data.path;
                };
            };
        })
        return false
    },
    uploadFieldTwo(file, fileList){
        let param = new FormData()
        param.append('file',file);
        console.log(fileList)
        uploadOne(param).then(res=>{
            
            if(res.data.code == 0){
                this.loading = false;
                if(res.data.code == 0){
                    this.fieldParams.finePaymentForm = res.data.data.path;
                };
            };
        })
        return false
    },
    uploadFieldOther(file, fileList){
        let param = new FormData()
        param.append('file',file);
        console.log(fileList)
        uploadOne(param).then(res=>{
            
            if(res.data.code == 0){
                this.loading = false;
                if(res.data.code == 0){
                    this.fieldParams.otherFile = res.data.data.path;
                };
            };
        })
        return false
    },
    uploadEarthOne(file, fileList){
        let param = new FormData()
        param.append('file',file);
        console.log(fileList)
        uploadOne(param).then(res=>{
            
            if(res.data.code == 0){
                this.loading = false;
                if(res.data.code == 0){
                    this.earthParams.rectificationResults = res.data.data.path;
                };
            };
        })
        return false
    },
    uploadEarthTwo(file, fileList){
        let param = new FormData()
        param.append('file',file);
        console.log(fileList)
        uploadOne(param).then(res=>{
            
            if(res.data.code == 0){
                this.loading = false;
                if(res.data.code == 0){
                    this.earthParams.finePaymentForm = res.data.data.path;
                };
            };
        })
        return false
    },
    uploadEarthOther(file, fileList){
        let param = new FormData()
        param.append('file',file);
        console.log(fileList)
        uploadOne(param).then(res=>{
            
            if(res.data.code == 0){
                this.loading = false;
                if(res.data.code == 0){
                    this.earthParams.otherFile = res.data.data.path;
                };
            };
        })
        return false
    },
    savePunish(val){
      this.enterpriseParams.caseId = this.saveId;
      this.vehicleParams.caseId = this.saveId;
      this.driverParams.caseId = this.saveId;
      this.fieldParams.caseId = this.saveId;
      this.earthParams.caseId = this.saveId;
        if(this.saveData.casePunishes){
          
          this.editPunish(val);
        }else{
           this.addPunish(val);
        };

        
       
    },
    addPunish(val){

      let params = [
         this.enterpriseParams,
          this.vehicleParams,
          this.driverParams,
      ];
      if(this.fieldParams.punishObjId){
        params.push(this.fieldParams)
      };
      if(this.earthParams.punishObjId){
        params.push(this.earthParams)
      };
  
        
         AddPunish(params).then(res=>{
          
          if(res.data.code == 0){
           
            this.editPunishRemark(val)

          }
        });
    },
    editPunish(val){
      let params = [
          this.enterpriseParams,
          this.vehicleParams,
          this.driverParams,
          this.fieldParams,
          this.earthParams,
        ]
        
         SavePunish(params).then(res=>{
          
          if(res.data.code == 0){
           
            this.editPunishRemark(val)
            
          }
        });
    },
    editPunishRemark(val){
        let params = {
          id:this.saveId,
          punishRemark :this.saveData.punishRemark,
          status:2
        };

        if(this.saveData.status&&this.saveData.status>1){
          params.status = this.saveData.status
        }
        
         EditCase(params).then(res=>{
             if(res.data.code == 0){
            
           
              if(val==1){
                  this.$emit('closeOpinion');
                }else{
                  this.$emit('stepCurrent');
                }
              
            }
           
        });
      }
  }
}
</script>