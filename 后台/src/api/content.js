import axios from '@/libs/api.request'
import config from '@/config'


export const listNotice = (account) => { //系统公告列表
  let data = account
  return axios.request({
    url: '/admin/other/listNotice',
    data,
    method: 'post'
  });
};

export const addNotice = (account) => { //添加公告
  let data = account
  return axios.request({
    url: '/admin/other/addNotice',
    data,
    method: 'post'
  });
};

export const updateNotice = (account) => { //修改公告
  let data = account
  return axios.request({
    url: '/admin/other/updateNotice',
    data,
    method: 'post'
  });
};

export const toUpdateNotice = (account) => { //公告详情
  let data = account
  return axios.request({
    url: '/admin/other/toUpdateNotice',
    data,
    method: 'post'
  });
};


export const delNotice = (account) => { //删除公告
  let data = account
  return axios.request({
    url: '/admin/other/delNotice',
    data,
    method: 'post'
  });
};


export const listAppVersion = (account) => { //版本列表
  let data = account
  return axios.request({
    url: '/admin/other/listAppVersion',
    data,
    method: 'post'
  });
};


export const addAppVersion = (account) => { //添加版本
  let data = account
  return axios.request({
    url: '/admin/other/addAppVersion',
    data,
    method: 'post'
  });
};


export const deleteAppVersion = (account) => { //删除版本
  let data = account
  return axios.request({
    url: '/admin/other/deleteAppVersion',
    data,
    method: 'post'
  });
};


export const updateAppVersion = (account) => { //修改版本
  let data = account
  return axios.request({
    url: '/admin/other/updateAppVersion',
    data,
    method: 'post'
  });
};

export const toUpdateAppVersion = (account) => { //版本详情
  let data = account
  return axios.request({
    url: '/admin/other/toUpdateAppVersion',
    data,
    method: 'post'
  });
};


export const getWebAgreement = (account) => { //协议内容
  let data = account
  return axios.request({
    url: '/admin/sys/web/getWebAgreement',
    data,
    method: 'get'
  });
};

export const editWebgreement = (account) => { //编辑协议
  let data = account
  return axios.request({
    url: '/admin/sys/web/editWebgreement',
    data,
    method: 'post'
  });
};


export const listView = (account) => { //轮播图列表
  let data = account
  return axios.request({
    url: 'admin/other/listView',
    data,
    method: 'post'
  });
};


export const updateView = (account) => { //编辑轮播图
  let data = account
  return axios.request({
    url: 'admin/other/updateView',
    data,
    method: 'post'
  });
};

export const addView = (account) => { //添加轮播图
  let data = account
  return axios.request({
    url: 'admin/other/addView',
    data,
    method: 'post'
  });
};


export const delView = (account) => { //删除轮播图
  let data = account
  return axios.request({
    url: 'admin/other/delView',
    data,
    method: 'post'
  });
};


export const listRule = (account) => { //交易指南列表
  let data = account
  return axios.request({
    url: 'admin/other/listRule',
    data,
    method: 'post'
  });
};


export const addRule = (account) => { //添加交易指南
  let data = account
  return axios.request({
    url: 'admin/other/addRule',
    data,
    method: 'post'
  });
};

export const toUpdateRule = (account) => { //去修改交易指南
  let data = account
  return axios.request({
    url: 'admin/other/toUpdateRule',
    data,
    method: 'post'
  });
};

export const updateRule = (account) => { //修改交易指南
  let data = account
  return axios.request({
    url: 'admin/other/updateRule',
    data,
    method: 'post'
  });
};

export const delRule = (account) => { //删除交易指南
  let data = account
  return axios.request({
    url: 'admin/other/delRule',
    data,
    method: 'post'
  });
};


export const zixun = (account) => { //资讯列表
  let data = account
  return axios.request({
    url: 'admin/other/zixun',
    params: data,
    method: 'get'
  });
};

export const addZX = (account) => { //添加资讯
  let data = account
  return axios.request({
    url: 'admin/other/addZX',
    data,
    method: 'post'
  });
};

export const deleteZX = (account) => { //删除资讯
  let data = account
  return axios.request({
    url: 'admin/other/deleteZX',
    params: data,
    method: 'get'
  });
};

export const feedback = (account) => { //反馈列表
  let data = account
  return axios.request({
    url: 'admin/sys/wt',
    params: data,
    method: 'get'
  });
};

// 删除反馈
export const feedbackDelete = (data) => { 
  return axios.request({
    url: 'admin/sys/dewt',
    params: data,
    method: 'get'
  });
};
