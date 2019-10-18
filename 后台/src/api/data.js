import axios from '@/libs/api.request'
import config from '@/config'

export const indexCount = (account) => { //主页数据
    let data = account
    return axios.request({
        url: '/admin/charge/indexCount',
        data,
        method: 'post'
    })
};

export const imgurl = (account) => { //地址
    return config.baseUrl.pro
};

export const file = (account) => { //地址
    let url = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
    return url + '/app/upload/file';
};

export const getMoneyType = (account) => { //币种
    let data = account
    return axios.request({
        url: '/admin/product/getMoneyType',
        data,
        method: 'get'
    })
};