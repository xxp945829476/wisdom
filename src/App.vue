<template>
<a-config-provider :locale="locale">
  <div id="app">
    <router-view/>
  </div>
</a-config-provider>
</template>

<script>
import '@/assets/css/main.less'
import zhCN from 'ant-design-vue/es/locale/zh_CN';
export default {
  data() {
    return {
      locale: zhCN,
    }
  },
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

