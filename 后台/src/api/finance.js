import axios from '@/libs/api.request'
import config from '@/config'


export const list = (account) => { //出入金记录
    let data = account
    return axios.request({
        url: '/admin/charge/list',
        data,
        method: 'post'
    })
};

export const outMoneyAudit = (account) => { //提币审核
    let data = account
    return axios.request({
        url: '/admin/charge/outMoneyAudit',
        data,
        method: 'post'
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

export const stockUserConcession = (account) => { //返佣记录
    let data = account
    return axios.request({
        url: '/admin/stockUserConcession/list',
        data,
        method: 'post'
    })
};


export const miningRecord = (account) => { //领取明细
    let data = account
    return axios.request({
        url: '/admin/mill/miningRecord',
        data,
        method: 'post'
    })
};
