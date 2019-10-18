<template>
    <div class="manage_log">
        <Form :model="formItem" :label-width="80">
            <Row>
                <Col span="6">
                    <FormItem label="选择日期">
                        <DatePicker type="daterange" split-panels format="yyyy-MM-dd" placeholder="选择日期" v-model="formItem.timeArea" @on-change="formItem.timeArea=$event">
                        </DatePicker>
                    </FormItem>
                </Col>
                <Col span="5">
                    <FormItem label="会员UID">
                        <Input v-model="formItem.account" placeholder="会员UID"/>
                    </FormItem>
                </Col>
                <Col span="5">
                    <FormItem label="矿机类型">
                        <Select v-model="formItem.code">
                            <Option value>
                                全部
                            </Option>
                            <Option v-for="item in cointypes" :value="item.code" :key="item.name">
                                {{ item.name }}
                            </Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="5">
                    <FormItem label="领取状态">
                        <Select v-model="formItem.inspectStatus">
                            <Option value>
                                全部
                            </Option>
                            <Option v-for="item in checkTypes" :value="item.code" :key="item.name">
                                {{ item.name }}
                            </Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="2" offset="1">
                    <Button type="primary" @click="onSearch">
                        搜索
                    </Button>
                </Col>
            </Row>
        </Form>
        <!-- height属性：固定表头 -->
        <Table :columns="tableColumns" :data="tableData" stripe></Table>
        <div style="margin: 10px;overflow: hidden">
        <!-- <div style="float: left;">
                  <p>当前共{{pageData.total}}条数据，共{{pageData.pages}}页</p>
        </div>-->
            <div style="float: right;">
                <Page :total="pageData.total" :current="pageData.curPage" @on-change="changePage" :page-size="pageData.pageSize">
                </Page>
            </div>
        </div>
    </div>
