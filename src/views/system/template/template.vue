<template>
    <div class="drawPop" v-if="templateShow">
        <div class="template_head">
            <a-row type="flex" justify="space-between">
                <a-col flex="200px">
                     <a-button type="primary" @click="templateShow = false">
                        <a-icon type="left" />返回
                    </a-button>
                </a-col>
                <a-col flex="auto" class="nav_template">
                    <a-steps :current="current" @change="onChange">
                        <a-step title="基础设置" />
                        <a-step title="表单设计" />
                        <a-step title="流程设计" />
                    </a-steps>
                </a-col>
                <a-col flex="200px" class="save_template">
                     <a-button type="primary"  @click="save">
                        <a-icon type="save"/>保存
                    </a-button>
                    <!-- <a-button class="bh_btn_right">
                        发布
                    </a-button> -->
                </a-col>
            </a-row>
        </div>

        <div class="template_content">
            <!-- 基础设置 -->
            <div class="template_base" v-show="current == 0">
                <a-form-model :model="addForm" ref="ruleForm" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules">
                    <a-form-model-item label="名称" prop="workflowName">
                        <a-tooltip>
                             <template slot="title">
                                最多20字
                            </template>
                        <a-input v-model="addForm.workflowName" :maxLength="20" placeholder="请输入名称"/>
                        </a-tooltip>
                    </a-form-model-item>

                    <a-form-model-item label="设置发起人" prop="sponsorNames">

                        <a-input-search v-model="addForm.sponsorNames" placeholder="请设置发起人" @search="setSponsor">
                        <a-button slot="enterButton" icon="setting">
                            
                        </a-button>
                        </a-input-search>
                            
                    </a-form-model-item>

                    <a-form-model-item label="操作" prop="workflowType">
                        <a-select v-model="addForm.workflowType"  mode="multiple" placeholder="请选择操作类型">
                            <a-select-option value="1">
                                申请延期
                            </a-select-option>
                             <a-select-option value="2">
                                申请换证
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>

                    

                    <a-form-model-item label="审批意见提示" prop="workflowOpinion">
                        <a-textarea
                        v-model="addForm.workflowOpinion"
                       placeholder="请输入审批意见(最多200字)"
                        :auto-size="{ minRows: 5}"
                        />
                    </a-form-model-item>

                    <a-form-model-item label="审批意见" prop="require">
                        <a-checkbox v-model="addForm.require" @change="changeOpinion">
                                必填
                        </a-checkbox>
                    </a-form-model-item>
                </a-form-model>
            </div>

            <!-- 表单设计 -->
            <div>
                <formDesign ref="formDesign" :current='current' @getFromDesign="getFromDesign" :workflowId='addForm.id' :list2="addForm.formList"></formDesign>
            </div>

            <!-- 流程设计 -->
            <div>
                <ProcessDesign ref="processDesign" :workflowId='addForm.id' :current='current' @getValue="getValue" @getProcessDesign="getProcess"></ProcessDesign>
            </div>

        </div>


        <!-- 设置发起人 -->
        <modalSponsor ref="sel_sponsor" @getValue="getValue"></modalSponsor>
        
        
    </div>
</template>

<script>
import formDesign from './formDesign.vue'
import ProcessDesign from './ProcessDesign.vue'
import modalSponsor from './modalSponsor.vue'
import {GetId,AddWorkflow,GetFormInfo,GetBaseInfoWorkflow} from '@/network/api'

