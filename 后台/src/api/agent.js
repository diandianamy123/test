import axios from '@/libs/api.request'
import config from '@/config'




export const dlList = (account) => { //代理等级列表
    let data = account
    return axios.request({
        url: '/admin/agent/dlList',
        data,
        method: 'get'
    })
};



export const dlInfo = (account) => { //代理等级详情
    let data = account
    return axios.request({
        url: '/admin/agent/dlInfo',
        params: data,
        method: 'get'
    })
};


export const editDl = (account) => { //编辑等级
    let data = account
    return axios.request({
        url: '/admin/agent/editDl',
        data,
        method: 'post'
    })
};

export const agentList = (account) => { //代理资源列表
    let data = account
    return axios.request({
        url: '/admin/agent/agentList',
        params: data,
        method: 'get'
    })
};

export const agentStatus = (account) => { //代理列表禁用启用
    let data = account
    return axios.request({
        url: '/admin/agent/agentStatus',
        params: data,
        method: 'get'
    })
};


export const showDLInfo = (account) => { //代理列表详情
    let data = account
    return axios.request({
        url: '/admin/agent/showDLInfo',
        params: data,
        method: 'get'
    })
};

export const addDl = (account) => { //代理添加
    let data = account
    return axios.request({
        url: '/admin/agent/addDl',
        data,
        method: 'post'
    })
};

export const bjDl = (account) => { //代理编辑
    let data = account
    return axios.request({
        url: '/admin/agent/bjDl',
        data,
        method: 'post'
    })
};

export const agentLogin = (data) => { //打开代理后台登陆
  return axios.request({
    url: '/agent/user/login',
    data: data,
    method: 'post'
  });
};
