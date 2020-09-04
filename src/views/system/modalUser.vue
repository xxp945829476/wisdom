<template>
  <a-modal v-model="userVisible" title="新增用户" :maskClosable="false" :keyboard="false" width="700px" v-dialogDrag="dialog">
    <div>
        <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
                    <a-form-model-item label="用户账号">
                        <a-input v-model="form.name" />
                    </a-form-model-item>

                    <a-form-model-item label="登录密码">
                        <a-input v-model="form.name" />
                    </a-form-model-item>
                   

                    <a-form-model-item label="确认密码">
                        <a-input v-model="form.name" />
                    </a-form-model-item>

                    <a-form-model-item label="用户名称">
                        <a-input v-model="form.name" />
                    </a-form-model-item>

                    <a-form-model-item label="所属部门">
                        <a-input v-model="form.name" />
                    </a-form-model-item>

                    <a-form-model-item label="角色分配">
                        <a-input v-model="form.name" />
                    </a-form-model-item>

                    <a-form-model-item label="是否启用">
                          <a-radio-group v-model="form.resource">
                            <a-radio value="1">
                            激活
                            </a-radio>
                            <a-radio value="2">
                            禁用
                            </a-radio>
                        </a-radio-group>
                    </a-form-model-item>

                    <a-form-model-item label="联系电话">
                        <a-input v-model="form.name" />
                    </a-form-model-item>

                      <a-form-model-item label="有效期">
                        <a-input v-model="form.name" />
                    </a-form-model-item>
                    
                </a-form-model>
    </div>
    <template slot="footer">
        <a-button key="back">
        取消
        </a-button>
        <a-button key="submit" type="primary">
        保存
        </a-button>
    </template>
  </a-modal>
</template>

<script>
/*!
  @param {Boolean} dialog - 弹框是否拖动
  @param {Boolean} useVisible - 弹框显示隐藏
  @method addRole - 弹框显示方法
*/

export default {
  data() {
    return {
      dialog:true,
      userVisible:false,
      form: {
        fieldA: '',
        fieldB: '',
      },
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
    }
  },
  methods:{
    addUser(){
      this.userVisible = true;
    }
  }
}
</script>