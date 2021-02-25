<template>
  <div>
     <h2 class="case_title">案件信息：</h2>
     <a-row type="flex" justify="space-between" :gutter="16">
      <a-col :span="6">
        <label class="case_lable">车辆：</label>
        <span class="case_span">{{detailsParams.vehicleNo}}</span>
      </a-col>
      <a-col :span="6">
        <label class="case_lable">驾驶员：</label>
        <span class="case_span">{{detailsParams.driverName}}</span>
      </a-col>
      <a-col :span="6">
        <label class="case_lable">经办人：</label>
        <span class="case_span">{{detailsParams.agentName}}</span>
      </a-col>
      <a-col :span="6">
       <label class="case_lable">运输公司：</label>
        <span class="case_span">{{detailsParams.deptName}}</span>
      </a-col>
    </a-row>

    <h2 class="case_title case_title_top">案件行为：</h2>
     <a-row type="flex" justify="space-between" :gutter="16">
      <a-col :span="6">
        <label class="case_lable">违章类型：</label>
        <span class="case_span">{{detailsParams.violationTypeName}}</span>
      </a-col>
      <a-col :span="6">
        <label class="case_lable">获取方式：</label>
        <span class="case_span">手动录入</span>
      </a-col>
      <a-col :span="6">
        <label class="case_lable">违章时间：</label>
        <span class="case_span">{{detailsParams.violationTime}}</span>
      </a-col>
      <a-col :span="6">
        <label class="case_lable">案件地点：</label>
        <span class="case_span">{{detailsParams.checkArea}}</span>
      </a-col>
    </a-row>

     <h2 class="case_title case_title_top">现场照片：</h2>
     <a-row type="flex" :gutter="16">
      <a-col v-for="(item,index) in imgList" :key="'a'+index" style="margin-right:10px">
        <img :src="pathUrl.imgurl + item" style="width:100px;height:100px">
      </a-col>
    </a-row>


    <h2 class="case_title case_title_top">案件处理：</h2>
    <a-row type="flex" justify="space-between" :gutter="16">
      <a-col :span="6">
        <label class="case_lable">执法人员：</label>
        <span class="case_span">{{detailsParams.enforceLawerName}}</span>
      </a-col>
      <a-col :span="6">
        <label class="case_lable">执法单号：</label>
        <span class="case_span">{{detailsParams.caseNo}}</span>
      </a-col>
      <a-col :span="6">
        <label class="case_lable">处理时间：</label>
        <span class="case_span">{{detailsParams.dealTime}}</span>
      </a-col>
      <a-col :span="6">
        <label class="case_lable">处理意见：</label>
        <span class="case_span">{{detailsParams.enforceDealOpinion}}</span>
      </a-col>
    </a-row>

    <h2 class="case_title case_title_top">案件处罚：</h2>

    <div>
      <a-row type="flex" justify="space-between" align="middle" :gutter="16">
        <a-col :span="4" style="display:flex">
          <label class="case_lable">企业：</label>
          <span class="case_span case_span_es" title="">{{detailsParams.deptName}}</span>
        </a-col>
         <a-col :span="4">
          <label class="case_lable">扣分：</label>
         <span>{{enterpriseParams.points}}</span>
          <em class="case_em">分</em>
        </a-col> 

         <a-col :span="4">
           
          <label class="case_lable">罚款：</label>
            <span>{{enterpriseParams.fine}}</span>
          <em class="case_em">元</em>
        </a-col>
         <a-col :span="4">
           <a-row type="flex" align="middle">
              <a-col :span="9">
                <label class="case_lable">整改结果：</label>
              </a-col>
              <a-col :span="4" class="case_upload">
           
                
            
                <img style="height:60px;width: 100px" v-if="enterpriseParams.rectificationResults" :src="pathUrl.imgurl + enterpriseParams.rectificationResults" alt="avatar" />
                

              </a-col>
           </a-row>
          
             
          
        </a-col>
         <a-col :span="4">
          <a-row type="flex" align="middle">
              <a-col :span="11   ">
                <label class="case_lable">罚金缴纳单：</label>
              </a-col>
              <a-col :span="4" class="case_upload">
           
                
            
                <img style="height:60px;width: 100px" v-if="enterpriseParams.finePaymentForm" :src="pathUrl.imgurl + enterpriseParams.finePaymentForm" alt="avatar" />
               
              </a-col>
           </a-row>
        </a-col>
         <a-col :span="4">
    
           <a-row type="flex" align="middle">
              <a-col :span="10">
                <label class="case_lable">其他材料：</label>
              </a-col>
              <a-col :span="4" class="case_upload">
           
                
            
                <img style="height:60px;;width: 100px" v-if="enterpriseParams.otherFile" :src="pathUrl.imgurl + enterpriseParams.otherFile" alt="avatar" />
               
              </a-col>
           </a-row>
        </a-col>
      </a-row>

      <a-row type="flex" justify="space-between" align="middle" :gutter="16">
        <a-col :span="4" style="display:flex">
          <label class="case_lable">车辆：</label>
          <span class="case_span case_span_es" title="">{{detailsParams.vehicleNo}}</span>
        </a-col>
         <a-col :span="4">
          <label class="case_lable">扣分：</label>
         
         <span>{{vehicleParams.points}}</span>
          <em class="case_em">分</em>
        </a-col> 

         <a-col :span="4">
           
          <label class="case_lable">罚款：</label>
           <span>{{vehicleParams.fine}}</span>
          <em class="case_em">元</em>
        </a-col>
         <a-col :span="4">
           <a-row type="flex" align="middle">
              <a-col :span="9">
                <label class="case_lable">整改结果：</label>
              </a-col>
              <a-col :span="4" class="case_upload">
           
                
            
                <img style="height:60px;width: 100px" v-if="vehicleParams.rectificationResults" :src="pathUrl.imgurl + vehicleParams.rectificationResults" alt="avatar" />
               
              </a-col>
           </a-row>
          
             
          
        </a-col>
         <a-col :span="4">
          <a-row type="flex" align="middle">
              <a-col :span="11   ">
                <label class="case_lable">罚金缴纳单：</label>
              </a-col>
              <a-col :span="4" class="case_upload">
           
               
                <img style="height:60px;width: 100px" v-if="vehicleParams.finePaymentForm" :src="pathUrl.imgurl + vehicleParams.finePaymentForm" alt="avatar" />
                
              </a-col>
           </a-row>
        </a-col>
         <a-col :span="4">
    
           <a-row type="flex" align="middle">
              <a-col :span="10">
                <label class="case_lable">其他材料：</label>
              </a-col>
              <a-col :span="4" class="case_upload">
           
              
                <img style="height:60px;width: 100px" v-if="vehicleParams.otherFile" :src="pathUrl.imgurl + vehicleParams.otherFile" alt="avatar" />
                

              </a-col>
           </a-row>
        </a-col>
      </a-row>


      <a-row type="flex" justify="space-between" align="middle" :gutter="16">
        <a-col :span="4" style="display:flex">
          <label class="case_lable">驾驶员：</label>
          <span class="case_span case_span_es" title="">{{detailsParams.driverName}}</span>
        </a-col>
         <a-col :span="4">
          <label class="case_lable">扣分：</label>
          <span>{{driverParams.points}}</span>
          <em class="case_em">分</em>
        </a-col> 

         <a-col :span="4">
           
          <label class="case_lable">罚款：</label>
            <span>{{driverParams.fine}}</span>
          <em class="case_em">元</em>
        </a-col>
         <a-col :span="4">
           <a-row type="flex" align="middle">
              <a-col :span="9">
                <label class="case_lable">整改结果：</label>
              </a-col>
              <a-col :span="4" class="case_upload">
           
               
            
                <img style="height:60px;width: 100px" v-if="driverParams.rectificationResults" :src="pathUrl.imgurl + driverParams.rectificationResults" alt="avatar" />
               

              </a-col>
           </a-row>
          
             
          
        </a-col>
         <a-col :span="4">
          <a-row type="flex" align="middle">
              <a-col :span="11   ">
                <label class="case_lable">罚金缴纳单：</label>
              </a-col>
              <a-col :span="4" class="case_upload">
           
                
            
                <img style="height:60px;width: 100px" v-if="driverParams.finePaymentForm" :src="pathUrl.imgurl + driverParams.finePaymentForm" alt="avatar" />
               

              </a-col>
           </a-row>
        </a-col>
         <a-col :span="4">
    
           <a-row type="flex" align="middle">
              <a-col :span="10">
                <label class="case_lable">其他材料：</label>
              </a-col>
              <a-col :span="4" class="case_upload">
           
             
                <img style="height:60px;width: 100px" v-if="driverParams.otherFile" :src="pathUrl.imgurl + driverParams.otherFile" alt="avatar" />
               
              </a-col>
           </a-row>
        </a-col>
      </a-row>

      <a-row type="flex" justify="space-between" align="middle" :gutter="16">
        <a-col :span="4" style="display:flex">
          <label class="case_lable">工地：</label>
          <span class="case_span case_span_es" title="">{{detailsParams.fromFieldName}}</span>
        </a-col>
         <a-col :span="4">
          <label class="case_lable">扣分：</label>

         <span>{{fieldParams.points}}</span>
          <em class="case_em">分</em>
        </a-col> 

         <a-col :span="4">
           
          <label class="case_lable">罚款：</label>
            <span>{{fieldParams.fine}}</span>
          <em class="case_em">元</em>
        </a-col>
         <a-col :span="4">
           <a-row type="flex" align="middle">
              <a-col :span="9">
                <label class="case_lable">整改结果：</label>
              </a-col>
              <a-col :span="4" class="case_upload">
           
              
            
                <img style="height:60px;width: 100px" v-if="fieldParams.rectificationResults" :src="pathUrl.imgurl + fieldParams.rectificationResults" alt="avatar" />
                
              </a-col>
           </a-row>
          
             
          
        </a-col>
         <a-col :span="4">
          <a-row type="flex" align="middle">
              <a-col :span="11   ">
                <label class="case_lable">罚金缴纳单：</label>
              </a-col>
              <a-col :span="4" class="case_upload">
           
              
                <img style="height:60px;width: 100px" v-if="fieldParams.finePaymentForm" :src="pathUrl.imgurl + fieldParams.finePaymentForm" alt="avatar" />
               
              </a-col>
           </a-row>
        </a-col>
         <a-col :span="4">
    
           <a-row type="flex" align="middle">
              <a-col :span="10">
                <label class="case_lable">其他材料：</label>
              </a-col>
              <a-col :span="4" class="case_upload">
           
               
            
                <img style="height:60px;width: 100px" v-if="fieldParams.otherFile" :src="pathUrl.imgurl + fieldParams.otherFile" alt="avatar" />
               

              </a-col>
           </a-row>
        </a-col>
      </a-row>


      <a-row type="flex" justify="space-between" align="middle" :gutter="16">
        <a-col :span="4" style="display:flex">
          <label class="case_lable">消纳场：</label>
          <span class="case_span case_span_es" title="">{{detailsParams.toFieldName}}</span>
        </a-col>
         <a-col :span="4">
          <label class="case_lable">扣分：</label>
          <span>{{earthParams.points}}</span>
          <em class="case_em">分</em>
        </a-col> 

         <a-col :span="4">
           
          <label class="case_lable">罚款：</label>
            <span>{{earthParams.fine}}</span>
          <em class="case_em">元</em>
        </a-col>
         <a-col :span="4">
           <a-row type="flex" align="middle">
              <a-col :span="9">
                <label class="case_lable">整改结果：</label>
              </a-col>
              <a-col :span="4" class="case_upload">
           
             
            
                <img style="height:60px;width: 100px" v-if="earthParams.rectificationResults" :src="pathUrl.imgurl + earthParams.rectificationResults" alt="avatar" />
               

              </a-col>
           </a-row>
          
             
          
        </a-col>
         <a-col :span="4">
          <a-row type="flex" align="middle">
              <a-col :span="11   ">
                <label class="case_lable">罚金缴纳单：</label>
              </a-col>
              <a-col :span="4" class="case_upload">
           
               
            
                <img style="height:60px;width: 100px" v-if="earthParams.finePaymentForm" :src="pathUrl.imgurl + earthParams.finePaymentForm" alt="avatar" />
               
              </a-col>
           </a-row>
        </a-col>
         <a-col :span="4">
    
           <a-row type="flex" align="middle">
              <a-col :span="10">
                <label class="case_lable">其他材料：</label>
              </a-col>
              <a-col :span="4" class="case_upload">
           
              
                <img style="height:60px;width: 100px" v-if="earthParams.otherFile" :src="pathUrl.imgurl + earthParams.otherFile" alt="avatar" />
               

              </a-col>
           </a-row>
        </a-col>
      </a-row>


    </div>

  </div>
