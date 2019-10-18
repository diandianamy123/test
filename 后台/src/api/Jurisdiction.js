import axios from '@/libs/api.request'
import config from '@/config'


export const getPermissionTree = (account) => { //查看菜单列表树
  let data = account
  return axios.request({
    url: '/admin/permission/getPermissionTree',
    data,
    method: 'get'
  });
};

export const getAllRoleByPage = (account) => { //查看角色列表
  let data = account
  return axios.request({
    url: 'admin/permission/getAllRoleByPage',
    data,
    method: 'get'
  });
};


export const getAllNumberByPage = (account) => { //管理员列表
  let data = account
  return axios.request({
    url: 'admin/permission/getAllNumberByPage',
    data,
    method: 'get'
  });
};


export const addUser = (account) => { //添加管理员
  let data = account
  return axios.request({
    url: '/admin/permission/addUser',
    data,
    method: 'post'
  });
};


export const saveRole = (account) => { //添加角色
  let data = account
  return axios.request({
    url: '/admin/permission/saveRole',
    data,
    method: 'post'
  });
};


export const permissiondelete = (account) => { //删除管理员
  let data = account
  return axios.request({
    url: '/admin/permission/delete',
    params: data,
    method: 'get'
  });
};


export const updateRole = (account) => { //编辑角色
  let data = account
  return axios.request({
    url: '/admin/permission/updateRole',
    data,
    method: 'post'
  });
};


export const getRolePression = (account) => { //获取角色权限树
  let data = account
  return axios.request({
    url: '/admin/permission/getRolePression',
    params: data,
    method: 'get'
  });
};



