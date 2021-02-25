<template>
    <a-modal v-model="caseVisible" :maskClosable="false" width="84%" :keyboard="false" v-dialogDrag="dialog" v-fullscreen>
        <div slot="title">
        {{title}}
        <span class="fullscreen_model">
            <a-icon type="fullscreen" class="fullscreen_icon" />
            <a-icon type="fullscreen-exit" class="fullscreen_exit_icon" />
        </span>
        </div>
        <div class="case_steps">
            <a-steps :current="current">
            <a-step v-for="item in steps" :key="item.title" :title="item.title" />
            </a-steps>
        </div>
        <a-spin :spinning="spinning">
        <div v-if="current==0">
             <h2 class="case_title">基本信息：</h2>
            <a-form-model :model="addForm" ref="ruleForm" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-row :gutter="40">
                    <a-col :md="6">
                       <a-form-model-item label="执法单号" prop="caseNo">
                            <a-input v-model="addForm.caseNo" placeholder="请输入执法单号"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="6">
                        <a-form-model-item label="车牌号码" prop="vehicleNo">
                            <a-input v-model="addForm.vehicleNo" placeholder="请输入车牌号码"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="6">
                        <a-form-model-item label="驾驶员" prop="driverId">
                            

                             <a-select placeholder="请选择驾驶员" 
                                show-search option-filter-prop="children"
                                v-model="addForm.driverId" 
                                :filter-option="false" @search="filterOptionDriver" allowClear>
                                
                                <div slot="dropdownRender" slot-scope="menu">
                                    <v-nodes :vnodes="menu" />
                                    <a-divider style="margin: 4px 0;" />
                                    <div
                                        style="padding: 4px 8px; cursor: pointer;"
                                        @mousedown="e => e.preventDefault()"
                                    >
                                    <a-pagination size="small" :total="totalDriver"  @change="changeDriverPage" :pageSize='pageSize' :show-total="totalDriver => `共 ${totalDriver} 条`"/>
                                    </div>
                                    </div>
                                    <a-spin :spinning="fetching" slot="notFoundContent" size="small" />
                                    <template v-for="item in driverLists">
                                        <a-select-option  :key="item.id">
                                            {{item.driverName}}
                                        </a-select-option>
                                    </template>
                              </a-select>
                        </a-form-model-item>
                    </a-col>

                    <a-col :md="6">
                        <a-form-model-item label="企业名称" prop="deptId">

                            <a-select placeholder="请选择所属企业" 
                                show-search option-filter-prop="children"
                                v-model="addForm.deptId" 
                                :filter-option="false" @search="filterOptionCompany" allowClear>
                                
                                <div slot="dropdownRender" slot-scope="menu">
                                    <v-nodes :vnodes="menu" />
                                    <a-divider style="margin: 4px 0;" />
                                    <div
                                        style="padding: 4px 8px; cursor: pointer;"
                                        @mousedown="e => e.preventDefault()"
                                    >
                                    <a-pagination size="small" :total="total"  @change="changeCompanyPage" :pageSize='pageSize' :show-total="total => `共 ${total} 条`"/>
                                    </div>
                                    </div>
                                    <a-spin :spinning="fetching" slot="notFoundContent" size="small" />
                                    <template v-for="item in depList">
                                        <a-select-option  :key="item.id">
                                            {{item.deptName}}
                                        </a-select-option>
                                    </template>
                              </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="6">
                        <a-form-model-item label="驾驶证号" prop="driverLicenseNo">
                            <a-input v-model="addForm.driverLicenseNo" placeholder="请输入驾驶证号"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="6">
                       <a-form-model-item label="经办人" prop="agentId">
                            <a-select v-model="addForm.agentId" placeholder="请选择经办人">
                              <a-select-option v-for="item in useList" :key="item.id">
                                  {{item.account}}
                              </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="6">
                        <a-form-model-item label="检查时间" prop="checkTime">

                            <a-date-picker show-time  v-model="addForm.checkTime" format="YYYY-MM-DD hh:mm:ss" valueFormat="YYYY-MM-DD hh:mm:ss"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="6">
                        <a-form-model-item label="检查地点" prop="checkArea">
                            <a-input v-model="addForm.checkArea" placeholder="请输入检查地点"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="6">
                        <a-form-model-item label="违章时间" prop="violationTime">

                            <a-date-picker show-time  v-model="addForm.violationTime" format="YYYY-MM-DD hh:mm:ss" valueFormat="YYYY-MM-DD hh:mm:ss"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="6">
                        <a-form-model-item label="处理时间" prop="dealTime">
                            <a-date-picker show-time  v-model="addForm.dealTime" format="YYYY-MM-DD hh:mm:ss" valueFormat="YYYY-MM-DD hh:mm:ss"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="6">
                        <a-form-model-item label="辖区" prop="areaId">
                           
                           

                         <a-select v-model="addForm.areaId" placeholder="请选择辖区" allowClear>
                              <a-select-option v-for="item in areaList" :key="item.areaId">
                                  {{item.areaName}}
                              </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="6">
                        <a-form-model-item label="核准证编号" prop="approvalCertificateNo">
                            <a-input v-model="addForm.approvalCertificateNo" placeholder="请输入核准证编号"/>
                        </a-form-model-item>
                    </a-col>
                     <a-col :md="6">
                        <a-form-model-item label="出土工地" prop="fromFieldId">
                            <a-select placeholder="请选择出土工地" 
                                show-search option-filter-prop="children"
                                v-model="addForm.fromFieldId" 
                                :filter-option="false" @search="filterOptionSite" allowClear>
                                
                                <div slot="dropdownRender" slot-scope="menu">
                                    <v-nodes :vnodes="menu" />
                                    <a-divider style="margin: 4px 0;" />
                                    <div
                                        style="padding: 4px 8px; cursor: pointer;"
                                        @mousedown="e => e.preventDefault()"
                                    >
                                    <a-pagination size="small" :total="totalSite"  @change="changeSitePage" :pageSize='pageSize' :show-total="totalSite => `共 ${totalSite} 条`"/>
                                    </div>
                                    </div>
                                    <a-spin :spinning="fetching" slot="notFoundContent" size="small" />
                                    <template v-for="item in siteLists">
                                        <a-select-option  :key="item.id">
                                            {{item.fieldName}}
                                        </a-select-option>
                                    </template>
                              </a-select>
                        </a-form-model-item>
                    </a-col>
                     <a-col :md="6">
                        <a-form-model-item label="消纳场" prop="toFieldId">
                          <a-select placeholder="请选择消纳场" 
                                show-search option-filter-prop="children"
                                v-model="addForm.toFieldId" 
                                :filter-option="false" @search="filterOptionEarth" allowClear>
                                
                                <div slot="dropdownRender" slot-scope="menu">
                                    <v-nodes :vnodes="menu" />
                                    <a-divider style="margin: 4px 0;" />
                                    <div
                                        style="padding: 4px 8px; cursor: pointer;"
                                        @mousedown="e => e.preventDefault()"
                                    >
                                    <a-pagination size="small" :total="totalEarth"  @change="changeEarthPage" :pageSize='pageSize' :show-total="totalEarth => `共 ${totalEarth} 条`"/>
                                    </div>
                                    </div>
                                    <a-spin :spinning="fetching" slot="notFoundContent" size="small" />
                                    <template v-for="item in earthLists">
                                        <a-select-option  :key="item.id">
                                            {{item.fieldName}}
                                        </a-select-option>
                                    </template>
                              </a-select>
                        </a-form-model-item>
                    </a-col>
                    

                    
                   
                </a-row>        
            </a-form-model>

             <h2 class="case_title">违章类型：</h2>
             <a-radio-group v-model="addForm.violationType" style="width:100%;margin-bottom:20px">
  
                    <a-row>
                      <a-col :span="4" v-for="item in ViolationList" :key="item.id" style="margin-bottom:10px">
                          <a-radio :value="item.id">
                            {{item.name}}
                          </a-radio>
                      </a-col>
                    
                    </a-row>
                </a-radio-group>

             <h2 class="case_title">暂扣证件：</h2>
             <a-checkbox-group v-model="addForm.withholdCertificate" style="width:100%;margin-bottom:20px">
                    <a-row>
                      <a-col :span="4" v-for="item in certificatesList" :key="item.id" style="margin-bottom:10px">
                          <a-checkbox :value="item.id">
                             {{item.name}}
                          </a-checkbox>
                      </a-col>
                    
                    </a-row>
                </a-checkbox-group>
        </div>
        <caseHandling ref="caseHandling"  v-if="current==1" :saveId="addForm.id" :saveData="addForm" @closeOpinion='closeOpinion' @stepCurrent='stepCurrent'></caseHandling>
        <casePunishment ref="casePunishment" v-if="current==2" :saveData="addForm" :saveId="addForm.id"  @closeOpinion='closeOpinion' @stepCurrent='stepCurrent'></casePunishment>
        <dossier v-if="current==3||current==4" :saveId="addForm.id"></dossier>
        </a-spin>
        <template slot="footer">
          <a-button  type="primary" @click="preStep" v-if="current>0&&current<4">
            上一步
            </a-button>
            <a-button  type="primary" @click="nextSave" v-if="current<3">
            下一步
            </a-button>
            <a-button key="submit" type="primary" @click="nextSave(1)">
            完成
            </a-button>

        </template>
    </a-modal>
