<template>
<div>
  <a-modal v-model="facilitiesVisible" :maskClosable="false" width="80%" v-dialogDrag="dialog" v-fullscreen>
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
                    <a-form-model-item label="设施名称" prop="facilityName">
                        <a-input v-model="addForm.facilityName" placeholder="请输入设施名称"/>
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="设施类型" prop="facilityType">
                        <a-select v-model="addForm.facilityType" placeholder="请选择设施类型">
                            <a-select-option v-for="item in typeList" :key="item.id">
                                {{item.name}}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="设施简称" prop="facilityAbbr">
                        <a-input v-model="addForm.facilityAbbr" placeholder="请输入设施简称"/>

                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="所在工地" prop="fieldName">
                            <a-input v-model="addForm.fieldName" placeholder="请输入所在工地" disabled/>
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="所在位置" prop="facilityPositionName">
                        <a-input-search v-model="addForm.facilityPositionName" placeholder="请选择所在位置" @search="selPosition">
                          <a-button slot="enterButton" type="primary">
                            点选位置
                          </a-button>
                      </a-input-search>
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="绑定设备" prop="deviceId">
                        <a-select  v-model="addForm.deviceId" placeholder="请输入绑定设备" show-search option-filter-prop="children" :filter-option="filterOption" allowClear>
                            
                            <div slot="dropdownRender" slot-scope="menu">
                              <v-nodes :vnodes="menu" />
                              <a-divider style="margin: 4px 0;" />
                              <div
                                style="padding: 4px 8px; cursor: pointer;"
                                @mousedown="e => e.preventDefault()"
                              >
                               <a-pagination size="small" :total="total"  @change="changeDevice" :pageSize='deviceParams.pageSize' :show-total="total => `共 ${total} 条`"/>
                              </div>
                            </div>
                              <a-spin :spinning="fetching" slot="notFoundContent" size="small" />
                             <a-select-option v-for="item in deviceList" :key="item.id" :disabled="item.facilityId != 0">
                                {{item.deviceName}}
                            </a-select-option>
                          </a-select>
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="默认视频通道" prop="vedioChannel">
                       
                         <a-select v-model="addForm.vedioChannel" placeholder="请选择默认视频通道" allowClear>
                           
                            <a-select-option v-for="item in vedioChannelList" :key="item.id">
                                {{item.name}}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="负责人" prop="facilityFzr">
                        <a-input v-model="addForm.facilityFzr" placeholder="请输入负责人"/>
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="联系电话" prop="facilityFzrTel">
                        <a-input v-model="addForm.facilityFzrTel" placeholder="请输入联系电话"/>
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="品牌" prop="facilityBrand">
                         <a-input v-model="addForm.facilityBrand" placeholder="请输入品牌"/>
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="备注" prop="facilityRemark">
                        <a-input v-model="addForm.facilityRemark" placeholder="请输入备注" />
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
                                        <img v-if="addForm.facilityEnclosure != 0" :src="pathUrl.imgurl + addForm.facilityEnclosure" alt="avatar" />
                                        <div v-else>
                                            <a-icon :type="loading ? 'loading' : 'plus'" />
                                            <div class="ant-upload-text">
                                                上传
                                            </div>
                                        </div>
                                    </a-upload>
                                    <p>设施照片</p>
                                </a-col>
                            </a-row>
                    </a-form-model-item>
                </a-col>
                
            </a-row>        
        </a-form-model>
    </div>
    </a-spin>
    <template slot="footer">
        <a-button key="back" @click="facilitiesVisible = false">
        取消
        </a-button>
        <a-button key="submit" type="primary" @click="save">
        保存
        </a-button>
    </template>
  </a-modal>
  <selectPosition ref="sel_position" @getPosition="getPosition"></selectPosition>
</div>
</template>

<script>
import {BaseList,AddFacility,EditFacility,SiteEquipmentList,uploadOne} from '@/network/api'
import debounce from 'lodash/debounce'
import selectPosition from './selectPosition.vue'
import pathUrl from "@/network/requestUrl";

