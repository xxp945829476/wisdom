<template>
  <a-modal v-model="empowerVisible" title="角色权限配置" :maskClosable="false" :keyboard="false" width="700px" v-dialogDrag="dialog">

      <a-spin :spinning="spinning">
        <div>
          <a-tree :tree-data="menuList" :selectable="false" v-model="roleMenuList" show-line :replaceFields="replaceFields" @check="onCheck" checkable>
                
          </a-tree> 
        </div>
      </a-spin>

      <template slot="footer">
          <a-button key="back" @click="empowerVisible=false">
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
  @param {Boolean} roleVisible - 弹框显示隐藏
  @method addRole - 弹框显示方法
*/

import {AddRole,DepartmentList,EditRole,menuList,menuRoleList,AddRoleSet,EditRoleSet} from '@/network/api'
import {buildTree} from '@/utils/utils.js'
import debounce from 'lodash/debounce'

export default {
  data() {
    return {
      spinning:false,
      dialog:true,
      empowerVisible:false,
      addForm: {
        id:'',
        deptId: undefined,
        roleName: '',
        roleCode: '',
        roleDescribe: '',
      },
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
      rules:{
        roleName:[
          { required: true, message: '请输入角色名称', trigger: 'blur' },
        ],
        roleCode:[
          { required: true, message: '请输入角色编码', trigger: 'blur' },
        ],
        deptId:[
          { required: true, message: '请选择部门', trigger: 'change' },
        ],
      },
      isEdit:0,
      roleId:'',
      menuList:[],
      replaceFields:{
        children:'children',
        title:'name',
        key:'id'
      },
      originalData:[],
      roleMenuList:[],
    }
  },
  created(){
     let  userInfoList = JSON.parse(this.$getStorage('userInfoList'));
    //  this.roleId = userInfoList.roleId;
     this.save = debounce(this.save,500)//保存防止重复点击
  },
  methods:{
    empower(record){
      this.empowerVisible = true;
      this.roleMenuList = [];
      this.getMenuList(record.id);
      this.roleId = record.id;
    
    },
    menuRoleList(id){
      let params = {
              pageNum:1,
              pageSize:999,
              menuType:'',
              roleId:id
            };
           this.spinning = true;
          menuRoleList(params).then(res=>{
            this.spinning = false;
            if(res.data.code == 0){
               let arr = [];
               if(res.data.data.records.length > 0){
                 this.isEdit = 1
               }else{
                 this.isEdit = 0
               };//判断编辑，新增
               res.data.data.records.forEach(cur=>{
                 arr.push(cur.menuId)
               });

               this.roleMenuList = arr //获取已选择菜单id
            }
            
        });
    },
    getMenuList(id){
            let params = {
              pageNum:1,
              pageSize:999,
              menuType:''
            };
           
          menuList(params).then(res=>{
            if(res.data.code == 0){
                this.originalData = JSON.parse(JSON.stringify(res.data.data.records));
                let data = JSON.parse(JSON.stringify(res.data.data.records));
                data = buildTree(data);
                this.menuList = data;
                this.menuRoleList(id);
            }else{
                this.$message.warning('获取菜单失败')
            };
            
        });
    },
    onCheck(selectedKeys){
      console.log(this.roleMenuList)
    },
    save(){
 
          if(this.isEdit == 0){
             this.onSubmit();
          }else{
            this.onEditSubmit();
          };
         
      
    },
    onSubmit(){
      let arr = [];
      this.roleMenuList.forEach(cur=>{
        arr.push({
          menuId:cur,//菜单id
          roleId:this.roleId //角色id
        })
      });
      this.spinning = true;
      AddRoleSet(arr).then(res=>{
        this.spinning = false;
          if(res.data.code == 0){
            this.empowerVisible = false;
            this.$message.success('保存成功');
          }else{
            this.$message.warning('保存失败')
          };
      });
    },
    onEditSubmit(){

      
      let arr = [];
      this.roleMenuList.forEach(cur=>{
        arr.push({
          menuId:cur,//菜单id
          roleId:this.roleId //角色id
        })
      });
      this.spinning = true;
      EditRoleSet(arr).then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            this.empowerVisible = false;
            this.$message.success('保存成功');
          }else{
            this.$message.warning('保存失败')
          };
      });
    }
  }
}
</script>