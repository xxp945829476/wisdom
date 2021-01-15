<template>
    <a-menu
      :default-selected-keys="[$route.path]"
      mode="horizontal"
      :selectedKeys='[$route.path]'
      @click="menuClick"
    >
      <template v-for="item in list">
        <a-menu-item v-if="!item.children && item.hidenMenu==0" :key="item.path">
          <i class="iconfont menuicon" :class="item.meta.icon"></i>
          <span>{{ item.name }}</span>
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
      if(item.level>1){
        console.log(key)
        if(key=== '/migrateMap'){
          window.open('/migrate')
        }else if(key=== '/thermodynamicMap'){
          window.open('/thermodynamic')
        }else{
           this.$router.push(key);
        }
       
      };
    },
    
  }
};
</script>
