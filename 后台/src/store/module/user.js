import {
    login,
    logout,
    getUserInfo,
    getMessage,
    getContentByMsgId,
    hasRead,
    removeReaded,
    restoreTrash,
    getUnreadCount
} from '@/api/user'
import {
    setToken,
    getToken
} from '@/libs/util'
export default {
    state: {
        userName: '',
        userId: '',
        avatarImgPath: '',
        token: getToken(),
        access: '',
        hasGetInfo: false,
        unreadCount: 0,
        messageUnreadList: [],
        messageReadedList: [],
        messageTrashList: [],
        messageContentStore: {}
    },
    mutations: {
        setAvatar(state, avatarPath) {
            state.avatarImgPath = avatarPath
        },
        setUserId(state, id) {
            state.userId = id
        },
        setUserName(state, name) {
            state.userName = name
        },
        setAccess(state, access) {
            state.access = access
        },
        setToken(state, token) {
            state.token = token
            setToken(token)
        },
        setHasGetInfo(state, status) {
            state.hasGetInfo = status
        },
        setMessageCount(state, count) {
            state.unreadCount = count
        },
        setMessageUnreadList(state, list) {
            state.messageUnreadList = list
        },
        setMessageReadedList(state, list) {
            state.messageReadedList = list
        },
        setMessageTrashList(state, list) {
            state.messageTrashList = list
        },
        updateMessageContentStore(state, {
            msg_id,
            content
        }) {
            state.messageContentStore[msg_id] = content
        },
        moveMsg(state, {
            from,
            to,
            msg_id
        }) {
            const index = state[from].findIndex(_ => _.msg_id === msg_id)
            const msgItem = state[from].splice(index, 1)[0]
            msgItem.loading = false
            state[to].unshift(msgItem)
        }
    },
    getters: {
        messageUnreadCount: state => state.messageUnreadList.length,
        messageReadedCount: state => state.messageReadedList.length,
        messageTrashCount: state => state.messageTrashList.length
    },
    actions: {
        // 登录
        handleLogin({
            commit
        }, {}) {
            return new Promise((resolve, reject) => {
                let accessdata = new Array();
                let useraccess = JSON.parse(window.sessionStorage.getItem('bnr-permissionlist'));

                for(var k = 0, length3 = useraccess.length; k < length3; k++){
                    if (useraccess[k].selected) {
                        accessdata.push(useraccess[k].name);
                        if (useraccess[k].children && useraccess[k].children.length) {
                            for(var j = 0, length2 = useraccess[k].children.length; j < length2; j++){
                                if (useraccess[k].children[j].selected) {
                                    accessdata.push(useraccess[k].children[j].name);
                                }
                            };
                        };
                    }
                };
                commit('setAccess', accessdata)
            })
        },
        // 退出登录
        handleLogOut({
            state,
            commit
        }) {
            return new Promise((resolve, reject) => {
                window.sessionStorage.clear();
                commit('setToken', '')
                commit('setAccess', [])
                resolve()
            })
        },
        // 获取用户相关信息
        getUserInfo({
            state,
            commit
        }) {
            return new Promise((resolve, reject) => {

                let accessdata = new Array();
                let useraccess = JSON.parse(window.sessionStorage.getItem('bnr-permissionlist'));

                for(var k = 0, length3 = useraccess.length; k < length3; k++){
                    if (useraccess[k].selected) {
                        accessdata.push(useraccess[k].name);
                        if (useraccess[k].children && useraccess[k].children.length) {
                            for(var j = 0, length2 = useraccess[k].children.length; j < length2; j++){
                                if (useraccess[k].children[j].selected) {
                                    accessdata.push(useraccess[k].children[j].name);
                                }
                            };
                        };
                    }
                };

                commit('setAccess', accessdata)
                // try {
                //     getUserInfo(state.token).then(res => {
                //         const data = res.data
                //         commit('setAvatar', data.avatar)
                //         commit('setUserName', data.name)
                //         commit('setUserId', data.user_id)
                //         commit('setAccess', data.access)
                //         commit('setHasGetInfo', true)
                //         resolve(data)
                //     }).catch(err => {
                //         reject(err)
                //     })
                // } catch (error) {
                    // reject(error)
                // }
            })
        },
        // 此方法用来获取未读消息条数，接口只返回数值，不返回消息列表
        getUnreadMessageCount({
            state,
            commit
        }) {
            // getUnreadCount().then(res => {
            //     const {
            //         data
            //     } = res
            //     commit('setMessageCount', data)
            // })
        },
        // 获取消息列表，其中包含未读、已读、回收站三个列表
        getMessageList({
            state,
            commit
        }) {
            return new Promise((resolve, reject) => {
                getMessage().then(res => {
                    const {
                        unread,
                        readed,
                        trash
                    } = res.data
                    commit('setMessageUnreadList', unread.sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
                    commit('setMessageReadedList', readed.map(_ => {
                        _.loading = false
                        return _
                    }).sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
                    commit('setMessageTrashList', trash.map(_ => {
                        _.loading = false
                        return _
                    }).sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 根据当前点击的消息的id获取内容
        getContentByMsgId({
            state,
            commit
        }, {
            msg_id
        }) {
            return new Promise((resolve, reject) => {
                let contentItem = state.messageContentStore[msg_id]
                if (contentItem) {
                    resolve(contentItem)
                } else {
                    getContentByMsgId(msg_id).then(res => {
                        const content = res.data
                        commit('updateMessageContentStore', {
                            msg_id,
                            content
                        })
                        resolve(content)
                    })
                }
            })
        },
        // 把一个未读消息标记为已读
        hasRead({
            state,
            commit
        }, {
            msg_id
        }) {
            return new Promise((resolve, reject) => {
                hasRead(msg_id).then(() => {
                    commit('moveMsg', {
                        from: 'messageUnreadList',
                        to: 'messageReadedList',
                        msg_id
                    })
                    commit('setMessageCount', state.unreadCount - 1)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 删除一个已读消息到回收站
        removeReaded({
            commit
        }, {
            msg_id
        }) {
            return new Promise((resolve, reject) => {
                removeReaded(msg_id).then(() => {
                    commit('moveMsg', {
                        from: 'messageReadedList',
                        to: 'messageTrashList',
                        msg_id
                    })
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 还原一个已删除消息到已读消息
        restoreTrash({
            commit
        }, {
            msg_id
        }) {
            return new Promise((resolve, reject) => {
                restoreTrash(msg_id).then(() => {
                    commit('moveMsg', {
                        from: 'messageTrashList',
                        to: 'messageReadedList',
                        msg_id
                    })
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}