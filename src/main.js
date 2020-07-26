import "babel-polyfill";
import Vue from 'vue'
import { Button,Layout,Menu,Icon,Tabs,FormModel,Input,Tree,Table,message,Divider,Dropdown,Row,Col,Modal } from 'ant-design-vue';
import App from './App.vue'
import base from '@/utils/base';


import router from './router'
import store from './store'
import MenuUtils from '@/utils/MenuUtils'


Vue.use(Button);
Vue.use(Layout);
Vue.use(Menu);
Vue.use(Icon);
Vue.use(Tabs);
Vue.use(FormModel);
Vue.use(Input);
Vue.use(Tree);
Vue.use(Table);
Vue.use(Divider);
Vue.use(Dropdown);
Vue.use(Row);
Vue.use(Col);
Vue.use(Modal);
Vue.use(message);
Vue.prototype.$message = message;


Vue.use(base);
Vue.config.productionTip = false;


//这里是防止用户手动刷新页面，整个系统要重新加载,动态新增的路由会消失，所以再次addRoutes
let menuList = JSON.parse(Vue.prototype.$getStorage('menuList'))
if(menuList){
  let routersData = [];
  MenuUtils(routersData,menuList)
  router.addRoutes(routersData);
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
