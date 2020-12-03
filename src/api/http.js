import axios from 'axios'
import qs from 'qs'

export const get = function (url, params = "") {
    return new Promise((resolve, reject) => {
        axios.get(url, qs.stringify({
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
        axios.post(url, qs.stringify(params)).then(res => {
            resolve(qs.parse(res.data));
        }).catch(err => {
            reject(qs.parse(err.data))
        })
    });
}
