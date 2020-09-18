<template>
<div>


    <a-modal v-model="vehicleVisible" :maskClosable="false" width="80%" v-dialogDrag="dialog" v-fullscreen class="model_box">
        <div slot="title">
        {{title}}
        <span class="fullscreen_model">
            <a-icon type="fullscreen" class="fullscreen_icon" />
            <a-icon type="fullscreen-exit" class="fullscreen_exit_icon" />
        </span>
        </div>
        <a-spin :spinning="spinning">
        <div>
            <a-descriptions layout="vertical" bordered>
                <a-descriptions-item label="所属企业">
                    {{commonFun(addForm.deptName)}}
                </a-descriptions-item>
                <a-descriptions-item label="车辆类型">
                    {{commonFun(addForm.vehicleTypeName)}}
                </a-descriptions-item>
                <a-descriptions-item label="车牌号码">
                    {{commonFun(addForm.vehicleNo)}}
                </a-descriptions-item>
                <a-descriptions-item label="车牌颜色">
                    {{commonFun(addForm.vehicleLicenceColorName)}}
                </a-descriptions-item>
                <a-descriptions-item label="车辆颜色">
                    {{commonFun(addForm.vehicleColor)}}
                </a-descriptions-item>
                <a-descriptions-item label="设备名称-主">
                    {{commonFun(addForm.masterName)}}
                </a-descriptions-item>
                <a-descriptions-item label="设备名称-从">
                    {{commonFun(addForm.slaveName)}}
                </a-descriptions-item>
                <a-descriptions-item label="货箱体积">
                    {{commonFun(addForm.volume)}}
                </a-descriptions-item>
                <a-descriptions-item label="车辆简称">
                    {{commonFun(addForm.vehicleAbbr)}}
                </a-descriptions-item>
                <a-descriptions-item label="车主姓名">
                    {{commonFun(addForm.ownerName)}}
                </a-descriptions-item>
                <a-descriptions-item label="联系电话">
                    {{commonFun(addForm.ownerTel)}}
                </a-descriptions-item>
                <a-descriptions-item label="车辆星标">
                    {{commonFun(addForm.vehicleStarBeaconName)}}
                </a-descriptions-item>
                <a-descriptions-item label="车辆品牌">
                     {{commonFun(addForm.vehicleBrandName)}}
                </a-descriptions-item>
                <a-descriptions-item label="车辆型号">
                     {{commonFun(addForm.vehicleModel)}}
                </a-descriptions-item>
                <a-descriptions-item label="车架号">
                    {{commonFun(addForm.vehicleFrameNo)}}
                </a-descriptions-item>
                <a-descriptions-item label="车辆新旧">
                    <span v-if="addForm.vehicleNewOld == 1">新</span>
                    <span v-else>旧</span>
                </a-descriptions-item>
                <a-descriptions-item label="经销商">
                    {{commonFun(addForm.distributorName)}}
                </a-descriptions-item>
                <a-descriptions-item label="出厂日期">
                    {{commonFun(addForm.manufactureTime)}}
                </a-descriptions-item>
                <a-descriptions-item label="年检时间">
                    {{commonFun(addForm.yearlyInspectionTime)}}
                </a-descriptions-item>
                <a-descriptions-item label="有效期">
                    {{commonFun(addForm.expireTime)}}
                </a-descriptions-item>
                <a-descriptions-item label="备注">
                    {{commonFun(addForm.vehicleRemark)}}
                </a-descriptions-item>
                <a-descriptions-item label="车身照片" :span="3">
                    <img v-if="addForm.vehiclePhoto" :src="pathUrl.imgurl + addForm.vehiclePhoto" class="img_style">
                </a-descriptions-item>
                <a-descriptions-item label="车辆行驶证" :span="3">
                    <img v-if="addForm.vehicleDriveLicensePhoto" :src="pathUrl.imgurl + addForm.vehicleDriveLicensePhoto" class="img_style">
                </a-descriptions-item>
                <a-descriptions-item label="车辆登记证" :span="3">
                    <img v-if="addForm.vehicleRegistrationPhoto" :src="pathUrl.imgurl + addForm.vehicleRegistrationPhoto" class="img_style">
                </a-descriptions-item>
                <a-descriptions-item label="准运证开关" :span="3">
                    <img v-if="addForm.vehicleTransportPermitPhoto" :src="pathUrl.imgurl + addForm.vehicleTransportPermitPhoto" class="img_style">
                </a-descriptions-item>
                <a-descriptions-item label="货箱照片" :span="3">
                    <img v-if="addForm.vehicleContainerPhoto" :src="pathUrl.imgurl + addForm.vehicleContainerPhoto" class="img_style">
                </a-descriptions-item>
                <a-descriptions-item label="其他" :span="3">
                    <img v-if="addForm.vehicleOtherPhoto" :src="pathUrl.imgurl + addForm.vehicleOtherPhoto" class="img_style">
                </a-descriptions-item>
            </a-descriptions>
        </div>
        </a-spin>
        <template slot="footer">
                <template v-if="isView">
                    <a-button key="back" type="primary" @click="permit(1)">
                    通过
                    </a-button>
                    <a-button key="submit" @click="permit(2)">
                    驳回
                    </a-button>
                </template>
                <template v-else>
                     <a-button ey="back" @click="vehicleVisible=false">
                         返回
                    </a-button>
                </template>
           
        </template>
    </a-modal>

    <a-modal v-model="rejectVisible" :maskClosable="false" width="400px" v-dialogDrag="dialog">
    </a-modal>

</div>
</template>

<script>

import pathUrl from "@/network/requestUrl";
import {PermitVehicle} from '@/network/api'

export default {
  data() {
    return {
      rejectVisible:false,
      dialog:true,
      vehicleVisible:false,
     title:'查看车辆',
      addForm:{
         
      },
      
      spinning:false,
      pathUrl,
      isView:true
    }
  },
  created(){
    
  },
  methods:{
    commonFun(val){
       return val && val != 0 ? val : '---'
    }, 
    viewVehicle(record,val){
        // val 1 查看 2 审核
      this.vehicleVisible = true;
      if(val == 1){
          this.title = '查看车辆';
          this.isView = false;
      }else{
          this.title = '审核车辆';
          this.isView = true;
      };
      this.$nextTick(()=>{
        this.addForm = record;
        document.querySelector('.model_box .ant-modal-body').scrollTop = 0;
      })

    },
    
    permit(val){
        this.permitOK(val);
    },
    permitOK(val){
        //1通过 2驳回
        let param = {
            id:this.addForm.id,
            permitStatus:val
        };

        PermitVehicle(param).then(res=>{
            if(res.data.code == 0){
                this.vehicleVisible = false;
                if(val == 1){
                   this.$message.success('审核通过');
                }else{
                   this.$message.success('审核驳回');
                };
                this.$emit('triggerData');
            };
        })
    }
   
    
  }
}
</script>