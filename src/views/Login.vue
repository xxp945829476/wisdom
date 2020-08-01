<template>
    <div class="login_box">
        <div class="login_container">
            <div class="login_main">
                <h1>账户登录</h1>
                <a-form-model :model="formInline" @submit="handleSubmit" @submit.native.prevent>
                    <a-form-model-item>
                    <a-input v-model="formInline.user" placeholder="Username">
                        <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
                    </a-input>
                    </a-form-model-item>
                    <a-form-model-item>
                    <a-input v-model="formInline.password" type="password" placeholder="Password">
                        <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
                    </a-input>
                    </a-form-model-item>
                    <a-form-model-item>
                        <a-button :loading="logging" style="width: 100%;" size="large" htmlType="submit" type="primary">登录</a-button>
                    </a-form-model-item>
                </a-form-model>
            </div>
        </div>
    </div>
</template>

<script>
import { resetRouter } from '@/router';
import MenuUtils from '@/utils/MenuUtils'
var data = [
    {
    "path": '/system',
    "name": '系统管理',
    "component": 'Home',
    "meta":{
        icon: 'setting'
    },
    "children":[
            {
                "path": '/user',
                "name": '用户管理',
                "component": 'system/User',
                "meta":{
                   
                }
            },
            {
                "path": '/roleUser',
                "name": '角色管理',
                "component": 'system/RoleUser',
                "meta":{
                      
                    },
            },
            {
                "path": '/newPermission',
                "name": '菜单管理',
                "component": 'system/NewPermission',
                "meta":{
                      
                    },
            }
      
    ]
  },
  {
    "path": '/eacrts',
    "name": '图表设置',
    "component": 'Home',
    "meta":{
            icon: 'global'
        },
    "children":[
        {
            "path": '/echart',
            "name": '图表',
            "component": 'eacrts/Eacrts',
            "meta":{
               
            },
        }
      
    ]
  }
]
export default {
    data() {
        return {
            routersData:[],
            formInline: {
                user: '',
                password: '',
            },
            logging: false,
        }
    },
    created(){
        this.$removeStorage('subNav');
    },
    methods:{
        login(){
            
        },
         handleSubmit(e) {
            this.logging = true;
            resetRouter()
            this.getNavigationTree()
        },
        getNavigationTree(){
            this.saveMeun(data);
            this.$router.addRoutes(this.routersData);
            this.$nextTick(()=>{
                this.$router.push('/user')
            })
        },
        saveMeun(data){
            this.$setStorage('menuList',JSON.stringify(data))
            MenuUtils(this.routersData,data)
        },
       
    }
}
</script>