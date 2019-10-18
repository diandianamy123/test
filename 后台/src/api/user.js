import axios from '@/libs/api.request'
import config from '@/config'

export const login = (account) => {
  let data = account
  return axios.request({
    url: '/admin/user/login',
    data,
    method: 'post'
  })
};
export const captcha = () => {
  return config.baseUrl.pro + '/admin/user/getVCode';
}


export const shopVerify = (account) => { //商家审核
  let data = account
  return axios.request({
    url: '/admin/number/shopVerify',
    params: data,
    method: 'get'
  })
};


export const checkShopList = (account) => {  //审核列表
  let data = account
  return axios.request({
    url: '/admin/number/checkShopList',
    params: data,
    method: 'get'
  })
};


export const shopCancel = (account) => {  //取消商家审核
  let data = account
  return axios.request({
    url: '/admin/number/shopCancel',
    params: data,
    method: 'get'
  })
};


export const getAllbyPage = (account) => {  //会员列表
  let data = account
  return axios.request({
    url: '/admin/number/getAllbyPage',
    params: data,
    method: 'get'
  })
};


export const userInfo = (account) => {  //个人信息详情
  let data = account
  return axios.request({
    url: '/admin/number/userInfo',
    params: data,
    method: 'get'
  })
};


export const auth = (account) => {  //批量高级认证
  let data = account
  return axios.request({
    url: '/admin/number/auth',
    params: data,
    method: 'get'
  })
};

export const found = (account) => {  //查看会员资产
  let data = account
  return axios.request({
    url: '/admin/number/found',
    params: data,
    method: 'get'
  })
};


export const addFound = (account) => {  //取消商家审核
  let data = account
  return axios.request({
    url: '/admin/number/addFound',
    data,
    method: 'post'
  })
};
export const addAllFound = (account) => {  //批量充值
  let data = account
  return axios.request({
    url: '/admin/number/allAddFound',
    data,
    method: 'post'
  })
};
export const editStatus = (account) => {  //用户状态和交易状态控制
  let data = account
  return axios.request({
    url: '/admin/number/editStatus',
    params: data,
    method: 'get'
  })
};


export const myTeam = (account) => {  //团队第一次
  let data = account
  return axios.request({
    url: '/admin/stockUser/myTeam',
    data,
    method: 'post'
  })
};


export const myTeamLevel = (account) => {  //团队筛选和下级
  let data = account
  return axios.request({
    url: '/admin/stockUser/myTeamLevel',
    data,
    method: 'post'
  })
};


export const list = (account) => {  //节点审核列表
  let data = account
  return axios.request({
    url: '/admin/userNodeApply/list',
    data,
    method: 'post'
  })
};


export const updateStatus = (account) => {  //修改节点审核状态
  let data = account
  return axios.request({
    url: '/admin/userNodeApply/updateStatus',
    data,
    method: 'post'
  })
};


export const robotryList = (account) => {  //机器人列表
  let data = account
  return axios.request({
    url: '/admin/number/robotryList',
    params: data,
    method: 'get'
  })
};

export const robotryInfo = (account) => {  //机器人详情
  let data = account
  return axios.request({
    url: '/admin/number/robotryInfo',
    params: data,
    method: 'get'
  })
};


export const addRobotry = (account) => {  //添加机器人
  let data = account
  return axios.request({
    url: '/admin/number/addRobotry',
    data,
    method: 'post'
  })
};

export const editRobotry = (account) => {  //编辑机器人
  let data = account
  return axios.request({
    url: '/admin/number/editRobotry',
    data,
    method: 'post'
  })
};


export const editRobotryStatus = (account) => {  //编辑机器人
  let data = account
  return axios.request({
    url: '/admin/number/editRobotryStatus',
    data,
    method: 'post'
  })
};
