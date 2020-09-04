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
         <!-- <a-upload
               
            :beforeUpload = "uploadOne"
            >
            <a-button> <a-icon type="upload" /> Upload </a-button>
        </a-upload> -->
    </div>
</template>

<script>
import { resetRouter } from '@/router';
import MenuUtils from '@/utils/MenuUtils'
import {buildTree} from '@/utils/utils.js'
import {login,menuList,uploadOne} from '@/network/api'

// var data = [
//     {
//     "path": '/monitoring',//菜单路径
//     "name": '位置监控',//菜单名称
//     "component": 'Home',//前端组件
//     "hidenMenu":false,//是否禁用
//     "meta":{
//         icon: 'iconjiankong',//图标
//         btnList:[],//按钮权限
//         keepAlive:false,//是否缓存路由
//     },
//     "children":[
//             {
//                 "path": '/positionMonitoring',
//                 "name": '实时位置',
//                 "component": 'monitoring/PositionMonitoring',
//                 "meta":{
                   
//                 }
//             },
//             {
//                 "path": '/electronicFence',
//                 "name": '电子围栏',
//                 "component": 'monitoring/ElectronicFence',
//                 'hiddenMenu':false,
//                 "meta":{
//                 },
//             },
//             {
//                 "path": '/trackPlayback',
//                 "name": '轨迹回放',
//                 "component": 'monitoring/TrackPlayback',
//                 "meta":{
                      
//                     },
//             }
      
//     ]
//   },
//   {
//    "path": '/basicInformation',
//     "name": '基础信息管理',
//     "component": 'Home',
//     "meta":{
//         icon: 'iconjiankong'
//     }, 
//     "children":[
//         {
//             "path": '/businessManagement',
//             "name": '企业档案',
//             "component": 'information/BusinessManagement',
//             "meta":{
//                 icon: 'iconjiankong'
//             }, 
//         },
//         {
//             "path": '/vehicleManagement',
//             "name": '车辆档案',
//             "component": 'information/VehicleManagement',
//             "meta":{
//                 icon: 'iconjiankong'
//             }, 
//         },
//         {
//             "path": '/driverManagement',
//             "name": '人员档案',
//             "component": 'information/DriverManagement',
//             "meta":{
//                 icon: 'iconjiankong'
//             }, 
//         },
//         {
//             "path": '/fieldManagement',
//             "name": '场地信息管理',
//             "component": 'information/FieldManagement',
//             "meta":{
//                 icon: 'iconjiankong'
//             }, 
//         },
//         {
//             "path": '/equipmentManagement',
//             "name": '设备信息管理',
//             "component": 'information/EquipmentManagement',
//             "meta":{
//                 icon: 'iconjiankong'
//             }, 
//         },
//         {
//             "path": '/electronicFenceData',
//             "name": '电子围栏数据',
//             "component": 'information/ElectronicFenceData',
//             "meta":{
//                 icon: 'iconjiankong'
//             }, 
//         }
//     ]  
//   },
//   {
//    "path": '/process',
//     "name": '过程管控',
//     "component": 'Home',
//     "meta":{
//         icon: 'iconjiankong'
//     }, 
//     "children":[
//         {
//             "path": '/badDriving',
//             "name": '不良驾驶行为监控',
//             "component": 'process/BadDriving',
//             "meta":{
//                 icon: 'iconjiankong'
//             }, 
//         },
//         {
//             "path": '/illegalTransportation',
//             "name": '违规运输监控',
//             "component": 'process/IllegalTransportation',
//             "meta":{
//                 icon: 'iconjiankong'
//             }, 
//         },
//         {
//             "path": '/remoteVideo',
//             "name": '远程视频',
//             "component": 'process/RemoteVideo',
//             "meta":{
//                 icon: 'iconjiankong'
//             }, 
//         }
//     ]  
//   },
//   {
//    "path": '/stationSource',
//     "name": '场站源头管控',
//     "component": 'Home',
//     "meta":{
//         icon: 'iconjiankong'
//     }, 
//     "children":[
//         {
//             "path": '/stationVideo',
//             "name": '不良驾驶行为监控',
//             "component": 'stationSource/StationVideo',
//             "meta":{
//                 icon: 'iconjiankong'
//             }, 
//         },
//         {
//             "path": '/washDiscern',
//             "name": '冲洗识别',
//             "component": 'stationSource/WashDiscern',
//             "meta":{
//                 icon: 'iconjiankong'
//             }, 
//         },
//         {
//             "path": '/blackDiscern',
//             "name": '黑车识别',
//             "component": 'stationSource/BlackDiscern',
//             "meta":{
//                 icon: 'iconjiankong'
//             }, 
//         }
//     ]  
//   },
//   {
//    "path": '/system',
//     "name": '系统设置',
//     "component": 'Home',
//     "meta":{
//         icon: 'iconjiankong'
//     }, 
//     "children":[
//         {
//             "path": '/roleSetting',
//             "name": '角色配置',
//             "component": 'system/RoleSetting',
//             "meta":{
//                 icon: 'iconjiankong'
//             }, 
//         },
//         {
//             "path": '/userSetting',
//             "name": '用户配置',
//             "component": 'system/UserSetting',
//             "meta":{
//                 icon: 'iconjiankong'
//             }, 
//         },
//         {
//             "path": '/MenuSetting',
//             "name": '菜单配置',
//             "component": 'system/MenuSetting',
//             "meta":{
//                 icon: 'iconjiankong'
//             }, 
//         },
//         {
//             "path": '/departmentSetting',
//             "name": '部门配置',
//             "component": 'system/DepartmentSetting',
//             "meta":{
//                 icon: 'iconjiankong'
//             }, 
//         },
//         {
//             "path": '/segionSetting',
//             "name": '地区配置',
//             "component": 'system/RegionSetting',
//             "meta":{
//                 icon: 'iconjiankong'
//             }, 
//         }
//     ]  
//   }
// ]
export default {
    data() {
        return {
            routersData:[],//存储路由数据
            formInline: {
                user: '',
                password: '',
            },
            logging: false,//登录加载
        }
    },
    created(){
        this.$removeStorage('subNav');
        this.$removeStorage('taken');
    },
    methods:{
        login(){
            let params = {
                "account": "admin",
                "password": "123456"
            }
           login(params).then(res=>{
               if(res.data.code == 0){
                  this.$setStorage('taken',res.data.data)
               }else{
                 this.$message.success('登录成功')
               };
           }).then(res=>{
               this.getMenu();
           });
        },
        getMenu(){
            let params = {
                pageSize: 1,
                pageNum: 999,
                menuType: 1
            }
            menuList(params).then(res=>{
               if(res.data.code == 0){
                   let data = res.data.data.records;
                   data = buildTree(data)
                   this.getNavigationTree(data)
               }
            });
        },
        uploadOne(file, fileList){

           
            let param = new FormData()

           param.append('file',file);
            
            uploadOne(param).then(res=>{
              
           })
            return false
        },
         handleSubmit(e) {
             //登录
            this.logging = true;
            resetRouter()
            this.login()
           
        },
        getNavigationTree(data){
            this.saveMeun(data);
            this.$router.addRoutes(this.routersData);
            this.$nextTick(()=>{
                this.$message.success('登录成功')
                this.$router.push(data[0].children[0].path)
            })
        },
        saveMeun(data){
            this.$setStorage('menuList',JSON.stringify(data))
            MenuUtils(this.routersData,data)
        },
       
    }
}
</script>