export default {
    data() {
        return {
            current: 0,
            templateShow:false,
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
            rules:{
                workflowName:[
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ],
            },
            addForm:{
                id:'',
                workflowName:'',
                sponsorUserIds:'',
                sponsorDeptIds:'',
                sponsorDeptTypes:'',
                workflowType:[],
                sponsorNames:'',
                workflowOpinionRequire:'',
                workflowOpinion:'',
                require:false,
                formList:[],
                nodeList:[],
                progressContent:''
            },
            oldId:'',
            isEdit:1,
            
        }
    },
    components:{
        formDesign,
        ProcessDesign,
        modalSponsor
    },
    created(){
        this.init()
    },
    methods:{
        init(){
           
        },
        getId(){
            GetId().then(res=>{
                if(res.data.code == 0){
                    this.addForm.id = res.data.data[0]
                }else{
                    this.$message.warning('加载失败')
                };
                
            });
        },
        
        
        editTemplate(val,items){
            console.log(items)
            this.templateShow = true;
            this.current = 0;
            this.isEdit = val;
            if(val==1){
                this.addForm = {
                    id:'',
                    workflowName:'',
                    sponsorUserIds:'',
                    sponsorDeptIds:'',
                    sponsorDeptTypes:'',
                    workflowType:[],
                    sponsorNames:'',
                    workflowOpinionRequire:'',
                    workflowOpinion:'',
                    require:false,
                    formList:[],
                    nodeList:[],
                    progressContent:''
                };
               
                
            }else{
                this.oldId = items.id;
                this.getBaseInfoWorkflow();
                
            }

             this.getId();

            
            
        },
        
        getBaseInfoWorkflow(){
            
            let params={
                workflowId:this.oldId
            }
            GetBaseInfoWorkflow(params).then(res=>{
                if(res.data.code==0){
                    let data = res.data.data;
                    this.addForm.workflowName=data.workflowName;
                    this.addForm.sponsorDeptIds=data.sponsorDeptIds;
                    this.addForm.sponsorNames=data.sponsorNames;
                    this.addForm.workflowType=data.workflowType?data.workflowType.split(','):[];
                    this.addForm.workflowOpinionRequire=data.workflowOpinionRequire;
                    this.addForm.require=data.workflowOpinionRequire==1?true:false;
                    this.addForm.workflowOpinion=data.workflowOpinion;
                    this.addForm.progressContent=data.progressContent;
                    this.$refs.formDesign.initEdit(this.oldId)
                    this.$refs.processDesign.initProcess(data.progressContent)
                }
            });
        },
        onChange(current) {
           
            if(current != 0){
                this.$refs.ruleForm.validate(valid => {
                if (valid) {
                        this.current = current;
                        if(current==1){
                                this.$refs.formDesign.init(this.isEdit)
                            }else if(current==2){
                                this.$refs.processDesign.init(this.addForm.sponsorDeptIds,this.addForm.sponsorNames,this.isEdit,this.oldId,this.addForm.progressContent)
                            }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }else{
                this.current = current;
            }
            
            
        },
        save(){
           this.$refs.formDesign.getFromDesign()
           this.$refs.processDesign.getProcessDesign()
           console.log(this.addForm)

      
           this.addForm.workflowType = this.addForm.workflowType.length>0 ? this.addForm.workflowType.join(',') : '';
           this.SaveOK(this.addForm)
        },  
        SaveOK(){
           AddWorkflow(this.addForm).then(res=>{
                if(res.data.code == 0){
                    this.templateShow = false;
                    this.$emit('close')
                    this.$message.success('保存成功')
                }else{
                    this.$message.warning('保存成功')
                };
            }); 
        },
        getFromDesign(arr){
            
            
            this.addForm.formList = JSON.parse(JSON.stringify(arr));
            this.addForm.formList.forEach(cur=>{
                if(cur.controlFormType==9||cur.controlFormType==10){
                    cur.vehicleTypeSelect = cur.vehicleTypeSelect.length>0?cur.vehicleTypeSelect.join(',') : '';
                    cur.vehicleProhibitSelect = cur.vehicleProhibitSelect.length>0?cur.vehicleProhibitSelect.join(',') : ''
                };
            })
        },
        changeOpinion(e){
            this.addForm.workflowOpinionRequire = e.target.checked ? 1 : 0;
        },
        setSponsor(){
           this.sponsorVisible = true
           this.$refs.sel_sponsor.setSponsor()
        },
        getValue(depArr,useArr,name){
            console.log(depArr)
             console.log(useArr)
             console.log(name)
            this.addForm.sponsorDeptIds = depArr.length>0 ? depArr.join(',') : ''
            this.addForm.sponsorUserIds = useArr.length>0 ? useArr.join(',') : ''
            this.addForm.sponsorNames = name.length>0 ? name.join(',') : ''
        },
        getProcess(arr){
           
            arr.forEach((element,index)=>{

                if(index==0&&arr.length>1){
                    if(arr[index+1].progressType==6){
                        element.progressDetailList[0].nodeType = 2;
                    }else{
                        element.progressDetailList[0].nodeType = 1;
                    };

                    let nextNodeArr = [];
                    arr[index+1].progressDetailList.forEach(cur=>{
                        nextNodeArr.push(cur.id)
                    })
                    element.progressDetailList[0].nextNode = nextNodeArr.join(',')
                }//起点

                if(index>0&&index<arr.length-1){
                    element.progressDetailList.forEach(cur=>{
                        if(arr[index-1].progressType!=6&&arr[index+1].progressType!=6){
                            cur.nodeType = 1
                        }else if(arr[index-1].progressType==6&&arr[index+1].progressType!=6){
                            cur.nodeType = 3
                        }else if(arr[index-1].progressType!=6&&arr[index+1].progressType==6){
                             cur.nodeType = 2
                        }else if(arr[index-1].progressType==6&&arr[index+1].progressType==6){
                             cur.nodeType = 4
                        };

                        let upArr = [];
                        arr[index-1].progressDetailList.forEach(cur=>{
                            upArr.push(cur.id)
                        });
                        cur.preNode = upArr.join(',');

                         let downArr = [];
                        arr[index+1].progressDetailList.forEach(cur=>{
                            downArr.push(cur.id)
                        });
                        cur.nextNode = downArr.join(',')
                    });
                    
                };//中间

                if(index==arr.length-1&&arr.length>1){
                    if(arr[index-1].progressType==6){
                        element.progressDetailList[0].nodeType = 3;
                    }else{
                        element.progressDetailList[0].nodeType = 1;
                    };
                    let preNodeArr = [];
                     arr[index-1].progressDetailList.forEach(cur=>{
                        preNodeArr.push(cur.id)
                    })
                    element.progressDetailList[0].preNode = preNodeArr.join(',')
                }//终点
            });

     
            let newArr = [];
            arr.forEach(cur=>{
                newArr.push(...cur.progressDetailList)
            })
            newArr.forEach((ele,index)=>{
                ele.sort = index;
                ele.workflowId = this.addForm.id;
            })
            this.addForm.nodeList = newArr;
            this.addForm.progressContent = JSON.stringify(arr)
        }
  }
}
</script>