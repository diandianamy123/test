import axios from '@/libs/api.request'
import config from '@/config'


export const addOrUpdateMill = (account) => { //编辑矿机
    let data = account
    return axios.request({
        url: '/admin/mill/addOrUpdateMill',
        data,
        method: 'post'
    })
};

export const millList = (account) => { //矿机列表
    let data = account
    return axios.request({
        url: '/admin/mill/millList',
        data,
        method: 'get'
    })
};


export const record = (account) => { //资产记录
    let data = account
    return axios.request({
        url: '/admin/charge/record',
        data,
        method: 'post'
    })
};


export const buyRecord = (account) => { //认购列表
    let data = account
    return axios.request({
        url: '/admin/mill/buyRecord',
        data,
        method: 'post'
    })
};

