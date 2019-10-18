<template>
    <div class="manage_log">
        <Form :label-width="90">
            <Row style="padding-bottom: 20px">
                <Col span="4" style="width: 280px;">
                    <FormItem label="选择日期">
                        <DatePicker
                            type="daterange"
                            split-panels
                            format="yyyy-MM-dd"
                            placeholder="选择日期" 
                            v-model="formItem.timeArea"
                            @on-change="formItem.timeArea=$event"
                        ></DatePicker>
                    </FormItem>
                </Col>
                <Col span="4" style="width: 280px;">
                    <FormItem label="订单编号">
                        <Input v-model="formItem.entrustNo" placeholder="订单编号" />
                    </FormItem>
                </Col>
                <Col span="4" style="width: 280px;">
                    <FormItem label="会员账号">
                        <Input v-model="formItem.account" placeholder="会员账号" />
                    </FormItem>
                </Col>
                <Col span="4" style="width: 280px;">
                    <FormItem label="手机号码">
                        <Input v-model="formItem.tel" placeholder="手机号码" />
                    </FormItem>
                </Col>
                <Col span="4" style="width: 280px;">
                    <FormItem label="订单状态">
                        <Select v-model="formItem.status">
                            <Option label="全部" value="">全部</Option>
                            <Option v-for="item in status" :value="item.code" :key="item.code">{{item.name}}</Option>
                        </Select>
                    </FormItem>
                </Col>

                <Col span="3" offset="1" >
                    <Button type="primary" @click="onSearch">搜索</Button>
                </Col>
              <Col span="2" offset="1">
                      <Button type="primary" @click="onExport()">导出</Button>
              </Col>
            </Row>
        </Form>
        <!-- height属性：固定表头 -->
        <Table :loading="loading" :columns="tableColumns" :data="tableData" stripe></Table>
        <p class="totle">
            <span>总计单数: {{orderCount}}</span>
            <span>总计金额: {{totalPrice}}</span>
            <span>总计出售数量:{{totalNum}}</span>
            <span>总计成交数量:{{dealsTotalNum}}</span>
        </p>
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
    </div>
</template>
  
