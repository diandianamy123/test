<style>
  .manages_log .ivu-col-offset-6 {
    margin-left: 0px;
  }

  .manages_log .ivu-row {
    margin-top: 20px;
  }

  .dankedaun .ivu-form-item {
    margin-bottom: 0px;
  }
</style>
<template>
  <div class="manages_log">
    <Form :model="formItem" :label-width="80">
      <Row>
        <!--<Col span="3" style="width: 200px">-->
        <!--<FormItem label="会员ID">-->
        <!--<Input v-model="formItem.account" placeholder="会员ID" />-->
        <!--</FormItem>-->
        <!--</Col>-->
        <Col span="3" style="width: 200px">
          <FormItem label="手机或邮箱">
            <Input v-model="formItem.tel" placeholder="手机或邮箱"/>
          </FormItem>

        </Col>
        <Col span="3" style="width: 200px">
          <FormItem label="状态">
            <Select v-model="formItem.status">
              <Option value=" ">全部</Option>
              <Option v-for="item in disables" :value="item.code" :key="item.name">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="3" style="width: 200px">
          <FormItem label="认证">
            <Select v-model="formItem.openStatus">
              <Option value=" ">全部</Option>
              <Option v-for="item in realType" :value="item.code" :key="item.name">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>

        <Col span="1" offset="1" style="width: 100px">
          <Button type="primary" @click="onSearch">搜索</Button>
        </Col>
        <Col span="2" style="width: 100px">
          <Button type="primary" @click="authentication">批量认证</Button>
        </Col>
        <!-- <Col span="2" style="width: 100px">
          <Button type="primary" @click="check(1,true)">批量充值</Button>
        </Col> -->
        <Col span="2" style="width: 100px">
          <Button type="primary" @click="onExport">导出</Button>
        </Col>
      </Row>
    </Form>
    <!-- height属性：固定表头 -->
    <Table :columns="tableColumns" :data="tableData" size="small" ref="table" @on-selection-change="change" stripe></Table>
    <!-- <Table :columns="columns8" :data="data7" size="small" ref="table"></Table> -->
    <!--  <p class="totle"> <span>总人数:{{num}}</span>
     <span>总可用余额(折合USDT)：{{useMoney}}</span>
     <span>总冻结金额(折合USDT):{{frozenMoney}}</span><span>总入金(折合USDT):{{inMoney}}</span>总出金(折合USDT):{{outMoney}} </p> -->
    <div style="margin: 10px;overflow: hidden">
      <!-- <div style="float: left;">
          <p>当前共{{pageData.total}}条数据，共{{pageData.pages}}页</p>
      </div> -->
      <div style="float: right;">
        <Page :total="pageData.total" :current="pageData.curPage" @on-change="changePage" :page-size="pageData.pageSize"></Page>
      </div>
    </div>

    <!--资产信息弹框-->
    <Modal
      v-model="usershell.modal1"
      title="用户资产信息"
    >
      <Table :columns="usershell.assetslist" :data="usershell.assets"></Table>
    </Modal>

    <!--用户信息弹框-->
    <Modal
      v-model="usershell.modal2"
      title="用户个人信息"
      class-name="dankedaun"
      ok-text="保存"
      @on-ok="authshuju">
      <Form :label-width="120" v-if="usershell.personal">
        <FormItem label="上级账号：">
          <p>{{usershell.personal.upAccount}}</p>
        </FormItem>
        <FormItem label="手机号码：">
          <p>{{usershell.personal.tel}}</p>
        </FormItem>
        <FormItem label="推广编号：">
          <p>{{usershell.personal.invitationCode}}</p>
        </FormItem>
        <FormItem label="昵称：">
          <p>{{usershell.personal.nickname}}</p>
        </FormItem>
        <FormItem label="真实姓名：">
          <p>{{usershell.personal.username}}</p>
        </FormItem>
        <FormItem label="证件号：">
          <p>{{usershell.personal.idCardNo}}</p>
        </FormItem>
        <FormItem label="证件正面：">
          <Poptip trigger="hover" title="Title" content="content" placement="right">
            <Button>查看图片</Button>
            <div slot="title">证件正面</div>
            <div slot="content">
              <img style="width:300px;" :src="$config.baseUrl.pro + usershell.personal.idCardFrontImg">
            </div>
          </Poptip>
        </FormItem>
        <FormItem label="证件反面：">
          <Poptip trigger="hover" title="Title" content="content" placement="right">
            <Button>查看图片</Button>
            <div slot="title">证件反面</div>
            <div slot="content">
              <img style="width:300px;" :src="$config.baseUrl.pro + usershell.personal.idCardBackImg">
            </div>
          </Poptip>
        </FormItem>
        <!-- <FormItem label="手持证件照：">
          <Poptip trigger="hover" title="Title" content="content" placement="right">
            <Button>查看图片</Button>
            <div slot="title">手持证件照</div>
            <div slot="content">
              <img style="width:300px;" :src="$config.baseUrl.pro + usershell.personal.selfieImg">
            </div>
          </Poptip>
        </FormItem> -->
        <FormItem label="注册时间：">
          <p>{{usershell.personal.createTime}}</p>
        </FormItem>
        <FormItem label="高级认证状态：">
          <div v-if="usershell.personal.inspectAuthStatus==1">
            <p>未申请</p>
          </div>
          <div v-else>
            <RadioGroup v-model="usershell.senior.inspectAuthStatus" type="button" size="small">
              <Radio :label="3">
                <span>同意</span>
              </Radio>
              <Radio :label="4">
                <span>拒绝</span>
              </Radio>
            </RadioGroup>
          </div>
        </FormItem>
        <div v-if="usershell.personal.inspectAuthStatus!=1">
          <FormItem label="认证失败原因：">
            <Input v-model="usershell.senior.inspectReason" placeholder="认证失败原因"></Input>
          </FormItem>
        </div>
      </Form>
    </Modal>

    <Modal
      v-model="usershell.modal3"
      title="用户资产充值"
      @on-ok="determinationofrecharge">
      <Form :label-width="120">
        <FormItem label="币种：">
          <Select v-model="usershell.recharge.stockCode">
            <Option v-for="(item,index) in chizhibizhong" :value="item" :key="index">{{item}}</Option>
          </Select>
        </FormItem>
        <FormItem label="类型：">
          <Select v-model="usershell.recharge.chargeType">
            <Option value="1">充值</Option>
            <Option value="2">扣款</Option>
          </Select>
        </FormItem>
        <FormItem label="数量：">
          <Input v-model="usershell.recharge.money" type="number" placeholder=""></Input>
        </FormItem>
        <FormItem label="备注：">
          <Input v-model="usershell.recharge.inspectReason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>