</template>

<script>
import {CaseList} from '@/network/api'
import pathUrl from "@/network/requestUrl";
export default {
  data(){
    return{
      pathUrl,
      detailsParams:{},
      imgList:[],
      enterpriseParams:{},
      vehicleParams:{},
      driverParams:{},
      fieldParams:{},
      earthParams:{}
    }
  },
  props:{
    saveId:{
      type: String,
      default: ''
    }
  },
  created(){
      this.getDetails();
  },
  methods:{
    getDetails(){
       let params = {
           id:this.saveId,
           pageNum:1,
           pageSize:20,
         };
        CaseList(params).then(res=>{
            if(res.data.code == 0){
                let data = res.data.data.records;
                this.detailsParams = data[0];
                 this.detailsParams.checkTime = this.$moment.unix(this.detailsParams.checkTime).format('YYYY-MM-DD hh:mm:ss')
                    this.detailsParams.violationTime = this.$moment.unix(this.detailsParams.violationTime).format('YYYY-MM-DD hh:mm:ss')
                    this.detailsParams.dealTime = this.$moment.unix(this.detailsParams.dealTime).format('YYYY-MM-DD hh:mm:ss')
                if(data[0].enforceScenePhoto){
                   this.imgList = data[0].enforceScenePhoto.split(',')
                }

                if(this.detailsParams.casePunishes){
                this.detailsParams.casePunishes.forEach(cur=>{
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
               
                console.log(this.detailsParams)
            }
            
        });
    }
  }
}
</script>