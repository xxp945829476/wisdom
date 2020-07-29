<template>
    <a-layout id="main">

      <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
        <div class="logo">Ant Design Vue</div>
        
        <Sider ref="sider"></Sider>

      </a-layout-sider>


      <a-layout class="left_main" :class="{'large_content':collapsed}">

        <Header @switchMenu="switchMenu" :collapsed="collapsed"></Header>

        <a-tabs v-model="activeKey" type="editable-card" @edit="onEdit" hide-add @change="subLink" class="sub_nav">
          <a-tab-pane v-for="list in subNavList" :key="list.key" :tab="list.title">
          </a-tab-pane>
        </a-tabs>

        <a-layout-content class="content_box">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>

</template>

<script>
import Header from '@/components/Header.vue'
import Sider from '@/components/Sider.vue'
import debounce from 'lodash/debounce'


export default {
  data() {
    return {
      current: '1',
      collapsed: false,
    };
  },
  created(){
    
  },
  computed: {
    subNavList(){
      return this.$store.getters.subNavList
    },
    activeKey:{
      get: function () {
        return this.$route.path
      },
      set: function (val) {
        return val
      }
    }
  },
  mounted(){
    let that = this;
    window.onresize = debounce(changeClient, 300)//防抖
  
    function changeClient(){
        let clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
        that.collapsed = clientWidth<=900 ? true : false;
    }//窗口小于900时收缩菜单

  },
  components:{
    Header,
    Sider
  },
  methods:{
    switchMenu(){
      this.collapsed = !this.collapsed
    },
    onEdit(key){
      let isExist = true;
      let i = -1;
      this.subNavList.forEach((element,index) => {
          if(element.key==key && index != 0){
            this.subNavList.splice(index,1);//删除当前值
            this.$setStorage('subNav',JSON.stringify(this.subNavList))
            this.$store.dispatch("addSubNav",JSON.stringify(this.subNavList))
          };
          i = index
      });

 

      isExist = this.subNavList.some(cur=>{
        return cur.key == this.$router.path
      });//判断删除的是否是当前路由

      if(!isExist && i != 0){//如果是则向前导航跳转
        this.$router.push(this.subNavList[i-1].key)
      }else{
        this.$message.warning('首页无法删除');
      }
    },
    subLink(key){
      // this.$refs.sider.getMenu();
      this.$router.push(key)
    }
  }
};
</script>