</template>
<script>
import { miningRecord } from '@/api/finance'
export default {
  data () {
    return {
      formItem: {
        timeArea: [], // 选择日期
        swiftNo: '', // 提现编号
        account: '', // 会员UID
        code: '', // 提现币种
        inspectStatus: '' // 提现状态
      },
      startTime: '',
      endTime: '',
      orderCount: '', // 总单数：
      totalPrice: '', // 总金额：
      btcFee: '',
      ethFee: '',
      usdtFee: '',
      bibFee: '',
      cointypes: [
            { code: '1', name: '微型矿机' },
            { code: '2', name: '小型矿机' },
            { code: '3', name: '中型矿机' },
            { code: '4', name: '大型矿机' },
            { code: '5', name: '新型矿机' }
      ], // 充值币种类型
      checkTypes: [
            { code: 'N', name: '未领取' },
            { code: 'Y', name: '已领取' },
      ], // 提现状态列表
      tableData: [], // 列表数据
      tableColumns: [
        // 列表列
        {
          title: 'ID',
          key: 'id',
          minWidth: 180
        },
        {
          title: '会员UID',
          key: 'userUid',
          minWidth: 150
        },
        {
          title: '手机号',
          key: 'tel',
          minWidth: 150
        },
        {
          title: '昵称',
          key: 'username',
          minWidth: 100
        },
        {
          title: '矿机类型',
          key: 'type',
          minWidth: 100
        },
        {
          title: '产矿时间',
          key: 'createTime',
          minWidth: 180,
          render: (h, params) => {
            const row = params.row;
            const createTime = this.$public.timestampToTimeYMDhms(row.createTime);
            return h('div', {}, createTime)
        }
        },
        {
          title: '产出数量',
          key: 'makeMill',
          minWidth: 100
        },
        {
          title: '状态',
          minWidth: 100,
          render: (h, params) => {
            const row = params.row
            const getTag = row.getTag
            let text = '';
            switch (getTag) {
              case "N":
                text = '未领取';
                break
              case "Y":
                text = '已领取';
                break
                text = '审核失败';
            }
            return h('div', {}, text)
          }
        },
      ],
      pageData: {
        total: 0, // 数据总条数
        pages: 0, // 总页码
        curPage: 1, // 当前页
        pageSize: 15 // 每页条数
      },
      refuseVal: '', // 拒绝原因
      submitflag: true
    }
  },
  methods: {
    onSearch () {
      // 搜索
      const _this = this
      _this.pageData.curPage = 1
      _this.mockTableData()
    },
    // 表格数据
    mockTableData () {
      const _this = this
      if (_this.formItem.timeArea[0] && _this.formItem.timeArea[1]) {
        _this.startTime = _this.formItem.timeArea[0] + ' 00-00-00';
        _this.endTime = _this.formItem.timeArea[1] + ' 23-59-59';
      } else {
        _this.startTime = '';
        _this.endTime = '';
    }
      let _data = {
        pageNumber: _this.pageData.curPage,
        pageSize: _this.pageData.pageSize,
        startTime: _this.startTime,
        endTime: _this.endTime,
        orderNo: _this.formItem.swiftNo,
        userUid: _this.formItem.account,
        delTag : _this.formItem.inspectStatus,
        type: _this.formItem.code
      }
      for (var key in _data) {
        if (_data[key] == '') {
          delete _data[key]
        }
      }
      miningRecord(_data).then(function (response) {
          if (response.data.code == 200) {
            _this.tableData = response.data.result.list
            _this.pageData.total = Number(response.data.result.list)
            // _this.pageData.pages=response.data.data.list.pages;
            _this.orderCount = response.data.result.count.orderCount //总单数：
            _this.totalPrice = response.data.result.count.totalPrice //总金额：
            _this.btcFee = response.data.result.count.btcFee //
            _this.ethFee = response.data.result.count.ethFee //
            _this.usdtFee = response.data.result.count.usdtFee //
            _this.bibFee = response.data.result.count.bibFee //
          } else {
            _this.$Message.error('获取数据失败')
          }
        })
        .catch(function (error) {})
    },
    // 切换页码
    changePage (current) {
      this.pageData.curPage = current
      this.tableData = this.mockTableData()
    },
    // 同意审核
    agree (id) {
      var _this = this
      this.$Modal.confirm({
        title: '提示',
        content: '是否通过当前用户的审核申请？',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          const _data = {
            id: id,
            status: 1
          }
          if (_this.submitflag) {
            _this.submitflag = false
            outMoneyAudit(_data).then(function (response) {
                if (response.data.code == 200) {
                  _this.$Message.success('成功')
                  _this.mockTableData()
                  _this.submitflag = true
                } else {
                  _this.$Message.error(response.data.message)
                  _this.submitflag = true
                }
              })
              .catch(function (error) {})
          }
        },
        onCancel: () => {}
      })
    },
    // 拒绝审核
    refuse (id) {
      var _this = this
      this.$Modal.confirm({
        title: '提示',
        content: '是否拒绝当前用户的审核申请？',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          window.setTimeout(function () {
            _this.$Modal.confirm({
              title: '原因',
              render: h => {
                return h('Input', {
                  props: {
                    value: _this.refuseVal,
                    autofocus: true,
                    maskclosable: false,
                    placeholder: '请输入拒绝原因'
                  },
                  on: {
                    input: val => {
                      _this.refuseVal = val
                    }
                  }
                })
              },
              onOk: () => {
                const _data = {
                  id: id,
                  status: 2,
                  remark: _this.refuseVal
                }
                if (_this.refuseVal == '') {
                  _this.$Message.error('拒绝原因不能为空')
                  return false
                }
                if (_this.submitflag) {
                  _this.submitflag = false
                  outMoneyAudit(_data).then(function (response) {
                      if (response.data.code == 200) {
                        _this.$Message.success('成功')
                        _this.mockTableData()
                        _this.submitflag = true
                      } else {
                        _this.$Message.error(response.data.message)
                        _this.submitflag = true
                      }
                    })
                    .catch(function (error) {})
                }
              },
              onCancel: () => {
                _this.$Message.info('已取消')
              }
            })
          }, 300)
        },
        onCancel: () => {}
      })
    },
    // 获取币种列表
    getcoinList () {
      const _this = this
      // _this.$http.get(_this.$http.getCoinType, {}).then(function (res) {
      //   if (res.data.code == 200) {
      //     _this.cointypes = res.data.result
      //   }
      // }
    }
  },
  created: function () {
    this.mockTableData()
    this.getcoinList()
  }
}
</script>

