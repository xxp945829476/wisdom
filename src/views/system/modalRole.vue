<template>
  <a-modal v-model="roleVisible" title="新增角色" :maskClosable="false" :keyboard="false" width="700px" v-dialogDrag="dialog">
      <div>
          <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
                      <a-form-model-item label="角色名称">
                          <a-input v-model="form.name" />
                      </a-form-model-item>

                      <a-form-model-item label="角色编码">
                          <a-input v-model="form.name" />
                      </a-form-model-item>

                      <a-form-model-item label="所属部门">
                          <a-input v-model="form.name" />
                      </a-form-model-item>

                      <a-form-model-item label="描述">
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
  @param {Boolean} roleVisible - 弹框显示隐藏
  @method addRole - 弹框显示方法
*/

export default {
  data() {
    return {
      dialog:true,
      roleVisible:false,
      form: {
        fieldA: '',
        fieldB: '',
      },
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
    }
  },
  methods:{
    addRole(){
      this.roleVisible = true;
    }
  }
}
</script>