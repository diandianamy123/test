<template>
        <div class="manage_log">
            <Form :model="formItem" :label-width="90">
                <Row >
                    <Col span="4" style="width: 280px;">
                        <FormItem label="订单日期">
                            <DatePicker type="daterange" split-panels format="yyyy-MM-dd" placeholder="选择订单日期" v-model="formItem.timeArea" @on-change="formItem.timeArea=$event"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="4" style="width: 280px;">
                        <FormItem label="订单编号">
                            <Input v-model="formItem.entrustNo" placeholder="订单编号" />
                        </FormItem>
                    </Col>
                    <Col span="4" style="width: 280px;">
                        <FormItem label="出售UID">
                            <Input v-model="formItem.sellAccount" placeholder="出售UID" />
                        </FormItem>
                    </Col>
                    <Col span="4" style="width: 280px;">
                        <FormItem label="出售手机号">
                            <Input v-model="formItem.sellTel" placeholder="出售手机号" />
                        </FormItem>
                    </Col>
                </Row>
                <Row style="padding-bottom: 20px">
                    <Col span="4" style="width: 280px;">
                        <FormItem label="购买UID">
                            <Input v-model="formItem.buyAccount" placeholder="购买UID" />
                        </FormItem>
                    </Col>
                    <Col span="4" style="width: 280px;">
                        <FormItem label="购买手机号">
                            <Input v-model="formItem.buyTel" placeholder="购买手机号" />
                        </FormItem>
                    </Col>
                    <Col span="4" style="width: 280px;">
                        <FormItem label="订单状态">
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
                        <Button type="primary" @click="onExport()">导出</Button>
                    </Col>
                </Row>
            </Form>
            <!-- height属性：固定表头 -->
            <Table :loading="loading" :columns="tableColumns" :data="tableData" stripe></Table>
    
            <p class="totle">
                <span>总计单数: {{orderCount}}</span>
             <span>总计金额：{{totalPrice}}</span>
            <!-- <span>总计求购数量: {{totalNum}} </span> -->
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
        </div>
    </template>
    
    <script>
        import { dealRecordList } from '@/api/C2C';
        import excel from '@/libs/excel';
        export default {
            data() {
                return {
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
                    // totalMoney: '',
                    // totaldealsNum: '',
                    // totalFee: '',
                    orderCount:  '',//总计单数
                    totalPrice: '',//总计金额
                    totalNum: '',//总计出售数量
                    dealsTotalNum: '', //总计成交数量
                    status: [
                        {code: '1', name: '待付款'},
                        {code: '2', name: '已付款'},
                        {code: '3', name: '已确认'},
                        {code: '4', name: '申诉中'},
                        {code: '5', name: '取消'}
                    ],
                    loading: true,
                    tableData: [], // 表格数据
                    tableColumns: [ // 表格列
                        {
                            title: '订单编号',
                            key: 'orderNo',
                            minWidth: 200,
                        },
                        {
                            title: '出售UID',
                            key: 'sellAccount',
                            minWidth: 100,
                        },
                        {
                            title: '出售方手机号/邮箱',
                            key: 'sellPhone',
                            minWidth: 150,
                            render: (h, params) => {
                                if (params.row.sellPhone) {
                                    return h("span", params.row.sellPhone)
                                } else if (params.row.sellEmail) {
                                    return h("span", params.row.sellEmail)
                                }
                            }
                        },
                        {
                            title: '购买UID',
                            key: 'buyAccount',
                            minWidth: 100,
                        },
                        {
                            title: '购买方手机号/邮箱',
                            key: 'buyPhone',
                            minWidth: 150,
                            render: (h, params) => {
                                if (params.row.buyPhone) {
                                    return h("span", params.row.buyPhone)
                                } else if (params.row.buyEmail) {
                                    return h("span", params.row.buyEmail)
                                }
                            }
                        },
                        {
                            title: '交易数量(USDT)',
                            key: 'dealsNum',
                            minWidth: 140,
                        },
                        {
                            title: '交易价格(元)',
                            key: 'dealsPrice',
                            minWidth: 140,
                        },
                        {
                            title: '总计金额(元)',
                            key: 'totalPrice',
                            minWidth: 120,
                        },
                        {
                            title: '手续费用(USDT)',
                            key: 'dealsFee',
                            minWidth: 130,
                        },
                        {
                            title: '状态',
                            key: 'status',
                            minWidth: 100,
                            render: (h, params) => {
                                const status = params.row.status;
                                var text;
                                switch(status){
                                    case 1:
                                         text = '待付款';
                                        break;
                                    case 2:
                                     text = '已付款';
                                        break;
                                    case 3:
                                     text = '已确认';
                                        break;
                                    case 4:
                                     text = '申诉中';
                                        break;
                                    case 5:
                                     text = '取消';
                                        break;
                                }
                                return h('div', {}, text);
                            }
                        },
                        {
                            title: '下单时间',
                            key: 'createTime',
                            minWidth: 150,
                            render: (h, params) => {
                                    const row = params.row;
                                    const createTime = this.$public.timestampToTimeYMDhms(row.createTime);
                                    return h('div', {}, createTime)
                            }
                        },
                        {
                            title: '付款时间',
                            key: 'confirmTime',
                            minWidth: 150,
                            render: (h, params) => {
                                const row = params.row;
                                const confirmTime = row.confirmTime;
                                let text = confirmTime != null ? this.$public.timestampToTimeYMDhms(row.confirmTime) : '--';
                                return h('div', {}, text);
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
                    _this.pageData.curPage=1;
                    _this.mockTableData();
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
                        sellAccount: _this.formItem.sellAccount,
                        sellPhone: _this.formItem.sellTel,
                        buyAccount: _this.formItem.buyAccount,
                        buyPhone: _this.formItem.buyTel,
                        status: _this.formItem.status,
                    };
                    for(var key in _data){
                        if(_data[key] == ''){
                            delete _data[key]
                        }
                    }
                    dealRecordList(_data).then(function(response) {
                        if(response.data.code == 200) {
                            for(var j = 0, length2 = response.data.result.list.list.length; j < length2; j++){
                                switch (response.data.result.list.list[j].status) {
                                    case 0:
                                        response.data.result.list.list[j].status = '委托中';
                                        break;
                                    case 1:
                                        response.data.result.list.list[j].status = '待付款';
                                        break;
                                    case 2:
                                        response.data.result.list.list[j].status = '已付款';
                                        break;
                                    case 3:
                                        response.data.result.list.list[j].status = '已确认完成';
                                        break;
                                    case 4:
                                        response.data.result.list.list[j].status = '申诉中';
                                        break;
                                    case 5:
                                        response.data.result.list.list[j].status = '取消';
                                        break;
                                    default:
                                        response.data.result.list.list[j].status = '--';
                                        break;
                                };

                                if (response.data.result.list.list[j].buyPhone) {
                                    response.data.result.list.list[j].buyPhone = response.data.result.list.list[j].buyPhone;
                                } else if (response.data.result.list.list[j].buyEmail) {
                                    response.data.result.list.list[j].buyPhone = response.data.result.list.list[j].buyEmail;
                                }

                                response.data.result.list.list[j].createTime = _this.$public.timestampToTimeYMDhms(response.data.result.list.list[j].createTime);
                                response.data.result.list.list[j].confirmTime = response.data.result.list.list[j].confirmTime != null ? _this.$public.timestampToTimeYMDhms(response.data.result.list.list[j].confirmTime) : '----';
                            }
                            const params = {
                                title: ['订单编号','出售UID','出售方手机号码','购买UID','购买方手机号码','交易数量(USDT)','交易价格(元)','总计金额(元)','手续费用(USDT)','状态','下单时间','付款时间'],
                                key: ['orderNo','sellAccount','sellPhone','buyAccount','buyPhone','dealsNum','dealsPrice','totalPrice','dealsFee','status','createTime','confirmTime'],
                                data: response.data.result.list.list,
                                autoWidth: true,
                                filename: '法币交易记录' 
                            };
                            excel.export_array_to_excel(params)
                        } else {
                            _this.$Message.info(response.data.message);
                        }
                    })
                },
                // 表格数据
                mockTableData() {
                    const _this = this;
                    if(_this.formItem.timeArea[0] && _this.formItem.timeArea[1]) {
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
                    for(var key in _data){
                        if(_data[key] == ''){
                            delete _data[key]
                        };
                    };
                    _this.loading = true;
                    dealRecordList( _data).then(function(response) {
                        _this.loading = false;
                        if(response.data.code == 200) {
                            _this.tableData = response.data.result.list.list;
                            _this.pageData.total =  Number(response.data.result.list.total) ;
                            _this.orderCount =   response.data.result.count.orderCount;//总计单数
                            _this.totalPrice =  response.data.result.count.totalPrice;//总计金额
                            _this.totalNum = response.data.data.result.totalNum;//总计出售数量
                            _this.dealsTotalNum = response.data.result.count.dealsTotalNum; //总计成交数量
                            
                            // _this.pageData.pages = response.data.data.list.pages;
                        } else {
                            _this.$Message.error('获取数据失败');
                        }
                    }).catch(function(error) {});
                },
                // getstatus() {
                //  const _this = this;
                //  _this.$http.get(_this.$http.getLawCoinRecordOrderStatus, {}).then(function(res) {
                //    if(res.data.code == 200) {
                //      _this.status = res.data.data;
                //    }
                //  })
                // },
                // 切换页码
                changePage(current) {
                    this.pageData.curPage = current;
                    this.tableData = this.mockTableData();
                }
            },
            created: function() {
                this.mockTableData();
                // this.getstatus();
            }
        };
    </script>
    
    <style>

    </style>