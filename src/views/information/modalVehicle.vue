<template>
    <a-modal v-model="vehicleVisible" :maskClosable="false" width="80%" :keyboard="false" v-dialogDrag="dialog" v-fullscreen>
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
                        <a-form-model-item label="所属企业" prop="deptId">
                            <a-select v-model="addForm.deptId"
                            placeholder="请选择所属企业"
                            :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body;}">
                              <a-select-option v-for="item in depList" :key="item.id">
                                  {{item.deptName}}
                              </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="车辆类型" prop="vehicleType">
                            <a-select v-model="addForm.vehicleType"
                            placeholder="请选择车辆类型"
                            :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body;}">
                              <a-select-option v-for="item in typeList" :key="item.id">
                                  {{item.name}}
                              </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="车牌号码" prop="vehicleNo">
                            <a-input v-model="addForm.vehicleNo" placeholder="请输入车牌号码"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="车牌颜色" prop="vehicleLicenceColor">
                           <a-select v-model="addForm.vehicleLicenceColor"
                           placeholder="请选择车牌颜色"
                           :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body;}">
                              <a-select-option v-for="item in colorList" :value="item.id" :key="item.id">
                                  {{item.name}}
                              </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="车辆颜色" prop="vehicleColor">
                            <a-input v-model="addForm.vehicleColor" placeholder="请输入车辆颜色" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="设备名称-主" prop="deviceMaster">
                            <!-- <a-select v-model="addForm.deviceMaster" 
                             placeholder="请选择设备名称-主"
                              :disabled="isEdit==1"
                             @change="changeDeviceMaster"
                           :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body;}">
                              <template v-for="item in devicelist">
                                <a-select-option :value="item.id" :key="item.id" v-if="item.deviceMasterSlave == 22" >
                                        {{item.deviceName}}
                                </a-select-option>
                              </template>  
                              
                            </a-select> -->

                            <a-select  v-model="addForm.deviceMaster" placeholder="请选择设备名称-主" 
                            show-search option-filter-prop="children"
                            :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body;}"
                            @change="changeDeviceMaster"
                            :disabled="isEdit==1" 
                            :filter-option="false" @search="filterOption" allowClear>
                            
                            <div slot="dropdownRender" slot-scope="menu">
                                <v-nodes :vnodes="menu" />
                                <a-divider style="margin: 4px 0;" />
                                <div
                                    style="padding: 4px 8px; cursor: pointer;"
                                    @mousedown="e => e.preventDefault()"
                                >
                                <a-pagination size="small" :total="total"  @change="changeMasterPage" :pageSize='deviceParams.pageSize' :show-total="total => `共 ${total} 条`"/>
                                </div>
                                </div>
                                <a-spin :spinning="fetching" slot="notFoundContent" size="small" />
                                <template v-for="item in devicelist">
                                    <a-select-option  :key="item.id" v-if="item.deviceMasterSlave == 22" :disabled="item.vehicleId!=0">
                                        {{item.deviceName}}
                                    </a-select-option>
                                </template>
                            </a-select>

                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="设备名称-从" prop="deviceSlave">
                            <a-select v-model="addForm.deviceSlave" 
                             placeholder="请选择设备名称-从"
                             :disabled="isEdit==1"
                           :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body;}" @change="changeSeviceSlave" allowClear>
                              <template v-for="item in devicelist">
                                <a-select-option :value="item.id" :key="item.id" v-if="item.deviceMasterSlave == 23">
                                        {{item.deviceName}}
                                </a-select-option>
                              </template>  
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="货箱体积" prop="volume">
                            <a-input-group compact>
                                <a-select style="width: 24%" v-model="isVolume" :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body;}">
                                    <a-select-option value="0">
                                    体积
                                    </a-select-option>
                                    <a-select-option value="1">
                                    长宽高
                                    </a-select-option>
                                </a-select>
                                <template v-if="isVolume=='0'">
                                    <a-input style="width: 76%" v-model="addForm.volume" placeholder="请输入货箱体积"/>
                                </template>
                                <template v-else>
                                     <a-input style="width: 20%" v-model="volumeList.long" placeholder="长/m" />
                                    <a-input style="width: 20%" v-model="volumeList.wide" placeholder="宽/m"/>
                                    <a-input style="width: 20%" v-model="volumeList.height" @change="changeVolume" placeholder="高/m"/>
                                    {{addForm.volume}}/m³
                                </template>
                            </a-input-group>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="车辆简称" prop="vehicleAbbr">
                            <a-input v-model="addForm.vehicleAbbr" placeholder="请输入车辆简称"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="车主姓名" prop="ownerName">
                            <a-select v-model="addForm.ownerName"
                             placeholder="请选择车辆品牌"
                             :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body;}" allowClear>
                              <a-select-option v-for="item in driverlist" :key="item.id">
                                  {{item.driverName}}
                              </a-select-option>
                            </a-select>
                           
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="联系电话" prop="ownerTel">
                            <a-input v-model="addForm.ownerTel" placeholder="请输入联系电话" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="车辆星标" prop="vehicleStarBeacon">
                            <a-select v-model="addForm.vehicleStarBeacon"
                            placeholder="请选择车辆星标"
                            :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body;}" allowClear>
                              <a-select-option v-for="item in starList" :key="item.id">
                                  {{item.name}}
                              </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="车辆品牌" prop="vehicleBrand">
                             <a-select v-model="addForm.vehicleBrand"
                             placeholder="请选择车辆品牌"
                             :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body;}" allowClear>
                              <a-select-option v-for="item in brandList" :key="item.id">
                                  {{item.name}}
                              </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="车辆型号" prop="vehicleModel">
                            <a-select v-model="addForm.vehicleModel"
                             placeholder="请选择车辆型号"
                             :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body;}" allowClear>
                              <a-select-option v-for="item in modelList" :key="item.id">
                                  {{item.name}}
                              </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="车架号" prop="vehicleFrameNo">
                            <a-input v-model="addForm.vehicleFrameNo"  placeholder="请输入车架号"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="车辆新旧" prop="vehicleNewOld">
                            <a-select v-model="addForm.vehicleNewOld" placeholder="请选择车辆新旧" :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body;}" allowClear>
                                <a-select-option value="1">
                                    新
                                </a-select-option>
                                <a-select-option value="2">
                                    旧
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="经销商" prop="distributor">
                            <a-select v-model="addForm.distributor"
                            placeholder="请选择经销商"
                             :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body;}" allowClear>
                              <a-select-option v-for="item in distributorList" :key="item.id">
                                  {{item.deptName}}
                              </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="出厂日期" prop="manufactureTime">
                            <a-date-picker style="width: 100%;" type="date" v-model="addForm.manufactureTime" format="YYYY-MM-DD" valueFormat="YYYY-MM-DD"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="年检时间" prop="yearlyInspectionTime">
                            <a-date-picker  style="width: 100%;" :disabled-date="disabledDate" v-model="addForm.yearlyInspectionTime" format="YYYY-MM-DD" valueFormat="YYYY-MM-DD"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="有效期" prop="expireTime">
                            <a-date-picker style="width: 100%;" :disabled-date="disabledDate" v-model="addForm.expireTime" format="YYYY-MM-DD" valueFormat="YYYY-MM-DD"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="备注" prop="vehicleRemark">
                            <a-input v-model="addForm.vehicleRemark" placeholder="..."/>
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
                                        <img v-if="addForm.vehiclePhoto != 0" :src="pathUrl.imgurl + addForm.vehiclePhoto" alt="avatar" />
                                        <div v-else>
                                            <a-icon :type="loading ? 'loading' : 'plus'" />
                                            <div class="ant-upload-text">
                                                上传
                                            </div>
                                        </div>
                                    </a-upload>
                                    <p>车身照片</p>
                                </a-col>

                                <a-col flex="100px">
                                    <a-upload
                                        name="avatar"
                                        list-type="picture-card"
                                        class="avatar-uploader"
                                        :show-upload-list="false"
                                        :before-upload="uploadTwo"
                                    >
                                        <img v-if="addForm.vehicleDriveLicensePhoto != 0" :src="pathUrl.imgurl + addForm.vehicleDriveLicensePhoto" alt="avatar" />
                                        <div v-else>
                                            <a-icon :type="loading ? 'loading' : 'plus'" />
                                            <div class="ant-upload-text">
                                                上传
                                            </div>
                                        </div>
                                    </a-upload>
                                        <p>车辆行驶证</p>
                                </a-col>

                                <a-col flex="100px">
                                    <a-upload
                                        name="avatar"
                                        list-type="picture-card"
                                        class="avatar-uploader"
                                       :show-upload-list="false"
                                        :before-upload="uploadThree"
                                    >
                                       <img v-if="addForm.vehicleRegistrationPhoto != 0" :src="pathUrl.imgurl + addForm.vehicleRegistrationPhoto" alt="avatar" />
                                        <div v-else>
                                            <a-icon :type="loading ? 'loading' : 'plus'" />
                                            <div class="ant-upload-text">
                                                上传
                                            </div>
                                        </div>
                                    </a-upload>
                                        <p>车辆登记证</p>
                                </a-col>

                                <a-col flex="100px">
                                   <a-upload
                                        name="avatar"
                                        list-type="picture-card"
                                        class="avatar-uploader"
                                       :show-upload-list="false"
                                        :before-upload="uploadFour"
                                    >
                                       <img v-if="addForm.vehicleTransportPermitPhoto != 0" :src="pathUrl.imgurl + addForm.vehicleTransportPermitPhoto" alt="avatar" />
                                        <div v-else>
                                            <a-icon :type="loading ? 'loading' : 'plus'" />
                                            <div class="ant-upload-text">
                                                上传
                                            </div>
                                        </div>
                                    </a-upload>
                                        <p>准运证开关</p>
                                </a-col>

                                <a-col flex="100px">
                                    <a-upload
                                        name="avatar"
                                        list-type="picture-card"
                                        class="avatar-uploader"
                                       :show-upload-list="false"
                                        :before-upload="uploadFive"
                                    >
                                       <img v-if="addForm.vehicleContainerPhoto != 0" :src="pathUrl.imgurl + addForm.vehicleContainerPhoto" alt="avatar" />
                                        <div v-else>
                                            <a-icon :type="loading ? 'loading' : 'plus'" />
                                            <div class="ant-upload-text">
                                                上传
                                            </div>
                                        </div>
                                    </a-upload>
                                        <p>货箱照片</p>
                                </a-col>

                                <a-col flex="100px">
                                    <a-upload
                                        name="avatar"
                                        list-type="picture-card"
                                        class="avatar-uploader"
                                       :show-upload-list="false"
                                        :before-upload="uploadOther"
                                    >
                                       <img v-if="addForm.vehicleOtherPhoto != 0" :src="pathUrl.imgurl + addForm.vehicleOtherPhoto" alt="avatar" />
                                        <div v-else>
                                            <a-icon :type="loading ? 'loading' : 'plus'" />
                                            <div class="ant-upload-text">
                                                上传
                                            </div>
                                        </div>
                                    </a-upload>
                                        <p>其他</p>
                                </a-col>
                                
                            </a-row>
                            
                        </a-form-model-item>
                    </a-col>
                </a-row>        
            </a-form-model>
        </div>
        </a-spin>
        <template slot="footer">
            <a-button key="back" @click="vehicleVisible=false">
            取消
            </a-button>
            <a-button key="submit" type="primary" @click="save">
            保存
            </a-button>
        </template>
    </a-modal>
