import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}


  const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '*',
    redirect: '/403'
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/403.vue')
  },
  {
    path: '/monitoringDisplay',
    name: '监控详情',
    component: () => import('@/views/MonitoringDisplay.vue')
  },
  {
    path: '/monitoringDisplay',
    name: '监控详情',
    component: () => import('@/views/MonitoringDisplay.vue')
  },
  {
    path: '/rinse',
    name: '冲洗设备',
    component: () => import('@/views/Rinse.vue')
  },
  {
    path: '/migrate',
    name: '流向',
    component: () => import('@/views/MigrateMap.vue')
  },
  {
    path: '/thermodynamic',
    name: '密集度热力图',
    component: () => import('@/views/Thermodynamic.vue')
  }
]






const createRouter = () => new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})


const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // the relevant part
}//解决路由重复


// 路由守卫
router.beforeEach((to,from,next)=>{
  let subNavList = [];
  let isNavListExist = false;
  if(to.path !='/login' && to.path !='/MonitoringDisplay'&& to.path !='/policeForces'&& to.path !='/migrate'){
    if(Vue.prototype.$getStorage('subNav')){
      subNavList = JSON.parse(Vue.prototype.$getStorage('subNav'))
    };

    if(subNavList.length>0){
      isNavListExist = subNavList.some(cur=>{
        return cur.title==to.name
      });
    };
    if(!isNavListExist){
      subNavList.push({'title':to.name,'key':to.path});
      
    };
    store.dispatch("addSubNav",JSON.stringify(subNavList))
    Vue.prototype.$setStorage('subNav',JSON.stringify(subNavList))
  }
  
  NProgress.start()
    next()

  

});

router.afterEach(() => {
  NProgress.done()
})

export default router
