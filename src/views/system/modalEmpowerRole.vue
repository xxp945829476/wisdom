<template>
  <a-modal v-model="empowerVisible" title="角色权限配置" :maskClosable="false" :keyboard="false" width="700px" v-dialogDrag="dialog">

      <a-spin :spinning="spinning">
        <div>
          <a-tree :tree-data="menuList" :selectable="false" v-model="roleMenuList" show-line :replaceFields="replaceFields" @check="onCheck" checkable checkStrictly>
                
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
    onCheck(selectedKeys,e){
      console.log(selectedKeys)
     
       console.log(e.checked)
      console.log(e.node.$options.propsData.dataRef)
      let pid = ''
      let samePid = [];
      this.originalData.forEach(cur=>{
         if(cur.id == e.node.$options.propsData.eventKey){
           pid = cur.pid;
         };
       });

       this.originalData.forEach(cur=>{
         if(cur.pid == pid){
           samePid.push(cur.id);
         };
       });

        console.log(samePid)
      this.viewUp(this.originalData,pid,samePid);
      if(e.node.$options.propsData.dataRef.children){
        this.viewDown(e.node.$options.propsData.dataRef.children,e.checked)
      }
      
      console.log(this.roleMenuList)
    },
    viewUp(arr,pid,samePid){
     
      arr.forEach(cur=>{

        if(cur.id == pid){
            if(this.roleMenuList.checked.indexOf(cur.id) == -1){
                let isPid = samePid.some(ele=>{
                  return this.roleMenuList.checked.indexOf(ele) > -1
                });
                if(isPid){
                  this.roleMenuList.checked.push(cur.id);
                };
            };
            if(cur.pid != '0'){
              this.viewUp(arr,cur.pid,samePid)
            }
        }
      })
    },
    viewDown(arr,checked){
       

        arr.forEach(cur=>{
              if(checked){
                    if(this.roleMenuList.checked.indexOf(cur.id) == -1){
                       this.roleMenuList.checked.push(cur.id)
                    };
                  
              }else{
                  
                  for (let index = this.roleMenuList.checked.length-1; index > 0; index--) {
                    const element = this.roleMenuList.checked[index];
                    if(cur.id==element){
                      this.roleMenuList.checked.splice(index,1)
                    }
                  };
                  
              };

             if(cur.children){
                this.viewDown(cur.children,checked)
              } 


             
             
        });

        
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
      if(this.roleMenuList.checked){
        this.roleMenuList.checked.forEach(cur=>{
          arr.push({
            menuId:cur,//菜单id
            roleId:this.roleId //角色id
          })
        });
      }else{
        this.empowerVisible = false;
        return false
      }
      
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
      if(this.roleMenuList.checked){
         this.roleMenuList.checked.forEach(cur=>{
          arr.push({
            menuId:cur,//菜单id
            roleId:this.roleId //角色id
          })
        });
      }else{
        this.empowerVisible = false;
        return false
      }
     
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