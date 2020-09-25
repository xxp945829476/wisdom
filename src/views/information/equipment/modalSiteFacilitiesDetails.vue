<template>
<div>


    <a-modal v-model="vehicleVisible" :maskClosable="false" :footer='null' width="80%" v-dialogDrag="dialog" v-fullscreen class="model_box">
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
                <a-descriptions-item label="设施名称">
                    {{commonFun(addForm.facilityName)}}
                </a-descriptions-item>
                <a-descriptions-item label="设施类型">
                    {{commonFun(addForm.facilityTypeName)}}
                </a-descriptions-item>
                <a-descriptions-item label="设施简称">
                    {{commonFun(addForm.facilityAbbr)}}
                </a-descriptions-item>
                <a-descriptions-item label="所在工地">
                    {{commonFun(addForm.fieldName)}}
                </a-descriptions-item>
                <a-descriptions-item label="所在位置">
                    {{commonFun(addForm.facilityPositionName)}}
                </a-descriptions-item>
                <a-descriptions-item label="绑定设备">
                    {{commonFun(addForm.deviceName)}}
                </a-descriptions-item>
                <a-descriptions-item label="默认视频通道">
                    {{commonFun(addForm.vedioChannelName)}}
                </a-descriptions-item>
                <a-descriptions-item label="负责人">
                    {{commonFun(addForm.facilityFzr)}}
                </a-descriptions-item>
                <a-descriptions-item label="联系电话">
                    {{commonFun(addForm.facilityFzrTel)}}
                </a-descriptions-item>
                <a-descriptions-item label="是否标定">
                    <span v-if="addForm.deviceCalibration == 0">是</span>
                    <span v-else>否</span>
                </a-descriptions-item>
                <a-descriptions-item label="品牌">
                    {{commonFun(addForm.facilityBrand)}}
                </a-descriptions-item>
                <a-descriptions-item label="备注">
                    {{commonFun(addForm.facilityRemark)}}
                </a-descriptions-item>
                <a-descriptions-item label="设施照片">
                    <img v-if="addForm.facilityEnclosure" :src="pathUrl.imgurl + addForm.facilityEnclosure" class="img_style">
                </a-descriptions-item>
               
            </a-descriptions>
        </div>
        </a-spin>

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
    viewDetails(record,val){
        this.vehicleVisible = true;
        this.title = '查看设备';

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