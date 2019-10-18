import axios from '@/libs/api.request'
import config from '@/config'


export const getWalletList = (account) => { //系统公告列表
  let data = account
  return axios.request({
    url: '/admin/walletManage/getWalletList',
    data,
    method: 'post'
  });
};


export const platformWithdraw = (account) => { //系统公告列表
  let data = account
  return axios.request({
    url: '/admin/walletManage/platformWithdraw',
    data,
    method: 'get'
  });
};
export const gjCode = (account) => { //系统公告列表
  let data = account
  return axios.request({
    url: '/admin/walletManage/gjCode',
    data,
    method: 'get'
  });
};
export const singleGj = (account) => { //单个归集
  let data = account
  return axios.request({
    url: '/admin/walletManage/singleGj',
    data,
    method: 'post'
  });
};
