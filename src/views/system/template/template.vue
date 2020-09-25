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
                     <a-button type="primary">
                        <a-icon type="save" />保存
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
                    <a-form-model-item label="角色名称" prop="roleName">
                        <a-input v-model="addForm.roleName" placeholder="请输入角色名称"/>
                    </a-form-model-item>

                    <a-form-model-item label="设置发起人" prop="roleName">
                        <a-input v-model="addForm.roleName" placeholder="请输入角色名称"/>
                    </a-form-model-item>

                    <a-form-model-item label="操作" prop="roleName">
                        <a-input v-model="addForm.roleName" placeholder="请输入角色名称"/>
                    </a-form-model-item>

                    <a-form-model-item label="审批意见" prop="roleName">
                    <a-checkbox>
                            Checkbox
                        </a-checkbox>
                    </a-form-model-item>

                    <a-form-model-item label="审批意见提示" prop="roleName">
                        <a-input v-model="addForm.roleName" placeholder="请输入角色名称"/>
                    </a-form-model-item>
                </a-form-model>
            </div>

            <!-- 表单设计 -->
            <div v-show="current == 1">
                <formDesign></formDesign>
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
            rules:{},
            addForm:{
                roleName:'',
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
  }
}
</script>