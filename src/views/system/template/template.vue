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
                    <a-button class="bh_btn_right">
                        发布
                    </a-button>
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
                        <a-input v-model="addForm.sponsorNames" placeholder="请选择设置发起人"/>
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
            <div v-show="current == 1">
                <formDesign ref="formDesign" @getFromDesign="getFromDesign"></formDesign>
            </div>

            <!-- 流程设计 -->
            <div v-show="current == 2">
                <ProcessDesign></ProcessDesign>
            </div>

        </div>
        
    </div>
</template>

<script>
import formDesign from './formDesign.vue'
import ProcessDesign from './ProcessDesign.vue'

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
                require:false
            }
        }
    },
    components:{
        formDesign,
        ProcessDesign
    },
    methods:{
        editTemplate(){
            this.templateShow = true;
        },
        onChange(current) {
            this.current = current;
        },
        save(){
           this.$refs.formDesign.getFromDesign()
        },
        getFromDesign(arr){
            console.log(arr) 
        },
        changeOpinion(e){
            this.addForm.workflowOpinionRequire = e.target.checked ? 1 : 0;
        }
  }
}
</script>