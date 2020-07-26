<template>
   <div class="layout_header">
    <a-layout-header>
        <a-icon
        class="trigger"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="switchMenu"
        />
        <div class="user_wrapper">
            <span class="logout" @click="logout">
                <a-icon type="logout" />
                退出登录
            </span>
        </div>
    </a-layout-header>
    
   </div>
   
</template>

<script>


export default {
    props:{
        collapsed:{
            type:Boolean,
            default:false
        }
    },
    methods:{
        switchMenu(){
            this.$emit('switchMenu',this.collapsed)
        },
        logout(){
            this.$router.push('/login')
        }
    }
}
</script>
