<template>
  <div>
    <a-menu
     :default-selected-keys="[$route.path]"
     :default-open-keys="openKeys"
      mode="inline"
      theme="light"
      :selectedKeys='[$route.path]'
      :open-keys="openKeys"
      :inline-collapsed="collapsed"
      @click="menuClick"
      @openChange="onOpenChange"
    >
      <template v-for="item in list">
        <a-menu-item v-if="!item.children && item.hidenMenu==0" :key="item.path">
           <i class="iconfont menuicon" :class="item.meta.icon"></i>
          <span>{{ item.name }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.path" :menu-info="item"/>
      </template>
    </a-menu>
  </div>
</template>

<script>
import  SubMenu from "./SubMenu.vue";


export default {
  data() {
    return {
      rootSubmenuKeys:[],
      list: [],
      openKeys:[]
    };
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  components:{
    'sub-menu': SubMenu,
  },
  created(){
      this.getMenu();
      this.openKeys = [this.$route.matched[0].path];
  },
  watch:{
     $route(to,from){
       let newArry = [];
       let openKeyArr = to.matched.filter((cur,index)=>{
         return index<to.matched.length-1
       });

      openKeyArr.forEach(ele=>{
          newArry.push(ele.path)
      })
       
      this.openKeys = newArry
      

    }
  },
  methods:{
    getMenu(){
      this.rootSubmenuKeys = [];
      this.list =  JSON.parse(this.$getStorage('menuList'))
      this.list.forEach(cur=>{
        this.rootSubmenuKeys.push(cur.path)
      });
      console.log(this.list)
    },
    menuClick({ item, key, keyPath }){
     if(item.level>1){
        this.$router.push(key);
      };
    },
    onOpenChange(openKeys){
      if(openKeys.length>1){
        if(this.rootSubmenuKeys.indexOf(openKeys[openKeys.length-1])  === -1){
         this.openKeys = openKeys
        }else{
          this.openKeys = [openKeys[openKeys.length-1]]
        };
      }
      else{
        
          this.openKeys = openKeys
        
      }
      
      
    }
  }
};
</script>
