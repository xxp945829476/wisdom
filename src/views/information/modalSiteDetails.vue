<template>


    <a-modal v-model="detailsVisible" :maskClosable="false" width="80%" v-dialogDrag="dialog" v-fullscreen class="model_box">
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
                <a-descriptions-item label="管辖区">
                    {{commonFun(addForm.jurisdiction)}}
                </a-descriptions-item>
                <a-descriptions-item label="工地名称">
                    {{commonFun(addForm.fieldName)}}
                </a-descriptions-item>
                <a-descriptions-item label="地址">
                    {{commonFun(addForm.fieldAddress)}}
                </a-descriptions-item>
                <a-descriptions-item label="有效时间段">
                   {{addForm.fieldStartTime}} ~ {{addForm.fieldExpireTime}}
                </a-descriptions-item>
                <a-descriptions-item label="电子围栏" :span="2">
                    <span v-for="(item,index) in position" :key="'a' + index">{{item.lat}},{{item.lng}}; </span>
                </a-descriptions-item>
                <a-descriptions-item label="工地简称">
                    {{commonFun(addForm.fieldAbbr)}}
                </a-descriptions-item>
                <a-descriptions-item label="工地负责人">
                    {{commonFun(addForm.fieldFzrName)}}
                </a-descriptions-item>
                <a-descriptions-item label="负责人联系电话">
                    {{commonFun(addForm.fieldFzrTel)}}
                </a-descriptions-item>
                <a-descriptions-item label="星标">
                    {{commonFun(addForm.starName)}}
                </a-descriptions-item>
                <a-descriptions-item label="备注">
                    {{commonFun(addForm.starName)}}
                </a-descriptions-item>
                <a-descriptions-item label="联系电话">
                    {{commonFun(addForm.ownerTel)}}
                </a-descriptions-item>
                <a-descriptions-item label="运输企业">
                    {{commonFun(addForm.transportDeptNames)}}
                </a-descriptions-item>
                <a-descriptions-item label="建设单位">
                     {{commonFun(addForm.buildDeptNames)}}
                </a-descriptions-item>
                <a-descriptions-item label="施工单位">
                    {{commonFun(addForm.constructDeptNames)}}
                </a-descriptions-item>
                <a-descriptions-item label="工地编号">
                     {{commonFun(addForm.fieldCode)}}
                </a-descriptions-item>
                
                <a-descriptions-item label="工程类别">
                    {{commonFun(addForm.projectTypeName)}}
                </a-descriptions-item>
                <a-descriptions-item label="货物类型">
                    {{commonFun(addForm.goodsTypeName)}}
                </a-descriptions-item>
                <a-descriptions-item label="设计单位">
                    {{commonFun(addForm.fieldDesignEnterprise)}}
                </a-descriptions-item>
                <a-descriptions-item label="监理单位">
                    {{commonFun(addForm.fieldSupervisorEnterprise)}}
                </a-descriptions-item>
                <a-descriptions-item label="合同价格(万元)">
                    {{commonFun(addForm.contractPrice)}}
                </a-descriptions-item>
                <a-descriptions-item label="建设规模(m³)">
                    {{commonFun(addForm.fieldConstructScale)}}
                </a-descriptions-item>
                <a-descriptions-item label="申报容量(m³)">
                    {{commonFun(addForm.declaredCapacity)}}
                </a-descriptions-item>
                <a-descriptions-item label="建设施工许可证号">
                    {{commonFun(addForm.constructPermitNo)}}
                </a-descriptions-item>
                <a-descriptions-item label="测算单位">
                    {{commonFun(addForm.calculateDeptNames)}}
                </a-descriptions-item>
                <a-descriptions-item label="内转(m³)">
                    {{commonFun(addForm.introversion)}}
                </a-descriptions-item>
                <a-descriptions-item label="外运(m³)">
                    {{commonFun(addForm.outward)}}
                </a-descriptions-item>
                <a-descriptions-item label="国有土地使用证" :span="3">
                    <img v-if="addForm.permitPhoto" :src="pathUrl.imgurl + addForm.permitPhoto" class="img_style">
                </a-descriptions-item>
                <a-descriptions-item label="建设工程规划许可证" :span="3">
                    <img v-if="addForm.planPermitPhoto" :src="pathUrl.imgurl + addForm.planPermitPhoto" class="img_style">
                </a-descriptions-item>
                <a-descriptions-item label="建筑垃圾排放证" :span="3">
                    <img v-if="addForm.wasteDischargePhoto" :src="pathUrl.imgurl + addForm.wasteDischargePhoto" class="img_style">
                </a-descriptions-item>
                <a-descriptions-item label="施工承包合同" :span="3">
                    <img v-if="addForm.contractPhoto" :src="pathUrl.imgurl + addForm.contractPhoto" class="img_style">
                </a-descriptions-item>
                <a-descriptions-item label="建设工程施工许可证" :span="3">
                    <img v-if="addForm.contractPhoto" :src="pathUrl.imgurl + addForm.contractPhoto" class="img_style">
                </a-descriptions-item>
            </a-descriptions>
        </div>
        </a-spin>
        <template slot="footer">
                <template v-if="isView">
                    <a-button key="back" type="primary" @click="permit(1)">
                    通过
                    </a-button>

                     <a-popover v-model="visible" title="驳回理由" trigger="click">
                        <div slot="content">
                            <a-textarea
                            v-model="reason"
                            placeholder="请输入驳回理由"
                            :auto-size="{ minRows: 5 }"
                            />

                            <a-button key="submit" type="primary" @click="permit(2)" class="bh_btn">
                                    确定
                            </a-button>
                             <a-button @click="visible=false" class="bh_btn bh_btn_right">
                                    取消
                            </a-button>
                        </div>
                        <a-button key="submit">
                                            驳回
                            </a-button>
                        </a-popover>
                    
                </template>
                <template v-else>
                     <a-button ey="back" @click="detailsVisible=false">
                         返回
                    </a-button>
                </template>
           
        </template>
    </a-modal>



