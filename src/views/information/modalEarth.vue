<template>
<div>


    <a-modal v-model="siteVisible" :maskClosable="false" width="80%" :keyboard="false" v-dialogDrag="dialog" v-fullscreen>
        <div slot="title">
        {{title}}
        <span class="fullscreen_model">
            <a-icon type="fullscreen" class="fullscreen_icon" />
            <a-icon type="fullscreen-exit" class="fullscreen_exit_icon" />
        </span>
        </div>
        <a-spin :spinning="spinning">
        <div>
            <a-form-model :layout="'vertical'" :model="addForm" ref="ruleForm" :rules="rules">
                <a-row :gutter="40">
                    <a-col :md="8">
                        <a-form-model-item label="管辖区" prop="jurisdiction">
                            <a-cascader
                            change-on-select
                            :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body;}" 
                            :field-names="{ label: 'areaName', value: 'areaId', children: 'children' }"
                            :options="areaList"
                            @change="changeArea"
                            v-model="addForm.jurisdiction"
                            placeholder="请选择管辖区"
                        />
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="土场名称" prop="fieldName">
                           <a-input v-model="addForm.fieldName" placeholder="请输入工地名称"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="地址" prop="fieldAddress">
                            <a-input v-model="addForm.fieldAddress" placeholder="请输入地址"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="有效时间段" prop="time">
                           <a-range-picker style="width:100%"  v-model="addForm.time" format="YYYY-MM-DD" valueFormat="YYYY-MM-DD"/>
                        </a-form-model-item>
                    </a-col>
                    
                    <a-col :md="8">
                        <a-form-model-item label="土场容量(m³)" prop="backfill">
                           <a-input-number style="width:100%" v-model="addForm.backfill" placeholder="请输入回填量" :min="0" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="电子围栏" prop="vehicleColor">
                            <a-input v-model="value" @click="drawDence" placeholder="请输入电子围栏"/>
                        </a-form-model-item>
                    </a-col>
                   
                    <a-col :md="8">
                        <a-form-model-item label="土场简称" prop="fieldAbbr">
                            <a-input v-model="addForm.fieldAbbr" placeholder="请输入工地简称"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="土场负责人" prop="fieldFzrName">
                           <a-input v-model="addForm.fieldFzrName" placeholder="请输入工地负责人"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="负责人联系电话" prop="fieldFzrTel">
                            <a-input v-model="addForm.fieldFzrTel" placeholder="请输入负责人联系电话"/>
                        </a-form-model-item>
                    </a-col>

                   

                    <a-col :md="24">
                        <a-form-model-item label="备注" prop="fieldRemark">
                            <a-textarea
                                v-model="addForm.fieldRemark"
                                placeholder="..."
                                :auto-size="{ minRows: 3}"
                                />
                        </a-form-model-item>
                    </a-col>

                   
                  
                    <a-col :md="8">
                        <a-form-model-item label="土场编号" prop="fieldCode">
                            <a-input v-model="addForm.fieldCode" placeholder="请输入工地编号"/>
                        </a-form-model-item>
                    </a-col>

                     <a-col :md="8">
                        <a-form-model-item label="星标" prop="fieldStarBeacon">
                           <a-select v-model="addForm.fieldStarBeacon"
                           placeholder="请选择星标"
                            :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body;}" allowClear>
                              <a-select-option v-for="item in starList" :key="item.id">
                                  {{item.name}}
                              </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>

