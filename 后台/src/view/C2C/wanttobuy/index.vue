<style lang="less">
    @import './index.less';
</style>
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
                        <Input v-model="formItem.entrustNo" placeholder="订单编号"  />
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
                            <Option value=" ">全部</Option>
                            <Option v-for="item in status" :value="item.code" :key="item.code">{{item.name}}</Option>
                        </Select>
                    </FormItem>
                </Col>

                <Col span="3" offset="1" style="width: 280px;">
                    <Button type="primary" @click="onSearch('1')">搜索</Button>
                </Col>
              <Col span="2" offset="1">
                      <Button type="primary" @click="onSearch('2')">导出</Button>
              </Col>
            </Row>
        </Form>
        <!-- height属性：固定表头 -->
        <Table :loading="loading" :columns="tableColumns" :data="tableData" stripe></Table>
        <p class="totle">
            <span>总计单数: {{orderCount}}</span>&nbsp;&nbsp;
            <span>总计金额: {{Number(totalPrice).toFixed(2)}}元</span>&nbsp;&nbsp;
            <span>总计求购数量:{{totalNum}}USDT</span>&nbsp;&nbsp;
            <span>总计成交数量:{{dealsTotalNum}}USDT</span>
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
    import { buyRecordList } from '@/api/C2C';
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
                totalNum: '', // 总计求购数量
                dealsTotalNum: '', // 总计成交数量
                status: [
                    { code: '1', name: '进行中' },
                    { code: '2', name: '完成' },
                    { code: '3', name: '撤单' }
                ],
                loading: true,
                tableData: [], // 表格数据
                tableColumns: [// 表格列
                    {
                        title: '订单编号',
                        key: 'entrustNo',
                        minWidth: 200
                    },
                    {
                        title: '会员ID',
                        key: 'account',
                        minWidth: 120
                    },
                    {
                        title: '姓名',
                        key: 'username',
                        minWidth: 100
                    },
                    {
                        title: '手机号码/邮箱',
                        key: 'tel',
                        minWidth: 120
                    },
                    {
                        title: '交易数量',
                        key: 'totalNum',
                        minWidth: 150
                    },
                    {
                        title: '交易价格(元)',
                        key: 'price',
                        minWidth: 150,
                        render: (h, params) => {
                            let text = params.row.price ? Number(params.row.price).toFixed(2) : "";
                            return h("span", text)
                        }
                    },
                    {
                        title: '总计金额(元)',
                        key: 'totalPrice',
                        minWidth: 150,
                        render: (h, params) => {
                            let text = params.row.totalPrice ? Number(params.row.totalPrice).toFixed(2) : "";
                            return h("span", text)
                        }
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
                            let text = params.row.dealPrice ? Number(params.row.dealPrice).toFixed(2) : "";
                            return h("span", text)
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
                    }
                ],
                onExport:"1",//导出和搜索判断
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
            onSearch (curenem) {
                const _this = this;
                _this.onExport = curenem;
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
                };
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
                        delete _data[key];
                    };
                };
                if (_this.onExport == '2') {
                    delete _data.pageNumber;
                    delete _data.pageSize;
                };
                _this.loading = true;
                buyRecordList( _data).then(function (response) {
                    _this.loading = false;
                    if (response.data.code == 200) {
                        for(var j = 0, length2 = response.data.result.list.list.length; j < length2; j++){
                            switch (response.data.result.list.list[j].status) {
                                case 1:
                                    response.data.result.list.list[j].status = '进行中';
                                    break;
                                case 2:
                                    response.data.result.list.list[j].status = '已完成';
                                    break;
                                case 3:
                                    response.data.result.list.list[j].status = '已取消';
                                    break;
                                default:
                                    response.data.result.list.list[j].status = '--';
                                    break;
                            };
                            response.data.result.list.list[j].price = Number(response.data.result.list.list[j].price).toFixed(2);
                            response.data.result.list.list[j].totalPrice = Number(response.data.result.list.list[j].totalPrice).toFixed(2);
                            response.data.result.list.list[j].dealPrice = Number(response.data.result.list.list[j].dealPrice).toFixed(2);
                            response.data.result.list.list[j].tel = response.data.result.list.list[j].tel?response.data.result.list.list[j].tel : response.data.result.list.list[j].email;
                        };
                        if (_this.onExport == '1') {
                            _this.tableData = [];
                            // _this.pageData.curPage = 1;
                            _this.tableData = response.data.result.list.list
                            _this.orderCount = response.data.result.count.orderCount //总计单数
                            _this.totalPrice = response.data.result.count.totalPrice //总计金额
                            _this.totalNum = response.data.result.count.totalNum //总计求购数量
                            _this.dealsTotalNum = response.data.result.count.dealsTotalNum //总计成交数量
                            _this.pageData.total = Number(response.data.result.list.total);
                        }else {
                            _this.$public.deriveddata(response.data.result.list.list, _this.tableColumns, '求购记录')
                        }
                    } else {
                        _this.$Message.error('获取数据失败')
                    }
                }).catch(function (error) {})
            },
            
            // 切换页码
            changePage (current) {
                this.pageData.curPage = current
                this.tableData = this.mockTableData()
            },
        },
        created: function () {
            this.mockTableData()
          // this.getstatus();
        }
    }
</script>
      