</template>
<script>
  import {getAllbyPage, userInfo, found, auth, addFound, addAllFound, editStatus} from '@/api/user';
  import {getMoneyType} from '@/api/data';
  import excel from '@/libs/excel';

  export default {
    data() {
      return {
        isMultiple: false, //是否是批量充值 默认为否
        IdList: [],
        formItem:
          {
            account: '', // 账户
            tel:
              '',
            status:
              '', // 状态 禁用 为禁用
            openStatus:
              '', // 认证状态
            realType:
              [], //用户类型
          }
        ,
        chizhibizhong: [],//充值币种
        usershell:
          {
            modal1: false,
            modal2:
              false,
            modal3:
              false,
            assets:
              [],//资产
            assetslist:
              [
                {
                  title: '币种名称',
                  key: 'stockName',
                  align: "center",
                  width: 180,
                },
                {
                  title: '可用数量',
                  key: 'usableFund',
                  align: "center",
                  width: 140,
                },
                {
                  title: '冻结数量',
                  key: 'frostFund',
                  align: "center",
                  width: 140,
                }
              ],//资产列表
            senior:
              {
                inspectAuthStatus: "",
                inspectReason:
                  ""
              }
            ,
            personal: {}
            ,//个人信息
            recharge: {
              id: "",
              ids: '',
              stockCode:
                "AXGY",
              chargeType:
                "1",
              money:
                "",
              inspectReason:
                "",
            } //充值
          }
        ,
        num: '', //总人数
        useMoney:
          '',//总可用余额(
        frozenMoney:
          '', //总冻结金额
        inMoney:
          '', //总入金
        outMoney:
          '', //总出金
        openStatus:
          [], //所有开户状态
        disables:
          [ //状态
            {code: '0', name: '正常状态'},
            {code: '1', name: '冻结状态'}
          ], //所有用户状态
        realType:
          [
            {code: '1', name: '未认证'},
            {code: '2', name: '待审核'},
            {code: '3', name: '已认证'},
            {code: '4', name: '未通过 '},
          ], //用户类型
        tableData:
          [],
        tableColumns:
          [
            {
              type: 'selection',
              width: 60,
              fixed: 'left',
              align: 'center',
            },
            {
              title: '邀请码',
              key: 'invitationCode',
              minWidth: 120
            },
            {
              title: '手机号码',
              key: 'tel',
              minWidth: 130,
            },
            {
              title: '邮箱',
              key: 'email',
              minWidth: 150
            },
            {
              title: '代理账号',
              key: 'dlAccount',
              minWidth: 130
            },
            {
              title: '推荐人姓名',
              key: 'upUsername',
              minWidth: 130
            },
            {
              title: '推荐人账号',
              key: 'tjTel',
              minWidth: 130,
              render: (h, params) => {
                if (params.row.tjTel) {
                  return h("span", params.row.tjTel)
                } else if (params.row.tjEmail) {
                  return h("span", params.row.tjEmail)
                }
              }
            },
            {
              title: '真实姓名',
              key: 'username',
              minWidth: 100
            },
            // {
            //     title: '上级编号',
            //     key: 'upUid',
            //     minWidth: 100
            // },
            {
              title: '用户状态',
              key: 'isDisable',
              minWidth: 100,
              render: (h, params) => {
                const row = params.row;
                const isDisable = row.isDisable;
                if (!row.isDisable) {
                  return h('div', [
                    h('Button', {
                      props: {
                        type: 'success',
                        size: 'small'
                      },
                      style: {
                        marginRight: '5px'
                      },
                      on: {
                        click: () => {
                          this.toggle(params.row.id, params.row.isDisable)
                        }
                      }
                    }, '未冻结')
                  ]);
                } else {
                  return h('div', [
                    h('Button', {
                      props: {
                        type: 'error',
                        size: 'small'
                      },
                      style: {
                        marginRight: '5px'
                      },
                      on: {
                        click: () => {
                          this.toggle(params.row.id, params.row.isDisable)
                        }
                      }
                    }, '已冻结')
                  ]);
                }
              }
            },
            // {
            //     title: '交易控制',
            //     key: 'isDeleted',
            //     minWidth: 100,
            //     render: (h, params) => {
            //         const row = params.row;
            //         const isDeleted = row.isDeleted;
            //         var text;
            //         switch(isDeleted){
            //             case 0:
            //                 return h('div', [
            //                     h('Button', {
            //                     props: {
            //                         type: 'success',
            //                         size: 'small'
            //                     },
            //                     style: {
            //                         marginRight: '5px'
            //                     },
            //                     on: {
            //                         click: () => {
            //                             this.toggle1(params.row.id, params.row.isDeleted)
            //                         }
            //                     }
            //                 }, '可交易')
            //             ]);
            //         break;
            //         case 1:
            //             return h('div', [
            //                 h('Button', {
            //                     props: {
            //                         type: 'error',
            //                         size: 'small'
            //                     },
            //                     style: {
            //                         marginRight: '5px'
            //                     },
            //                     on: {
            //                         click: () => {
            //                             this.toggle1(params.row.id, params.row.isDeleted)
            //                         }
            //                     }
            //                 }, '禁用')
            //             ]);
            //         break;}
            //     }
            // },
            {
              title: '总入金',
              key: 'totalInMoney',
              minWidth: 120
            },
            {
              title: '总出金',
              key: 'totalOutMoney',
              minWidth: 120
            },
            {
              title: '初级认证',
              key: 'baseAuth',
              minWidth: 100,
              render: (h, params) => {
                const row = params.row;
                const baseAuth = row.username;
                let text = !baseAuth ? '未认证' : '已认证';
                return h('div', {}, text);
              }
            },
            {
              title: '高级认证',
              key: 'inspectAuthStatus',
              minWidth: 100,
              render: (h, params) => {
                const row = params.row;
                const inspectAuthStatus = row.inspectAuthStatus;
                var text;
                switch (inspectAuthStatus) {
                  case 1:
                    text = '未认证';
                    break;
                  case 2:
                    text = '待审核';
                    break;
                  case 3:
                    text = '已认证';
                    break;
                  case 4:
                    text = '审核未通过';
                    break;
                }
                return h('div', {}, text);
              }
            },
            {
              title: '注册日期',
              key: 'createTime',
              minWidth: 150,
              render: (h, params) => {
                const row = params.row;
                const createTime = this.$public.timestampToTimeYMDhms(row.createTime);
                return h('div', {}, createTime)
              }
            },
            {
              title: '操作',
              key: 'action',
              minWidth: 230,
              align: 'center',
              fixed: 'right',
              render: (h, params) => {
                const row = params.row;
                const status = row.disable;
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'warning',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.fund(params.row)
                      }
                    }
                  }, ' 资产'),
                  h('Button', {
                    props: {
                      type: 'success',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.check(params.row.id, false)
                      }
                    }
                  }, '充值'),
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.edit(params.row.id)
                      }
                    }
                  }, '详情'),
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.child(params.row.id)
                      }
                    }
                  }, '下级')
                ]);
              }
            },
          ],
        pageData:
          {
            total: 0, //总共多少数据
            pages:
              0, //总页数
            curPage:
              1, //当前页
            pageSize:
              15 //每页数据条数
          }
      }
        ;
    },
    methods: {
      child(id) {
        this.$router.push({
          path: "/u-child/user-child",
          query: {id: id}
        })
      },
      //勾选框
      change(selection) {
        var _this = this;
        _this.IdList = [];
        for (var i = 0; i < selection.length; i++) {
          _this.IdList.push(selection[i].id)
        }
      },
      //批量认证
      authentication() {
        var _this = this;
        var _data = _this.IdList.toString();
        if (_this.IdList.length != 0) {
          auth({ids: _data}).then(function (response) {
            if (response.data.code == 200) {
              _this.$Message.info(response.data.message);
              _this.mockTableData();
            } else {
              _this.$Message.info(response.data.message);
            }
          })
        }
      },
      //搜索
      onSearch() {
        let _this = this;
        _this.pageData.curPage = 1;
        _this.mockTableData();
      },
      //后台充值
      check(index, isMul) {
        let _this = this;
        _this.usershell.modal3 = true;
        this.isMultiple = isMul
        if (isMul) {
          _this.usershell.recharge.ids = _this.IdList.toString();
        } else {
          _this.usershell.recharge.id = index;
        }
      },
      //查看用户资产
      fund(arrname) {
        let _this = this;
        _this.usershell.assets = [];
        found({id: arrname.id}).then(function (response) {
          _this.usershell.modal1 = true;
          if (response.data.code == 200) {
            _this.usershell.assets = response.data.result
          } else {
            _this.$Message.info(response.data.message);
          }
        })
      },
      determinationofrecharge() { //充值接口
        let _this = this;
        for (let i in _this.usershell.recharge) {
          if (i == "id" || i == "ids") {
          } else {
            if (_this.usershell.recharge[i] == "") {
              _this.$Message.warning("内容不能为空！");
              return false;
            }
          }
        }
        if (this.isMultiple) {
          delete this.usershell.recharge.id
          addAllFound(_this.usershell.recharge).then(function (response) {
            _this.mockTableData();
            if (response.data.code == 200) {
              _this.$Message.success({
                content: '操作成功'
              });
              _this.usershell.recharge = {
                id: "",
                stockCode: "AXGY",
                chargeType: "1",
                money: "",
                inspectReason: "",
              };
            } else {
              _this.$Message.info(response.data.message);
            }
          });
        } else {
          delete this.usershell.recharge.ids
          addFound(_this.usershell.recharge).then(function (response) {
            _this.mockTableData();
            if (response.data.code == 200) {
              _this.$Message.success({
                content: '操作成功'
              });
              _this.usershell.recharge = {
                id: "",
                stockCode: "AXGY",
                chargeType: "1",
                money: "",
                inspectReason: "",
              };
            } else {
              _this.$Message.info(response.data.message);
            }
          });
        }

      },
      //查看用户详情
      edit(index) {
        let _this = this;
        _this.usershell.personal = {};
        userInfo({id: index}).then(function (response) {
          if (response.data.code == 200) {
            _this.usershell.personal = response.data.result;
            _this.usershell.senior.inspectAuthStatus = _this.usershell.personal.inspectAuthStatus;
            _this.usershell.senior.inspectReason = _this.usershell.personal.inspectReason;
          } else {
            _this.$Message.info(response.data.message);
          }
          ;
          _this.usershell.modal2 = true;
        })
      },
      authshuju() {//高级认证
        var _this = this;
        _this.usershell.senior.ids = _this.usershell.personal.id;
        if (_this.usershell.personal.inspectAuthStatus != 1) {
          auth(_this.usershell.senior).then(function (response) {
            if (response.data.code == 200) {
              _this.usershell.personal = response.data.result
            } else {
              _this.$Message.info(response.data.message);
            }
          })
        }
        ;
      },
      //切换用户状态
      toggle(index, disable) {
        var _this = this;
        if (disable == 1) {
          disable = 0;
        } else {
          disable = 1;
        }
        let data = {
          id: index, //
          status: disable, //用户状态
          type: 1
        };
        editStatus(data).then(function (response) {
          if (response.data.code == 200) {
            _this.$Message.info(response.data.message);
            _this.mockTableData();
          } else {
            _this.$Message.info(response.data.message);
          }
        })
      },
      //切换交易控制
      toggle1(index, deleted) {
        var _this = this;
        // if(deleted == 1) {
        //  deleted = 0;
        // } else {
        //  deleted = 1;
        // }
        let data = {
          id: index, //
          status: deleted, //用户状态
          type: 2,
        }
        _this.$http.get(_this.$http.updateDisableUser, {params: data}).then(function (response) {
          if (response.data.code == 200) {
            _this.$Message.info(response.data.message);
            _this.mockTableData();
          } else {
            _this.$Message.info(response.data.message);
          }
        })
      },
      onExport() {// 导出EXCEL
        let _this = this;
        let _data = {
          username: _this.formItem.account,
          tel: _this.formItem.tel,
          type: _this.formItem.status,
          highStatus: _this.formItem.openStatus
        };
        for (var key in _data) {
          if (_data[key] == '') {
            delete _data[key]
          }
        }
        getAllbyPage(_data).then(function (response) {
          if (response.data.code == 200) {
            for (var j = 0, length2 = response.data.result.data.list.length; j < length2; j++) {
              switch (response.data.result.data.list[j].isDisable) {
                case 0:
                  response.data.result.data.list[j].isDisable = '未冻结';
                  break;
                case 1:
                  response.data.result.data.list[j].isDisable = '冻结';
                  break;
                default:
                  response.data.result.data.list[j].isDisable = '--';
                  break;
              }
              ;

              switch (response.data.result.data.list[j].baseAuth) {
                case 0:
                  response.data.result.data.list[j].baseAuth = '未认证';
                  break;
                case 1:
                  response.data.result.data.list[j].baseAuth = '已认证';
                  break;
                default:
                  response.data.result.data.list[j].baseAuth = '--';
                  break;
              }
              ;

              switch (response.data.result.data.list[j].inspectAuthStatus) {
                case 1:
                  response.data.result.data.list[j].inspectAuthStatus = '未认证';
                  break;
                case 2:
                  response.data.result.data.list[j].inspectAuthStatus = '待审核';
                  break;
                case 3:
                  response.data.result.data.list[j].inspectAuthStatus = '已认证';
                  break;
                case 4:
                  response.data.result.data.list[j].inspectAuthStatus = '已认证';
                  break;
                default:
                  response.data.result.data.list[j].inspectAuthStatus = '--';
                  break;
              };

              if (response.data.result.data.list[j].tjTel) {
                response.data.result.data.list[j].tjTel = response.data.result.data.list[j].tjTel;
              } else if (response.data.result.data.list[j].tjEmail) {
                response.data.result.data.list[j].tjTel = response.data.result.data.list[j].tjEmail;
              }

              response.data.result.data.list[j].createTime = _this.$public.timestampToTimeYMDhms(response.data.result.data.list[j].createTime);
            }
            const params = {
              title: ['邀请码', '手机号码', '邮箱', '代理账号', '推荐人姓名', '推荐人账号', '真实姓名', '用户状态', '总入金', '总出金', '初级认证', '高级认证', '注册日期'],
              key: ['invitationCode', 'tel', 'email', 'dlAccount', 'upUsername', 'tjTel', 'username', 'isDisable', 'totalInMoney', 'totalOutMoney', 'baseAuth', 'inspectAuthStatus', 'createTime'],
              data: response.data.result.data.list,
              autoWidth: true,
              filename: '会员列表'
            }
            excel.export_array_to_excel(params)
          } else {
            _this.$Message.info(response.data.message);
          }
        })
      },
      // 表格数据
      mockTableData() {
        let _this = this;
        let _data = {
          pageNumber: _this.pageData.curPage,
          pageSize: _this.pageData.pageSize,
          username: _this.formItem.account,
          tel: _this.formItem.tel,
          type: _this.formItem.status,
          highStatus: _this.formItem.openStatus,
        };
        for (var key in _data) {
          if (_data[key] == '') {
            delete _data[key]
          }
          ;
        }
        ;
        getAllbyPage(_data).then(function (response) {
          if (response.data.code == 200) {
            _this.tableData = response.data.result.data.list;
            // _this.num =   response.data.result.count.num; //总人数
            _this.useMoney = response.data.result.count.useMoney;//总可用余额(
            _this.frozenMoney = response.data.result.count.frozenMoney; //总冻结金额
            _this.inMoney = response.data.result.count.inMoney; //总入金
            _this.outMoney = response.data.result.count.outMoney; //总出金
            _this.pageData.total = Number(response.data.result.data.total);
            // _this.pageData.pages = response.data.data.list.pages;
          } else {
            _this.$Message.info(response.data.message);
          }
        })
      },
      // 切换页码
      changePage(current) {
        this.pageData.curPage = current;
        this.tableData = this.mockTableData();
      },
      getrealType() {
        let _this = this;
        getMoneyType().then(function (response) {
          if (response.data.code == 200) {
            _this.chizhibizhong = response.data.result;
          } else {
            _this.$Message.info(response.data.message);
          }
        })
      },
    },
    created: function () {
      this.mockTableData();
      this.getrealType();
    }
  };
</script>
