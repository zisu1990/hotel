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
    console.log(config)
    NProgress.done();
    return config;
},
    error => {
        if (error.config) {
            console.log("请求错误", error.response.status);
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
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            console.log("请求错误", error.response.status);
            switch (error.response.status) {
                case 401:
                    // store.dispatch('logout');
                    console.log("401");
                    break;
                case 404:
                    console.log('接口不存在');
                    break;
                case 500:
                    console.log('服务器错误');
            }
        }
        return Promise.reject(error);// 返回接口返回的错误信息
    })

Vue.prototype.$http = axios;