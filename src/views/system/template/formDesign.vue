<template>
  <div class="desion_box">
     <a-row type="flex" justify="space-between">
        <a-col flex="280px" class="desion_left">
            <h3 class="desion_left_t">控件库</h3>
            <h4 class="desion_left_t1">基本信息</h4>
             
            <ul class="desion_left_l">
                <draggable
                class="dragArea list-group"
                :sort="false"
                :list="list1"
                :move='allow'
                :group="{ name: 'people', pull: 'clone', put: false }"
                @end="end"
            >
                <template v-for="(element,index) in list1" >
                  <li :key="element.controlName" v-if="index<5"><i class="iconfont" :class="element.formIcon"></i>{{ element.controlName }}</li>
                </template>
                
                </draggable>
            </ul>

            <h4 class="desion_left_t1">企业信息</h4>
            <ul class="desion_left_l">
                <draggable
                class="dragArea list-group"
                :sort="false"
                :list="list1"
                :move='allow'
                :group="{ name: 'people', pull: 'clone', put: false }"
                @end="end"
            >
                <template v-for="(element,index) in list1" >
                  <li :key="element.controlName" v-if="index == 5"><i class="iconfont" :class="element.formIcon"></i>{{ element.controlName }}</li>
                </template>
                
                </draggable>
            </ul>

            <h4 class="desion_left_t1">场站信息</h4>
            <ul class="desion_left_l">
                <draggable
                class="dragArea list-group"
                :sort="false"
                :list="list1"
                :move='allow'
                :group="{ name: 'people', pull: 'clone', put: false }"
                @end="end"
            >
                <template v-for="(element,index) in list1" >
                  <li :key="element.controlName" v-if="index > 5 && index< 8"><i class="iconfont" :class="element.formIcon"></i>{{ element.controlName }}</li>
                </template>
                
                </draggable>
            </ul>

            <h4 class="desion_left_t1">车辆信息</h4>
            <ul class="desion_left_l">
                <draggable
                class="dragArea list-group"
                :sort="false"
                :list="list1"
                :move='allow'
                :group="{ name: 'people', pull: 'clone', put: false }"
                @end="end"
            >
                <template v-for="(element,index) in list1" >
                  <li :key="element.controlName" v-if="index >=8 && index< 10"><i class="iconfont" :class="element.formIcon"></i>{{ element.controlName }}</li>
                </template>
                
                </draggable>
            </ul>

            <h4 class="desion_left_t1">线路信息</h4>
            <ul class="desion_left_l">
                <draggable
                class="dragArea list-group"
                :sort="false"
                :list="list1"
                :move='allow'
                :group="{ name: 'people', pull: 'clone', put: false }"
                @end="end"
            >
                <template v-for="(element,index) in list1" >
                  <li :key="element.controlName" v-if="index >=10 && index< 13"><i class="iconfont" :class="element.formIcon"></i>{{ element.controlName }}</li>
                </template>
                
                </draggable>
            </ul>

            <h4 class="desion_left_t1">附件信息</h4>
            <ul class="desion_left_l">
                <draggable
                class="dragArea list-group"
                :sort="false"
                :list="list1"
                :move='allow'
                :group="{ name: 'people', pull: 'clone', put: false }"
                @end="end"
                
            >
                <template v-for="(element,index) in list1" >
                  <li :key="element.controlName" v-if="index >= 13 && index< 21"><i class="iconfont" :class="element.formIcon"></i>{{ element.controlName }}</li>
                </template>
                
                </draggable>
            </ul>

            <h4 class="desion_left_t1">特殊条件</h4>
            <ul class="desion_left_l">
                <draggable
                class="dragArea list-group"
                :sort="false"
                :list="list1"
                :move='allow'
                :group="{ name: 'people', pull: 'clone', put: false }"
                @end="end"
               
            >
                <template v-for="(element,index) in list1" >
                  <li  :key="element.controlName" v-if="index==21"><i class="iconfont" :class="element.formIcon"></i>{{ element.controlName }}</li>
                </template>
                
                </draggable>
            </ul>
        </a-col>
   
        <a-col flex="auto" class="desion_middle">
                
                   
                        <div>
                            <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
                                 <draggable
                                    class="dragArea list-group"
                                    :list="list2"
                                    group="people"
                                    @change="log"
                                >
                                <a-form-model-item :label="element.controlName" v-for="(element,index) in list2" :key="'a' + index" class="widget_form_list" :class="{'widget_form_list_c':element.isSelect}" @click.stop.native="selFrom(index)">
                                    <a-input :placeholder="element.controlRemindContent"   />
                                    <a-icon type="minus-circle" class="del_from"  @click.stop="delModel(index)"/>
                                </a-form-model-item>
                                  </draggable>
                            </a-form-model>
                          
                        </div>
                    
               
        </a-col>

        <a-col flex="340px" class="desion_right">
            <template v-if="list2.length>0">
               <h3 class="desion_right_t">{{list2[currentIdex].controlOriginName}}</h3>
                <div class="desion_right_c">
                    <h4>控件名称 <span>最多20个字</span></h4>
                    <a-input v-model="list2[currentIdex].controlName" placeholder=""   />
                </div>
      
                <div class="desion_right_c">
                  <h4>提示文字 <span>最多20字</span></h4>
                  <a-input  v-model="list2[currentIdex].controlRemindContent"  />
                </div>

                <div class="desion_right_c" v-if="list2[currentIdex].controlFormType == 2">
                  <h4>有效日期最大选择范围(天) <span>1~365</span></h4>
                  <a-input-number v-model="list2[currentIdex].maxExpired" :min="1" :max="365" />
                </div>

                <div class="desion_right_c" v-if="list2[currentIdex].controlFormType == 3">
                  <h4>默认值 <span>分号隔开</span></h4>
                  <a-input  v-model="list2[currentIdex].permitTime" />
                </div>

                <div class="desion_right_c" v-if="list2[currentIdex].controlFormType == 3 || list2[currentIdex].controlFormType == 4">
                  <h4>允许添加多个</h4>
                 
                  <a-radio-group name="radioGroup" v-model="list2[currentIdex].permitMore">
                    <a-radio :value="1">
                      是
                    </a-radio>
                    <a-radio :value="0">
                      否
                    </a-radio>
                  </a-radio-group>
                </div>

                 <div class="desion_right_c" v-if="list2[currentIdex].controlFormType == 7">
                  <h4>关联运输企业</h4>
                 
                  <a-radio-group name="radioGroup" v-model="list2[currentIdex].associateDept">
                    <a-radio :value="1">
                      是
                    </a-radio>
                    <a-radio :value="0">
                      否
                    </a-radio>
                  </a-radio-group>
                </div>

                <div class="desion_right_c" v-if="list2[currentIdex].controlFormType == 8">
                  <h4>关联工地管辖区</h4>
                 
                  <a-radio-group name="radioGroup" v-model="list2[currentIdex].associateDept">
                    <a-radio :value="1">
                      不关联
                    </a-radio>
                    <a-radio :value="2">
                      关联-不跨区域
                    </a-radio>
                    <a-radio :value="3">
                      关联-跨区
                    </a-radio>
                  </a-radio-group>
                </div>

                <div class="desion_right_c" v-if="list2[currentIdex].controlFormType == 9">
                  <h4>数据选择项</h4>
                  <div>
                    <a-row type="flex" align="middle">
                       <a-col :span="16">
                          <a-radio-group name="radioGroup" v-model="limitData" @change="changeLimit">
                            <a-radio :value="0">
                              不限制（多选）
                            </a-radio>
                            <a-radio :value="1">
                              限制
                            </a-radio>
                          </a-radio-group>
                       </a-col>
                       <a-col :span="8">
                         <div class="limit_data">
                            <a-input-number v-model="list2[currentIdex].dataSelect" :min="0" :max="vehicleTypeList.length" :disabled="limitData==0"/>
                          </div>
                       </a-col>
                    </a-row>
                   
                    
                  </div>
                  
                </div>

                <div class="desion_right_c" v-if="list2[currentIdex].controlFormType == 10">
                  <h4>关联车辆调用企业</h4>
                  <a-radio-group name="radioGroup" v-model="list2[currentIdex].associateDept">
                    <a-radio :value="1">
                      是
                    </a-radio>
                    <a-radio :value="0">
                      否
                    </a-radio>
                  </a-radio-group>
                  
                </div>

                <div class="desion_right_c" v-if="list2[currentIdex].controlFormType == 9  || list2[currentIdex].controlFormType == 10">
                  <h4>车辆类型选项</h4>
                  <div>
                    <a-checkbox  @change="onCheckAllChange">
                      全部
                    </a-checkbox>
                    <a-checkbox-group v-model="list2[currentIdex].vehicleTypeSelect">
                       <a-row>
                         <a-col :span="8" v-for="item in vehicleTypeList" :key="item.id" >
                            <a-checkbox :value="item.id">
                              {{item.name}}
                            </a-checkbox>
                         </a-col>
                         
                       </a-row>
                       
                    </a-checkbox-group>
                    
                  </div>
                  
                </div>


                <div class="desion_right_c" v-if="list2[currentIdex].controlFormType == 9 || list2[currentIdex].controlFormType == 10">
                  <h4>数据禁选范围</h4>
                  <div>
                    <a-checkbox-group v-model="list2[currentIdex].vehicleProhibitSelect">
                       <a-row>
                         <a-col :span="8">
                            <a-checkbox value="1">
                             黑名单
                            </a-checkbox>
                         </a-col>
                         <a-col :span="8">
                           <a-checkbox value="2">
                             异常
                            </a-checkbox>
                         </a-col>
                         <a-col :span="8">
                           <a-checkbox value="3">
                             故障
                            </a-checkbox>
                         </a-col>
                         <a-col :span="8">
                           <a-checkbox value="4">
                             离线
                            </a-checkbox>
                         </a-col>
                         <a-col :span="8">
                           <a-checkbox value="5">
                             不合格
                            </a-checkbox>
                         </a-col>
                         <a-col :span="8">
                           <a-checkbox value="6">
                             停运
                            </a-checkbox>
                         </a-col>
                         
                       </a-row>
                       
                    </a-checkbox-group>
                    
                  </div>
                  
                </div>

                 <div class="desion_right_c" v-if="list2[currentIdex].controlFormType == 12">
                  <h4>关联道路名单</h4>
                  <a-radio-group name="radioGroup" v-model="list2[currentIdex].associateRoadName">
                    <a-radio :value="1">
                      是
                    </a-radio>
                    <a-radio :value="0">
                      否
                    </a-radio>
                  </a-radio-group>
                  
                </div>

                <div class="desion_right_c" v-if="list2[currentIdex].controlFormType == 11 || list2[currentIdex].controlFormType == 12">
                  <h4>线路默认限速值</h4>
                  <a-input-number v-model="list2[currentIdex].defaultLimitSpeed" />
                </div>

                <div class="desion_right_c" v-if="list2[currentIdex].controlFormType == 11 || list2[currentIdex].controlFormType == 12">
                  <h4>关联线路途经管辖区</h4>
                  <a-radio-group name="radioGroup" v-model="list2[currentIdex].routePassArea">
                    <a-radio :value="1">
                      是
                    </a-radio>
                    <a-radio :value="0">
                      否
                    </a-radio>
                  </a-radio-group>
                  
                </div>

                <div class="desion_right_c" 
                v-if="list2[currentIdex].controlFormType == 14 || list2[currentIdex].controlFormType == 15 || list2[currentIdex].controlFormType == 16 || list2[currentIdex].controlFormType == 17 || list2[currentIdex].controlFormType == 18 || list2[currentIdex].controlFormType == 19 || list2[currentIdex].controlFormType == 20 || list2[currentIdex].controlFormType == 21">
                  <h4>上传数量 <span>最多3张</span></h4>
                  <a-select v-model="list2[currentIdex].uploadNum" style="width:120px">
                    <a-select-option value="1">
                      1
                    </a-select-option>
                    <a-select-option value="2">
                      2
                    </a-select-option>
                    <a-select-option value="3">
                      3
                    </a-select-option>
                  </a-select>
                </div>

                

                <div class="desion_right_c" 
                v-if="list2[currentIdex].controlFormType != 14 && list2[currentIdex].controlFormType != 15 && list2[currentIdex].controlFormType != 16 && list2[currentIdex].controlFormType != 17 && list2[currentIdex].controlFormType != 18 && list2[currentIdex].controlFormType != 19 && list2[currentIdex].controlFormType != 20 && list2[currentIdex].controlFormType != 21">
                <h4>预览
                  <a-tooltip>
                  <template slot="title">
                    在手机端预览字段，最多选择五个
                  </template>
                  <a-icon type="info-circle" />
                </a-tooltip>
                </h4>
                <a-radio-group name="radioGroup" v-model="list2[currentIdex].preview">
                    <a-radio :value="1">
                      是
                    </a-radio>
                    <a-radio :value="0">
                      否
                    </a-radio>
                  </a-radio-group>
                </div>
                

                <div class="desion_right_c" v-if="list2[currentIdex].controlFormType != 1 && list2[currentIdex].controlFormType != 22">
                  <h4>验证</h4>
                  <a-checkbox  @change="changeRequired">
                    必填
                  </a-checkbox>
                </div>

            </template>
           
        </a-col>
        
     </a-row>


   
  </div>
