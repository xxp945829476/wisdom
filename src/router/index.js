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
  }
]






const createRouter = () => new VueRouter({
  mode: 'history',
  routes
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
  if(to.path !='/login'){
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
