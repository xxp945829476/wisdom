<template>
  <a-modal v-model="equipmentVisible" :maskClosable="false" width="80%" v-dialogDrag="dialog" v-fullscreen>
    <div slot="title">
      {{title}}
      <span class="fullscreen_model">
        <a-icon type="fullscreen" class="fullscreen_icon" />
        <a-icon type="fullscreen-exit" class="fullscreen_exit_icon" />
      </span>
    </div>
    <a-spin :spinning="spinning">
    <div>
        <a-form-model  layout="vertical" :model="addForm" ref="ruleForm" :rules="rules">
            <a-row :gutter="40">
                <a-col :md="8">
                    <a-form-model-item label="SIM卡号" prop="simNo">
                        <a-input v-model="addForm.simNo" placeholder="请输入企业名称"/>
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="设备名称" prop="deviceName">
                        <a-input v-model="addForm.deviceName"  placeholder="请输入企业简称"/>
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="主从设备" prop="deviceMasterSlave">
                       <a-select v-model="addForm.deviceMasterSlave" placeholder="请选择企业类型">
                            <a-select-option v-for="item in masterSlave" :key="item.id">
                                {{item.name}}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="设备类型" prop="deviceType">
                      <a-select v-model="addForm.deviceType" placeholder="请选择企业类型">
                            <a-select-option v-for="item in typeList" :key="item.id">
                                {{item.name}}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="设备ID" prop="deviceId">
                        <a-input v-model="addForm.deviceId" placeholder="请输入企业地址"/>
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="设备型号" prop="deviceModel">
                        <a-input v-model="addForm.deviceModel" placeholder="请输入企业编号"/>
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="IMEI号" prop="devideImeiNo">
                        <a-input v-model="addForm.devideImeiNo" placeholder="请输入企业法人"/>
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="运营商" prop="deviceOperator">
                        <a-select v-model="addForm.deviceOperator" placeholder="请选择企业类型" allowClear>
                            <a-select-option v-for="item in operaterList" :key="item.id">
                                {{item.name}}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="厂商ID" prop="devideManufacturer">
                        <a-input v-model="addForm.devideManufacturer" placeholder="请输入负责人电话"/>
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="是否标定" prop="deviceCalibration">
                         <a-select v-model="addForm.deviceCalibration" placeholder="请选择企业类型">
                            <a-select-option value='0'>
                                是
                            </a-select-option>
                            <a-select-option value='1'>
                                否
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="防伪码" prop="deviceSecurityCode">
                        <a-input v-model="addForm.deviceSecurityCode" placeholder="请输入车管联系人电话" />
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="设备套件" prop="deviceKit">
                        <a-select v-model="addForm.deviceKit" placeholder="请选择企业类型" allowClear>
                            <a-select-option v-for="item in kitList" :key="item.id">
                                {{item.name}}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-col>
                <a-col :md="24">
                    <a-form-model-item label="备注" prop="deviceRemark">
                         <a-textarea
                        v-model="addForm.deviceRemark"
                        placeholder="..."
                        :auto-size="{ minRows: 3}"
                        />
                    </a-form-model-item>
                </a-col>
                
            </a-row>        
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
import {BaseList,AddDevicelist,EditDevicelist} from '@/network/api'
import {buildAreaTree,getBobimg} from '@/utils/utils.js'
import debounce from 'lodash/debounce'

export default {
  data() {
    return {
      layout:'Vertical',
      loading:false,
      spinning:false,
      dialog:true,
      equipmentVisible:false,
      addForm: {
        id:'',
        simNo: '',
        deviceName: '',
        deviceMasterSlave:'',
        deviceType:'',
        deviceId:'',
        devideImeiNo:'',
        deviceOperator:'',
        devideManufacturer:'',
        deviceCalibration:'1',
        deviceSecurityCode:'',
        deviceKit:'',
        deviceRemark:'',
      },
      masterSlave:[],//主从设备
      typeList:[],//类型
      operaterList:[],//运营商
      kitList:[],//设备套件
      rules:{
        simNo:[
          { required: true, message: '请输入SIM卡号', trigger: 'blur' },
        ],
        deviceName:[
          { required: true, message: '请输入设备名称', trigger: 'blur' },
        ],
        deviceMasterSlave:[
          { required: true, message: '请选择主从设备', trigger: 'blur' },
        ],
        deviceType:[
          { required: true, message: '请选择设备类型', trigger: 'blur' },
        ],
      },
      isEdit:0,
      title:'',
    }
  },
  created(){
      this.save = debounce(this.save,500)//保存防止重复点击
  },
  methods:{
    addEquipment(val,record){
       
        //val 0新增 1编辑
      this.equipmentVisible = true;
      this.isEdit = val;
      this.$nextTick(()=>{
          this.$refs.ruleForm.resetFields();
          if(val==0){
              this.title = '新增设备';
              this.addForm.id = '';
              this.deviceCalibration = '1'
          }else{
              
              this.title = '编辑设备';
               this.addForm.id = record.id;
              this.addForm.simNo = record.simNo;
              this.addForm.deviceName =  record.deviceName;
              this.addForm.deviceMasterSlave = record.deviceMasterSlave;
              this.addForm.deviceType = record.deviceType;
              this.addForm.deviceId = record.deviceId;
              this.addForm.devideImeiNo = record.devideImeiNo;
              
              this.addForm.deviceOperator = record.deviceOperator == 0 ? undefined : record.deviceOperator;
              this.addForm.devideManufacturer = record.devideManufacturer;
              this.addForm.deviceCalibration = record.deviceCalibration;
              this.addForm.deviceSecurityCode = record.deviceSecurityCode;
              this.addForm.deviceKit = record.deviceKit == 0 ? undefined : record.deviceKit;
              this.addForm.deviceRemark = record.deviceRemark;
            
          };
          document.querySelector('.ant-modal-body').scrollTop = 0;
      });

      this.getType(21,1);
      this.getType(17,2);
      this.getType(24,3);
      this.getType(28,4);
    },
    getType(id,val){

        let params = {
              pid: id
            };
        BaseList(params).then(res=>{
          if(res.data.code == 0){
              if(val == 1){
                  this.masterSlave = res.data.data
              }else if(val == 2){
                  this.typeList = res.data.data
              }else if(val == 3){
                  this.operaterList = res.data.data
              }else if(val == 4){
                  this.kitList = res.data.data
              }
            
          };
        });
    },
   
    
    save(){
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if(this.isEdit == 0){
             this.onSubmit();
          }else{
            this.addForm.deviceOperator =  this.addForm.deviceOperator ?  this.addForm.deviceOperator : 0;
            this.addForm.deviceKit =  this.addForm.deviceKit ?  this.addForm.deviceKit : 0;
            this.onEditSubmit();
          };
         
        } else {
          return false;
        };
      });
     
    },
    onSubmit(){
      this.spinning = true;
      AddDevicelist(this.addForm).then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            this.equipmentVisible = false;
            this.$message.success('保存成功');
            this.$emit('triggerData');
          }else{
            this.$message.warning('保存失败')
          };
      });
    },
     onEditSubmit(){
       this.spinning = true;
      EditDevicelist(this.addForm).then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            this.equipmentVisible = false;
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