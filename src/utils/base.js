


export default {install (Vue, options) {
      Vue.prototype.$setStorage = function (key, val) {
         localStorage.setItem(key, val);
      };//存储
      Vue.prototype.$getStorage = function (key) {
         return localStorage.getItem(key);
      };//获取
      Vue.prototype.$removeStorage = function (key) {
         localStorage.removeItem(key);
      };//删除
   }
};
