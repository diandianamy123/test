<style>
</style>
<template>
  <div class="manages_log">
    <Form :model="formItem" :label-width="80">
      <Row>
        <!-- <Col span="3" style="width: 200px">
            <FormItem label="会员ID">
                <Input v-model="formItem.account" placeholder="会员ID" />
            </FormItem>
        </Col>
        <Col span="3"  style="width: 200px">
            <FormItem label="手机号码">
                <Input v-model="formItem.tel" placeholder="手机号码" />
            </FormItem>

        </Col> -->
        <Col span="3" style="width: 200px">
          <FormItem label="状态">
            <Select v-model="formItem.status">
              <Option value=" ">全部</Option>
              <Option v-for="item in disables" :value="item.code" :key="item.name">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
        <!-- <Col span="3"  style="width: 200px">
            <FormItem label="认证">
                <Select v-model="formItem.openStatus">
                    <Option value=" ">全部</Option>
                    <Option v-for="item in realType" :value="item.code" :key="item.name">{{ item.name }}</Option>
                </Select>
            </FormItem>
        </Col> -->

        <Col span="1" offset="1" style="width: 100px">
          <Button type="primary" @click="onSearch">搜索</Button>
        </Col>
        <Col span="2" style="width: 100px">
          <Button type="primary" @click="authentication">添加机器人</Button>
        </Col>
        <!-- <Col span="2" style="width: 100px">
            <Button type="primary" @click="add">添加会员</Button>
        </Col> -->
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

    <!--机器人资产信息弹框-->
    <Modal
      v-model="usershell.modal1"
      title="用户资产信息"
    >
      <Table :columns="usershell.assetslist" :data="usershell.assets"></Table>
    </Modal>

    <!--机器人信息弹框-->
    <Modal
      v-model="usershell.modal2"
      title="用户个人信息"
      class-name="dankedaun"
      ok-text="保存"
      @on-ok="authshuju">
      <Form :label-width="120" v-if="usershell.personal">
        <FormItem label="账号：">
          <Input type="text" v-model="usershell.personal.tel" placeholder=""></Input>
        </FormItem>
        <FormItem label="昵称：">
          <Input type="text" v-model="usershell.personal.nickname" placeholder=""></Input>
        </FormItem>
        <FormItem label="登录密码：">
          <Input type="text" v-model="usershell.personal.pswd" placeholder=""></Input>
        </FormItem>
        <FormItem label="交易密码：">
          <Input type="text" v-model="usershell.personal.tradePwd" placeholder=""></Input>
        </FormItem>
        <FormItem label="币种：">
          <Select v-model="usershell.personal.stockCode">
            <Option v-for="(item,index) in usershell.jiaoyibizhong" :value="item.code" :key="index">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="交易类型：">
          <RadioGroup v-model="usershell.personal.tradeType">
            <Radio :label="1">
              <span>买入</span>
            </Radio>
            <Radio :label="2">
              <span>卖出</span>
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="最大下单价：">
          <Input type="text" v-model="usershell.personal.maxBuyPrice" placeholder=""></Input>
        </FormItem>
        <FormItem label="最小下单价：">
          <Input type="text" v-model="usershell.personal.minBuyPrice" placeholder=""></Input>
        </FormItem>
        <FormItem label="最大下单数量：">
          <Input type="text" v-model="usershell.personal.maxBuyNum" placeholder=""></Input>
        </FormItem>
        <FormItem label="最小下单数量：">
          <Input type="text" v-model="usershell.personal.minBuyNum" placeholder=""></Input>
        </FormItem>
        <FormItem label="下单频率：">
          <Input type="text" v-model="usershell.personal.addBillRate" placeholder=""></Input>
        </FormItem>
        <FormItem label="启用状态：">
          <RadioGroup v-model="usershell.personal.disable">
            <Radio :label="0">
              <span>启用</span>
            </Radio>
            <Radio :label="1">
              <span>禁用</span>
            </Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </Modal>


    <!--机器人充值弹框-->
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

    <!--添加机器人-->
    <Modal
      v-model="usershell.modal4"
      title="添加机器人"
      class-name="dankedaun"
      ok-text="保存"
      @on-ok="addtorobot">
      <Form :label-width="120" v-if="usershell.personal">
        <FormItem label="账号：">
          <Input type="text" v-model="usershell.robot.account" placeholder=""></Input>
        </FormItem>
        <FormItem label="昵称：">
          <Input type="text" v-model="usershell.robot.nickname" placeholder=""></Input>
        </FormItem>
        <FormItem label="登录密码：">
          <Input type="text" v-model="usershell.robot.pswd" placeholder=""></Input>
        </FormItem>
        <FormItem label="交易密码：">
          <Input type="text" v-model="usershell.robot.tradePwd" placeholder=""></Input>
        </FormItem>
        <FormItem label="币种：">
          <Select v-model="usershell.robot.stockCode">
            <Option v-for="(item,index) in usershell.jiaoyibizhong" :value="item.code" :key="index">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="交易类型：">
          <RadioGroup v-model="usershell.robot.tradeType">
            <Radio label="1">
              <span>买入</span>
            </Radio>
            <Radio label="2">
              <span>卖出</span>
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="最大下单价：">
          <Input type="text" v-model="usershell.robot.maxBuyPrice" placeholder=""></Input>
        </FormItem>
        <FormItem label="最小下单价：">
          <Input type="text" v-model="usershell.robot.minBuyPrice" placeholder=""></Input>
        </FormItem>
        <FormItem label="最大下单数量：">
          <Input type="text" v-model="usershell.robot.maxBuyNum" placeholder=""></Input>
        </FormItem>
        <FormItem label="最小下单数量：">
          <Input type="text" v-model="usershell.robot.minBuyNum" placeholder=""></Input>
        </FormItem>
        <FormItem label="下单频率：">
          <Input type="text" v-model="usershell.robot.addBillRate" placeholder=""></Input>
        </FormItem>
        <FormItem label="启用状态：">
          <RadioGroup v-model="usershell.robot.disable">
            <Radio label="0">
              <span>启用</span>
            </Radio>
            <Radio label="1">
              <span>禁用</span>
            </Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </Modal>
  </div>


