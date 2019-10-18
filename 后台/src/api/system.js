import axios from '@/libs/api.request'
import config from '@/config'



export const genSecret = (account) => {//生成谷歌二维码和秘钥
    let data = account
    return axios.request({
        url: '/admin/googleAuth/genSecret',
        data,
        method: 'post'
    })
};


export const verify = (account) => {//绑定谷歌验证
    let data = account
    return axios.request({
        url: '/admin/googleAuth/verify',
        data,
        method: 'post'
    })
};


export const relieveGoolgeAuth = (account) => {//解除谷歌认证
    let data = account
    return axios.request({
        url: '/admin/googleAuth/relieveGoolgeAuth',
        data,
        method: 'post'
    })
};


export const getCode = (account) => {//验证码
    let data = account
    return axios.request({
        url: '/app/user/getCode',
        params: data,
        method: 'get'
    })
};

export const destroyAxgy = (account) => {//验证码
    let data = account
    return axios.request({
        url: '/admin/sys/destroyAxgy',
        data,
        method: 'post'
    })
};


export const logPage = (account) => {//验证码
    let data = account
    return axios.request({
        url: '/admin/user/logPage',
        params: data,
        method: 'get'
    })
};


export const getWebInfo = (account) => {//验证码
    let data = account
    return axios.request({
        url: '/admin/sys/web/getWebInfo',
        params: data,
        method: 'get'
    })
};
export const editWeb = (account) => {//验证码
    let data = account
    return axios.request({
        url: '/admin/sys/web/editWeb',
        data,
        method: 'post'
    })
};