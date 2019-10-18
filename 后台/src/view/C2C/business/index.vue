<template>
  <div class="manage_log">
    <Form :model="formItem" :label-width="90">
      <!-- <Row >
          <Col span="4" style="width: 280px;">
              <FormItem label="日期">
                  <DatePicker type="daterange" split-panels format="yyyy-MM-dd" placeholder="选择日期" v-model="formItem.timeArea" @on-change="formItem.timeArea=$event"></DatePicker>
              </FormItem>
          </Col>
          <Col span="4" style="width: 280px;">
              <FormItem label="UID">
                  <Input v-model="formItem.entrustNo" placeholder="UID" />
              </FormItem>
          </Col>
          <Col span="4" style="width: 280px;">
              <FormItem label="审核结果">
                  <Select v-model="formItem.status">
                      <Option value="">全部</Option>
                      <Option v-for="item in status" :value="item.code" :key="item.code">{{ item.name }}</Option>
                  </Select>
              </FormItem>
          </Col>
          <Col span="3" offset="1" style="width: 280px;">
              <Button type="primary" @click="onSearch">搜索</Button>
          </Col>
          <Col span="2" >
              <Button type="primary" @click="daochu()">导出</Button>
          </Col>
      </Row> -->
    </Form>
    <!-- height属性：固定表头 -->
    <Table :columns="tableColumns" :data="tableData" stripe></Table>

    <p class="totle"><span>总计单数: {{orderCount}}</span>
      <!-- <span>总计金额：{{totalPrice}}</span><span>总计求购数量: {{totalNum}} </span> -->
      <!-- <span> 总计成交数量: {{dealsTotalNum}} </span>  -->
    </p>
    <div style="margin: 10px;overflow: hidden">
      <!-- <div style="float: left;">
          <p>当前共{{pageData.total}}条数据，共{{pageData.pages}}页</p>
      </div> -->
      <div style="float: right;">
        <Page :total="pageData.total" :current="pageData.curPage" @on-change="changePage" :page-size="pageData.pageSize"></Page>
      </div>
    </div>

    <Modal
      v-model="modal6"
      title="商家审核"
      ref="test">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>您是否同意此人的商家审核？</span>
      </p>
      <p>是否同意{{shenheshuju.nickname}}用户的商家审核？</p>
      <div slot="footer">
        <Button @click="getstatuscancel">拒绝</Button>
        <Button type="primary" @click="getstatus()">同意</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import {shopVerify, checkShopList, shopCancel} from '@/api/user'

  export default {
    data() {
      return {
        isCancel: false,
        formItem: {
          timeArea: ['', ''], // 选择日期
          status: '',
          entrustNo: '',
          sellAccount: '',
          sellTel: '',
          buyAccount: '',
          buyTel: '',
        },
        startDate: '',
        endDate: '',
        modal6: false,
        shenheshuju: "",
        // totalMoney: '',
        // totaldealsNum: '',
        // totalFee: '',
        orderCount: '',//总计单数
        totalPrice: '',//总计金额
        totalNum: '',//总计出售数量
        dealsTotalNum: '', //总计成交数量
        status: [
          {code: '1', name: '待付款'},
          {code: '2', name: '已付款'},
          {code: '3', name: '已确认'},
          {code: '4', name: '申述中'},
          {code: '5', name: '取消'}
        ],
        tableData: [], // 表格数据
        tableColumns: [ // 表格列
          {
            title: '编号',
            key: 'id',
            minWidth: 120,
          },
          {
            title: 'UID',
            key: 'userUid',
            minWidth: 150,
          },
          {
            title: '手机',
            key: 'tel',
            minWidth: 150,
          },
          {
            title: '姓名',
            key: 'username',
            minWidth: 150,
          },
          {
            title: '申请时间',
            key: 'staffInspectTime',
            minWidth: 150,
            render: (h, params) => {
              const row = params.row;
              const createTime = this.$public.timestampToTimeYMDhms(row.createTime);
              return h('div', {}, createTime)
            }
          },
          {
            title: '商家申请状态',
            key: 'inspectAuthStatus',
            minWidth: 150,
            render: (h, params) => {
              var text;
              switch (params.row.shopInspectStatus) {
                case 1:
                  text = '未申请';
                  break;
                case 2:
                  this.isCancel = false
                  text = '已申请(待审核）';
                  break;
                case 3:
                  text = '同意';
                  break;
                case 4:
                  text = '拒绝';
                  break;
                case 5:
                  text = '已解绑';
                  break;
                case 6:
                  this.isCancel = true
                  text = '解绑申请';
                  break;
              }
              return h('div', {}, text);
            }
          },
          {
            title: '审核时间',
            key: 'shopInspectTime',
            minWidth: 150,
            render: (h, params) => {
              const row = params.row;
              const createTime = this.$public.timestampToTimeYMDhms(row.createTime);
              return h('div', {}, createTime)
            }
          },
          {
            title: '操作',
            minWidth: 100,
            render: (h, params) => {
              let status = params.row.shopInspectStatus
              if (status == '2' || status == '6') {
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
                        this.modal6 = true;
                        this.shenheshuju = params.row;
                      }
                    }
                  }, ' 操作'),
                ]);
              } else {
                return h('div', {}, '--')
              }
            }
          },
        ],
        pageData: {
          total: 0, // 数据总条数
          pages: 0, // 总页码
          curPage: 1, // 当前页
          pageSize: 15 // 每页条数
        }
      };
    },
    methods: {
      // 搜索
      onSearch() {
        const _this = this;
        _this.tableData = [];
        // if(!_this.formItem.timeArea[0]){
        //     _this.$Message.error('时间不能为空！');
        //     return;
        // }
        _this.pageData.curPage = 1;
        _this.mockTableData();
      },
      //导出
      // daochu() {
      //  var _this = this;
      //  var url = _this.$http.defaults.baseURL + _this.$http.fb_getRecordList + '?entrustNo=' + _this.formItem.entrustNo + '&buyTel=' + _this.formItem.buyTel + '&buyAccount=' + _this.formItem.buyAccount +'&sellTel=' + _this.formItem.sellTel +'&sellAccount=' + _this.formItem.sellAccount + '&status=' + _this.formItem.status + '&startDate=' + _this.startDate + '&endDate=' + _this.endDate;
      //  window.location.href = url;
      // },
      // 表格数据
      mockTableData() {
        const _this = this;
        if (_this.formItem.timeArea[0] && _this.formItem.timeArea[1]) {
          _this.startDate = _this.formItem.timeArea[0] + " 00-00-00";
          _this.endDate = _this.formItem.timeArea[1] + " 23-59-59";
        }
        let _data = {
          pageNumber: _this.pageData.curPage,
          pageSize: _this.pageData.pageSize,
          startDate: _this.startDate,
          endDate: _this.endDate,
          orderNo: _this.formItem.entrustNo,
          sellAccount: _this.formItem.sellAccount,
          sellPhone: _this.formItem.sellTel,
          buyAccount: _this.formItem.buyAccount,
          buyPhone: _this.formItem.buyTel,
          status: _this.formItem.status,
        };
        for (var key in _data) {
          if (_data[key] == '') {
            delete _data[key]
          }
        }
        checkShopList(_data).then(function (response) {
          if (response.data.code == 200) {
            _this.tableData = response.data.result.list;
            _this.pageData.total = Number(response.data.result.total);
            _this.orderCount = response.data.result.total;
          } else {
            _this.$Message.error('获取数据失败');
          }
        }).catch(function (error) {
        });
      },
      getstatus() {
        let _this = this;
        let _data = {
          id: _this.shenheshuju.id,
          statusShop: _this.isCancel ? "5" : "3",
        };
        _this.modal6 = false;
        if (_this.isCancel) {
          shopCancel(_data).then(function (response) {
            if (response.data.code == 200) {
              _this.$Message.success({
                content: '修改成功'
              });
              _this.mockTableData();
            } else {
              _this.$Message.error('获取数据失败');
            }
          })
        } else {
          shopVerify(_data).then(function (response) {
            if (response.data.code == 200) {
              _this.$Message.success({
                content: '修改成功'
              });
              _this.mockTableData();
            } else {
              _this.$Message.error('获取数据失败');
            }
          })
        }
      },
      getstatuscancel() {
        let _this = this;
        let _data = {
          id: _this.shenheshuju.id,
          statusShop: '4'
        };
        _this.modal6 = false;
        if (this.isCancel) {
          shopCancel(_data).then(function (response) {
            if (response.data.code == 200) {
              _this.$Message.success({
                content: '修改成功'
              });
              _this.mockTableData();
            } else {
              _this.$Message.error('获取数据失败');
            }
          })
        } else {
          shopVerify(_data).then(function (response) {
            if (response.data.code == 200) {
              _this.$Message.success({
                content: '修改成功'
              });
              _this.mockTableData();
            } else {
              _this.$Message.error('获取数据失败');
            }
          })
        }
      },
      // 切换页码
      changePage(current) {
        this.pageData.curPage = current;
        this.tableData = this.mockTableData();
      }
    },
    created: function () {
      this.mockTableData();
      // this.getstatus();
    }
  };
</script>

<style>

</style>
