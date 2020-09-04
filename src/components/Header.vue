<template>
   <div class="layout_header">
    <a-layout-header>

        
        <a-row class="header_content">
            <a-col :md="4" class="logo" v-if="navigationMode=='horizontal'">
                智慧渣土管理平台
            </a-col>
            <a-col :md="14">
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
            <span>
                <a-icon type="bell" />
            </span>
            
            <span class="logout" @click="logout">
                <a-icon type="logout" />
                退出登录
            </span>
            <span class="setting_base" @click="showDrawerSetting">
                <a-icon type="setting" />
            </span>
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
export default {
    data () {
        return {
            setVisible:false,
            navValue:''
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
        this.navValue = this.navigationMode
    },
    methods:{
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
