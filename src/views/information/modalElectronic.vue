<template>
<div>
  <a-modal v-model="eletronicVisible" :title="title" :maskClosable="false" :keyboard="false" width="700px" v-dialogDrag="dialog">
    <a-spin :spinning="spinning">
    <div>
        <a-form-model :model="formElectronicParmas" ref="ruleForm" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules">
                    <a-form-model-item label="管辖区名称" prop="region">
                        <a-select v-model="formElectronicParmas.region" show-search  :filter-option="filterOption" @change="changeRegion" placeholder="请选择管辖区">
                              <a-select-option v-for="item in originalData" :key="item.areaId">
                                  {{item.areaName}}
                              </a-select-option>
                        </a-select>
                    </a-form-model-item>

                    <a-form-model-item label="上级管辖区" prop="upRegionName">
                            <a-input v-model="formElectronicParmas.upRegionName" placeholder="" disabled />
                    </a-form-model-item> 

                    <a-form-model-item label="管辖区类型" prop="fieldType">
                        <a-select v-model="formElectronicParmas.fieldType" placeholder="请选择管辖区类型">
                              <a-select-option v-for="item in fieldTypeData" :key="item.id">
                                  {{item.name}}
                              </a-select-option>
                        </a-select>
                    </a-form-model-item>

                    <a-form-model-item label="管辖区范围" prop="lat" class="color_input">
                            <a-input v-model="value" placeholder="" @click="drawDence" />
                    </a-form-model-item>                

                    <a-form-model-item label="备注" prop="remark">
                        <a-textarea
                          v-model="formElectronicParmas.remark"
                          placeholder="..."
                          :auto-size="{ minRows: 3}"
                        />
                    </a-form-model-item>


                </a-form-model>
    </div>
    </a-spin>
    <template slot="footer">
        <a-button key="back" @click="eletronicVisible = false">
        取消
        </a-button>
        <a-button key="submit" type="primary" @click="save">
        保存
        </a-button>
    </template>
  </a-modal>
  <drawFence ref="draw_fence" @getPosion="getPosion"></drawFence>
</div>
</template>

<script>
/*!
  @param {Boolean} dialog - 弹框是否拖动
  @param {Boolean} useVisible - 弹框显示隐藏
  @method addRole - 弹框显示方法
*/

import {AddElectronic,EditElectronic,BaseList} from '@/network/api'
import debounce from 'lodash/debounce'
import drawFence from './drawFence.vue'

export default {
  data() {
    return {
      value:'点击进入地图绘制管辖区',
      title:'新增',
      spinning:false,
      dialog:true,
      eletronicVisible:false,
      formElectronicParmas:{
          id:'',
          region:undefined,
          remark:'',
          address:'',
          lat:'',
          lng:'',
          fieldType:undefined,
          regionName:'',
          upRegion:'',
          upRegionName:'',
      },
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
      depList:[],
      roleList:'',
      rules:{
        region:[
          { required: true, message: '请选择管辖区', trigger: 'change' },
        ],
        lat:[
          { required: true, message: '请绘制管辖范围', trigger: 'change' },
        ],
        fieldType:[
          { required: true, message: '请选择管辖区类型', trigger: 'change' },
        ],
      },
      isEdit:0,
      fieldTypeData:[], 
    }
  },
  components:{
    drawFence
  },
  props:{
     originalData: Array,
  },
  created(){
    this.save = debounce(this.save,500)//保存防止重复点击
  },
  methods:{
    addEletronic(val,record){
      this.eletronicVisible = true;
      this.isEdit = val;
      this.$nextTick(()=>{
           this.$refs.ruleForm.resetFields();
          if(val == 0){
            this.title = '新增';
            this.value = '点击进入地图绘制管辖区（已绘制0个点）'
            this.formElectronicParmas.id = '';
            this.formElectronicParmas.address = '';
            this.formElectronicParmas.lat = '';
            this.formElectronicParmas.lng = '';
          }else{
            this.title = '编辑';
            this.formElectronicParmas.id = record.id;
            this.formElectronicParmas.address = record.address;
            this.formElectronicParmas.lng = record.lng;
            this.formElectronicParmas.lat = record.lat;
            this.formElectronicParmas.region = record.region == 0 ? undefined : record.region;
            this.formElectronicParmas.fieldType = record.fieldType;
            this.formElectronicParmas.remark = record.remark;
            this.formElectronicParmas.regionName = record.regionName;
            this.formElectronicParmas.upRegionName = record.upRegionName;
            this.formElectronicParmas.upRegion = record.upRegion;

            let addressArr = [];
            let index = 0;
            if(record.address){
              index =  record.address.split(',').length;
            };
            this.value = '点击进入地图绘制管辖区（已绘制' +  index +'个点）'
          }
      });

      this.getElectronicType();

    },
    getElectronicType(){
      this.spinning = true;
        let params = {
              pid: "10"
            };
        BaseList(params).then(res=>{
           this.spinning = false;
          if(res.data.code == 0){
            this.fieldTypeData = res.data.data
          };
        });
    },

    drawDence(){
      if(this.formElectronicParmas.region){
         this.$refs.draw_fence.drawDence(this.formElectronicParmas,2,this.formElectronicParmas.fieldType)
      }else{
        this.$message.warning('请先选择管辖区名称')
      }
     
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
      AddElectronic(this.formElectronicParmas).then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            this.eletronicVisible = false;
            this.$message.success('保存成功');
            this.$emit('triggerData');
          }else{
            this.$message.warning('保存失败')
          };
      });
    },
    onEditSubmit(){
       this.spinning = true;
      EditElectronic(this.formElectronicParmas).then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            this.eletronicVisible = false;
            this.$message.success('保存成功');
            this.$emit('triggerData');
          }else{
            this.$message.warning('保存失败')
          };
      });
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    getPosion(arr,areaList){
      console.log(areaList)
      this.$refs.ruleForm.clearValidate();
      let latArr = [];
      let lngArr = [];
      let positionList = JSON.parse(arr)[0];
      if(positionList){
         positionList.forEach(cur=>{
            latArr.push(cur.lat);
            lngArr.push(cur.lng);
        });
        let index = 0;
        index =  areaList.length;
        this.value = '点击进入地图绘制管辖区（已绘制' +  index +'个点）'
        this.formElectronicParmas.lat = latArr.join(',');
        this.formElectronicParmas.lng = lngArr.join(',');
        this.formElectronicParmas.address = areaList.join(',');
      }else{
        this.value = '点击进入地图绘制管辖区（已绘制' +  0 +'个点）'
        this.formElectronicParmas.lat = '';
        this.formElectronicParmas.lng = '';
        this.formElectronicParmas.address = '';
      }
     
     
    },
    changeRegion(val){
      let pid = ''
      for (let index = 0; index < this.originalData.length; index++) {
        const element = this.originalData[index];
        if(element.areaId == val){
          this.formElectronicParmas.regionName = element.areaName;
          pid = element.pid
        };
      };

      this.originalData.forEach(cur=>{
          if(pid == cur.areaId){
            this.formElectronicParmas.upRegion = cur.areaId;
            this.formElectronicParmas.upRegionName = cur.areaName;
          };
      });

    }
  }
}
</script>