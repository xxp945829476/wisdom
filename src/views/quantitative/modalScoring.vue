<template>
  <a-modal v-model="quanVisible" :maskClosable="false" :keyboard="false" width="600px" v-dialogDrag="dialog" v-fullscreen>
    <div slot="title">
      {{title}}
      <span class="fullscreen_model">
        <a-icon type="fullscreen" class="fullscreen_icon" />
        <a-icon type="fullscreen-exit" class="fullscreen_exit_icon" />
      </span>
    </div>
    <a-spin :spinning="spinning">
    <div>

       <div class="quan_sel">
        <a-radio-group v-model="addForm.assessObj" @change="changeAssessObj">
          <a-radio-button :value="item.id" v-for="item in assessList" :key="item.id">
            {{item.name}}
          </a-radio-button>
        </a-radio-group>
      </div>
        <a-form-model  :model="addForm" ref="ruleForm" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
          
              
                        <a-form-model-item label="考核对象" prop="assessObjId" v-if="addForm.assessObj=='1001'">


                                <a-select placeholder="请选择考核对象" 
                                  show-search option-filter-prop="children"
                                  v-model="addForm.assessObjId" 
                                  @change="changeCompany"
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
                                      <template v-for="item in companyList">
                                          <a-select-option  :key="item.id" :deptName="item.deptName">
                                              {{item.deptName}}
                                          </a-select-option>
                                      </template>
                                  </a-select>
                            </a-form-model-item>

                            <a-form-model-item label="考核对象" prop="assessObjId" v-if="addForm.assessObj=='1002'">


                                <a-select placeholder="请选择考核对象" 
                                  show-search option-filter-prop="children"
                                  v-model="addForm.assessObjId" 
                                  @change="changeDriver"
                                  :filter-option="false" @search="filterOptionDriver" allowClear>
                                  
                                  <div slot="dropdownRender" slot-scope="menu">
                                      <v-nodes :vnodes="menu" />
                                      <a-divider style="margin: 4px 0;" />
                                      <div
                                          style="padding: 4px 8px; cursor: pointer;"
                                          @mousedown="e => e.preventDefault()"
                                      >
                                      <a-pagination size="small" :total="total"  @change="changeDriverPage" :pageSize='pageSize' :show-total="total => `共 ${total} 条`"/>
                                      </div>
                                      </div>
                                      <a-spin :spinning="fetching" slot="notFoundContent" size="small" />
                                      <template v-for="item in driverList">
                                          <a-select-option  :key="item.id" :deptName="item.driverName">
                                              {{item.driverName}}
                                          </a-select-option>
                                      </template>
                                  </a-select>
                            </a-form-model-item>

                             <a-form-model-item label="考核对象" prop="assessObjId" v-if="addForm.assessObj=='1003'">


                                <a-select placeholder="请选择考核对象" 
                                  show-search option-filter-prop="children"
                                  v-model="addForm.assessObjId" 
                                  @change="changeVehicle"
                                  :filter-option="false" @search="filterOptionVehicle" allowClear>
                                  
                                  <div slot="dropdownRender" slot-scope="menu">
                                      <v-nodes :vnodes="menu" />
                                      <a-divider style="margin: 4px 0;" />
                                      <div
                                          style="padding: 4px 8px; cursor: pointer;"
                                          @mousedown="e => e.preventDefault()"
                                      >
                                      <a-pagination size="small" :total="total"  @change="changeVehiclePage" :pageSize='pageSize' :show-total="total => `共 ${total} 条`"/>
                                      </div>
                                      </div>
                                      <a-spin :spinning="fetching" slot="notFoundContent" size="small" />
                                      <template v-for="item in vehiclelist">
                                          <a-select-option  :key="item.id" :deptName="item.vehicleNo">
                                              {{item.vehicleNo}}
                                          </a-select-option>
                                      </template>
                                  </a-select>
                            </a-form-model-item>

                            <a-form-model-item label="考核对象" prop="assessObjId" v-if="addForm.assessObj=='1004'">


                                <a-select placeholder="请选择考核对象" 
                                  show-search option-filter-prop="children"
                                  v-model="addForm.assessObjId" 
                                  @change="changeSite"
                                  :filter-option="false" @search="filterOptionSite" allowClear>
                                  
                                  <div slot="dropdownRender" slot-scope="menu">
                                      <v-nodes :vnodes="menu" />
                                      <a-divider style="margin: 4px 0;" />
                                      <div
                                          style="padding: 4px 8px; cursor: pointer;"
                                          @mousedown="e => e.preventDefault()"
                                      >
                                      <a-pagination size="small" :total="total"  @change="changeSitePage" :pageSize='pageSize' :show-total="total => `共 ${total} 条`"/>
                                      </div>
                                      </div>
                                      <a-spin :spinning="fetching" slot="notFoundContent" size="small" />
                                      <template v-for="item in siteList">
                                          <a-select-option  :key="item.id" :deptName="item.fieldName">
                                              {{item.fieldName}}
                                          </a-select-option>
                                      </template>
                                  </a-select>
                            </a-form-model-item>              
              
              
                    <a-form-model-item label="考核依据" prop="basisId">
                         <a-select v-model="addForm.basisId" placeholder="请选择考核依据">
                            <a-select-option v-for="item in assessData" :key="item.id">
                                {{item.entryName}}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
             

                
                    <a-form-model-item label="选择案例" prop="caseId">
                        <a-input v-model="addForm.deptAbbreviation"  placeholder="请选择案例"/>
                    </a-form-model-item>

       
        </a-form-model>
    </div>
    </a-spin>
    <template slot="footer">
        <a-button key="back" @click="businessVisible = false">
        取消
        </a-button>
        <a-button key="submit" type="primary" @click="save">
        保存
        </a-button>
    </template>
  </a-modal>
