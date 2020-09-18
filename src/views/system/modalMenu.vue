<template>
  <a-modal v-model="menuVisible" :title="title" :maskClosable="false" :keyboard="false" width="800px" v-dialogDrag="dialog">
      <a-spin :spinning="spinning">
      <div>
          <a-form-model :model="addForm" ref="ruleForm" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules">
                      <a-form-model-item label="上级菜单" prop="pid">
                           <a-select v-model="addForm.pid" :disabled="superiorDisbled">
                              <a-select-option v-for="item in originalData" :key="item.id">
                                  {{item.name}}
                              </a-select-option>
                            </a-select>
                      </a-form-model-item>

                      <a-form-model-item label="菜单名称" prop="name">
                          <a-input v-model="addForm.name" />
                      </a-form-model-item>

                      <a-form-model-item label="菜单路径" prop="path">
                          <a-input v-model="addForm.path" />
                      </a-form-model-item>

                      <a-form-model-item label="前端组件" prop="component">
                          <a-input v-model="addForm.component" />
                      </a-form-model-item>

                      <a-form-model-item label="图标" prop="menuIcon">
                          <a-input v-model="addForm.menuIcon" />
                      </a-form-model-item>

                      <a-form-model-item label="排序"  prop="sort">
                            <a-input-number id="inputNumber" v-model="addForm.sort" />
                      </a-form-model-item>

                      <a-form-model-item label="菜单类型">
                          <a-radio-group v-model="addForm.menuType">
                              <a-radio :value="item.id" v-for="item in typeList" :key="item.id">
                              {{item.name}}
                              </a-radio>
                          </a-radio-group>
                      </a-form-model-item>

                      <a-form-model-item label="是否缓存路由">
                          <a-switch v-model="addForm.keepAlive" checked-children="是" un-checked-children="否" @change="changeKeepAlive" />
                      </a-form-model-item>

                      <a-form-model-item label="是否禁用">
                          <a-switch v-model="addForm.hidenMenu" checked-children="是" un-checked-children="否" />
                      </a-form-model-item>
                      
                  </a-form-model>
      </div>
      </a-spin>
      <template slot="footer">
          <a-button key="back"  @click="menuVisible = false">
          取消
          </a-button>
          <a-button key="submit" type="primary" @click="save">
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

import {BaseList,AddMenu,EditMenu} from '@/network/api'
import debounce from 'lodash/debounce'

export default {
  data() {
    return {
      spinning:false,
      dialog:true,
      menuVisible:false,
      superiorDisbled:false,
      addForm: {
        id:'',
        pid:'',
        path: '',
        name: '',
        component:'',
        menuPermission:'',
        keepAlive:false,
        sort:'',
        menuType : '7',
        hidenMenu:false,
        menuIcon:'',
      },
      rules:{
        name:[
          { required: true, message: '请输入菜单名称', trigger: 'blur' },
        ],
        path:[
          { required: true, message: '请输入菜单路径', trigger: 'blur' },
        ],
        component:[
          { required: true, message: '请输入菜单组件', trigger: 'blur' },
        ]
      },
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
      typeList:'',
      isEdit:0,
      title:'新增菜单'
    }
  },
  props:{
     originalData: Array,
  },
  created(){
     this.save = debounce(this.save,500)//保存防止重复点击
  },
  methods:{
    addMenu(val,record){
      //val 0新增  1编辑 2添加下级
      this.menuVisible = true;
      this.superiorDisbled = true;
      this.isEdit = val;

      this.$nextTick(()=>{
         this.$refs.ruleForm.resetFields();//对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
          if(val == 0){
            this.title = '新增菜单'
            this.addForm.id = '';
            this.addForm.menuPermission = 'quanxian'
            this.addForm.menuType = '7'
          }else if(val == 1){
            this.title = '编辑菜单'
            this.addForm.id = record.id;
            this.addForm.pid = record.pid =='0' ? '' : record.pid;
            this.addForm.path = record.path;
            this.addForm.name = record.name;
            this.addForm.component = record.component;
            this.addForm.keepAlive = record.keepAlive == 1 ? true : false;
            this.addForm.sort = record.sort;
            this.addForm.menuType = JSON.stringify(record.menuType);
            this.addForm.hidenMenu = record.hidenMenu == 1 ? true : false;
            this.addForm.menuIcon = record.menuIcon;
             this.addForm.menuPermission = record.menuPermission;
          }else{
             this.title = '新增下级菜单'
            this.addForm.id = '';
            this.addForm.pid = record.id
            this.addForm.menuPermission = 'quanxian'
          };
          document.querySelector('.ant-modal-body').scrollTop = 0;
      })
     

      this.getMenuType()//获取菜单类型
    },
    getMenuType(){
        let params = {
              pid: "6"
            };
        BaseList(params).then(res=>{
          if(res.data.code == 0){
            this.typeList = res.data.data;
          };
        });
    },
    changeKeepAlive(checked){
      console.log(checked)
    },
    save(){
       this.$refs.ruleForm.validate(valid => {
        if (valid) {
            if(this.isEdit == 0 || this.isEdit==2){
              this.onSubmit();
            }else{
              this.onEditSubmit();
            };
        } else {
          return false;
        };
      });
    },
    onSubmit(){
      this.spinning = true;
      let params = JSON.parse(JSON.stringify(this.addForm));
      params.hidenMenu = this.addForm.hidenMenu ? 1 : 0;
      params.keepAlive = this.addForm.keepAlive ? 1 : 0;
      console.log(params)
      AddMenu(params).then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            this.menuVisible = false;
            this.$message.success('保存成功');
            this.$emit('triggerData');
          }else{
            this.$message.warning('保存失败')
          };
      });
    },
    onEditSubmit(){
      this.spinning = true;
      let params = JSON.parse(JSON.stringify(this.addForm));
      params.hidenMenu = this.addForm.hidenMenu ? 1 : 0;
      params.keepAlive = this.addForm.keepAlive ? 1 : 0;

      EditMenu(params).then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            this.menuVisible = false;
            this.$message.success('保存成功');
            this.$emit('triggerData');
          }else{
            this.$message.warning('保存失败')
          };
      });
    }
  }
}
</script>