import axios from '@/libs/api.request'
import config from '@/config'



export const buyRecordList = (account) => { //求购记录
    let data = account
    return axios.request({
        url: '/admin/c2c/buy/buyRecordList',
       	data,
        method: 'post'
    })
};


export const sellRecordList = (account) => { //出售记录
    let data = account
    return axios.request({
        url: '/admin/c2c/sell/sellRecordList',
        data,
        method: 'post'
    })
};


export const appealList = (account) => { //申诉记录
    let data = account
    return axios.request({
        url: '/admin/c2c/appeal/appealList',
        data,
        method: 'post'
    })
};


export const audit = (account) => { //审核申诉
    let data = account
    return axios.request({
        url: '/admin/c2c/appeal/audit',
        data,
        method: 'post'
    })
};


export const dealRecordList = (account) => { //交易记录
    let data = account
    return axios.request({
        url: '/admin/c2c/deal/dealRecordList',
        data,
        method: 'post'
    })
};


export const memberChild = (data) => { // 会员下级
    return axios.request({
        url: '/admin/number/myCustom',
        params: data,
        method: 'get'
    })
};