</template>

<script>
import draggable from "vuedraggable";
import {BaseList,GetId} from '@/network/api'
export default {
  name: "clone",
  display: "Clone",
  order: 2,
  components: {
    draggable
  },
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      list1: [
        { id:'',workflowId:'',formIcon:'iconAa',controlType:1,controlFormType:1,nextFormId:'',controlOriginName:'证件编号',controlName: "证件编号",controlRemindContent:'系统生成',preview:0,printed:'',maxExpired:'',controlCode:'',permitMore:'',permitTime:'',limitTime:'',fieldIds:'',fieldNames:'',associateField:'',vehicleTypeSelect:'',dataSelect:'',vehicleTypeSelect:'',vehicleProhibitSelect:'',defaultLimitSpeed:'',routePassArea:'',uploadNum:'',associateDept:'',associateRoadName:''},
        { id:'',workflowId:'',formIcon:'iconicon_youxiaoqi2x',controlType:2,controlFormType:2,nextFormId:'',controlOriginName:'申报有效期范围',controlName: "申报有效期范围",controlRemindContent:'年-月-日',preview:0,printed:'',maxExpired:'',controlCode:'',permitMore:'',permitTime:'',limitTime:'',fieldIds:'',fieldNames:'',associateField:'',vehicleTypeSelect:'',dataSelect:'',vehicleTypeSelect:'',vehicleProhibitSelect:'',defaultLimitSpeed:'',routePassArea:'',uploadNum:'',associateDept:'',associateRoadName:''},
        { id:'',workflowId:'',formIcon:'iconshijian',controlType:3,controlFormType:3,nextFormId:'',controlOriginName:'准行时段',controlName: "准行时段",controlRemindContent:'时-分',preview:0,printed:'',maxExpired:'',controlCode:'',permitMore:1,permitTime:'00:00:00~06:00:00',limitTime:'',fieldIds:'',fieldNames:'',associateField:'',vehicleTypeSelect:'',dataSelect:'',vehicleTypeSelect:'',vehicleProhibitSelect:'',defaultLimitSpeed:'',routePassArea:'',uploadNum:'',associateDept:'',associateRoadName:''},
        { id:'',workflowId:'',formIcon:'iconshijian',controlType:4,controlFormType:4,nextFormId:'',controlOriginName:'禁行日期',controlName: "禁行日期",controlRemindContent:'年-月-日',preview:0,printed:'',maxExpired:'',controlCode:'',permitMore:'',permitTime:'',limitTime:'',fieldIds:'',fieldNames:'',associateField:'',vehicleTypeSelect:'',dataSelect:'',vehicleTypeSelect:'',vehicleProhibitSelect:'',defaultLimitSpeed:'',routePassArea:'',uploadNum:'',associateDept:'',associateRoadName:''},
        { id:'',workflowId:'',formIcon:'iconxuanzhong',controlType:5,controlFormType:5,nextFormId:'',controlOriginName:'项目原因',controlName: "项目原因",controlRemindContent:'请输入',preview:0,printed:'',maxExpired:'',controlCode:'',permitMore:'',permitTime:'',limitTime:'',fieldIds:'',fieldNames:'',associateField:'',vehicleTypeSelect:'',dataSelect:'',vehicleTypeSelect:'',vehicleProhibitSelect:'',defaultLimitSpeed:'',routePassArea:'',uploadNum:'',associateDept:'',associateRoadName:''},
        { id:'',workflowId:'',formIcon:'iconxuanzhong',controlType:6,controlFormType:6,nextFormId:'',controlOriginName:'申报企业',controlName: "申报企业",controlRemindContent:'请输入',preview:0,printed:'',maxExpired:'',controlCode:'',permitMore:'',permitTime:'',limitTime:'',fieldIds:'',fieldNames:'',associateField:'',vehicleTypeSelect:'',dataSelect:'',vehicleTypeSelect:'',vehicleProhibitSelect:'',defaultLimitSpeed:'',routePassArea:'',uploadNum:'',associateDept:'',associateRoadName:''},
        { id:'',workflowId:'',formIcon:'iconxuanzhong',controlType:7,controlFormType:7,nextFormId:'',controlOriginName:'申报工地',controlName: "申报工地",controlRemindContent:'请输入',preview:0,printed:'',maxExpired:'',controlCode:'',permitMore:'',permitTime:'',limitTime:'',fieldIds:'',fieldNames:'',associateField:'',vehicleTypeSelect:'',dataSelect:'',vehicleTypeSelect:'',vehicleProhibitSelect:'',defaultLimitSpeed:'',routePassArea:'',uploadNum:'',associateDept:0,associateRoadName:''},
        { id:'',workflowId:'',formIcon:'iconxuanzhong',controlType:8,controlFormType:8,nextFormId:'',controlOriginName:'申报土场',controlName: "申报土场",controlRemindContent:'请输入',preview:0,printed:'',maxExpired:'',controlCode:'',permitMore:'',permitTime:'',limitTime:'',fieldIds:'',fieldNames:'',associateField:'',vehicleTypeSelect:'',dataSelect:'',vehicleTypeSelect:'',vehicleProhibitSelect:'',defaultLimitSpeed:'',routePassArea:'',uploadNum:'',associateDept:'',associateRoadName:''},
        
        { id:'',workflowId:'',formIcon:'iconzhengque',controlType:9,controlFormType:9,nextFormId:'',controlOriginName:'申报车辆',controlName: "申报车辆",controlRemindContent:'请选择',preview:0,printed:'',maxExpired:'',controlCode:'',permitMore:'',permitTime:'',limitTime:'',fieldIds:'',fieldNames:'',associateField:'',vehicleTypeSelect:'',dataSelect:0,vehicleTypeSelect:[],vehicleProhibitSelect:[],defaultLimitSpeed:'',routePassArea:'',uploadNum:'',associateDept:'',associateRoadName:''},
        { id:'',workflowId:'',formIcon:'iconzhengque',controlType:10,controlFormType:10,nextFormId:'',controlOriginName:'借调车辆',controlName: "借调车辆",controlRemindContent:'请选择',preview:0,printed:'',maxExpired:'',controlCode:'',permitMore:'',permitTime:'',limitTime:'',fieldIds:'',fieldNames:'',associateField:'',vehicleTypeSelect:'',dataSelect:'',vehicleTypeSelect:'',vehicleProhibitSelect:'',defaultLimitSpeed:'',routePassArea:'',uploadNum:'',associateDept:0,associateRoadName:''},

        { id:'',workflowId:'',formIcon:'iconweizhi',controlType:11,controlFormType:11,nextFormId:'',controlOriginName:'线路规划',controlName: "线路规划",controlRemindContent:'请绘制',preview:0,printed:'',maxExpired:'',controlCode:'',permitMore:'',permitTime:'',limitTime:'',fieldIds:'',fieldNames:'',associateField:'',vehicleTypeSelect:'',dataSelect:'',vehicleTypeSelect:'',vehicleProhibitSelect:'',defaultLimitSpeed:'',routePassArea:0,uploadNum:'',associateDept:'',associateRoadName:''},
        { id:'',workflowId:'',formIcon:'iconweizhi',controlType:12,controlFormType:12,nextFormId:'',controlOriginName:'线路绘制',controlName: "线路绘制",controlRemindContent:'请绘制',preview:0,printed:'',maxExpired:'',controlCode:'',permitMore:'',permitTime:'',limitTime:'',fieldIds:'',fieldNames:'',associateField:'',vehicleTypeSelect:'',dataSelect:'',vehicleTypeSelect:'',vehicleProhibitSelect:'',defaultLimitSpeed:'',routePassArea:0,uploadNum:'',associateDept:'',associateRoadName:0},
        { id:'',workflowId:'',formIcon:'iconAa',controlType:13,controlFormType:13,nextFormId:'',controlOriginName:'线路信息',controlName: "线路信息",controlRemindContent:'请输入线路信息',preview:0,printed:'',maxExpired:'',controlCode:'',permitMore:'',permitTime:'',limitTime:'',fieldIds:'',fieldNames:'',associateField:'',vehicleTypeSelect:'',dataSelect:'',vehicleTypeSelect:'',vehicleProhibitSelect:'',defaultLimitSpeed:'',routePassArea:'',uploadNum:'',associateDept:'',associateRoadName:''},  


        { id:'',workflowId:'',formIcon:'iconlianjie',controlType:14,controlFormType:14,nextFormId:'',controlOriginName:'出土申报表',controlName: "出土申报表",controlRemindContent:'请上传',preview:0,printed:'',maxExpired:'',controlCode:'',permitMore:'',permitTime:'',limitTime:'',fieldIds:'',fieldNames:'',associateField:'',vehicleTypeSelect:'',dataSelect:'',vehicleTypeSelect:'',vehicleProhibitSelect:'',defaultLimitSpeed:'',routePassArea:'',uploadNum:1,associateDept:'',associateRoadName:''},
        { id:'',workflowId:'',formIcon:'iconlianjie',controlType:15,controlFormType:15,nextFormId:'',controlOriginName:'需求申报表',controlName: "需求申报表",controlRemindContent:'请上传',preview:0,printed:'',maxExpired:'',controlCode:'',permitMore:'',permitTime:'',limitTime:'',fieldIds:'',fieldNames:'',associateField:'',vehicleTypeSelect:'',dataSelect:'',vehicleTypeSelect:'',vehicleProhibitSelect:'',defaultLimitSpeed:'',routePassArea:'',uploadNum:1,associateDept:'',associateRoadName:''},
        { id:'',workflowId:'',formIcon:'iconlianjie',controlType:16,controlFormType:16,nextFormId:'',controlOriginName:'建筑垃圾运输证',controlName: "建筑垃圾运输证",controlRemindContent:'请上传',preview:0,printed:'',maxExpired:'',controlCode:'',permitMore:'',permitTime:'',limitTime:'',fieldIds:'',fieldNames:'',associateField:'',vehicleTypeSelect:'',dataSelect:'',vehicleTypeSelect:'',vehicleProhibitSelect:'',defaultLimitSpeed:'',routePassArea:1,uploadNum:'',associateDept:'',associateRoadName:''},
        { id:'',workflowId:'',formIcon:'iconlianjie',controlType:17,controlFormType:17,nextFormId:'',controlOriginName:'接纳证明',controlName: "接纳证明",controlRemindContent:'请上传',preview:0,printed:'',maxExpired:'',controlCode:'',permitMore:'',permitTime:'',limitTime:'',fieldIds:'',fieldNames:'',associateField:'',vehicleTypeSelect:'',dataSelect:'',vehicleTypeSelect:'',vehicleProhibitSelect:'',defaultLimitSpeed:'',routePassArea:'',uploadNum:1,associateDept:'',associateRoadName:''},
        { id:'',workflowId:'',formIcon:'iconlianjie',controlType:18,controlFormType:18,nextFormId:'',controlOriginName:'保洁责任书',controlName: "保洁责任书",controlRemindContent:'请上传',preview:0,printed:'',maxExpired:'',controlCode:'',permitMore:'',permitTime:'',limitTime:'',fieldIds:'',fieldNames:'',associateField:'',vehicleTypeSelect:'',dataSelect:'',vehicleTypeSelect:'',vehicleProhibitSelect:'',defaultLimitSpeed:'',routePassArea:'',uploadNum:1,associateDept:'',associateRoadName:''},
        { id:'',workflowId:'',formIcon:'iconlianjie',controlType:19,controlFormType:19,nextFormId:'',controlOriginName:'承运协议',controlName: "承运协议",controlRemindContent:'请上传',preview:0,printed:'',maxExpired:'',controlCode:'',permitMore:'',permitTime:'',limitTime:'',fieldIds:'',fieldNames:'',associateField:'',vehicleTypeSelect:'',dataSelect:'',vehicleTypeSelect:'',vehicleProhibitSelect:'',defaultLimitSpeed:'',routePassArea:'',uploadNum:1,associateDept:'',associateRoadName:''},
        { id:'',workflowId:'',formIcon:'iconlianjie',controlType:20,controlFormType:20,nextFormId:'',controlOriginName:'处置计划书',controlName: "处置计划书",controlRemindContent:'请上传',preview:0,printed:'',maxExpired:'',controlCode:'',permitMore:'',permitTime:'',limitTime:'',fieldIds:'',fieldNames:'',associateField:'',vehicleTypeSelect:'',dataSelect:'',vehicleTypeSelect:'',vehicleProhibitSelect:'',defaultLimitSpeed:'',routePassArea:'',uploadNum:1,associateDept:'',associateRoadName:''},
        { id:'',workflowId:'',formIcon:'iconlianjie',controlType:21,controlFormType:21,nextFormId:'',controlOriginName:'工地出土照片',controlName: "工地出土照片",controlRemindContent:'请上传',preview:0,printed:'',maxExpired:'',controlCode:'',permitMore:'',permitTime:'',limitTime:'',fieldIds:'',fieldNames:'',associateField:'',vehicleTypeSelect:'',dataSelect:'',vehicleTypeSelect:'',vehicleProhibitSelect:'',defaultLimitSpeed:'',routePassArea:'',uploadNum:1,associateDept:'',associateRoadName:''},
        { id:'',workflowId:'',formIcon:'iconxuanzhong',controlType:22,controlFormType:22,nextFormId:'',controlOriginName:'延期呈报',controlName: "延期呈报",controlRemindContent:'请输入',preview:0,printed:'',maxExpired:'',controlCode:'',permitMore:'',permitTime:'',limitTime:'',fieldIds:'',fieldNames:'',associateField:'',vehicleTypeSelect:'',dataSelect:'',vehicleTypeSelect:'',vehicleProhibitSelect:'',defaultLimitSpeed:'',routePassArea:'',uploadNum:'',associateDept:'',associateRoadName:''},
      ],
      list2: [
        
      ],
      currentIdex:0,
      isAllow:false,
      limitData:0,
      vehicleTypeList:[],
    };
  },
  props:{
    workflowId:String
  },
  created(){
    this.list1.forEach(cur=>{
            this.$set(cur,'isSelect',false) 
      });
      this.init();
      
  },
  mounted(){
    this.$nextTick(()=>{
      this.getWorkId();
    })
  },
  methods: {
    init(){
      this.getType()
    },
    getWorkId(){
      this.list1.forEach(cur=>{
        cur.workflowId = this.workflowId
      })
    },
    allow(evt){
        // console.log(evt.draggedContext.index)
    // console.log(evt.draggedContext.element)
    // console.log(evt.draggedContext.futureIndex)
    // console.log(evt.relatedContext.index)
    // console.log(evt.relatedContext.element)
    // console.log(evt.relatedContext.list)
       let x = this.list2.some(ele=>{
            return ele.controlName == evt.draggedContext.element.controlName
        });
        this.isAllow = x;
        return  !x
    },
    log: function(evt) {
      this.list2 = JSON.parse(JSON.stringify(this.list2));
      console.log(this.list2)
    },
    selFrom(i){
        this.currentIdex = i;
        this.list2.forEach(cur=>{
             this.$set(cur,'isSelect',false) 
        })

       this.list2[i].isSelect = true;
    },
    end(evt) {
      if(!this.isAllow&&this.list2.length>0){
        this.currentIdex = evt.newIndex;
        this.list2.forEach(cur=>{
            this.$set(cur,'isSelect',false) 
        })
       this.$set(this.list2[evt.newIndex],'isSelect',true);
       this.getId(evt.newIndex)
      };
      
      // evt.item //可以知道拖动的本身
      // evt.to    // 可以知道拖动的目标列表
      // evt.from  // 可以知道之前的列表
      // evt.oldIndex  // 可以知道拖动前的位置
      // evt.newIndex  // 可以知道拖动后的位置
    },
    delModel(index){
      this.list2.forEach(cur=>{
            cur.isSelect = false;
        })


      if(index>0){

          this.$set(this.list2[ index - 1],'isSelect',true);
          this.currentIdex = index - 1;

      }else{
        if(this.list2.length>2){
    
            this.$set(this.list2[ index + 1],'isSelect',true);
            this.currentIdex = index + 1;
          
          
        }else{
          this.currentIdex = 0
        }
      }

      console.log(this.currentIdex)
 
      this.list2.splice(index,1)
      
    },
    getType(){

        let params = {
              pid: 51
            };
        BaseList(params).then(res=>{
          if(res.data.code == 0){
        
                  this.vehicleTypeList = res.data.data
           
            
          };
        });
    },
    changeLimit(val){
      console.log(val)
      if(val.target.value == 0){
        this.list2[this.currentIdex].dataSelect = 0
      }
    },
    onCheckAllChange(e) {
      console.log(this.list2[this.currentIdex].vehicleTypeSelect)
      if(e.target.checked){
        this.vehicleTypeList.forEach(cur=>{
          this.list2[this.currentIdex].vehicleTypeSelect.push(cur.id);
        })
      }else{
        this.list2[this.currentIdex].vehicleTypeSelect = [];
      }
    },
    getFromDesign(){
      this.list2.forEach((cur,index)=>{
        this.$set(cur,'sort',index)
      })
      this.$emit('getFromDesign',this.list2)
    },
    changeRequired(e){
      this.list2[this.currentIdex].required = e.target.checked ? 1 :0
    },
    getId(index){
            GetId().then(res=>{
                if(res.data.code == 0){
                  this.list2[index].id = res.data.data[0]
                }else{
                    this.$message.warning('加载失败')
                };
                
            });
    },
  }
};
</script>
<style scoped></style>