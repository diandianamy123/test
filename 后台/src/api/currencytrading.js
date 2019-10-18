import axios from '@/libs/api.request'
import config from '@/config'




export const entrustBuy = (account) => { //委托买入列表
    let data = account
    return axios.request({
        url: '/admin/coin/entrustBuy',
        params: data,
        method: 'get'
    })
};

export const entrustSell = (account) => { //委托卖出列表
    let data = account
    return axios.request({
        url: '/admin/coin/entrustSell',
        params: data,
        method: 'get'
    })
};
export const getCoinType = (data) => {//交易币种筛选
    return Axios.request({
      method: "get",
      url: '/admin/product/getExchangCode',
      params: data,
    })
  };