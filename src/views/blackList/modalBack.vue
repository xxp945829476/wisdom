<template>
  <a-modal v-model="backVisible" :maskClosable="false" :keyboard="false" width="600px" v-dialogDrag="dialog" >
    <div slot="title">
      {{title}}
    </div>
    <a-spin :spinning="spinning">
    <div>

      
        <a-form-model  :model="addForm" ref="ruleForm" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
          
              
                        

                             <a-form-model-item label="车辆名称" prop="vehicleNo" v-if="isType!=1">


                                <a-select placeholder="请选择车辆名称" 
                                  show-search option-filter-prop="children"
                                  v-model="addForm.vehicleId" 
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

                            <a-form-model-item label="所属企业" prop="deptId">


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
                                      <template v-for="item in companyList">
                                          <a-select-option  :key="item.id">
                                              {{item.deptName}}
                                          </a-select-option>
                                      </template>
                                  </a-select>
                            </a-form-model-item>

                                      
              
              
                    <a-form-model-item label="黑名单类型" prop="reasonType">
                         <a-select v-model="addForm.reasonType" placeholder="请选择黑名单类型">
                            <a-select-option v-for="item in typeList" :key="item.id">
                                {{item.name}}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>

                    <a-form-model-item label="黑名单说明" prop="remark">
                        <a-textarea
                        v-model="addForm.remark"
                        placeholder="请输入黑名单说明"
                        :auto-size="{ minRows: 5 }"
                        />
                    </a-form-model-item>


                    <a-form-model-item label="审批材料" prop="file">
                        <a-row type="flex" justify="start" class="upload_enclosure">
                            <a-col flex="100px">
                                <a-upload
                                    name="avatar"
                                    list-type="picture-card"
                                    class="avatar-uploader"
                                    :show-upload-list="false"
                                    :before-upload="uploadOne"
                                >
                                   <img v-if="addForm.file" :src="pathUrl.imgurl + addForm.file" alt="avatar" />
                                    <div v-else>
                                        <a-icon :type="loading ? 'loading' : 'plus'" />
                                        <div class="ant-upload-text">
                                            上传
                                        </div>
                                    </div>
                                </a-upload>
                            </a-col>
                        </a-row>
                        
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
import {BaseList,DepartmentList,AddVehicleBlack,Vehiclelist,uploadOne,AddDeptBlack} from '@/network/api'

import debounce from 'lodash/debounce'
import pathUrl from "@/network/requestUrl";
export default {
  data() {
    return {
      pathUrl,
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
      loading:false,
      spinning:false,
      dialog:true,
      backVisible:false,
      addForm: {
        id:'',
        deptId:undefined,
        reasonType:undefined,
        vehicleNo:'',
        vehicleId:undefined,
        file:'',
        remark:''
      },
      rules:{
        vehicleNo:[
          { required: true, message: '请选择车辆名称', trigger: 'change' },
        ],
        deptId:[
          { required: true, message: '请选择所属企业', trigger: 'change' },
        ],
        reasonType:[
          { required: true, message: '请选择黑名单类型', trigger: 'change' },
        ]
      },
     title:'新增黑名单',
      isType:0,
      typeList:[],
      companyList:[],
      vehiclelist:[],

      total:0,
      pageSize:20,
      pageNum:1,

      totalVel:0,
      pageSizeVel:20,
      pageNumVel:1,

      deptName:'',
      fetching:false,
      vehicleNo:'',
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
    addQuan(val){
            this.backVisible = true;
            this.isType = val;
          this.$nextTick(()=>{
              this.$refs.ruleForm.resetFields();
              this.addForm.vehicleNo = '';
             document.querySelector('.ant-modal-body').scrollTop = 0;    
          })
          
          this.getType();
          this.getCompanyData();
          this.getVehicleData();

    },
    getType(){

        let params = {
              pid: 1020
            };
        BaseList(params).then(res=>{
          if(res.data.code == 0){
              this.typeList = res.data.data
          };
        });
    },
   
     getVehicleData(){
        let params = {
           simNo :'',
          vehicleNo:this.vehicleNo,
          pageNum:this.pageNumVel,
          pageSize:this.pageSizeVel,
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
               
                this.totalVel = res.data.data.total;
            }
            
        });
    },
    filterOptionVehicle(val){
       this.pageNumVel = 1;
       this.vehicleNo = val;
       this.getVehicleData();
    },
    changeVehicle(val,params){
      console.log(params.data.attrs.deptName);
      this.addForm.vehicleNo = params.data.attrs.deptName;
    },
    changeVehiclePage(page){
      this.pageNumVel = page;
      this.getVehicleData();
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

    changeCompanyPage(page){
      this.pageNum = page;
      this.getCompanyData();
    },

     uploadOne(file, fileList){
        let param = new FormData()
        param.append('file',file);
        this.loading = true;
        uploadOne(param).then(res=>{
            this.loading = false;
            if(res.data.code == 0){
                this.addForm.file = res.data.data.path;
            };
        })
        return false
    },

    
    

    save(){
      
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
            if(this.isType==1){
               this.onDeptSubmit();
            }else{
               this.onSubmit();
            }
            
         
         
        } else {
          return false;
        };
      });
     
    },
    onSubmit(){
     this.spinning = true;
      AddVehicleBlack(this.addForm).then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            this.backVisible = false;
            this.$message.success('保存成功');
            this.$emit('triggerData');
          }else{
            this.$message.warning('保存失败')
          };
      });
    },
    onDeptSubmit(){
     this.spinning = true;
      AddDeptBlack(this.addForm).then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            this.backVisible = false;
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