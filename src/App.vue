<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import '@/assets/css/main.less'
export default {
  created(){
     if(this.$getStorage('themeColor')){
       window.less.modifyVars({
        "@primary-color": this.$getStorage('themeColor')
      });
     };//主题设置
    
  }
}
</script>

<style lang="less">
  #app{
    height: 100%;
  }
</style>

