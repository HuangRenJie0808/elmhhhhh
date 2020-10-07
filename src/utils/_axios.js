import axios from 'axios'
// get请求方式
export function gets(url, data) {
    return axios.get(url, {
        params: data
    })
}
// post请求方式 
export function posts(url, data) {
    return axios.post(url, data)
}
// 城市地址请求接口
export function citys(type) {
    return gets(`http://elm.cangdu.org/v1/cities?type=${type}`)
}