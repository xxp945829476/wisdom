<template>
  <a-modal v-model="blackVisible" :maskClosable="false" :footer="null" width="600px" v-dialogDrag="dialog" v-fullscreen>
    <div slot="title">
      查看黑名单
      <span class="fullscreen_model">
        <a-icon type="fullscreen" class="fullscreen_icon" />
        <a-icon type="fullscreen-exit" class="fullscreen_exit_icon" />
      </span>
    </div>
    <div>
        <a-descriptions :column='2' title="黑名单信息">
          <a-descriptions-item label="黑名单对象" :span="2" v-if='isType==1'>
                {{commonFun(addForm.deptName)}}
            </a-descriptions-item>
            <a-descriptions-item label="黑名单对象" :span="2" v-else>
                {{commonFun(addForm.vehicleNo)}}
            </a-descriptions-item>
            <a-descriptions-item label="黑名单类型">
                {{commonFun(addForm.reasonName)}}
            </a-descriptions-item>
            <a-descriptions-item label="生效时间">
                {{commonFun(addForm.entryTime)}}
            </a-descriptions-item>
            <a-descriptions-item label="失效时间">
                 {{commonFun(addForm.expireTime)}}
            </a-descriptions-item>
            <a-descriptions-item label="辖区">
                {{commonFun(addForm.areaName)}}
            </a-descriptions-item>
            <a-descriptions-item label="录入时间">
                {{commonFun(addForm.createTime)}}
            </a-descriptions-item>
             <a-descriptions-item label="经办人">
                {{commonFun(addForm.createUserName)}}
            </a-descriptions-item>
             <a-descriptions-item label="黑名单说明" :span='2'>
                {{commonFun(addForm.remark)}}
            </a-descriptions-item>
            <a-descriptions-item label="审批材料">
                <img :src="pathUrl.imgurl+addForm.file">
            </a-descriptions-item>
        </a-descriptions>

        <a-descriptions :column='2' title="移除黑名单">

             <a-descriptions-item label="经办人">
                {{commonFun(addForm.removeUserName)}}
            </a-descriptions-item>
             <a-descriptions-item label="移除时间" :span='2'>
                {{commonFun(addForm.expireTime)}}
            </a-descriptions-item>
            <a-descriptions-item label="备注">
                 {{commonFun(addForm.removeRemark)}}
            </a-descriptions-item>
        </a-descriptions>
    </div>
  </a-modal>
</template>

<script>
import {} from '@/network/api'
import pathUrl from "@/network/requestUrl";



export default {
  data() {
    return {
        pathUrl,
      dialog:true,
      blackVisible:false,
      addForm: {
        
      },
      isType:0
    }
  },
  created(){
  },
  methods:{
    commonFun(val){
       return val && val != 0 ? val : '---'
    },  
    viewDetails(record,val){
       
      console.log(record)
      this.blackVisible = true;
      this.addForm = record
      this.isType = val  

     

    },


    


    
  }
}
</script>