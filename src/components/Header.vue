<template>
   <div class="layout_header">
    <a-layout-header>

        
        <a-row class="header_content">
            <a-col class="logo" v-if="navigationMode=='horizontal'">
                <!-- 建筑垃圾运输处置管理系统 -->
                {{sysHomeName}}
            </a-col>
            <a-col :md="18">
               <Sider v-if="navigationMode=='horizontal'"></Sider>
               <a-icon
                class="trigger"
                :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                @click="switchMenu"
                v-else
                />
            </a-col>
       
               
     
        </a-row>
        
        <div class="user_wrapper">
            <!-- <span>
                <a-icon type="bell" />
            </span> -->
            <a-dropdown :trigger="['click']">
                <span class="ant-dropdown-link" @click="e => e.preventDefault()">
                {{account}}<a-icon type="down" />
                </span>
                <a-menu slot="overlay">
                <a-menu-item key="0">
                    <a @click="showDrawerSetting">基础设置</a>
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item key="3">
                    <a  @click="logout">退出登录</a>
                </a-menu-item>
                </a-menu>
            </a-dropdown>
            <!-- <span class="logout" @click="logout">
                <a-icon type="logout" />
                退出登录
            </span>
            <span class="setting_base" @click="showDrawerSetting">
                <a-icon type="setting" />
            </span> -->
         </div>
         
        </a-layout-header>
        <a-drawer
        title="基础设置"
        placement="right"
        :closable="false"
        :visible="setVisible"
        width="300"
        @close="onClose"
        >
            <div class="set_title">导航模式</div>
            <div class="set_content">
                <a-radio-group name="radioGroup" v-model="navValue" @change="changeNavigationMode">
                    <a-radio :value="'horizontal'">
                        水平菜单
                    </a-radio>
                    <a-radio :value="'vertical'">
                        垂直菜单
                    </a-radio>
                </a-radio-group>
            </div>

            <div class="drawer_button">
                <a-button type="primary" @click="onClose">
                 确定
                </a-button>
            </div>
        </a-drawer>
   </div>
   
</template>

<script>
import Sider from '@/components/Sider.vue'
import {GetLogin} from '@/network/api'
export default {
    data () {
        return {
            setVisible:false,
            navValue:'',
            account:'',
            sysHomeName:''
        }
    },
    props:{
        collapsed:{
            type:Boolean,
            default:false
        }
    },
    components:{
        Sider
    },
    computed:{
        navigationMode(){
            return this.$store.getters.navigationMode
        },
    },
    created(){
        this.navValue = this.navigationMode;
        this.$nextTick(()=>{
            let userInfoList = JSON.parse(this.$getStorage('userInfoList'))
            this.account = userInfoList.account;
        })
        this.getData();
    },
    methods:{
        getData(){
            this.spinning = true;
            GetLogin().then(res=>{
                this.spinning = false;
                if(res.data.code == 0){
                    if(res.data.data){
                        this.sysHomeName = res.data.data.sysHomeName
                    }else{
                     
                        this.sysHomeName = '智能渣土系统平台'

                        
                    }
                }else{
                    this.$message.warning('加载失败')
                };
            });
        },
        switchMenu(){
            this.$emit('switchMenu',this.collapsed)
        },
        logout(){
            this.$removeStorage('subNav');
            this.$removeStorage('taken');
            this.$router.push('/login');
        },
        showDrawerSetting(){
            this.setVisible = true;
        },
        onClose() {
            this.setVisible = false;
            this.$store.dispatch("changeNavigationMode",this.navValue)
            this.$setStorage('navigationMode',this.navValue)
        },
        changeNavigationMode(){
            
        }
    }
}
</script>