</template>

<script>
import {BaseList,AddVehicle,EditVehicle,DepartmentList,Devicelist,uploadOne,driverList} from '@/network/api'
import pathUrl from "@/network/requestUrl";
import debounce from 'lodash/debounce'

export default {
  data() {
    return {
      driverlist:[],
      title:"新增车辆",
      isVolume:'0',
      dialog:true,
      vehicleVisible:false,
      volumeList: {
        long:'',
        wide: '',
        height:''
      },
      addForm:{
         id:'',
         deptId:undefined,
         vehicleType:undefined,
         vehicleNo:'',
         volume:'',
         ownerName:'',
         ownerTel:'',
         vehicleStarBeacon:undefined,
         vehicleBrand:undefined,
         vehicleModel:undefined,
         vehicleFrameNo:'',
         distributor:undefined,
         deviceMaster:undefined,
         deviceSlave :undefined,
         vehicleRemark:'',
         manufactureTime:undefined,
         yearlyInspectionTime:undefined,
         expireTime:undefined,
         vehicleNewOld:undefined,
         vehiclePhoto:'',
         vehicleDriveLicensePhoto:'',//行驶证图
         vehicleRegistrationPhoto:'',
         vehicleTransportPermitPhoto:'',
         vehicleContainerPhoto:'',
         vehicleOtherPhoto:'',
         vehicleColor:'',
         vehicleLicenceColor:undefined,
         vehicleAbbr:'',
         deviceSource:1,
         masterDeviceNo:'',
         slaveDeviceNo:'',
      },
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
      depList:[],
      typeList:[],
      colorList:[],
      starList:[],
      brandList:[],
      modelList:[],
      distributorList:[],
      devicelist:[],
      isEdit:0,
      loading:false,
      spinning:false,
      pathUrl,
      rules:{
        deptId:[
          { required: true, message: '请选择企业', trigger: 'blur' },
        ],
        vehicleType:[
          { required: true, message: '请选择车辆类型', trigger: 'blur' },
        ],
        vehicleNo:[
          { required: true, message: '请输入车牌号', trigger: 'blur' },
        ],
        vehicleLicenceColor:[
          { required: true, message: '请选择车牌颜色', trigger: 'blur' },
        ],
        vehicleColor:[
          { required: true, message: '请输入车辆颜色', trigger: 'blur' },
        ],
        deviceMaster:[
          { required: true, message: '请选择主设备', trigger: 'blur' },
        ],
        volume:[
          { required: true, message: '请输入货箱体积', trigger: 'blur' },
        ],
      },
      deviceParams:{
        pageNum:1,
        pageSize:20,
        deviceMasterSlave:'',
        deviceName:'',
      },
      total:0,
      fetching:false,
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
    addvehicle(val,record){
      this.vehicleVisible = true;
      this.isEdit = val;
      this.isVolume = '0';
      this.addForm.deviceSource = 1;
      this.$nextTick(()=>{
          this.$refs.ruleForm.resetFields();
          if(val == 0){
              this.title = '新增车辆';
              this.addForm.id = '';
              this.addForm.vehiclePhoto = '';
              this.addForm.vehicleDriveLicensePhoto = '';
              this.addForm.vehicleRegistrationPhoto = '';
              this.addForm.vehicleTransportPermitPhoto = '';
              this.addForm.vehicleContainerPhoto = '';
              this.addForm.vehicleOtherPhoto = '';
              this.addForm.masterDeviceNo = '';
              this.addForm.slaveDeviceNo = '';
          }else{
              this.title = '编辑车辆';
             this.addForm.id = record.id;
             this.addForm.deptId = record.deptId;
              this.addForm.vehicleType = record.vehicleType;
              this.addForm.vehicleNo = record.vehicleNo;
              this.addForm.vehicleLicenceColor = record.vehicleLicenceColor;
              this.addForm.vehicleColor = record.vehicleColor;
              this.addForm.volume = record.volume;
              this.addForm.ownerName = record.ownerName == 0 ? undefined : record.ownerName;
              this.addForm.ownerTel = record.ownerTel;
              this.addForm.vehicleStarBeacon = record.vehicleStarBeacon == 0 ? undefined : record.vehicleStarBeacon;
              this.addForm.vehicleBrand = record.vehicleBrand == 0 ? undefined : record.vehicleBrand;
              this.addForm.vehicleModel = record.vehicleModel  == 0 ? undefined : record.vehicleModel;
              this.addForm.vehicleFrameNo = record.vehicleFrameNo;
              this.addForm.distributor = record.distributor == 0 ? undefined : record.distributor;
              this.addForm.deviceMaster = record.deviceMaster == 0 ? undefined : record.deviceMaster;
              this.addForm.deviceSlave = record.deviceSlave == 0 ? undefined : record.deviceSlave;
              this.addForm.vehicleRemark = record.vehicleRemark;
              this.addForm.manufactureTime = record.manufactureTime ?  record.manufactureTime : undefined;
              this.addForm.yearlyInspectionTime = record.yearlyInspectionTime ? record.yearlyInspectionTime : undefined;
              this.addForm.expireTime = record.expireTime ? record.expireTime : undefined;
              this.addForm.vehicleNewOld = record.vehicleNewOld == 0 ? undefined : record.vehicleNewOld;
             
              this.addForm.vehiclePhoto = record.vehiclePhoto;
              this.addForm.vehicleDriveLicensePhoto = record.vehicleDriveLicensePhoto;
              this.addForm.vehicleRegistrationPhoto = record.vehicleRegistrationPhoto;
              this.addForm.vehicleTransportPermitPhoto = record.vehicleTransportPermitPhoto;
              this.addForm.vehicleContainerPhoto = record.vehicleContainerPhoto;
              this.addForm.vehicleOtherPhoto = record.vehicleOtherPhoto;
              this.addForm.vehicleAbbr = record.vehicleAbbr;
              this.addForm.masterDeviceNo = '';
              this.addForm.slaveDeviceNo = '';
          }
          document.querySelector('.ant-modal-body').scrollTop = 0;
      })
      this.getDepart();
      this.getDriverList();
      this.getDepart(82);
      this.getDevice();
      this.getType(51,1);
      this.getType(31,2);
      this.getType(38,3);
      this.getType(42,4);
      this.getType(45,5);
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
                if(type == 82){
                     this.distributorList = res.data.data.records
                }else{
                     this.depList = res.data.data.records;
                }
               
            }else{
                this.$message.warning('加载失败')
            };
            
        });
    },
    getDevice(){
        this.fetching = true;
         Devicelist(this.deviceParams).then(res=>{
            if(res.data.code == 0){
                this.fetching = false;
                this.devicelist = res.data.data.records;
                this.total = res.data.data.total;
            }else{
                this.$message.warning('加载失败')
            };
            
        });
    },
    changeMasterPage(page){
        this.deviceParams.pageNum = page;
        this.getDevice();
    },
    filterOption(val) {
      this.deviceParams.pageNum = 1;
      this.deviceParams.deviceName = val;
      this.getDevice();
    },
    getDriverList(){
         let params = {
             deptId: '',
             driverName: '',
             pageNum:1,
             pageSize:999,
         } 
         driverList(params).then(res=>{
            if(res.data.code == 0){
                this.driverlist = res.data.data.records;
            }else{
                this.$message.warning('加载失败')
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
                  this.typeList = res.data.data
              }else if(val == 2){
                  this.colorList = res.data.data
              }else if(val == 3){
                  this.starList = res.data.data
              }else if(val == 4){
                  this.brandList = res.data.data
              }else if(val == 5){
                  this.modelList = res.data.data
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
                this.addForm.vehiclePhoto = res.data.data.path;
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
                this.addForm.vehicleDriveLicensePhoto = res.data.data.path;
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
                this.addForm.vehicleRegistrationPhoto = res.data.data.path;
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
                this.addForm.vehicleTransportPermitPhoto = res.data.data.path;
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
                this.addForm.vehicleContainerPhoto = res.data.data.path;
            };
        })
        return false
    },
     uploadOther(file, fileList){
        let param = new FormData()
        param.append('file',file);
        this.loading = true;
        uploadOne(param).then(res=>{
            this.loading = false;
            if(res.data.code == 0){
                this.addForm.vehicleOtherPhoto = res.data.data.path;
            };
        })
        return false
    },
    disabledDate(current) {
      return current && current < this.$moment().subtract(1,'day');//当天之前时间不可选
    },
    changeVolume(){
        this.addForm.volume = this.volumeList.long * this.volumeList.wide * this.volumeList.height;
    },
    save(){

        let params = JSON.parse(JSON.stringify(this.addForm));

        if(params.manufactureTime){
            params.manufactureTime = this.$moment(params.manufactureTime).unix();
        }else{
            params.manufactureTime = 0
        };

        if(params.yearlyInspectionTime){
            params.yearlyInspectionTime = this.$moment(params.yearlyInspectionTime).unix();
        }else{
            params.yearlyInspectionTime = 0;
        };
        console.log(params.expireTime)
        if(params.expireTime){
            params.expireTime = this.$moment(params.expireTime).unix();
        }else{
            params.expireTime = 0;
        }; //转为时间戳保存

      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if(this.isEdit == 0){
             this.onSubmit(params);
          }else{
              params.ownerName =  params.ownerName ?  params.ownerName : 0;
            params.deviceSlave =  params.deviceSlave ?  params.deviceSlave : 0;
            params.vehicleStarBeacon =  params.vehicleStarBeacon ?  params.vehicleStarBeacon : 0;
            params.vehicleBrand =  params.vehicleBrand ?  params.vehicleBrand : 0;
            params.vehicleModel =  params.vehicleModel ?  params.vehicleModel : 0;
            params.vehicleNewOld =  params.vehicleNewOld ?  params.vehicleNewOld : 0;
            params.distributor =  params.distributor ?  params.distributor : 0;
            this.onEditSubmit(params);
          };
         
        } else {
          return false;
        };
      });
     
    },
    onSubmit(params){
      this.spinning = true;

      AddVehicle(params).then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            this.vehicleVisible = false;
            this.$message.success('保存成功');
            this.$emit('triggerData');
          }else{
            this.$message.warning('保存失败')
          };
      });
    },
     onEditSubmit(params){
       this.spinning = true;
      EditVehicle(params).then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            this.vehicleVisible = false;
            this.$message.success('保存成功');
            this.$emit('triggerData');
          }else{
            this.$message.warning('保存失败')
          };
      });
    },
    changeDeviceMaster(val,option){
        console.log(option)
        this.addForm.masterDeviceNo = this.slectNo(val);
    },
    slectNo(val){
        let simNo = '';
        this.devicelist.forEach(cur=>{
            if(cur.id == val){
                simNo = cur.simNo
            }
        })
        return simNo
    },
    changeSeviceSlave(val){
         this.addForm.slaveDeviceNo = this.slectNo(val);
    }
  }
}
</script>