</template>

<script>

import pathUrl from "@/network/requestUrl";
import {SitePermit} from '@/network/api'

export default {
  data() {
    return {
      reason:'',
      visible:false,
      detailsVisible:false,
      dialog:true,
     title:'查看工地',
      addForm:{
         
      },
      
      spinning:false,
      pathUrl,
      isView:true,
      position:[]
    }
  },
  created(){
    
  },
  methods:{
    commonFun(val){
       return val && val != 0 ? val : '---'
    }, 
    viewDetails(record,val){
        // val 1 查看 2 审核
      this.detailsVisible = true;
      if(val == 1){
          this.title = '查看工地';
          this.isView = false;
      }else{
          this.title = '审核工地';
          this.isView = true;
          this.reason = '';
      };
      
      
      

      this.$nextTick(()=>{
        this.addForm = JSON.parse(JSON.stringify(record));
        record.cityName = record.cityName?record.cityName : '';
        record.regionName = record.regionName?record.regionName : '';
        this.addForm["jurisdiction"] = record.provinceName + '/' + record.cityName + '/' + record.regionName;
        this.addForm.fieldStartTime = this.$moment.unix(record.fieldStartTime).format('YYYY-MM-DD');
        this.addForm.fieldExpireTime = this.$moment.unix(record.fieldExpireTime).format('YYYY-MM-DD');
        let positionArr = [];
        if(record.electronicFence){
            record.electronicFence.lat.split(',').forEach((cur,index)=>{
                positionArr.push({
                    lat:cur,
                    lng:record.electronicFence.lng.split(',')[index]
                })
            })
        }
        this.position = positionArr
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
            permitStatus:val,
            permitRemark:this.reason //意见
        };

        SitePermit(param).then(res=>{
            if(res.data.code == 0){
                this.detailsVisible = false;
                if(val == 1){
                   this.$message.success('审核通过');
                }else{
                   this.visible = false
                   this.$message.success('审核驳回');
                };
                this.$emit('triggerData');
            };
        })
    }
   
    
  }
}
</script>