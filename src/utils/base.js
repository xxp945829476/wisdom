


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

  
      Vue.directive('dialogDrag', {
         bind(el, binding, vnode, oldVnode) {
           // 自定义属性，判断是否可拖拽
           if (!binding.value) return
           const dialogHeaderEl = el.querySelector('.ant-modal-header')
           const dragDom = el.querySelector('.ant-modal')
           dialogHeaderEl.style.cssText += ';cursor:move;'
         //   dragDom.style.cssText += ';top:0px;'
       
           // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
           const sty = (function () {
             if (document.body.currentStyle) {
               // 在ie下兼容写法
               return (dom, attr) => dom.currentStyle[attr]
             } else {
               return (dom, attr) => getComputedStyle(dom, false)[attr]
             }
           })()
       
           dialogHeaderEl.onmousedown = (e) => {
             // 鼠标按下，计算当前元素距离可视区的距离
             const disX = e.clientX - dialogHeaderEl.offsetLeft
             const disY = e.clientY - dialogHeaderEl.offsetTop
       
             const screenWidth = document.body.clientWidth // body当前宽度
             const screenHeight = document.documentElement.clientHeight // 可见区域高度(应为body高度，可某些环境下无法获取)
       
             const dragDomWidth = dragDom.offsetWidth // 对话框宽度
             const dragDomheight = dragDom.offsetHeight // 对话框高度
       
             const minDragDomLeft = dragDom.offsetLeft
             const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth
       
             const minDragDomTop = dragDom.offsetTop
             const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight
       
             // 获取到的值带px 正则匹配替换
             let styL = sty(dragDom, 'left')
             // 为兼容ie　
             if (styL === 'auto') styL = '0px'
             let styT = sty(dragDom, 'top')
       
             // console.log(styL)
             // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
             if (styL.includes('%')) {
               styL = +document.body.clientWidth * (+styL.replace(/%/g, '') / 100)
               styT = +document.body.clientHeight * (+styT.replace(/%/g, '') / 100)
             } else {
               styL = +styL.replace(/px/g, '')
               styT = +styT.replace(/px/g, '')
             };
       
             document.onmousemove = function (e) {
       
               // 通过事件委托，计算移动的距离
               let left = e.clientX - disX
               let top = e.clientY - disY
               // 边界处理
               if (-(left) > minDragDomLeft) {
                 left = -(minDragDomLeft)
               } else if (left > maxDragDomLeft) {
                 left = maxDragDomLeft
               }
       
               if (-(top) > minDragDomTop) {
                 top = -(minDragDomTop)
               } else if (top > maxDragDomTop) {
                 top = maxDragDomTop
               }
       
               // 移动当前元素
               dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`
             }
       
             document.onmouseup = function (e) {
               document.onmousemove = null
               document.onmouseup = null
             }
             return false
           }
         }
       });//弹窗拖动

       Vue.directive('fullscreen',{
         bind(el, binding, vnode, oldVnode){
            const antModal = el.querySelector('.ant-modal');
            const fullscreenModel = el.querySelector('.fullscreen_model');
            fullscreenModel.onclick = function(){
               if(hasClass(antModal,'ant-modal-fullscreen')){
                  antModal.classList.remove("ant-modal-fullscreen")
               }else{
                  antModal.classList.add("ant-modal-fullscreen")
               };
            };

            function hasClass(obj, cls) {
               if( obj.className.indexOf(cls)>1){
                  return true
               };
               return false
            };//判断ant-modal-fullscreen类是否存在，达到切换图标效果
           
         }

       });//弹窗放大缩小
   }
};
