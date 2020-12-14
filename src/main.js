import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'//导入全局css样式
import '@/utils/common.js'
import '@/utils/axios.js'
import '@/assets/icon/iconfont.css'
Vue.config.productionTip = false;
Vue.use(ElementUI)
// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path != '/login') {
    let token = sessionStorage.getItem('token')
    if (!token) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
