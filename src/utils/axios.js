import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Vue from "vue";
import axios from "axios";
import { Message } from "element-ui";
axios.interceptors.request.use(config => {
    NProgress.start();
    config.headers.Authorization = sessionStorage.getItem("token");
    return config;
});
axios.interceptors.response.use(config => {
    NProgress.done();
    return config;
},
    error => {
        if (error.config) {
            switch (error.response.status) {
                case 401:
                    // store.dispatch('logout');
                    Message({
                        type: 'error',
                        message: '请重新登录'
                    })
                    break;
                case 404:
                    Message({
                        type: 'error',
                        message: '数据不存在请稍后再试'
                    })
                    break;
                case 500:
                    Message({
                        type: 'error',
                        message: '服务器出错'
                    })
            }
        }
        NProgress.done();
        return Promise.reject(error);
    }
);

Vue.prototype.$http = axios;