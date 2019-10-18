<template>
  <div class="manage_log">
    <Form :model="formItem" :label-width="90">
      <Row style="padding-bottom: 20px">
        <Col span="4" style="width: 280px">
          <FormItem label="UID">
            <Input v-model="formItem.account" placeholder="请输入会员UID"/>
          </FormItem>
        </Col>
        <Col span="2" offset="1">
          <Button type="primary" @click="onSearch">搜索</Button>
        </Col>
        <Col span="4">
          <Button type="primary" @click="onCollect">归集</Button>
        </Col>
        <Col span="4" style="width: 280px;">
          <FormItem label="币种">
            <Select v-model="formItem.bizhong" clearable>
              <Option v-for="item in codes" :value="item" :label="item" :key="item"></Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <!-- height属性：固定表头 -->
    <Table :columns="tableColumns" :data="tableData" stripe></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: left;">
        <p>当前共{{pageData.total}}条数据，共{{pageData.pages}}页</p>
      </div>
      <div style="float: right;">
        <Page
          :total="pageData.total"
          :current="pageData.curPage"
          @on-change="changePage"
          :page-size="pageData.pageSize"
        ></Page>
      </div>
    </div>
  </div>
</template>
<script>
  import {getWalletList, platformWithdraw, gjCode, singleGj} from '@/api/wallet'

  export default {
    data() {
      return {
        codes: [],
        formItem: {
          account: '',// 账号搜索,
          bizhong: ''
        },
        tableData: [], // 表格数据
        tableColumns: [
          // 表格列
          {
            title: 'UID',
            key: 'account',
            minWidth: 150
          },
          {
            title: '会员姓名',
            key: 'username',
            minWidth: 150
          },
          {
            title: 'ETH地址',
            key: 'addr',
            minWidth: 350
          },
          {
            title: 'ETH余额',
            key: 'balance',
            minWidth: 150
          },
          {
            title: '归集',
            minWidth: 150,
            render: (h, params) => {
              const row = params.row
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {},
                  on: {
                    click: () => {
                      this.collac(params.row.addr)
                    }
                  }
                }, '归集')
              ])
            }
          }
        ],
        pageData: {
          total: 0, // 数据总条数
          pages: 0, // 总页码
          curPage: 1, // 当前页
          pageSize: 15 // 每页条数
        }
      }
    },
    methods: {
      collac(addr) {
        let _this = this
        if (!_this.formItem.bizhong) return
        let _data = {
          code: _this.formItem.bizhong,
          addr: addr
        }
        singleGj(_data).then(res => {
          if (res.data.code == 200) {
            this.$Message.success('归集成功')
          }
        })
      },
      getCode() {
        gjCode().then(res => {
          this.codes = res.data.result
        })
      },
      // 搜索
      onSearch() {
        let _this = this
        _this.pageData.curPage = 1;
        _this.mockTableData()
      },
      //归集
      onCollect() {
        if (this.tableData === undefined || this.tableData.length == 0) {
          this.$Message.error("暂无数据")
          return
        }
        let _this = this;
        platformWithdraw().then(function (response) {
          if (response.data.code == 200) {
            _this.$Message.success(response.data.msg)

          } else {
            _this.$Message.error(response.data.msg)
          }
        }).catch(function (error) {
        })
      },
      // 表格数据
      mockTableData() {
        let _this = this
        let _data = {
          pageNumber: _this.pageData.curPage,
          pageSize: _this.pageData.pageSize,
          account: _this.formItem.account,
          type: '2'
        }
        getWalletList(_data).then(function (response) {
          if (response.data.code == 200) {
            _this.tableData = response.data.result.list
            _this.pageData.total = Number(response.data.data.total)
            _this.pageData.pages = response.data.data.pages
          } else {
            _this.$Message.error('获取数据失败')
          }
        }).catch(function (error) {
        })
      },
      // 切换页码
      changePage(current) {
        this.pageData.curPage = current
        this.mockTableData()
      }
    },
    created: function () {
      this.mockTableData()
      this.getCode()
    }
  }
</script>
