<template>
  <div class="manage_log">
    <row type="flex" justify="center">
      <i-col span="24">
        <Form ref="formInline" inline :label-width="80">
          <FormItem>
            <Button type="primary" @click="handleSubmit()">添加大代理</Button>
          </FormItem>
        </Form>
      </i-col>
    </row>
    <!-- height属性：固定表头 -->
    <Table :columns="tableColumns" :data="tableData" stripe @on-select="fun1(selection,row)"></Table>
    <!-- <p style="font-size:18px;color:red;">总收入：{{incomeMoney}}&nbsp;&nbsp;&nbsp;总支出:{{totalMoney}} </p> -->
    <div style="margin: 10px;overflow: hidden">
      <!-- <div style="float: left;">
                <p>当前共{{pageData.total}}条数据，共{{pageData.pages}}页</p>
      </div>-->
      <div style="float: right;">
        <Page
          :total="pageData.total"
          :current="pageData.curPage"
          @on-change="changePage"
          :page-size="pageData.pageSize"
        ></Page>
      </div>
    </div>
    <Modal v-model="modal1" :loading="loading1" title="编辑用户" @on-ok="edit">
      <Form ref="editrole" :model="editrole" :rules="rules1" inline :label-width="80">
        <FormItem label="账号" prop="account">
          <Input type="text" v-model="editrole.account" placeholder="账号"></Input>
        </FormItem>
        <FormItem label="手机号" prop="tel">
          <Input type="number" v-model="editrole.tel" placeholder="手机号"></Input>
        </FormItem>
        <FormItem label="名称" prop="nickname">
          <Input type="text" v-model="editrole.nickname" placeholder="名称"></Input>
        </FormItem>
        <FormItem label="密码" prop="pswd">
          <Input type="password" v-model="editrole.pswd" placeholder="密码"></Input>
        </FormItem>
        <FormItem label="代理类型">
          <Input type="text" readonly v-model="editrole.daiweiType" placeholder="代理类型"></Input>
        </FormItem>
        <FormItem label="上级账号">
          <Input type="text" readonly v-model="editrole.parentAccount" placeholder="上级账号"></Input>
        </FormItem>
      </Form>
    </Modal>

    <Modal v-model="modal2" title="添加代理" :loading="loading" @on-ok="addto">
      <Form ref="addtorole" :model="addtorole" :rules="rules" inline :label-width="80">
        <FormItem label="用户昵称" prop="nickname">
          <Input type="text" v-model="addtorole.nickname" placeholder="用户昵称"/>
        </FormItem>
        <FormItem label="登录帐号" prop="account">
          <Input type="text" v-model="addtorole.account" placeholder="登录帐号"></Input>
        </FormItem>
        <FormItem label="密码" prop="pswd">
          <Input type="password" v-model="addtorole.pswd" placeholder="密码"></Input>
        </FormItem>
        <FormItem label="手机号" prop="tel">
          <Input type="text" v-model="addtorole.tel" placeholder="手机号"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
  import {
    agentList,
    agentStatus,
    showDLInfo,
    addDl,
    bjDl,
    agentLogin
  } from "@/api/agent";
  import config from '@/config'

  export default {
    data() {
      return {
        endDate: "",
        tableData: [], // 列表数据
        tableColumns: [
          // 列表列
          {
            title: "单位账户",
            key: "account",
            minWidth: 100,
            // render: (h, params) => {
            //   let url = "122.114.5.7/agency/index.html" + params.row.id;
            //   return h("span", {
            //     style: {
            //       cursor: "pointer"
            //     },
            //     on: {
            //       click: () => {
            //         this.jumpLink(params.row);
            //       }
            //     }
            //   }, params.row.account);
            // }
          },
          {
            title: "单位名称",
            key: "name",
            minWidth: 100
          },
          {
            title: "单位类型",
            minWidth: 170,
            key: "group"
          },
          {
            title: "总入金",
            minWidth: 170,
            key: "totalInMoney"
          },
          {
            title: "总出金",
            minWidth: 170,
            key: "totalOutMoney"
          },
          {
            title: "法币交易手续费",
            minWidth: 170,
            key: "c2cFee"
          },
          {
            title: "状态",
            minWidth: 170,
            key: "status",
            render: (h, params) => {
              const row = params.row;
              const isDisable = row.status;
              if (isDisable != 0) {
                return h("div", [
                  h(
                    "Button",
                    {
                      props: {
                        type: "success",
                        size: "small"
                      },
                      style: {
                        marginRight: "5px"
                      },
                      on: {
                        click: () => {
                          this.toggle(params.row.id, params.row.status);
                        }
                      }
                    },
                    "未冻结"
                  )
                ]);
              } else {
                return h("div", [
                  h(
                    "Button",
                    {
                      props: {
                        type: "error",
                        size: "small"
                      },
                      style: {
                        marginRight: "5px"
                      },
                      on: {
                        click: () => {
                          this.toggle(params.row.id, params.row.status);
                        }
                      }
                    },
                    "已冻结"
                  )
                ]);
              }
            }
          },
          //{
          // title: '上级账户',
          // minWidth:170,
          //key: 'pname'
          // },
          {
            title: "操作",
            minWidth: 200,
            key: "createTime",
            align: "center",
            fixed: "right",
            render: (h, params) => {
              let _this = this;
              let text = "";
              switch (params.row.id) {
                case "1":
                  text = ["---"];
                  break;
                default:
                  text = [
                    h(
                      "Button",
                      {
                        props: {
                          type: "primary",
                          size: "small"
                        },
                        style: {
                          marginRight: "5px"
                        },

                        on: {
                          click: () => {
                            showDLInfo({id: params.row.id})
                              .then(function (response) {
                                _this.modal1 = true;
                                if (response.data.code == 200) {
                                  _this.editrole = response.data.result;
                                } else {
                                  _this.$Message.error("获取数据失败");
                                }
                              })
                              .catch(function (error) {
                              });
                          }
                        }
                      },
                      "编辑"
                    ), h('Button', {
                      props: {
                        type: 'success',
                        size: 'small'
                      },
                      style: {
                        marginRight: '5px'
                      },
                      on: {
                        click: () => {
                          this.openAgent(params.row)
                        }
                      }
                    }, '进入代理后台'),
                  ];
                  break;
              }
              return h("div", text);
            }
          }
        ],
        addtorole: {
          pid: "0",
          nickname: "",
          pswd: "",
          account: "",
          rId: "5"
        },
        editrole: {
          account: "",
          daiweiType: "",
          id: "",
          nickname: "",
          parentAccount: "",
          pswd: "",
          tel: ""
        },
        rules: {
          nickname: [
            {required: true, message: "用户昵称不能为空", trigger: "change"}
          ],
          account: [
            {required: true, message: "登录账号不能为空", trigger: "change"},
            {
              pattern: /^[0-9]{4}$/,
              message: '账号只能为四位数字', trigger: 'blur'
            }
          ],
          pswd: [
            {required: true, message: "密码不能为空", trigger: "change"}
          ],
          tel: [
            {required: true, message: "手机号不能为空", trigger: "change"}
          ],
        },
        rules1: {
          nickname: [
            {required: true, message: "用户昵称不能为空", trigger: "change"}
          ],
          account: [
            {required: true, message: "登录账号不能为空", trigger: "change"},
            {
              pattern: /^[0-9]{4}$/,
              message: '账号只能为四位数字', trigger: 'blur'
            }
          ],
          pswd: [
            {required: true, message: "密码不能为空", trigger: "change"}
          ],
          tel: [
            {required: true, message: "手机号不能为空", trigger: "change"}
          ]
        },
        loading: true,
        loading1: true,
        Jurisdiction: [], //角色列表
        modal1: false,
        modal2: false,
        pageData: {
          total: 0, // 数据总条数
          pages: 0, // 总页码
          curPage: 1, // 当前页
          pageSize: 15 // 每页条数
        }
      };
    },
    methods: {
      fun1(selection, row) {
      },
      openAgent(idx) {
        //打开代理后台
        let url = process.env.NODE_ENV === 'development' ? config.baseUrl.daili : config.baseUrl.pro
        window.open(url + `/agency/index.html#/login?id=${idx.id}&account=${
          idx.account
          }&secretKey=${this.$md5(idx.account)}`);
      },
      jumpLink(row) {
        let _data = {
          id: row.id,
          account: row.account,
          secretKey: this.$md5(row.account)
        };
        agentLogin(_data).then(res => {
          if (res.data.code == "200") {

            window.open(url + "/agency/index.html", "target");
          } else {
            this.$Message.warning(res.data.message);
          }
        })
      },
      // 表格数据
      mockTableData() {
        const _this = this;
        let _data = {
          pageNumber: _this.pageData.curPage,
          pageSize: _this.pageData.pageSize
        };
        agentList(_data)
          .then(function (response) {
            if (response.data.code == 200) {
              _this.tableData = response.data.result.list;
              _this.pageData.total = Number(response.data.result.total);
            } else {
              _this.$Message.error("获取数据失败");
            }
          })
          .catch(function (error) {
          });
      },
      edit() {
        let _this = this;
        _this.loading1 = false;
        _this.$nextTick(() => {
          _this.loading1 = true;
        })
        _this.editrole.pswd = _this.$md5(_this.editrole.pswd);
        this.$refs.editrole.validate(valid => {
          console.log(_this.editrole.pswd)
          if (valid) {
            bjDl(_this.editrole).then(function (response) {
              _this.modal1 = false;
              if (response.data.code == 200) {
                _this.$Message.success({content: response.data.message});
                for (var variable in _this.editrole) {
                  _this.editrole[variable] = "";
                }
              } else {
                _this.$Message.error(response.data.message);
              }
            })
          }
        })

      },
      toggle(index, disable) {
        var _this = this;
        if (disable == 1) {
          disable = 0;
        } else {
          disable = 1;
        }
        let data = {
          id: index, //
          status: disable //用户状态
        };
        agentStatus(data).then(function (response) {
          if (response.data.code == 200) {
            _this.$Message.info(response.data.message);
            _this.mockTableData();
          } else {
            _this.$Message.info(response.data.message);
          }
        });
      },
      handleSubmit() {
        let _this = this;
        _this.modal2 = true;
      },

      addto() {
        let _this = this;
        _this.loading = false;
        _this.$nextTick(() => {
          _this.loading = true;
        })
        _this.addtorole.pswd = _this.$md5(_this.addtorole.pswd);
        this.$refs.addtorole.validate(valid => {
          if (valid) {
            addDl(_this.addtorole).then(function (response) {
              _this.mockTableData();
              _this.modal2 = false;
              if (response.data.code == 200) {
                _this.$Message.success({content: response.data.message});
              } else {
                _this.$Message.warning({
                  content: response.data.message
                });
              }
            })
          }
        })
      },
      deleteshuju(current) {
        //删除
        let _this = this;
        permissiondelete({id: current})
          .then(function (response) {
            _this.mockTableData();
            if (response.data.code == 200) {
              _this.$Message.success({content: response.data.message});
            } else {
              _this.$Message.warning({
                content: response.data.message
              });
            }
          })
          .catch(function (error) {
          });
      },
      // 切换页码
      changePage(current) {
        this.pageData.curPage = current;
        this.tableData = this.mockTableData();
      }
    },
    created: function () {
      this.mockTableData();
    }
  };
</script>

<style>
</style>