</template>

<script>
import {BaseList,DepartmentList,GetAssessList,AddAssessPoint,driverList,Vehiclelist,SiteList} from '@/network/api'

import debounce from 'lodash/debounce'

export default {
  data() {
    return {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
      loading:false,
      spinning:false,
      dialog:true,
      quanVisible:false,
      addForm: {
        assessObj:'1001',
        assessObjId:undefined,
        assessObjName:'',
        assessObjTypeName:'企业',
        basisId:undefined,
        caseId:'',
        id:''
      },
      rules:{
        assessObjId:[
          { required: true, message: '请选择考核对象', trigger: 'change' },
        ],
        basisId:[
          { required: true, message: '请选择考核依据', trigger: 'change' },
        ]
      },
     title:'新增考核',
      isEdit:0,
      assessList:[],
      companyList:[],
      driverList:[],
      vehiclelist:[],
      siteList:[],
      total:0,
      pageSize:20,
      pageNum:1,
      deptName:'',
      fetching:false,
      assessData:[],
      driverName:'',
      vehicleNo:'',
      fieldName:'',
    }
  },
  components:{
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
  created(){
      this.save = debounce(this.save,500)//保存防止重复点击
  },
  methods:{
    addQuan(){
            this.quanVisible = true;

          this.$nextTick(()=>{
              this.$refs.ruleForm.resetFields();
              this.addForm.assessObj = '1001'
             document.querySelector('.ant-modal-body').scrollTop = 0;    
          })
          
          this.getType();
          this.getCompanyData();
          this.getAssessData();

    },
    getType(){

        let params = {
              pid: 1000
            };
        BaseList(params).then(res=>{
          if(res.data.code == 0){
              this.assessList = res.data.data
          };
        });
    },
    getAssessData(){
         this.spinning = true;
         let  parmas = {
          assessObj: this.addForm.assessObj,
          pageNum:1,
          pageSize:9999,
          entryName:'',
          id:''
        }
        GetAssessList(parmas).then(res=>{
             this.spinning = false;
            if(res.data.code == 0){
                let data = res.data.data.records;
                this.assessData = data;
            }
            
        });
    },

    getSiteData(){

      let params = {
           fieldName :this.fieldName,
          ef:'',
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          fieldStatus:'',
          permitStatus:'',
          activition:'',
          id:'',
          areaId:'',
          fieldType:770
        }
         this.fetching = true;
        SiteList(params).then(res=>{
             this.fetching = false;
            if(res.data.code == 0){
                let data = res.data.data.records;
                this.siteList = data;
                
                this.total = res.data.data.total;
            }else{
                this.$message.warning('加载失败')
            };
            
        });
    },
    filterOptionSite(val){
       this.pageNum = 1;
       this.fieldName = val;
       this.getSiteData();
    },
    changeSite(val,params){
      console.log(params.data.attrs.deptName);
      this.addForm.assessObjName = params.data.attrs.deptName;
    },
    changeSitePage(page){
      this.pageNum = page;
      this.getSiteData();
    },
     getVehicleData(){
        let params = {
           simNo :'',
          vehicleNo:this.vehicleNo,
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          distributor:'',
          permitStatus:'',
          deptId:'',
          realAreaId:'',
        }
        this.fetching = true;
        Vehiclelist(params).then(res=>{
            this.fetching = false;
            if(res.data.code == 0){
                let data = res.data.data.records;
                this.vehiclelist = data;
               
                this.total = res.data.data.total;
            }
            
        });
    },
    filterOptionVehicle(val){
       this.pageNum = 1;
       this.vehicleNo = val;
       this.getVehicleData();
    },
    changeVehicle(val,params){
      console.log(params.data.attrs.deptName);
      this.addForm.assessObjName = params.data.attrs.deptName;
    },
    changeVehiclePage(page){
      this.pageNum = page;
      this.getVehicleData();
    },
    getDriverData(){
        let params = {
            deptId: '',
            driverName: this.driverName,
            pageNum:this.pageNum,
            pageSize:this.pageSize,
         }
         this.fetching = true;
        driverList(params).then(res=>{
        this.fetching = false;
            if(res.data.code == 0){
                let data = res.data.data.records;
                this.driverList = data;
                this.total = res.data.data.total;
            }
            
        });
    },
    filterOptionDriver(val){
       this.pageNum = 1;
       this.driverName = val;
       this.getDriverData();
    },
    changeDriver(val,params){
      console.log(params.data.attrs.deptName);
      this.addForm.assessObjName = params.data.attrs.deptName;
    },
    changeDriverPage(page){
      this.pageNum = page;
      this.getDriverData();
    },
    getCompanyData(){
         this.fetching = true;
         let params = {
            deptName: this.deptName,
            pageNum:this.pageNum,
            pageSize:this.pageSize,
            deptType:'3',
            deptBusinessType:''
         }
        DepartmentList(params).then(res=>{
             this.fetching = false;
            if(res.data.code == 0){
                let data = res.data.data.records;
                this.companyList = data;
                this.total = res.data.data.total;
            }
            
        });
    },
    filterOptionCompany(val){
       this.pageNum = 1;
       this.deptName = val;
       this.getCompanyData();
    },
    changeCompany(val,params){
      console.log(params.data.attrs.deptName);
      this.addForm.assessObjName = params.data.attrs.deptName;
    },
    changeCompanyPage(page){
      this.pageNum = page;
      this.getCompanyData();
    },

    changeAssessObj(e){
      this.getAssessData();
      this.pageNum = 1;
      this.addForm.assessObjId = undefined;
      this.addForm.assessObjName = '';
      if(this.addForm.assessObj == '1001'){
        this.getCompanyData();
      }else if(this.addForm.assessObj == '1002'){
        this.getDriverData()
      }else if(this.addForm.assessObj == '1003'){
        this.getVehicleData()
      }else if(this.addForm.assessObj == '1004'){
        this.getSiteData()
      }
      this.assessList.forEach(cur=>{
        if(cur.id == this.addForm.assessObj){
          this.addForm.assessObjTypeName = cur.name
        }
      })
    },
    
    

    save(){
      
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
      
             this.onSubmit();
         
         
        } else {
          return false;
        };
      });
     
    },
    onSubmit(){
     this.spinning = true;
      AddAssessPoint(this.addForm).then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            this.quanVisible = false;
            this.$message.success('保存成功');
            this.$emit('triggerData');
          }else{
            this.$message.warning('保存失败')
          };
      });
    },
  }
}
</script>