</template>

<script>
import {driverList,DepartmentList,UserList,AreaList,SiteList,BaseList,AddCase,EditCase,CaseList} from '@/network/api'
import pathUrl from "@/network/requestUrl";
import debounce from 'lodash/debounce'
import caseHandling from './caseHandling.vue'
import casePunishment from './casePunishment.vue'
import dossier from './dossier.vue'
import {buildAreaTree} from '@/utils/utils.js'
export default {
  data() {
    return {
      title:'新增人员',
      loading:false,
      dialog:true,
      caseVisible:false,
      addForm:{
        id: '',
        caseNo:'',
        vehicleNo:'',
        deptId:undefined,
        driverId:undefined,
        driverLicenseNo:'',
        agentId:undefined,
        checkTime:'',
        checkArea:'',
        areaId:undefined,
        approvalCertificateNo:'',
        fromFieldId:undefined,
        toFieldId:undefined,
        violationTime:'',
        dealTime:'',
        violationType:'',
        withholdCertificate:[],
        withholdCertificateName:[],
      },
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
      spinning:false,
      depList:[],
      isEdit:0,
      pathUrl,
      rules:{
        caseNo:[
          { required: true, message: '请输入执法单号', trigger: 'change' },
        ],
        vehicleNo:[
          { required: true, message: '请输入车牌号码', trigger: 'blur' },
        ],
        driverId:[
          { required: true, message: '请选择驾驶员', trigger: 'change' },
        ],
        deptId:[
          { required: true, message: '请选择所属企业', trigger: 'change' },
        ],
        agentId:[
          { required: true, message: '请选择经办人', trigger: 'change' },
        ],
        checkTime:[
          { required: true, message: '请选择检查时间', trigger: 'change' },
        ],
        checkArea:[
          { required: true, message: '请输入检查地点', trigger: 'blur' },
        ],
        violationTime:[
          { required: true, message: '请选择违章时间', trigger: 'change' },
        ],
        dealTime:[
          { required: true, message: '请选择处理时间', trigger: 'change' },
        ],
      },
      current: 0,
      steps: [
        {
          title: '案件录入',
        },
        {
          title: '案件处理',
        },
        {
          title: '案件处罚',
        },
         {
          title: '案件结案',
        },
         {
          title: '案件卷宗',
        },
      ],
      driverLists:[],
      useList:[],
      areaList:[],
      siteLists:[],
      earthLists:[],
      deptName:'',
      pageNum:1,
      total:0,
      pageSize:20,

      pageNumDriver:1,
      totalDriver:0,
      driverName:'',

      totalSite:0,
      fieldName:'',
      pageNumSite:1,

      totalEarth:0,
      fieldName:'',
      pageNumEarth:1,

      fetching:false,
      ViolationList:[],
      certificatesList:[]
    }
  },
  created(){
      this.save = debounce(this.save,500)//保存防止重复点击
  },
  components:{
    caseHandling,
    casePunishment,
    dossier,
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
  methods:{
    addCase(val,record){
      console.log(record)
      this.isEdit = val
      this.caseVisible = true;
      
      if(val==2){
        this.current = 0;
        this.$nextTick(()=>{
          this.current = 4;
        this.addForm.id = record.id
        })
        
        return false
      };
      this.current = 0;
      this.$nextTick(()=>{
          this.$refs.ruleForm.resetFields();
          if(val == 0){
              this.title = '新增案件';
              this.addForm = {
                  id: '',
                  caseNo:'',
                  vehicleNo:'',
                  deptId:undefined,
                  driverId:undefined,
                  driverLicenseNo:'',
                  agentId:undefined,
                  checkTime:'',
                  checkArea:'',
                  areaId:undefined,
                  approvalCertificateNo:'',
                  fromFieldId:undefined,
                  toFieldId:undefined,
                   violationTime:'',
                  dealTime:'',
                  violationType:'',
                  withholdCertificate:[],
                  withholdCertificateName:[],
                }
          }else{
            this.title = '编辑案件';
             
            this.addForm =  JSON.parse(JSON.stringify(record));
            this.addForm.areaId = this.addForm.areaId == 0 ? undefined : this.addForm.areaId;
            this.addForm.fromFieldId = this.addForm.fromFieldId == 0 ? undefined : this.addForm.fromFieldId;
            this.addForm.toFieldId = this.addForm.toFieldId == 0 ? undefined : this.addForm.toFieldId;
            if(this.addForm.withholdCertificate){
               this.addForm.withholdCertificate =  this.addForm.withholdCertificate.split(',');
               this.addForm.withholdCertificateName =  this.addForm.withholdCertificateName.split(',');
            }else{
              this.addForm.withholdCertificate =  [];
               this.addForm.withholdCertificateName =  [];
            }
           
          }
      });
      this.getDepart();
      this.getDriver();
      this.getUser();
      this.getAreaList();
      this.getSiteData();
      this.getEarthData();
      this.getType(1100)
      this.getType(1200)
    },
    getType(id){

        let params = {
              pid: id
            };
        BaseList(params).then(res=>{
          if(res.data.code == 0){
              if(id == 1100){
                  this.ViolationList = res.data.data
              }else if(id == 1200){
                  this.certificatesList = res.data.data
              }
            
          };
        });
    },
    getAreaList(){
        this.spinning = true;
        AreaList().then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            let data = JSON.parse(JSON.stringify(res.data.data))
            this.areaList = data;
          };
        });
    },
   
    getDepart(){
         let params = {
            deptName: this.deptName,
            pageNum:this.pageNum,
            pageSize:this.pageSize,
            deptType:3
         };
        this.fetching = true
         DepartmentList(params).then(res=>{
            this.fetching = false
            if(res.data.code == 0){
                this.depList = res.data.data.records;
                this.total = res.data.data.total;
            }else{
                this.$message.warning('加载失败')
            };
            
        });
    },
    filterOptionCompany(val){
       this.pageNum = 1;
       this.deptName = val;
       this.getDepart();
    },

    changeCompanyPage(page){
      this.pageNum = page;
      this.getDepart();
    },

    getDriver(){
        let params = {
        deptId: '',
        driverName: this.driverName,
        pageNum:this.pageNumDriver,
        pageSize:this.pageSize,
      };
       this.fetching = true
        driverList(params).then(res=>{
              this.fetching = false
            if(res.data.code == 0){
                let data = res.data.data.records;
                this.driverLists = data;
                this.totalDriver = res.data.data.total;
            }else{
                this.$message.warning('加载失败')
            };
            
        });
    },
    filterOptionDriver(val){
       this.pageNumDriver = 1;
       this.driverName = val;
       this.getDriver();
    },

    changeDriverPage(page){
      this.pageNumDriver = page;
      this.getDriver();
    },

    getSiteData(){
        let params = {
            fieldName :'',
            ef:'',
            pageNum:1,
            pageSize:20,
            fieldStatus:'',
            permitStatus:'',
            activition:'',
            id:'',
            areaId:'',
            fieldType:770
          };
        SiteList(params).then(res=>{
            
            if(res.data.code == 0){
                let data = res.data.data.records;
                this.siteLists = data;
                
                this.totalSite = res.data.data.total;
            }else{
                this.$message.warning('加载失败')
            };
            
        });
    },
    filterOptionSite(val){
       this.pageNumSite = 1;
       this.fieldName = val;
       this.getSiteData();
    },

    changeSitePage(page){
      this.pageNumSite = page;
      this.getSiteData();
    },

    getEarthData(){
        let params = {
            fieldName :'',
            ef:'',
            pageNum:1,
            pageSize:20,
            fieldStatus:'',
            permitStatus:'',
            activition:'',
            id:'',
            areaId:'',
            fieldType:771
          };
        SiteList(params).then(res=>{
            
            if(res.data.code == 0){
                let data = res.data.data.records;
                this.earthLists = data;
                
                this.totalEarth = res.data.data.total;
            }else{
                this.$message.warning('加载失败')
            };
            
        });
    },
    filterOptionEarth(val){
       this.pageNumEarth = 1;
       this.fieldName = val;
       this.getEarthData();
    },

    changeEarthPage(page){
      this.pageNumEarth = page;
      this.getEarthData();
    },

    getUser(){
        let params = {
           account:'',
          pageNum: 1,
          pageSize: 20,
        }
        UserList(params).then(res=>{
            if(res.data.code == 0){
                this.useList = res.data.data.records;
            }else{
                this.$message.warning('加载失败')
            };
            
        });
    },

    
    nextSave(val){
      if(this.current==0){
        this.save(val)
      }else if(this.current==1){
        this.saveOpinion(val)
      }else if(this.current==2){
        this.savePunish(val)
      }else{
         this.caseVisible = false;
        this.$emit('triggerData');
      }
      
    },
    saveOpinion(val){
      this.$refs.caseHandling.saveOpinion(val)
    },
    savePunish(val){
      this.$refs.casePunishment.savePunish(val)
    },
    save(val){
      let params = JSON.parse(JSON.stringify(this.addForm));
      params.withholdCertificateName = [];
      console.log(this.addForm.withholdCertificate)
      if(params.withholdCertificate.length>0){
        params.withholdCertificate.forEach(cur=>{
          this.certificatesList.forEach(ele=>{
            if(cur==ele.id){
              params.withholdCertificateName.push(ele.name)
            }
          })
        })
      };
      if(params.withholdCertificate){
        params.withholdCertificate = params.withholdCertificate.join(',');
        params.withholdCertificateName = params.withholdCertificateName.join(',')
      }
      
      params.checkTime = this.$moment(params.checkTime).unix();
      params.violationTime = this.$moment(params.violationTime).unix();
      params.dealTime = this.$moment(params.dealTime).unix();
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if(this.isEdit == 0){
             this.onSubmit(params,val);
          }else{
            params.areaId = params.areaId ? params.areaId : 0;
            params.fromFieldId = params.fromFieldId ? params.fromFieldId : 0;
            params.toFieldId = params.toFieldId ? params.toFieldId : 0;
            
            this.onEditSubmit(params,val);
          };
         
        } else {
          return false;
        };
      });
     
    },
    onSubmit(params,val){
      this.spinning = true;

      AddCase(params).then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            if(val==1){
              this.caseVisible = false;
              this.$emit('triggerData');
            }else{
              this.addForm.id = res.data.data;
              this.updateData()
              
            }
           
            
          }else{
            // this.$message.warning('保存失败')
          };
      });
    },
    onEditSubmit(params,val){
       this.spinning = true;
      EditCase(params).then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
           if(val==1){
              this.caseVisible = false;
              this.$emit('triggerData');
            }else{
               this.updateData()
            }
          }else{
            // this.$message.warning('保存失败')
          };
      });
    },
    preStep(){
        
         this.current--
         if(this.current==0){
           this.isEdit = 1
         }
        console.log(this.current)
     
    },
    closeOpinion(){
      this.caseVisible = false;
      this.$emit('triggerData');
    },
    stepCurrent(){
       this.current++
    },
    updateData(){
         let params = {
           id:this.addForm.id,
           pageNum:1,
           pageSize:20,
         }
        CaseList(params).then(res=>{
             this.loading = false;
            if(res.data.code == 0){
                let data = res.data.data.records;
                this.addForm = data[0];
               
                    this.addForm.checkTime = this.$moment.unix(this.addForm.checkTime).format('YYYY-MM-DD hh:mm:ss')
                    this.addForm.violationTime = this.$moment.unix(this.addForm.violationTime).format('YYYY-MM-DD hh:mm:ss')
                    this.addForm.dealTime = this.$moment.unix(this.addForm.dealTime).format('YYYY-MM-DD hh:mm:ss')
                
                 this.addForm.areaId = this.addForm.areaId == 0 ? undefined : this.addForm.areaId;
                this.addForm.fromFieldId = this.addForm.fromFieldId == 0 ? undefined : this.addForm.fromFieldId;
                this.addForm.toFieldId = this.addForm.toFieldId == 0 ? undefined : this.addForm.toFieldId;
                if(this.addForm.withholdCertificate){
                  this.addForm.withholdCertificate =  this.addForm.withholdCertificate.split(',');
                  this.addForm.withholdCertificateName =  this.addForm.withholdCertificateName.split(',');
                }else{
                  this.addForm.withholdCertificate =  [];
                  this.addForm.withholdCertificateName =  [];
                }
           
                 this.current++
            }
            
        });
    },
  }
}
</script>