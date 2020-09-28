import "babel-polyfill";
import Vue from 'vue'
import {
  Button,
  Layout,
  Menu,
  Icon,
  Tabs,
  FormModel,
  InputNumber,
  Input,
  Tree,
  Table,
  message,
  Divider,
  Dropdown,
  Row,
  Col,
  Modal,
  Calendar,
  DatePicker,
  TimePicker,
  Descriptions,
  ConfigProvider,
  Drawer,
  Radio,
  Select,
  Upload,
  Switch,
  Cascader,
  Spin,
  Empty,
  Checkbox,
  Popover,
  Badge,
  Pagination,
  Steps,
  Tooltip
} from 'ant-design-vue';
import App from './App.vue'
import base from '@/utils/base';


import router from './router'
import store from './store'
import MenuUtils from '@/utils/MenuUtils'
import toggleSearch from '@/utils/toggleSearch'

Vue.mixin(toggleSearch);

import moment  from 'moment'
Vue.prototype.$moment = moment;
import 'moment/locale/zh-cn';


import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
Vue.component('vue-draggable-resizable', VueDraggableResizable)


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
Vue.use(Calendar);
Vue.use(DatePicker);
Vue.use(TimePicker);
Vue.use(Descriptions);
Vue.use(ConfigProvider);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(InputNumber);
Vue.use(Select);
Vue.use(Upload);
Vue.use(Switch);
Vue.use(Cascader);
Vue.use(Spin);
Vue.use(Empty);
Vue.use(Checkbox);
Vue.use(Popover);
Vue.use(Badge);
Vue.use(Pagination);
Vue.use(Steps);
Vue.use(Tooltip);






Vue.prototype.$confirm = Modal.confirm;
 






Vue.use(base);
Vue.config.productionTip = false;


//这里是防止用户手动刷新页面，整个系统要重新加载,动态新增的路由会消失，所以再次addRoutes
if(Vue.prototype.$getStorage('menuList')){
  let menuList = JSON.parse(Vue.prototype.$getStorage('menuList'))
  if (menuList) {
    let routersData = [];
    MenuUtils(routersData, menuList)
    router.addRoutes(routersData);
  }
}


//防止刷新切换原始菜单
if(Vue.prototype.$getStorage('navigationMode')){
  store.dispatch("changeNavigationMode",Vue.prototype.$getStorage('navigationMode'))
}



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')