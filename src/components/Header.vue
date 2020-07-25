<!--
 * @Descripttion : 
 * @version      : 
 * @Author       : sueRimn
 * @Date         : 2020-07-05 16:23:05
 * @LastEditors  : sueRimn
 * @LastEditTime : 2020-07-12 20:41:29
 -->
<template>
   <div>
    <a-layout-header>
        <a-icon
        class="trigger"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="switchMenu"
        />
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
            
        }
    }
}
</script>
