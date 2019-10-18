import axios from '@/libs/api.request'
import config from '@/config'


export const editSys = (account) => { //修改配置
  let data = account
  return axios.request({
    url: '/admin/sys/web/editc2c',
    data,
    method: 'post'
  })
};

export const giveType = (account) => { //奖励设置回显
  let data = account
  return axios.request({
    url: '/admin/sys/giveType',
    data,
    method: 'get'
  })
};


export const getWebConfig = (account) => { //充提币配置回显
  let data = account
  return axios.request({
    url: '/admin/sys/getWebConfig',
    data,
    method: 'get'
  })
};


export const exchangeList = (account) => { //兑换列表回显
  let data = account
  return axios.request({
    url: '/admin/product/exchangeList',
    data,
    method: 'get'
  })
};

export const editExchangCode = (account) => { //编辑兑换信息
  let data = account
  return axios.request({
    url: '/admin/product/editExchangCode',
    data,
    method: 'post'
  })
};

export const giveCon = (account) => { //返佣配置
  let data = account
  return axios.request({
    url: '/admin/sys/giveCon',
    data,
    method: 'get'
  })
};


export const getWebAgreement = (account) => { //富文本成为商家
  let data = account
  return axios.request({
    url: 'admin/sys/web/getWebAgreement',
    params: data,
    method: 'get'
  })
};


export const editWebgreement = (account) => { //编辑富文本成为商家
  let data = account
  return axios.request({
    url: '/admin/sys/web/editWebgreement',
    data,
    method: 'post'
  })
};

export const getc2c = (account) => { //c2c查看
  let data = account
  return axios.request({
    url: '/admin/sys/web/getc2c',
    data,
    method: 'get'
  })
};


export const getCoinCoin = (account) => { //币币配置查询
  let data = account
  return axios.request({
    url: '/admin/sys/web/getCoinCoin',
    data,
    method: 'get'
  })
};


export const editCoin = (account) => { //修改币币配置
  let data = account
  return axios.request({
    url: '/admin/sys/web/editCoin',
    data,
    method: 'post'
  })
};


export const codeList = (account) => { //交易币种列表
  let data = account
  return axios.request({
    url: '/admin/product/codeList',
    params: data,
    method: 'get'
  })
};


export const addStock = (account) => { //添加币种
  let data = account
  return axios.request({
    url: '/admin/product/addStock',
    data,
    method: 'post'
  })
};

export const codeInfo = (account) => { //获取币种详情
  let data = account
  return axios.request({
    url: '/admin/product/codeInfo',
    params: data,
    method: 'get'
  })
};

export const editStock = (account) => { //编辑币种
  let data = account
  return axios.request({
    url: '/admin/product/editStock',
    data,
    method: 'post'
  })
};
//代币配置
export const jetonList = (account) => { //币种配置列表
  let data = account
  return axios.request({
    url: '/admin/product/coinFigList',
    data,
    method: 'get'
  })
};

export const addJeton = (account) => { //添加币种配置
  let data = account
  return axios.request({
    url: '/admin/product/addCoinConfig',
    data,
    method: 'post'
  })
};

export const editJeton = (account) => { //编辑币种配置
  let data = account
  return axios.request({
    url: '/admin/product/editCoinCoinFig',
    data,
    method: 'post'
  })
};

export const jetonDetail = (account) => { //币种配置详情
  let data = account
  return axios.request({
    url: '/admin/product/dInfo',
    params: data,
    method: 'get'
  })
};


//币种资产
export const currencyList = (account) => { //币种配置详情
  let data = account
  return axios.request({
    url: '/admin/product/codeUserInfo',
    params: data,
    method: 'get'
  })
};

export const assetsList = (account) => { //币种配置详情
  let data = account
  return axios.request({
    url: '/admin/product/getFund',
    params: data,
    method: 'get'
  })
};

// 批量充值/扣款
export const ownerOperation = (data) => { 
  return axios.request({
    url: '/admin/number/allAddFound',
    data: data,
    method: 'post'
  })
};
export const stockStatus = (data) => { 
  return axios.request({
    url: '/admin/product/stockStatus',
    params: data,
    method: 'get'
  })
};