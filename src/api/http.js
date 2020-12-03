import axios from 'axios'
import qs from 'qs'
const ENV = process.env
const BASE_URL = ENV.VUE_APP_BASE_URL
const BASE_API = ENV.VUE_APP_BASE_API
// const BASE_URL = ""
// const BASE_API = ""

export const get = function (url, params = "") {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + BASE_API + url, qs.stringify({
            params: params
        })).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}

export const post = function (url, params) {
    return new Promise((resolve, reject) => {
        axios.post(BASE_URL + BASE_API + url, qs.stringify(params)).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}