<!--                     
                    <a-col :md="8">
                        <a-form-model-item label="工程类别" prop="projectCategory">
                             <a-select v-model="addForm.projectCategory"
                             placeholder="请选择工程类别"
                             :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body;}" allowClear>
                              <a-select-option v-for="item in projectCategoryList" :key="item.id">
                                  {{item.name}}
                              </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col> -->
                    <a-col :md="8">
                        <a-form-model-item label="土场类型" prop="goodsType">
                            <a-select v-model="addForm.goodsType"
                            placeholder="请选择土场类型"
                             :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body;}" allowClear>
                              <a-select-option v-for="item in goodsTypeList" :key="item.id">
                                  {{item.name}}
                              </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                   
                    <a-col :md="8">
                        <a-form-model-item label="监理单位" prop="fieldSupervisorEnterprise">
                            <a-input v-model="addForm.fieldSupervisorEnterprise" placeholder="请输入监理单位"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="合同价格(万元)" prop="contractPrice">
                            <a-input v-model="addForm.contractPrice" placeholder="请输入合同价格"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="土场面积(m³)" prop="fieldConstructScale">
                             <a-input v-model="addForm.fieldConstructScale" placeholder="请输入土场面积"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="日处理能力(m³)" prop="declaredCapacity">
                            <a-input v-model="addForm.declaredCapacity" placeholder="请输入日处理能力" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="卸土费单价(元)" prop="constructPermitNo">
                           <a-input v-model="addForm.constructPermitNo" placeholder="请输入卸土费单价"/>
                        </a-form-model-item>
                    </a-col>
                    
                   
                    <a-col :md="24">
                        <a-form-model-item label="上传附件">
                            <a-row type="flex" justify="start" class="upload_enclosure">
                                <a-col flex="100px">
                                    <a-upload
                                        name="avatar"
                                        list-type="picture-card"
                                        class="avatar-uploader"
                                        :show-upload-list="false"
                                        :before-upload="uploadOne"
                                    >
                                        <img v-if="addForm.permitPhoto != 0" :src="pathUrl.imgurl + addForm.permitPhoto" alt="avatar" />
                                        <div v-else>
                                            <a-icon :type="loading ? 'loading' : 'plus'" />
                                            <div class="ant-upload-text">
                                                上传
                                            </div>
                                        </div>
                                    </a-upload>
                                    <p>冲洗设备</p>
                                </a-col>

                                <a-col flex="100px">
                                    <a-upload
                                        name="avatar"
                                        list-type="picture-card"
                                        class="avatar-uploader"
                                        :show-upload-list="false"
                                        :before-upload="uploadTwo"
                                    >
                                        <img v-if="addForm.planPermitPhoto != 0" :src="pathUrl.imgurl + addForm.planPermitPhoto" alt="avatar" />
                                        <div v-else>
                                            <a-icon :type="loading ? 'loading' : 'plus'" />
                                            <div class="ant-upload-text">
                                                上传
                                            </div>
                                        </div>
                                    </a-upload>
                                        <p>道路硬化设备</p>
                                </a-col>

                                <a-col flex="100px">
                                    <a-upload
                                        name="avatar"
                                        list-type="picture-card"
                                        class="avatar-uploader"
                                       :show-upload-list="false"
                                        :before-upload="uploadThree"
                                    >
                                       <img v-if="addForm.wasteDischargePhoto != 0" :src="pathUrl.imgurl + addForm.wasteDischargePhoto" alt="avatar" />
                                        <div v-else>
                                            <a-icon :type="loading ? 'loading' : 'plus'" />
                                            <div class="ant-upload-text">
                                                上传
                                            </div>
                                        </div>
                                    </a-upload>
                                        <p>隔离护栏</p>
                                </a-col>

                              

                               
                                
                            </a-row>
                            
                        </a-form-model-item>
                    </a-col>
                </a-row>        
            </a-form-model>
        </div>
        </a-spin>
        <template slot="footer">
            <a-button key="back" @click="siteVisible=false">
            取消
            </a-button>
            <a-button key="submit" type="primary" @click="save">
            保存
            </a-button>
        </template>
    </a-modal>
    <drawAreaFence ref="draw_fence" @getPosion="getPosion"></drawAreaFence>
</div>
</template>

<script>
import {BaseList,SiteAdd,SiteEdit,DepartmentList,uploadOne,AreaList} from '@/network/api'
import pathUrl from "@/network/requestUrl";
import debounce from 'lodash/debounce'
import {buildAreaTree} from '@/utils/utils.js'
import drawAreaFence from './drawAreaFence.vue'

