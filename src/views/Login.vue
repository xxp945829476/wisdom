<template>
    <div class="login_box">
        <div class="login_container">
            <div class="pt_logo">
                <!-- <img src="../assets/images/logo.png" class="login_logo"> -->
                <span>建筑垃圾运输处置管理系统</span>
            </div>
            <div class="login_main">
                <div class="login_left">
                    <img src="../assets/images/gd.png">
                </div>

                <div class="login_right">
                    <h1>账户登录</h1>
                    <a-form-model :model="formInline" ref="ruleForm" :rules="rules" @submit="handleSubmit" @submit.native.prevent>
                        <a-form-model-item prop="account">
                        <a-input v-model="formInline.account" placeholder="请输入用户账号">
                            <i class="iconfont iconyonghu" slot="prefix" type="user"></i>
                        </a-input>
                        </a-form-model-item>
                        <a-form-model-item prop="password">
                        <a-input v-model="formInline.password" type="password" placeholder="请输入密码">
                            <i class="iconfont iconicon-mima" slot="prefix" type="user"></i>
                        </a-input>
                        </a-form-model-item>
                        <a-form-model-item>
                            <a-row :gutter="8">
                                <a-col :md="14">
                                    <a-input v-model="code" placeholder="验证码">
                                        <i class="iconfont iconyanzhengma" slot="prefix" type="user"></i>
                                    </a-input>
                                </a-col>
                                <a-col :md="10">
                                    <span @click="refreshCode">
                                        <Identify :identifyCode="identifyCode"></Identify>
                                    </span>
                                </a-col>
                            </a-row>
                            
                        </a-form-model-item>
                        <a-form-model-item>
                            <div class="login_btn">
                                <a-button :loading="logging" style="width: 100%" size="large" htmlType="submit" type="primary">登录</a-button>
                            </div>
                            
                        </a-form-model-item>
                    </a-form-model>
                </div>
                
               
            </div>
        </div>
    </div>
</template>

<script>
import { resetRouter } from '@/router';
import MenuUtils from '@/utils/MenuUtils'
import {buildTree} from '@/utils/utils.js'
import {login,menuList,GetUser,GetMenuList} from '@/network/api'

import Identify from './Identify.vue'

// var data = [
//     {
//     "path": '/monitoring',//菜单路径
//     "name": '位置监控',//菜单名称
//     "component": 'Home',//前端组件
//     "hidenMenu":false,//是否禁用
//     "meta":{
//         "icon": 'iconjiankong',//图标
//         "btnList":[],//按钮权限
//         "keepAlive":false,//是否缓存路由
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
//             "component": '/',
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
            code:'',
            identifyCodes: '1234567890',
            identifyCode: '',
            routersData:[],//存储路由数据
            formInline: {
                account: '',
                password: '',
            },
            logging: false,//登录加载
            allMeunList:[],
             rules:{
                account:[
                    { required: true, message: '请输入用户账号', trigger: 'blur' },
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ]
            }
        }
    },
    components: {
       Identify
    },
    mounted () {
        this.identifyCode = ''
        this.makeCode(this.identifyCodes, 4)
    },
    created(){
        this.$removeStorage('subNav');
        this.$removeStorage('menuList');
        this.$removeStorage('taken');
    },
    methods:{
         makeCode (o, l) {
            for (let i = 0; i < l; i++) {
                this.identifyCode += this.identifyCodes[
                this.randomNum(0, this.identifyCodes.length)
                ]
            }
        },
        // 生成随机数
        randomNum (min, max) {
        return Math.floor(Math.random() * (max - min) + min)
        },
        // 切换验证码
        refreshCode () {
        this.identifyCode = ''
        this.makeCode(this.identifyCodes, 4)
        },
        login(){
           login(this.formInline).then(res=>{
               this.logging = false;
               if(res.data.code == 0){
                  this.$setStorage('taken',res.data.data)
               }else{
                   this.refreshCode();
                   this.code = '';
                 this.$message.warning(res.data.message)
               };
           }).then(res=>{
             
                this.getUser();
                this.GetMenuList();
               
                this.getPermission();
           });
        },
        getUser(){
            GetUser({}).then(res=>{
               if(res.data.code == 0){
                  this.$setStorage('userInfoList',JSON.stringify(res.data.data))
               }else{};
            });
        },
        GetMenuList(){
            let params = {
                menuType: 7
            }
            GetMenuList(params).then(res=>{
               if(res.data.code == 0){
                   this.allMeunList = res.data.data;
                   this.getMenu();
               }
            });
        },
        getPermission(){
            let params = {
                pageSize: 999,
                pageNum: 1,
                menuType: 8
            };
             menuList(params).then(res=>{
                if(res.data.code == 0){
                     let data = res.data.data.records;
                     console.log(data)
                     this.$setStorage('permission',JSON.stringify(data))
                }
             });
        },
        getMenu(){
            let params = {
                pageSize: 999,
                pageNum: 1,
                menuType: 7
            }
            menuList(params).then(res=>{
               if(res.data.code == 0){
                   let data = res.data.data.records;
                   let screenList = this.screen(data)
                   data = [...data,...screenList]
                  
                    let new_arr=[];
                    let json_arr=[];

                    for (let index = 0; index < data.length; index++) {
                        const element = data[index];
                        if (new_arr.indexOf(element['id']) ==-1) {
                           new_arr.push(element['id']);   //如果没有找到就把这个name放到arr里面，以便下次循环时用
                            json_arr.push(element);
                        }
                    } //去重

 
                    
                   let buildData = buildTree(json_arr);
                    buildData.sort(function(a,b){
                    return a.sort - b.sort;
                    });
                   this.getNavigationTree(buildData)
               }
            });
        },
        screen(data){
            let arr = [];
            let newData = [];
            data.forEach(cur=>{
                arr.push(cur.pid)
            });

            let newArr = Array.from(new Set(arr)) //去掉相同的pid
     

            this.recursionData(newArr,newData) //选择上级菜单
          
            console.log(newData)

            return  newData
        },
        recursionData(newArr,newData){
              newArr.forEach(cur=>{
                this.allMeunList.forEach(ele=>{
                    if(cur == ele.id){
                        newData.push(ele)
                        if(ele.pid != '0'){
                            this.recursionData([ele.pid],newData)
                        };
                    };
                });
            });

        },
        handleSubmit(e) {
             //登录
             console.log(this.code)
             console.log(this.identifyCode)

              this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    if(this.code == this.identifyCode){
                        this.logging = true;
                        resetRouter()
                        this.login()
                    }else{
                        this.$message.warning('验证码输入错误,请重新输入') 
                    }
                
                } else {
                return false;
                };
            });

             
            
           
        },
        getNavigationTree(data){
            this.saveMeun(data);
            this.$router.addRoutes(this.routersData);
            this.$nextTick(()=>{
                this.$message.success('登录成功')
                this.$router.replace(data[0].children[0].path)
            })
        },
        saveMeun(data){
            this.$setStorage('menuList',JSON.stringify(data))
            MenuUtils(this.routersData,data)
        },
       
    }
}
</script>