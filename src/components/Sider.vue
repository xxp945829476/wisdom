<template>
    <a-menu
      :default-selected-keys="[$route.path]"
      mode="horizontal"
      :selectedKeys='[$route.path]'
      @click="menuClick"
    >
      <template v-for="item in list">
        <a-menu-item v-if="item.children.length<2" :key="item.children[0].path">
         
          <i class="iconfont" :class="item.meta.icon"></i>
          <span>{{ item.children[0].name }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.path" :menu-info="item"/>
      </template>
    </a-menu>
</template>

<script>
import  SubMenu from "./SubMenu.vue";


export default {
  data() {
    return {
      list: [],
    };
  },
  props: {

  },
  components:{
    'sub-menu': SubMenu,
  },
  created(){
      this.getMenu();
  },
  watch:{
   
  },
  methods:{
    getMenu(){
      this.list =  JSON.parse(this.$getStorage('menuList'))
    },
    menuClick({ item, key, keyPath }){
      this.$router.push(key);
    },
    
  }
};
</script>
