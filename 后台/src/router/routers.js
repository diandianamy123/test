import Main from '@/components/main'
import parentView from '@/components/parent-view'


export default [{
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录',
    hideInMenu: true
  },
  component: () =>
    import ('@/view/login/login.vue')
},
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [{
      path: '/home',
      name: 'home',
      meta: {
        hideInMenu: true,
        // access:["首页"],
        title: '首页',
        notCache: true,
        icon: 'md-home'
      },
      component: () =>
        import ('@/view/single-page/home')
    }]
  },
  {
    path: '/product',
    name: 'product',
    meta: {
      icon: 'ios-filing',
      access: ["产品设置"],
      title: '产品设置'
    },
    component: Main,
    children: [{
      //     path: 'exchange',
      //     name: 'exchange',
      //     meta: {
      //         icon: 'md-repeat',
      //         // access:["兑换设置"],
      //         title: '兑换设置'
      //     },
      //     component: () =>
      //         import ('@/view/product/exchange/index.vue')
      // },{
      //     path: 'reward',
      //     name: 'reward',
      //     meta: {
      //         icon: 'ios-ribbon',
      //         // access:["奖励设置"],
      //         title: '奖励设置'
      //     },
      //     component: () =>
      //         import ('@/view/product/reward/index.vue')
      // },{
      //     path: 'rakeback',
      //     name: 'rakeback',
      //     meta: {
      //         icon: 'ios-contacts',
      //         // access:["返佣设置"],
      //         title: '返佣设置'
      //     },
      //     component: () =>
      //         import ('@/view/product/rakeback/index.vue')
      // },{
      path: 'c2c',
      name: 'c2c',
      meta: {
        icon: 'ios-contacts',
        access: ["法币设置"],
        title: '法币设置'
      },
      component: () =>
        import ('@/view/product/c2c/index.vue')
    }, {
      path: 'coin',
      name: 'coin',
      meta: {
        icon: 'ios-contacts',
        access: ["币币设置"],
        title: '币币设置'
      },
      component: () =>
        import ('@/view/product/coin/index.vue')
    }, {
      path: 'currency',
      name: 'currency',
      meta: {
        icon: 'ios-contacts',
        access: ["交易币种"],
        title: '交易币种'
      },
      component: () =>
        import ('@/view/product/currency/index.vue')
    }, {
      //     path: 'configure',
      //     name: 'configure',
      //     meta: {
      //         icon: 'ios-contacts',
      //         // access:["币种配置"],
      //         title: '币种配置'
      //     },
      //     component: () =>
      //         import ('@/view/product/configure/index.vue')
      // },{
      path: 'Withdraw',
      name: 'Withdraw',
      meta: {
        icon: 'ios-open',
        access: ["提币设置"],
        title: '提币设置'
      },
      component: () =>
        import ('@/view/product/Withdraw/index.vue')
    },
      {
        path: 'jeton',
        name: 'jeton',
        meta: {
          icon: 'ios-contacts',
          access: ["代币配置"],
          title: '代币配置'
        },
        component: () =>
          import ('@/view/product/jeton/index.vue')
      },
      {
        path: 'currencyAssets',
        name: 'currencyAssets',
        meta: {
          icon: 'ios-contacts',
          access: ["币种资产"],
          title: '币种资产'
        },
        component: () =>
          import ('@/view/product/currencyAssets/index.vue')
      }]
  },
  {
    path: '/C2C',
    name: 'C2C',
    meta: {
      icon: 'ios-briefcase',
      access: ["C2C交易"],
      title: 'C2C交易'
    },
    component: Main,
    children: [{
      path: 'wanttobuy',
      name: 'wanttobuy',
      meta: {
        icon: 'md-cart',
        access: ["求购记录"],
        title: '求购记录'
      },
      component: () =>
        import ('@/view/C2C/wanttobuy/index.vue')
    }, {
      path: 'sell',
      name: 'sell',
      meta: {
        icon: 'ios-open',
        access: ["出售记录"],
        title: '出售记录'
      },
      component: () =>
        import ('@/view/C2C/sell/index.vue')
    }, {
      path: 'transaction',
      name: 'transaction',
      meta: {
        icon: 'md-list-box',
        access: ["交易记录"],
        title: '交易记录'
      },
      component: () =>
        import ('@/view/C2C/transaction/index.vue')
    }, {
      path: 'appeal',
      name: 'appeal',
      meta: {
        icon: 'md-information-circle',
        access: ["申诉记录"],
        title: '申诉记录'
      },
      component: () =>
        import ('@/view/C2C/appeal/index.vue')
    }, {
      path: 'business',
      name: 'business',
      meta: {
        icon: 'md-add-circle',
        access: ["商家审核"],
        title: '商家审核'
      },
      component: () =>
        import ('@/view/C2C/business/index.vue')
    }]
  },
  {
    path: '/Jurisdiction',
    name: 'Jurisdiction',
    meta: {
      icon: 'md-contacts',
      access: ["权限管理"],
      title: '权限管理'
    },
    component: Main,
    children: [{
      path: 'role',
      name: 'role',
      meta: {
        icon: 'ios-contacts',
        access: ["角色列表"],
        title: '角色列表'
      },
      component: () =>
        import ('@/view/Jurisdiction/role/index.vue')
    }, {
      path: 'user',
      name: 'user',
      meta: {
        icon: 'ios-contacts-outline',
        access: ["用户列表"],
        title: '用户列表'
      },
      component: () =>
        import ('@/view/Jurisdiction/user/index.vue')
    }]
  },
  {
    path: '/agent',
    name: 'agent',
    meta: {
      icon: 'md-easel',
      access: ["代理管理"],
      title: '代理管理'
    },
    component: Main,
    children: [{
      path: 'grade',
      name: 'grade',
      meta: {
        icon: 'logo-euro',
        access: ["代理等级"],
        title: '代理等级'
      },
      component: () =>
        import ('@/view/agent/grade/index.vue')
    }, {
      path: 'list',
      name: 'list',
      meta: {
        icon: 'ios-cart',
        access: ["代理列表"],
        title: '代理列表'
      },
      component: () =>
        import ('@/view/agent/list/index.vue')
    }]
  },
  {
    path: '/user',
    name: 'user',
    meta: {
      icon: 'md-contact',
      access: ["用户管理"],
      title: '用户管理'
    },
    component: Main,
    children: [{
      path: 'member',
      name: 'member',
      meta: {
        icon: 'ios-contact',
        access: ["会员列表"],
        title: '会员列表'
      },
      component: () =>
        import ('@/view/user/member/index.vue')
      // },{
      //     path: 'userlist',
      //     name: 'userlist',
      //     meta: {
      //         icon: 'md-funnel',
      //         // access:["节点申请"],
      //         title: '节点申请'
      //     },
      //     component: () =>
      //         import ('@/view/user/userlist/index.vue')
      // },{
      //     path: 'team',
      //     name: 'team',
      //     meta: {
      //         icon: 'ios-people',
      //         // access:["团队详情"],
      //         title: '团队详情'
      //     },
      //     component: () =>
      //         import ('@/view/user/team/index.vue')
    }, {
      path: 'robot',
      name: 'robot',
      meta: {
        icon: 'ios-people',
        access: ["机器人"],
        title: '机器人'
      },
      component: () =>
        import ('@/view/user/robot/index.vue')
    }]
  },
  {
    path: '/u-child',
    name: 'u-child',
    component: Main,
    meta: {
      hideInMenu: true
    },
    children: [
      {
        path: 'user-child',
        name: 'user-child',
        meta: {
          hideInMenu: true,
          title: '会员下级',
        },
        component: () =>
          import ('@/view/user/member/child')
      }
    ]
  },
  {
    path: '/finance',
    name: 'finance',
    meta: {
      icon: 'logo-yen',
      access: ["财务管理"],
      title: '财务管理'
    },
    component: Main,
    children: [{
      path: 'recharge',
      name: 'recharge',
      meta: {
        icon: 'md-cloud-download',
        access: ["充值记录"],
        title: '充值记录'
      },
      component: () =>
        import ('@/view/finance/recharge/index.vue')
    }, {
      path: 'withdraw',
      name: 'withdraw',
      meta: {
        icon: 'md-cloud-upload',
        access: ["提币记录"],
        title: '提币记录'
      },
      component: () =>
        import ('@/view/finance/withdraw/index.vue')
    }, {
      path: 'capital',
      name: 'capital',
      meta: {
        icon: 'ios-closed-captioning',
        access: ["资金记录"],
        title: '资金记录'
      },
      component: () =>
        import ('@/view/finance/capital/index.vue')
      // },{
      //     path: 'commission',
      //     name: 'commission',
      //     meta: {
      //         icon: 'md-code-working',
      //         // access:["返佣记录"],
      //         title: '返佣记录'
      //     },
      //     component: () =>
      //         import ('@/view/finance/commission/index.vue')
      // },{
      //     path: 'bubble',
      //     name: 'bubble',
      //     meta: {
      //         icon: 'md-cloud-upload',
      //         // access:["领取泡泡"],
      //         title: '领取泡泡'
      //     },
      //     component: () =>
      //         import ('@/view/finance/bubble/index.vue')
    }]
  },
