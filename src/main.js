import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'//导入全局css样式
Vue.config.productionTip = false;
Vue.use(ElementUI)


// import TreeTable from 'vue-table-with-tree-grid'
// Vue.component('tree-table', TreeTable)

//导入NProgress包对应的js和css  -------网页上方加载的进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 安装axios请求
import axios from 'axios'
// axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
//在request拦截器在展示进度条NProgress.start()
axios.interceptors.request.use(config => {
  NProgress.start()
  // console.log(config)
  config.headers.Authorization = sessionStorage.getItem('token') //为请求头对象，添加token验证的Authorization字段
  return config;
})

//在response拦截器在隐藏进度条NProgress.done()

axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})



Vue.prototype.$http = axios;
import { Message } from 'element-ui'

// 路由守卫
// router.beforeEach((to, from, next) => {
//   if (to.path != '/login') {
//     let token = sessionStorage.getItem('token')
//     if (!token) {
//       Message({ type: "error", message: "登录超时" })
//     } else {
//       next()
//     }
//   }
// })

Vue.prototype.$message = Message  //提示弹框
Vue.prototype.message = (type, str) => Message({
  message: str,
  type: type,
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