export default {
  data() {
    return {
     title:'',
     value:'绘制土场',
      dialog:true,
      siteVisible:false,
      initial:[],
      addForm:{
         excavate:'',
         backfill:'',
         id:'',
         fieldName:'',
         realAreaId:'',
         fieldAddress:'',
         time:undefined,
         fieldExpireTime:'',//结束时间
         fieldStartTime:'',//开始时间
         fieldElectronicFence:'',
         fieldAbbr:'',
         fieldFzrName:'',
         fieldFzrTel:'',
         fieldStarBeacon:undefined,
         fieldRemark:'',
         fieldTransportationEnterprises:[],
         fieldCode:'',
         fieldBuildEnterprises:undefined,
         fieldConstructEnterprise:undefined,
         projectCategory:undefined,
         goodsType:undefined,
         fieldDesignEnterprise:'',
         fieldSupervisorEnterprise:'',
         contractPrice:'',
         fieldConstructScale:'',
         declaredCapacity:'',
         constructPermitNo:'',
         fieldCalculateEnterprise:undefined,
         introversion:'',
         outward:'',
         permitPhoto:'',
         planPermitPhoto:'',
         wasteDischargePhoto:'',
         contractPhoto:'',
         constructPermitPhoto:'',
         jurisdiction:[],
         province:'',
         provinceName:'',
         city:'',
         cityName:'',
         region:'',
         regionName:'',
         fieldType:'',
         address:'',
         lat:'',
         lng:'',
         fieldTransportationEnterprisesName:'',
         fieldBuildEnterprisesName:'',
         fieldConstructEnterpriseName:'',
         fieldCalculateEnterpriseName:'',
         electronicFence:{
                "address": "",
                "fieldType": '',
                "lat": "",
                "lng": "",
                "region": '',
                "upRegion": '',
         },
      },
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
      starList:[],
      areaList:[],
      transportList:[],
      buildList:[],
      constructionList:[],
      calculationList:[],
      projectCategoryList:[],
      goodsTypeList:[],
      isEdit:0,
      loading:false,
      spinning:false,
      pathUrl,
      rules:{
        jurisdiction:[
          { required: true, message: '请选择管辖区', trigger: 'change' },
        ],
        fieldName:[
          { required: true, message: '请输入工地名称', trigger: 'blur' },
        ],
        fieldAddress:[
          { required: true, message: '请输入地址', trigger: 'blur' },
        ],
        time:[
          { required: true, message: '请选择日期', trigger: 'change' },
        ],
        excavate:[
          { required: true, message: '请输入出土量', trigger: 'blur' },
        ],
        backfill:[
          { required: true, message: '请输入回填量', trigger: 'blur' },
        ]
      },
    }
  },
  components:{
      drawAreaFence
  },
  created(){
      this.save = debounce(this.save,500)//保存防止重复点击
  },
  methods:{
    addSite(val,record){
      this.siteVisible = true;
      this.isEdit = val;
      this.addForm.fieldType = 771;
      this.$nextTick(()=>{
          this.$refs.ruleForm.resetFields();
          if(val == 0){
              this.title = '新增土场'
              this.value = '点击进入地图绘制土场（已绘制0个点）'
              this.addForm.id = '';
              this.addForm.fieldStartTime = '';
              this.addForm.fieldStartTime = '';
              this.addForm.realAreaId = '';
              this.addForm.jurisdiction = [];
              this.addForm.time = [];
              this.addForm.permitPhoto = '';
            this.addForm.planPermitPhoto ='';
            this.addForm.wasteDischargePhoto ='';
            this.addForm.contractPhoto = '';
            this.addForm.constructPermitPhoto = '';
              this.addForm.electronicFence = {
                 "address": "",
                "fieldType": '',
                "lat": "",
                "lng": "",
                "region": '',
                "upRegion": '',
              }
            this.addForm.fieldTransportationEnterprisesName = ''
            this.addForm.fieldBuildEnterprisesName = ''
            this.addForm.fieldConstructEnterpriseName = ''
            this.addForm.fieldCalculateEnterpriseName = ''
          }else{
              this.title = '编辑工地'
            this.addForm.id = record.id;
             this.addForm.jurisdiction = [record.province,record.city,record.region];
             this.addForm.provinceName = record.provinceName;
             this.addForm.cityName = record.cityName;
             this.addForm.regionName = record.regionName;
            this.addForm.fieldName = record.fieldName;
            this.addForm.realAreaId = record.realAreaId;
            this.addForm.fieldAddress = record.fieldAddress;
            this.addForm.fieldStartTime = record.fieldStartTime == 0 ? undefined : this.$moment.unix(record.fieldStartTime).format('YYYY-MM-DD');
            this.addForm.fieldExpireTime = record.fieldExpireTime == 0 ? undefined : this.$moment.unix(record.fieldExpireTime).format('YYYY-MM-DD');

            this.addForm.time = [this.addForm.fieldStartTime,this.addForm.fieldExpireTime];
            
            this.addForm.fieldElectronicFence = record.fieldElectronicFence;
            this.addForm.fieldAbbr = record.fieldAbbr;
            this.addForm.fieldFzrName = record.fieldFzrName;
            this.addForm.fieldFzrTel = record.fieldFzrTel;
            this.addForm.fieldStarBeacon = record.fieldStarBeacon == 0 ? undefined : record.fieldStarBeacon;
            this.addForm.fieldRemark = record.fieldRemark;
            this.addForm.fieldTransportationEnterprises = record.fieldTransportationEnterprises ? record.fieldTransportationEnterprises.split(',') : [] ;
            this.addForm.fieldCode = record.fieldCode;
            this.addForm.fieldBuildEnterprises = record.fieldBuildEnterprises ? record.fieldBuildEnterprises.split(',') : [];
            this.addForm.fieldConstructEnterprise = record.fieldConstructEnterprise ?  record.fieldConstructEnterprise.split(',') : [];
            this.addForm.projectCategory = record.projectCategory == 0 ? undefined : record.projectCategory;
            this.addForm.goodsType = record.goodsType == 0 ? undefined : record.goodsType;
            this.addForm.fieldDesignEnterprise = record.fieldDesignEnterprise;
            this.addForm.fieldSupervisorEnterprise = record.fieldSupervisorEnterprise;
            this.addForm.contractPrice = record.contractPrice;
            this.addForm.declaredCapacity = record.declaredCapacity;
            this.addForm.constructPermitNo = record.constructPermitNo;
            this.addForm.fieldCalculateEnterprise = record.fieldCalculateEnterprise ? record.fieldCalculateEnterprise.split(',') : [];
            this.addForm.fieldConstructScale = record.fieldConstructScale;
            this.addForm.introversion = record.introversion;
            this.addForm.outward = record.outward;
            this.addForm.permitPhoto = record.permitPhoto;
            this.addForm.planPermitPhoto = record.planPermitPhoto;
            this.addForm.wasteDischargePhoto = record.wasteDischargePhoto;
            this.addForm.contractPhoto = record.contractPhoto;
            this.addForm.constructPermitPhoto = record.constructPermitPhoto;
            this.addForm.electronicFence = record.electronicFence;
            this.addForm.address = record.electronicFence ? record.electronicFence.address : '';
            this.addForm.lat = record.electronicFence ? record.electronicFence.lat : '';
            this.addForm.lng = record.electronicFence ? record.electronicFence.lng : '';
            this.addForm.fieldTransportationEnterprisesName = record.transportDeptNames;
            this.addForm.fieldBuildEnterprisesName = record.buildDeptNames;
            this.addForm.fieldConstructEnterpriseName = record.constructDeptNames;
            this.addForm.fieldCalculateEnterpriseName = record.calculateDeptNames;
            this.addForm.excavate = record.excavate;
            this.addForm.backfill = record.backfill;

            let addressArr = [];
            let index = 0;
            if(record.electronicFence.address){
              index =  record.electronicFence.address.split(',').length;
            };
            this.value = '点击进入地图绘制工地（已绘制' +  index +'个点）'
          }
          document.querySelector('.ant-modal-body').scrollTop = 0;
      });

      this.getAreaList();
      this.getType(38,1);
      this.getType(59,2);
      this.getType(72,3);
      this.getDepart(84);
      this.getDepart(85);
      this.getDepart(88);
      this.getDepart(89);

    },
     getDepart(type){
         let params = {
            deptName: '',
            pageNum:1,
            pageSize:999,
            deptType:3,
            deptBusinessType:type
         };
         this.spinning = true;
         DepartmentList(params).then(res=>{
             this.spinning = false;
            if(res.data.code == 0){
                if(type == 84){
                     this.transportList = res.data.data.records
                }else if(type == 85){
                     this.buildList = res.data.data.records;
                }else if(type == 88){
                     this.constructionList = res.data.data.records;
                }else if(type == 89){
                     this.calculationList = res.data.data.records;
                }
               
            }else{
                this.$message.warning('加载失败')
            };
            
        });
    },
     getAreaList(){
        this.spinning = true;
        AreaList().then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            this.initial = res.data.data;
            let data = JSON.parse(JSON.stringify(res.data.data))
            this.areaList = buildAreaTree(data)
          };
        });
    },
    getType(id,val){

        let params = {
              pid: id
            };
        BaseList(params).then(res=>{
          if(res.data.code == 0){
              if(val == 1){
                  this.starList = res.data.data
              }else if(val == 2){
                  this.projectCategoryList = res.data.data
              }else if(val == 3){
                  this.goodsTypeList = res.data.data
              }
            
          };
        });
    },
    uploadOne(file, fileList){
        let param = new FormData()
        param.append('file',file);
        this.loading = true;
        uploadOne(param).then(res=>{
            this.loading = false;
            if(res.data.code == 0){
                this.addForm.permitPhoto = res.data.data.path;
            };
        })
        return false
    },
    uploadTwo(file, fileList){
        let param = new FormData()
        param.append('file',file);
        this.loading = true;
        uploadOne(param).then(res=>{
            this.loading = false;
            if(res.data.code == 0){
                this.addForm.planPermitPhoto = res.data.data.path;
            };
        })
        return false
    },
    uploadThree(file, fileList){
        let param = new FormData()
        param.append('file',file);
        this.loading = true;
        uploadOne(param).then(res=>{
            this.loading = false;
            if(res.data.code == 0){
                this.addForm.wasteDischargePhoto = res.data.data.path;
            };
        })
        return false
    },
    uploadFour(file, fileList){
        let param = new FormData()
        param.append('file',file);
        this.loading = true;
        uploadOne(param).then(res=>{
            this.loading = false;
            if(res.data.code == 0){
                this.addForm.contractPhoto = res.data.data.path;
            };
        })
        return false
    },
    uploadFive(file, fileList){
        let param = new FormData()
        param.append('file',file);
        this.loading = true;
        uploadOne(param).then(res=>{
            this.loading = false;
            if(res.data.code == 0){
                this.addForm.constructPermitPhoto = res.data.data.path;
            };
        })
        return false
    },

    save(){

        let params = JSON.parse(JSON.stringify(this.addForm));
    
        params.fieldStartTime = this.$moment(params.time[0]).unix();
        params.fieldExpireTime = this.$moment(params.time[1]).unix(); //转化时间戳

      params.electronicFence.address = this.addForm.address;
      params.electronicFence.lat = this.addForm.lat;
      params.electronicFence.lng = this.addForm.lng;
      params.electronicFence.region = this.addForm.realAreaId;
      params.electronicFence.fieldType = this.addForm.fieldType;

 
    
        params.fieldTransportationEnterprises =  params.fieldTransportationEnterprises && params.fieldTransportationEnterprises.length>0 ?  params.fieldTransportationEnterprises.join(',') : '';
        params.fieldBuildEnterprises =   params.fieldBuildEnterprises && params.fieldBuildEnterprises.length>0 ?  params.fieldBuildEnterprises.join(',') : '';
        params.fieldConstructEnterprise =  params.fieldConstructEnterprise && params.fieldConstructEnterprise.length>0 ?  params.fieldConstructEnterprise.join(',') : '';
        params.fieldCalculateEnterprise =   params.fieldCalculateEnterprise && params.fieldCalculateEnterprise.length>0 ?  params.fieldCalculateEnterprise.join(',') : '';

      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if(this.isEdit == 0){
              
             this.onSubmit(params);
          }else{
             
            params.fieldStarBeacon =  params.fieldStarBeacon ?  params.fieldStarBeacon : 0;
            
            params.projectCategory =  params.projectCategory ?  params.projectCategory : 0;
            params.goodsType =  params.goodsType ?  params.goodsType : 0;
            
            this.onEditSubmit(params);
          };
         
        } else {
          return false;
        };
      });
     
    },
    onSubmit(params){
      this.spinning = true;

      SiteAdd(params).then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            this.siteVisible = false;
            this.$message.success('保存成功');
            this.$emit('triggerData');
          }else{
            this.$message.warning('保存失败')
          };
      });
    },
     onEditSubmit(params){
       this.spinning = true;
      SiteEdit(params).then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            this.siteVisible = false;
            this.$message.success('保存成功');
            this.$emit('triggerData');
          }else{
            this.$message.warning('保存失败')
          };
      });
    },
    changeArea(value){
      this.addForm.province = value[0];
      this.addForm.city = value[1];
      this.addForm.region = value[2];

      if(this.addForm.province && !this.addForm.region && !this.addForm.region){
        this.addForm.realAreaId = value[0];
        this.addForm.electronicFence.upRegion = 0;
      };
      if(this.addForm.city && !this.addForm.region){
        this.addForm.realAreaId = value[1];
        this.addForm.electronicFence.upRegion = value[0];
      };
      if(!this.addForm.city){
        this.addForm.city = 0
      }
      if(this.addForm.region){
        this.addForm.realAreaId = value[2];
        this.addForm.electronicFence.upRegion = value[1];
      }else{
         this.addForm.region = 0;
      };
   
          this.initial.forEach(ele=>{
              if(ele.areaId == value[0]){
                  this.addForm.provinceName = ele.areaName;
              }else if(ele.areaId == value[1]){
                  this.addForm.cityName = ele.areaName;
              }else if(ele.areaId == value[2]){
                  this.addForm.regionName = ele.areaName;
              };
          });
      
    },
    drawDence(){
        if(this.addForm.jurisdiction.length>0){
                this.$refs.draw_fence.drawDence(this.addForm,2,11)
        }else{
            this.$message.warning('请先选择管辖区')
        }
        
    },
    getPosion(arr,areaList){
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
        this.value = '点击进入地图绘制工地（已绘制' +  index +'个点）'
        this.addForm.lat = latArr.join(',');
        this.addForm.lng = lngArr.join(',');
        this.addForm.address = areaList.join(',');
      }else{
        this.addForm.lat = '';
        this.addForm.lng = '';
        this.addForm.address = '';
      }
      

      
     
    },
    changeTransport(val){
            let arr = [];
        val.forEach(cur=>{
            this.transportList.forEach(ele=>{
                if(cur == ele.id){
                    arr.push(ele.deptName);
                }
            });
        });
        if(arr.length>0){
            this.addForm.fieldTransportationEnterprisesName = arr.join(',');
        }else{
            this.addForm.fieldTransportationEnterprisesName = ''
        };
    },
    changeBuild(val){
           let arr = [];
        val.forEach(cur=>{
            this.buildList.forEach(ele=>{
                if(cur == ele.id){
                    arr.push(ele.deptName);
                }
            });
        });
        if(arr.length>0){
            this.addForm.fieldBuildEnterprisesName = arr.join(',');
        }else{
            this.addForm.fieldBuildEnterprisesName = ''
        };
    },
    changeConstruct(val){
        let arr = [];
        val.forEach(cur=>{
            this.constructionList.forEach(ele=>{
                if(cur == ele.id){
                    arr.push(ele.deptName);
                }
            });
        });
        if(arr.length>0){
            this.addForm.fieldConstructEnterpriseName = arr.join(',');
        }else{
            this.addForm.fieldConstructEnterpriseName = ''
        };
    },
    changeCalculate(val){
        let arr = [];
        val.forEach(cur=>{
            this.calculationList.forEach(ele=>{
                if(cur == ele.id){
                    arr.push(ele.deptName);
                }
            });
        });
        if(arr.length>0){
            this.addForm.fieldCalculateEnterpriseName = arr.join(',');
        }else{
            this.addForm.fieldCalculateEnterpriseName = ''
        };
    }
  }
}
</script>