// {
//     path: '/machine',
//     name: 'machine',
//     meta: {
//         icon: 'md-easel',
//         // access:["矿机管理"],
//         title: '矿机管理'
//     },
//     component: Main,
//     children: [{
//         path: 'mining',
//         name: 'mining',
//         meta: {
//             icon: 'logo-euro',
//             // access:["矿机列表"],
//             title: '矿机列表'
//         },
//         component: () =>
//             import ('@/view/machine/mining/index.vue')
//     },{
//         path: 'subscription',
//         name: 'subscription',
//         meta: {
//             icon: 'ios-cart',
//             // access:["认购列表"],
//             title: '认购列表'
//         },
//         component: () =>
//             import ('@/view/machine/subscription/index.vue')
//     }]
// },
  {
    path: '/currencytrading',
    name: 'currencytrading',
    meta: {
      icon: 'md-easel',
      access: ["币币交易"],
      title: '币币交易'
    },
    component: Main,
    children: [{
      path: 'purchase',
      name: 'purchase',
      meta: {
        icon: 'logo-euro',
        access: ["委托买入"],
        title: '委托买入'
      },
      component: () =>
        import ('@/view/currencytrading/purchase/index.vue')
    }, {
      path: 'sellout',
      name: 'sellout',
      meta: {
        icon: 'ios-cart',
        access: ["委托卖出"],
        title: '委托卖出'
      },
      component: () =>
        import ('@/view/currencytrading/sellout/index.vue')
    }]
  },
  {
    path: '/content',
    name: 'content',
    meta: {
      icon: 'md-barcode',
      access: ["内容管理"],
      title: '内容管理'
    },
    component: Main,
    children: [
      {
        path: 'feedback',
        name: 'feedback',
        meta: {
          icon: 'ios-book',
          access: ["反馈列表"],
          title: '反馈列表'
        },
        component: () =>
          import ('@/view/content/feedback/index.vue')
      }, {
        path: 'notice',
        name: 'notice',
        meta: {
          icon: 'ios-book',
          access: ["公告管理"],
          title: '公告管理'
        },
        component: () =>
          import ('@/view/content/notice/index.vue')
      }, {
        path: 'addtonotice',
        name: 'addtonotice',
        meta: {
          icon: 'md-funnel',
          // access: ["公告添加或编辑"],
          title: '公告添加或编辑',
          hideInMenu: true,
        },
        component: () =>
          import ('@/view/content/notice/addto.vue')
      }, {
        path: 'guide',
        name: 'guide',
        meta: {
          icon: 'ios-book',
          access: ["交易指南"],
          title: '交易指南'
        },
        component: () =>
          import ('@/view/content/guide/index.vue')
      }, {
        path: 'addtoguide',
        name: 'addtoguide',
        meta: {
          icon: 'md-funnel',
          // access: ["交易指南添加或编辑"],
          title: '交易指南添加或编辑',
          hideInMenu: true,
        },
        component: () =>
          import ('@/view/content/guide/addto.vue')
      }, {
        path: 'information1',
        name: 'information1',
        meta: {
          icon: 'ios-book',
          access: ["资讯管理"],
          title: '资讯管理'
        },
        component: () =>
          import ('@/view/content/information/index.vue')
      }, {
        path: 'addtoinformation',
        name: 'addtoinformation',
        meta: {
          icon: 'md-funnel',
          // access: ["资讯添加或编辑"],
          title: '资讯添加或编辑',
          hideInMenu: true,
        },
        component: () =>
          import ('@/view/content/information/addto.vue')
      }, {
        path: 'agreement',
        name: 'agreement',
        meta: {
          icon: 'ios-bookmarks',
          access: ["用户协议"],
          title: '用户协议'
        },
        component: () =>
          import ('@/view/content/agreement/index.vue')
      }, {
        path: 'rotationchart',
        name: 'rotationchart',
        meta: {
          icon: 'ios-bookmarks',
          access: ["轮播图"],
          title: '轮播图'
        },
        component: () =>
          import ('@/view/content/rotationchart/index.vue')
      }, {
        path: 'edition',
        name: 'edition',
        meta: {
          icon: 'logo-buffer',
          access: ["版本更新"],
          title: '版本更新'
        },
        component: () =>
          import ('@/view/content/edition/index.vue')
      }]
  },
  {
    path: '/system',
    name: 'system',
    meta: {
      icon: 'md-construct',
      access: ["系统管理"],
      title: '系统管理'
    },
    component: Main,
    children: [{
      path: 'information',
      name: 'information',
      meta: {
        icon: 'logo-google',
        access: ["网站信息"],
        title: '网站信息'
      },
      component: () =>
        import ('@/view/system/information/index.vue')
    }, {
      path: 'operation',
      name: 'operation',
      meta: {
        icon: 'md-reorder',
        access: ["操作日志"],
        title: '操作日志'
      },
      component: () =>
        import ('@/view/system/operation/index.vue')
    }]
  },
  {
    path: '/ETC',
    name: 'ETC',
    meta: {
      icon: 'logo-bitcoin',
      access: ["ETH列表"],
      title: 'ETH列表'
    },
    component: Main,
    children: [{
      path: 'ETC',
      name: 'ETC',
      meta: {
        icon: 'ios-card',
        access: ["ETH列表"],
        title: 'ETH列表'
      },
      component: () =>
        import ('@/view/wallet/ETC/index.vue')
    }]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () =>
      import ('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () =>
      import ('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () =>
      import ('@/view/error-page/404.vue')
  }]
