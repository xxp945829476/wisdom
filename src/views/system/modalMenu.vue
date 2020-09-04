<template>
  <a-modal v-model="menuVisible" title="新增菜单" :maskClosable="false" :keyboard="false" width="800px" v-dialogDrag="dialog">
    <div>
        <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
                    <a-form-model-item label="上级菜单">
                        <a-input v-model="form.name" :disabled="superiorDisbled"/>
                    </a-form-model-item>

                    <a-form-model-item label="菜单名称">
                        <a-input v-model="form.name" />
                    </a-form-model-item>

                    <a-form-model-item label="菜单路径">
                        <a-input v-model="form.name" />
                    </a-form-model-item>

                    <a-form-model-item label="前端组件">
                        <a-input v-model="form.name" />
                    </a-form-model-item>

                    <a-form-model-item label="图标">
                        <a-input v-model="form.name" />
                    </a-form-model-item>

                    <a-form-model-item label="角色分配">
                        <a-input v-model="form.name" />
                    </a-form-model-item>

                    <a-form-model-item label="排序">
                          <a-input-number id="inputNumber" v-model="form.name" />
                    </a-form-model-item>

                    <a-form-model-item label="菜单类型">
                        <a-radio-group v-model="form.name">
                            <a-radio value="1">
                            URL
                            </a-radio>
                            <a-radio value="2">
                            API
                            </a-radio>
                            <a-radio value="3">
                            button
                            </a-radio>
                        </a-radio-group>
                    </a-form-model-item>

                    <a-form-model-item label="是否缓存路由">
                        <a-switch checked-children="是" un-checked-children="否"  />
                    </a-form-model-item>

                    <a-form-model-item label="是否禁用">
                        <a-switch checked-children="是" un-checked-children="否" />
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
  @param {Boolean} menuVisible - 弹框显示隐藏
  @param {Boolean} superiorDisbled - 上级菜单是否禁用
  @method addRole - 弹框显示方法
*/

export default {
  data() {
    return {
      dialog:true,
      menuVisible:false,
      superiorDisbled:false,
      form: {
        fieldA: '',
        fieldB: '',
      },
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
    }
  },
  methods:{
    addMenu(val){
      //val 0新增  1编辑
      this.menuVisible = true;
      if(val == 0){
        this.superiorDisbled = false;
      }else{
        this.superiorDisbled = true;
      };
    },
  }
}
</script>