<script>
    import { sellRecordList } from '@/api/C2C';
    import excel from '@/libs/excel';
    export default {
        data () {
            return {
                formItem: {
                    timeArea: ['', ''], // 选择日期
                    entrustNo: '', // 订单编号
                    account: '', // 会员账号
                    tel: '', // 手机号
                    tatus: '' // 订单状态
                },
                startDate: '',
                endDate: '',
                orderCount: '', // 总计单数
                totalPrice: '', // 总计金额
                totalNum: '', // 总计出售数量
                dealsTotalNum: '', // 总计成交数量
                status: [
                    { code: '1', name: '进行中' },
                    { code: '2', name: '完成' },
                    { code: '3', name: '撤单' }
                ],
                loading: true,
                tableData: [], // 表格数据
                tableColumns: [
                  // 表格列
                  {
                    title: '订单编号',
                    key: 'entrustNo',
                    minWidth: 200
                  },
                  {
                    title: '会员ID',
                    key: 'account',
                    minWidth: 150
                  },
                  {
                    title: '姓名',
                    key: 'username',
                    minWidth: 120
                  },
                  {
                    title: '手机号码/邮箱',
                    key: 'tel',
                    minWidth: 150,
                    render: (h, params) => {
                        if (params.row.tel) {
                            return h("span", params.row.tel)
                        } else if (params.row.email) {
                            return h("span", params.row.email)
                        }
                    }
                  },
                  {
                    title: '交易数量',
                    key: 'totalNum',
                    minWidth: 150
                  },
                  {
                    title: '交易价格',
                    key: 'price',
                    minWidth: 150
                  },
                  {
                    title: '总计金额(元)',
                    key: 'totalPrice',
                    minWidth: 150
                  },
                  {
                    title: '成交数量(USDT)',
                    key: 'transNum',
                    minWidth: 150
                  },
                  {
                    title: '成交金额(元)',
                    key: 'dealPrice',
                    minWidth: 150,
                    render: (h, params) => {
                      return h('div', {}, Number(params.row.dealPrice).toFixed(6))
                    }
                  },
                  {
                    title: '委托时间',
                    key: 'createTime',
                    minWidth: 180
                  },
                  {
                    title: '状态',
                    key: 'status',
                    minWidth: 120,
                    render: (h, params) => {
                      const row = params.row
                      const status = row.status
                      var text
                      switch (status) {
                        case 1:
                          text = '进行中';
                          break
                        case 2:
                          text = '完成';
                          break
                        case 3:
                          text = '撤单';
                          break
                      }
                      return h('div', {}, text)
                    }
                  }
                ],
                pageData: {
                    total: 0, // 数据总条数
                    pages: 0, // 总页码
                    curPage: 1, // 当前页
                    pageSize: 10 // 每页条数
                }
          }
        },
        methods: {
            // 搜索
            onSearch () {
                const _this = this
                _this.tableData = []
                _this.pageData.curPage = 1
                // if(!_this.formItem.timeArea[0]){
                //     _this.$Message.error('时间不能为空！');
                //     return;
                // }
                _this.mockTableData()
            },
          // 表格数据
            mockTableData () {
                const _this = this
                if (_this.formItem.timeArea[0] && _this.formItem.timeArea[1]) {
                     _this.startDate = _this.formItem.timeArea[0] + ' 00-00-00';
                     _this.endDate = _this.formItem.timeArea[1] + ' 23-59-59';
                }else {
                    _this.startDate = "";
                     _this.endDate = "";
                }
                let _data = {
                    pageNumber: _this.pageData.curPage,
                    pageSize: _this.pageData.pageSize,
                    startDate: _this.startDate,
                    endDate: _this.endDate,
                    orderNo: _this.formItem.entrustNo,
                    account: _this.formItem.account,
                    tel: _this.formItem.tel,
                    orderStatus: _this.formItem.status
                }
                for (var key in _data) {
                    if (_data[key] == '') {
                        delete _data[key]
                    }
                };
                _this.loading = true;
                sellRecordList( _data).then(function (response) {
                    _this.loading = false;
                    if (response.data.code == 200) {
                        _this.tableData = response.data.result.list.list
                        _this.orderCount = response.data.result.count.orderCount //总计单数
                        _this.totalPrice = response.data.result.count.totalPrice //总计金额
                        _this.totalNum = response.data.result.count.totalNum //总计求购数量
                        _this.dealsTotalNum = response.data.result.count.dealsTotalNum //总计成交数量
                        _this.pageData.total = Number(response.data.result.list.total)
                        // _this.pageData.pages=response.data.result.list.pages;
                    } else {
                        _this.$Message.error('获取数据失败')
                    }
                }).catch(function (error) {})
            },
            onExport() {// 导出EXCEL
                let _this = this;
                if (_this.formItem.timeArea[0] && _this.formItem.timeArea[1]) {
                    _this.startDate = _this.formItem.timeArea[0] + ' 00-00-00';
                    _this.endDate = _this.formItem.timeArea[1] + ' 23-59-59';
                }else {
                    _this.startDate = ''
                    _this.endDate = ''
                }
                let _data = {
                    startDate: _this.startDate,
                    endDate: _this.endDate,
                    orderNo: _this.formItem.entrustNo,
                    account: _this.formItem.account,
                    tel: _this.formItem.tel,
                    orderStatus: _this.formItem.status
                };
                for(var key in _data){
                    if(_data[key] == ''){
                        delete _data[key]
                    }
                }
                sellRecordList(_data).then(function(response) {
                    if(response.data.code == 200) {
                        for(var j = 0, length2 = response.data.result.list.list.length; j < length2; j++){
                            switch (response.data.result.list.list[j].status) {
                                case 1:
                                    response.data.result.list.list[j].status = '进行中';
                                    break;
                                case 2:
                                    response.data.result.list.list[j].status = '完成';
                                    break;
                                case 3:
                                    response.data.result.list.list[j].status = '撤单';
                                    break;
                                default:
                                    response.data.result.list.list[j].status = '--';
                                    break;
                            };

                            if (response.data.result.list.list[j].tel) {
                                response.data.result.list.list[j].tel = response.data.result.list.list[j].tel;
                            } else if (response.data.result.list.list[j].email) {
                                response.data.result.list.list[j].tel = response.data.result.list.list[j].email;
                            }
                        }
                        const params = {
                            title: ['订单编号','会员ID','姓名','手机号码/邮箱','交易数量','交易价格','总计金额(元)','成交数量(USDT)','成交金额(元)','委托时间','状态'],
                            key:  ['entrustNo','account','username','tel','totalNum','price','totalPrice','transNum','dealPrice','createTime','status'],
                            data: response.data.result.list.list,
                            autoWidth: true,
                            filename: '出售记录' 
                        };
                        excel.export_array_to_excel(params)
                    } else {
                        _this.$Message.info(response.data.message);
                    }
                })
            },
            // 切换页码
            changePage (current) {
                this.pageData.curPage = current
                this.tableData = this.mockTableData()
            }
        },
        created: function () {
            this.mockTableData()
          // this.getstatus();
        }
    }
</script>
      