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
                <a-descriptions-item label="SIM卡号">
                    {{commonFun(addForm.simNo)}}
                </a-descriptions-item>
                <a-descriptions-item label="设备名称">
                    {{commonFun(addForm.deviceName)}}
                </a-descriptions-item>
                <a-descriptions-item label="主从设备">
                    {{commonFun(addForm.msName)}}
                </a-descriptions-item>
                <a-descriptions-item label="设备类型">
                    {{commonFun(addForm.typeName)}}
                </a-descriptions-item>
                <a-descriptions-item label="设备ID">
                    {{commonFun(addForm.deviceId)}}
                </a-descriptions-item>
                <a-descriptions-item label="设备型号">
                    {{commonFun(addForm.deviceModel)}}
                </a-descriptions-item>
                <a-descriptions-item label="IMEI号">
                    {{commonFun(addForm.devideImeiNo)}}
                </a-descriptions-item>
                <a-descriptions-item label="运营商">
                    {{commonFun(addForm.operatorName)}}
                </a-descriptions-item>
                <a-descriptions-item label="厂商ID">
                    {{commonFun(addForm.devideManufacturer)}}
                </a-descriptions-item>
                <a-descriptions-item label="是否标定">
                    <span v-if="addForm.deviceCalibration == 0">是</span>
                    <span v-else>否</span>
                </a-descriptions-item>
                <a-descriptions-item label="防伪码">
                    {{commonFun(addForm.deviceSecurityCode)}}
                </a-descriptions-item>
                <a-descriptions-item label="设备套件">
                    {{commonFun(addForm.kitName)}}
                </a-descriptions-item>
                <a-descriptions-item label="备注">
                     {{commonFun(addForm.deviceRemark)}}
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