export default {
  data() {
    return {
      pathUrl,
      layout:'Vertical',
      loading:false,
      spinning:false,
      dialog:true,
      facilitiesVisible:false,
      addForm: {
        id:'',
        facilityName:'',
        facilityType:'',
        facilityAbbr:'',
        fieldId:'',
        facilityPosition:'',
        deviceId:'',
        deviceName:'',
        vedioChannel:'',
        facilityFzr:'',
        facilityFzrTel:'',
        facilityBrand:'',
        facilityRemark:'',
        fieldName:'',
        facilityPositionName:'',
        facilityEnclosure:'',
      },
      typeList:[],//设施类型
      vedioChannelList:[],//通道
      deviceList:[],//设备列表
      deviceParams:{
        pageNum:1,
        pageSize:10,
      },
      rules:{
        facilityName:[
          { required: true, message: '请输入设施名称', trigger: 'blur' },
        ],
        facilityType:[
          { required: true, message: '请选择设施类型', trigger: 'change' },
        ],
        facilityPositionName:[
          { required: true, message: '请选择所在位置', trigger: 'blur' },
        ],
      },
      isEdit:0,
      title:'',
      siteList:{},
      total:0,
      oldDeviceId:'',
      fetching:false,
    }
  },
  created(){
      this.save = debounce(this.save,500)//保存防止重复点击
  },
  components:{
    selectPosition,
     VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
  methods:{
    addFacilities(val,record){
        console.log(record)
        //val 0新增 1编辑
      this.facilitiesVisible = true;
      this.isEdit = val;
      this.addForm.deviceSource = 1;
      this.$nextTick(()=>{
          this.$refs.ruleForm.resetFields();
          if(val==0){
              this.title = '新增工地设施';
              this.addForm.id = '';
              this.addForm.fieldId = record.siteId;
              this.addForm.fieldName = record.siteName;
              this.siteList =  record;
              this.addForm.facilityPosition = '';
              this.addForm.facilityEnclosure = '';
          }else{
              
              this.title = '编辑工地设施';
               this.addForm.id = record.id;
              this.addForm.facilityName = record.facilityName;
              this.addForm.facilityType =  record.facilityType == 0 ? undefined : record.facilityType;;
       

              this.addForm.facilityAbbr = record.facilityAbbr;
              this.addForm.fieldName = record.fieldName;
              this.addForm.facilityPositionName = record.facilityPositionName;
              this.addForm.facilityPosition = record.facilityPosition;
              this.addForm.deviceId = record.deviceId  == 0 ? undefined : record.deviceId;
              this.addForm.deviceName = record.deviceName;
              this.addForm.vedioChannel = record.vedioChannel == 0 ? undefined : record.vedioChannel;
              this.addForm.facilityFzr = record.facilityFzr 
              this.addForm.facilityFzrTel = record.facilityFzrTel;
              this.addForm.facilityBrand = record.facilityBrand;
              this.addForm.facilityRemark = record.facilityRemark;
              this.addForm.facilityEnclosure = record.facilityEnclosure;;
              this.siteList =  record;

              this.oldDeviceId = this.addForm.deviceId;

            
          };
          document.querySelector('.ant-modal-body').scrollTop = 0;
      });
      this.getType(90,1);
      this.getType(94,2);
      this.getDeviceList();
    },

    getDeviceList(){
          this.fetching = true;
          SiteEquipmentList(this.deviceParams).then(res=>{
            this.fetching = false;
            if(res.data.code == 0){
                let data = res.data.data.records;
                this.deviceList = data;
                this.total = res.data.data.total;
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
                  this.vedioChannelList = res.data.data
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
                this.addForm.facilityEnclosure = res.data.data.path;
            };
        })
        return false
    },
   
    
    save(){
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if(this.isEdit == 0){
             this.onSubmit();
          }else{
            this.addForm.deviceId =  this.addForm.deviceId ?  this.addForm.deviceId : 0;
            this.addForm.facilityType =  this.addForm.facilityType ?  this.addForm.facilityType : 0;
            this.addForm.vedioChannel =  this.addForm.vedioChannel ?  this.addForm.vedioChannel : 0;

            if(this.oldDeviceId){
              this.$set(this.addForm,'oldDeviceId',this.oldDeviceId);
            }else{
              this.$set(this.addForm,'oldDeviceId',0);
            };
             

            
            
            
            this.onEditSubmit();
          };
         
        } else {
          return false;
        };
      });
     
    },
    onSubmit(){
      this.spinning = true;
      AddFacility(this.addForm).then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            this.facilitiesVisible = false;
            this.$message.success('保存成功');
            this.$emit('triggerData');
          }else{
            this.$message.warning('保存失败')
          };
      });
    },
     onEditSubmit(){
       this.spinning = true;
      EditFacility(this.addForm).then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            this.facilitiesVisible = false;
            this.$message.success('保存成功');
            this.$emit('triggerData');
          }else{
            this.$message.warning('保存失败')
          };
      });
    },
    selPosition(){
      this.$refs.sel_position.selPosition(this.siteList,this.addForm.facilityPosition)
    },
    getPosition(adress,position){
      this.addForm.facilityPositionName = adress;
      this.addForm.facilityPosition =  JSON.parse(position).lat +',' +  JSON.parse(position).lng;
    },
    changeDevice(pageNumber){
      this.deviceParams.pageNum = pageNumber;
      this.getDeviceList();
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
  }
}
</script>