</template>
<script>
  import {robotryList, robotryInfo, addRobotry, editRobotry, editRobotryStatus, found, addFound, auth} from '@/api/user';
  import {getMoneyType} from '@/api/data';
  import {codeList} from '@/api/product'

  export default {
    inject:["reload"],
    data() {
      return {
        IdList: [],
        formItem: {
          account: '', // 账户
          tel: '',
          status: '', // 状态 禁用 为禁用
          openStatus: '', // 认证状态
          realType: [], //用户类型
        },
        chizhibizhong: [],//充值币种
        usershell: {
          modal1: false,
          modal2: false,
          modal3: false,
          modal4: false,
          assets: [],//资产
          assetslist: [
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
          robot: {
            pswd: "",//登录密码
            tradePwd: "",//交易密码
            stockCode: "",//币种
            account: "",//账号
            nickname: "",//昵称
            tradeType: "",//1买2卖
            maxBuyPrice: "",//最大下单价
            minBuyPrice: "",//最小下单价
            maxBuyNum: "",//最大下单数量
            minBuyNum: "",//最小下单数量
            addBillRate: "",//下单频率
            disable: "",//启用状态 0 启用1禁用
          },//添加机器人
          jiaoyibizhong: [],//交易币种
          senior: {
            inspectAuthStatus: "",
            inspectReason: ""
          },
          personal: {},//个人信息
          recharge: {
            id: "",
            stockCode: "AXGY",
            chargeType: "1",
            money: "",
            inspectReason: "",
          }//充值
        },
        disables: [ //状态
          {code: '0', name: '正常状态'},
          {code: '1', name: '冻结状态'}
        ], //所有用户状态
        realType: [
          {code: '1', name: '未认证'},
          {code: '2', name: '待审核'},
          {code: '3', name: '已认证'},
          {code: '4', name: '未通过 '},
        ], //用户类型
        tableData: [],
        tableColumns: [
          {
            title: '账号',
            key: 'account',
            minWidth: 130
          },
          {
            title: '币种',
            key: 'stockCode',
            minWidth: 100
          },
          {
            title: '下单区间',
            key: 'minBuyPrice',
            minWidth: 100,
            render: (h, params) => {
              const row = params.row;
              const createTime = row.minBuyPrice + "~" + row.maxBuyPrice;
              return h('div', {}, createTime)
            }
          },
          {
            title: '下单频率',
            key: 'addBillRate',
            minWidth: 100
          },
          {
            title: '用户状态',
            key: 'disable',
            minWidth: 100,
            render: (h, params) => {
              const row = params.row;
              const isDisable = row.disable;
              if (isDisable == 0) {
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
                        this.toggle(params.row.id, params.row.disable)
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
                        this.toggle(params.row.id, params.row.disable)
                      }
                    }
                  }, '已冻结')
                ]);
              }
            }
          },
          {
            title: '上线日期',
            key: 'createTime',
            minWidth: 100,
            render: (h, params) => {
              const row = params.row;
              const createTime = this.$public.timestampToTimeYMDhms(row.createTime);
              return h('div', {}, createTime)
            }
          },
          {
            title: '操作',
            key: 'action',
            minWidth: 200,
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
                      this.check(params.row.stockUserId)
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
                }, '详情')
              ]);
            }
          },
        ],
        pageData: {
          total: 0, //总共多少数据
          pages: 0, //总页数
          curPage: 1, //当前页
          pageSize: 15 //每页数据条数
        }
      };
    },
    methods: {
      //勾选框
      change(selection) {
        var _this = this;
        _this.IdList = [];
        for (var i = 0; i < selection.length; i++) {
          _this.IdList.push(selection[i].id)
        }
      },
      //搜索
      onSearch() {
        let _this = this;
        _this.pageData.curPage = 1;
        _this.mockTableData();
      },
      authentication() {//添加机器人弹框
        let _this = this;
        _this.usershell.modal4 = true;
        codeList({pageNumber: '1', pageSize: '100',}).then(function (response) {
          if (response.data.code == 200) {
            _this.usershell.jiaoyibizhong = response.data.result.list
          } else {
            _this.$Message.info(response.data.message);
          }
        })
      },
      addtorobot() {//添加机器人
        let _this = this;
        for (var variable in _this.usershell.robot) {
          if (_this.usershell.robot[variable] == "") {
            _this.$Message.warning("内容不能为空！");
            return false;
          }
          ;
        }
        ;
        addRobotry(_this.usershell.robot).then(function (response) {
          if (response.data.code == 200) {
            _this.$Message.success({
              content: '操作成功'
            });
            _this.mockTableData();
            for (var variable in _this.usershell.robot) {
              _this.usershell.robot[variable] = '';
            }
            ;
          } else {
            _this.$Message.info(response.data.message);
          }
        })
      },
      //后台充值
      check(index) {
        let _this = this;
        _this.usershell.modal3 = true;
        _this.usershell.recharge.id = index;
      },
      //查看用户资产
      fund(arrname) {
        let _this = this;
        _this.usershell.assets = [];
        found({id: arrname.stockUserId}).then(function (response) {
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
        for (var variable in _this.usershell.recharge) {
          if (_this.usershell.recharge[variable] == "") {
            _this.$Message.warning("内容不能为空！");
            return false;
          }
          ;
        }
        ;
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
      },
      //查看用户详情
      edit(index) {
        let _this = this;
        _this.usershell.personal = {};
        codeList({pageNumber: '1', pageSize: '100',}).then(function (response) {
          if (response.data.code == 200) {
            _this.usershell.jiaoyibizhong = response.data.result.list
          } else {
            _this.$Message.info(response.data.message);
          }
        });

        robotryInfo({id: index}).then(function (response) {
          if (response.data.code == 200) {
            _this.usershell.personal = response.data.result;
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
          editRobotry(_this.usershell.personal).then(function (response) {
            if (response.data.code == 200) {
              _this.usershell.personal = response.data.result
              _this.$Message.info(response.data.message);
              _this.reload();
             // window.location.reload();
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
        editRobotryStatus(data).then(function (response) {
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
        }
        robotryList(_data).then(function (response) {
          if (response.data.code == 200) {
            _this.tableData = response.data.result.list;
            _this.pageData.total = Number(response.data.result.total)
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
