<template>
<div>
  <a-modal v-model="controlVisible" title="终端控制" :maskClosable="false" :keyboard="false" width="600px" v-dialogDrag="dialog">
     <a-spin :spinning="spinning">
      <div>
          <a-form-model :model="addForm" ref="ruleForm"  :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules">
                      <a-form-model-item label="选择车辆" prop="vehicleNum">
                        <span class="selected_car">已选（{{addForm.vehicleNum}}）辆</span>
                         <a-button type="primary" @click="selCar">
                            选择
                          </a-button>
                      </a-form-model-item>
                      <a-form-model-item label="控制类型" prop="Command">
                          <a-select v-model="command" @change="changeType">
                              <a-select-option v-for="item in controlList" :key="item.id">
                                  {{item.name}}
                              </a-select-option>
                          </a-select>
                      </a-form-model-item>

                      <a-form-model-item label="指令" prop="roleName" v-if="command==36609">
                          <a-radio-group v-model="addForm.Command">
                            <a-radio :value="1">
                              车辆锁定
                            </a-radio>
                            <a-radio :value="2">
                              解除车辆锁定
                            </a-radio>
                          </a-radio-group>
                      </a-form-model-item>

                      <a-form-model-item label="限速值" prop="roleName" v-if="command==36610">
                          <a-input-number style="width:50%" v-model="addForm.Command" :min="0" :max="255"/>
                          <span> km/h(0表示无限制)</span>
                      </a-form-model-item>

                      <a-form-model-item label="指令" prop="roleName" v-if="command==36611">
                          <a-radio-group v-model="addForm.Command">
                            <a-radio :value="1">
                              车辆限举
                            </a-radio>
                            <a-radio :value="2">
                              解除车辆限举
                            </a-radio>
                          </a-radio-group>
                      </a-form-model-item>

                      <a-form-model-item label="指令" prop="roleName" v-if="command==36612">
                          <a-radio-group v-model="addForm.Command">
                            <a-radio :value="1">
                              终端管控开启
                            </a-radio>
                            <a-radio :value="2">
                              终端管控关闭
                            </a-radio>
                          </a-radio-group>
                      </a-form-model-item>

                    <template v-if="command!=36612">
                       <a-form-model-item label="解除事件" prop="roleCode">
                           <a-input-number style="width:100%" v-model="addForm.CTLA" :min="0" :max="255"/>
                      </a-form-model-item>

                      

                      <a-form-model-item label="解除时长" prop="roleDescribe">
                         <a-input-number style="width:100%" v-model="addForm.TIBT"/>
                      </a-form-model-item>

                       

                    </template>

                    <a-form-model-item label="管控原因" prop="reason">
                           <a-textarea
                            v-model="addForm.reason"
                            placeholder="..."
                            :auto-size="{minRows: 3 }"
                          />
                      </a-form-model-item>

                     
                      
                  </a-form-model>
      </div>
     </a-spin>
      <template slot="footer">
          <a-button key="back" @click="controlVisible=false">
          取消
          </a-button>
          <a-button key="submit" type="primary" @click="save">
          设置
          </a-button>
      </template>
  </a-modal>
  <modalSelectCar ref="select_car" @getVehicleNo="getVehicleNo"></modalSelectCar>
</div>
</template>

<script>
/*!
  @param {Boolean} dialog - 弹框是否拖动
  @param {Boolean} roleVisible - 弹框显示隐藏
  @method addRole - 弹框显示方法
*/
import modalSelectCar from './modalSelectCar.vue'
import {GetJsession} from '@/network/api'
import {ControlRemote} from '@/network/apiOther'
import {AddControl,BaseList} from '@/network/api'
import debounce from 'lodash/debounce'

export default {
  data() {
    let vehicleNumPass = (rule, value, callback) => {
      if (value === 0) {
        callback(new Error('请选择车辆'));
      } else {
        callback();
      }
    };
    return {
      spinning:false,
      dialog:true,
      controlVisible:false,
      command: '36609',
      addForm: {
        Command:1,
        CTLA: '',
        TIBT: '',
        reason:'',
        vehicleNum:0
      },
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
      controlList:[],
      vehicleList:[],
      rules:{
        reason: [{ required: true, message: '请输入管控原因', trigger: 'blur' }],
        vehicleNum: [{ validator: vehicleNumPass, trigger: 'blur' }],
      }
    }
  },
  created(){
     this.save = debounce(this.save,500)//保存防止重复点击
  },
  components:{
    modalSelectCar
  },
  methods:{
      issueControl(val,record){
        this.$nextTick(()=>{
          this.command = '36609';
          this.addForm.Command = 1;
          this.addForm.CTLA = '';
          this.addForm.TIBT = '';
          this.controlVisible = true;
          this.addForm.vehicleNum = 0;
          this.vehicleList = [];
          this.addForm.reason = '';
        })
          
        this.getType();
      },
      getType(){

        let params = {
              pid: 109
            };
        BaseList(params).then(res=>{
          if(res.data.code == 0){
          
              this.controlList = res.data.data
             
            
          };
        });
      },
      changeType(val){
        console.log(val)
        if(val==36610){
          this.addForm.Command=0
        }else{
          this.addForm.Command=1;
        };
 
        this.addForm.CTLA = '';
        this.addForm.TIBT = '';
        
      },
      save(){
        this.getJsession()
      },
      getJsession(){

        let params = {
              };
            GetJsession(params).then(res=>{
              if(res.data.code == 0){
                  this.jsession = res.data.data;
                    this.$refs['ruleForm'].validate(valid => {
                    if (valid) {
                          this.saveOK(res.data.data)
                    } else {
                      console.log('error submit!!');
                      return false;
                    }
                  });
                  
                  
              }else{
                
              };
            })
      },
      saveOK(jsession){
        this.spinning =true;
        ControlRemote(this.addForm,'?jsession='+jsession+'&DevIDNO='+'019911112222'+'&Command='+this.command).then(res=>{
           this.spinning =false;
          if(res.data.result==0||res.data.result==22){
           
            this.addSave()
            this.$message.success('设置成功')
          };
        }).catch(error=>{
          this.spinning =false;
        })
      },
      addSave(){
          this.controlVisible = false;
        
          this.vehicleList.forEach(cur=>{
            cur['controlOrder'] = this.addForm.Command;
            cur['controlType'] = this.command;
            cur['reason'] = this.addForm.reason;
            cur['removeEvent'] = this.addForm.CTLA;
            cur['removeTime'] = this.addForm.TIBT;
            cur['spLimit'] = this.addForm.Command;
            cur['deviceNo'] = cur.simNo;
          });
          AddControl(this.vehicleList).then(res=>{
            if(res.data.code==0){
              this.controlVisible = false;
              this.$emit('triggerData');
            };
          });
          
        
      },

      selCar(){
        this.$refs.select_car.selCar(this.addForm.vehicleNum);
      },
      getVehicleNo(arr){
        this.vehicleList = arr;
        this.addForm.vehicleNum =  arr.length;
      }
    
    }
  
}
</script>