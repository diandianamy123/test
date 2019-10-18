<template>
    <div class="manage_log">
        <Form :model="formItem" :label-width="80">
            <Row>
                <Col span="4" style="width: 280px;">
                    <FormItem label="选择日期" >
                        <DatePicker type="daterange" split-panels format="yyyy-MM-dd" placeholder="选择日期"  v-model="formItem.timeArea" @on-change="formItem.timeArea=$event"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="3" style="width: 200px;">
                    <FormItem label="充值编号">
                        <Input v-model="formItem.swiftNo" placeholder="充值编号" />
                    </FormItem>
                </Col>
                <Col span="3" style="width: 200px;">
                    <FormItem label="会员UID" >
                        <Input v-model="formItem.account" placeholder="会员UID" />
                    </FormItem>
                </Col>
                <Col span="3" style="width: 200px;">
                    <FormItem label="充值币种">
                        <Select v-model="formItem.code">
                            <Option value="">全部</Option>
                            <Option v-for="item in cointypes" :value="item" :key="item">{{ item }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <!-- <Col span="3" style="width: 200px;">
                    <FormItem label="充值类型">
                        <Select v-model="formItem.payType">
                            <Option value="">全部</Option>
                            <Option v-for="item in payTypes" :value="item.code" :key="item.code">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                </Col> -->
                <!-- <Col span="3" style="width: 200px;">
                    <FormItem label="充值状态">
                        <Select v-model="formItem.payStatus">
                            <Option value="">全部</Option>
                            <Option v-for="item in paystatus" :value="item.code" :key="item.code">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                </Col> -->
                <Col span="2" offset="1">
                    <Button type="primary" @click="onSearch">搜索</Button>
                </Col>
                <Col span="1" offset="1">
                    <Button type="primary" @click="onExport()">导出</Button>
                </Col>
            </Row>

        </Form>
        <Form>

        </Form>
        <!-- height属性：固定表头 -->
        <Table :columns="tableColumns" :data="tableData" stripe></Table>
        <p class="totle">充币统计： <span>总单数：{{orderCount}} </span> <span>总金额：{{totalPrice}} </span> </p>
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
import { list } from '@/api/finance';
import excel from '@/libs/excel';
export default {
    data () {
        return {
             formItem: {
                timeArea: [],    // 选择日期
                swiftNo: '',  // 充值编号
                account: '',    // 会员账户
                code: '',   // 充值币种
                payType: '',  // 充值类型
                payStatus: '', // 充值状态
            },
            startDate: '',
            endDate: '',
            orderCount: '',//总单数：
            totalPrice: '',//总金额：
            // payTypes: [], // 充值类型
            // paystatus: [], // 充值状态
            cointypes:[],   //充值币种类型
            tableData: [], // 列表数据
            tableColumns: [ // 列表列
                {
                    title: '充值编号',
                    key: 'swiftNo',
                    minWidth: 180,
                },
                {
                    title: '会员UID',
                    key: 'account',
                    minWidth: 100,
                },
                {
                    title: '手机号',
                    key: 'tel',
                    minWidth: 100,
                },
                {
                    title: '真实姓名',
                    key: 'username',
                    minWidth: 100,
                },
                {
                    title: '币种',
                    key: 'code',
                    minWidth: 100,
                },
                {
                    title: '充值金额',
                    key: 'usdFee',
                    minWidth: 120,
                },
                // {
                //     title: '状态',
                //     key: 'payStatus',
                //     minWidth:150,
                //     render: (h, params) => {
                //         const row = params.row;
                //         const status = row.withdrawStatus;
                //         let text = this.showpaystatus(status);
                //         return h('div', {
                //         }, text);
                //     }
                // },
                {
                    title: '支付类型',
                    key: 'payType',
                    minWidth: 100,
                    render: (h, params) => {
                        const row = params.row;
                        const payType = row.payType;
                        var text;
                        switch(payType){
                            case 1:
                                text = '在线';
                                break;
                            case 2:
                                text = '人工充值';
                                break;
                            case 3:
                                text = '后台充值';
                                break;
                        }
                        return h('div', {}, text);
                    }
                },
                {
                    title: '备注',
                    key: 'inspectReason',
                    minWidth:100,
                },
                {
                    title: '充值时间',
                    key: 'createTime',
                    minWidth:150,
                    render: (h, params) => {
                        const row = params.row;
                        const createTime = this.$public.timestampToTimeYMDhms(row.createTime);
                        return h('div', {}, createTime)
                    }
                },
                // {
                //     title: '确认时间',
                //     key: 'inspectTime',
                //     minWidth:150,
                // },
                {
                    title: '状态',
                    key: 'inspectStatus',
                    minWidth: 120,
                    render: (h, params) => {
                        const row = params.row;
                        const inspectStatus = row.inspectStatus;
                        var text;
                        switch(inspectStatus){
                            case 0:
                                text = '待审核';
                                break;
                            case 1:
                                text = '已到账';
                                break;
                            case 2:
                                text = '拒绝';
                                break;
                        }
                        return h('div', {}, text);
                    }
                }
            ],
            pageData: {
                total: 0,           // 数据总条数
                pages: 0,           // 总页码
                curPage: 1,         // 当前页
                pageSize: 15        // 每页条数
            }
        };
    },
    methods: {
        // 搜索
        onSearch(){
            const _this = this;
            _this.pageData.curPage=1;
            _this.mockTableData();
        },
        //导出
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
                chargeType: 1,
                orderNo: _this.formItem.swiftNo,
                stockCode: _this.formItem.code,
                account: _this.formItem.account,
            };
            for(var key in _data){
                if(_data[key] == ''){
                    delete _data[key]
                }
            }
            list(_data).then(function(response) {
                if(response.data.code == 200) {
                    for(var j = 0, length2 = response.data.result.list.list.length; j < length2; j++){
                        switch (response.data.result.list.list[j].payType) {
                            case 1:
                                response.data.result.list.list[j].payType = '在线';
                                break;
                            case 2:
                                response.data.result.list.list[j].payType = '人工充值';
                                break;
                            case 3:
                                response.data.result.list.list[j].payType = '后台充值';
                                break;
                            default:
                                response.data.result.list.list[j].payType = '--';
                                break;
                        };
                        switch (response.data.result.list.list[j].inspectStatus) {
                            case 0:
                                response.data.result.list.list[j].inspectStatus = '待审核';
                                break;
                            case 1:
                                response.data.result.list.list[j].inspectStatus = '已到账';
                                break;
                            case 2:
                                response.data.result.list.list[j].inspectStatus = '拒绝';
                                break;
                            default:
                                response.data.result.list.list[j].inspectStatus = '--';
                                break;
                        };
                        response.data.result.list.list[j].createTime = _this.$public.timestampToTimeYMDhms(response.data.result.list.list[j].createTime);
                    }
                    const params = {
                        title: ['充值编号', '会员UID','手机号', '真实姓名', '币种', '充值金额','支付类型','备注','充值时间','状态'],
                        key: ['swiftNo', 'stockUserId', 'tel', 'username', 'code', 'usdFee','payType','inspectReason','createTime','inspectStatus'],
                        data: response.data.result.list.list,
                        autoWidth: true,
                        filename: '充值记录'
                    };
                    excel.export_array_to_excel(params)
                } else {
                    _this.$Message.info(response.data.message);
                }
            })
        },

        // 表格数据
        mockTableData () {
            const _this = this;
            if(_this.formItem.timeArea[0] && _this.formItem.timeArea[1]) {
                _this.startDate = _this.formItem.timeArea[0] + " 00-00-00";
                _this.endDate = _this.formItem.timeArea[1] + " 23-59-59";
            }else {
                _this.startDate = "";
                 _this.endDate = "";
            }
            let _data = {
                pageNumber: _this.pageData.curPage,
                pageSize: _this.pageData.pageSize,
                startDate: _this.startDate,
                endDate: _this.endDate,
                chargeType: 1,
                orderNo: _this.formItem.swiftNo,
                stockCode: _this.formItem.code,
                account: _this.formItem.account,
                // type: _this.formItem.payType,
                // status: _this.formItem.payStatus
            };
            for(var key in _data){
                if(_data[key] == ''){
                    delete _data[key]
                }
            }
            list(_data).then(function(response) {
                if(response.data.code == 200) {
                    _this.tableData = response.data.result.list.list;
                    _this.pageData.total = Number(response.data.result.list.total);
                    _this.orderCount =  response.data.result.count.orderCount;//总单数：
                    _this.totalPrice =  response.data.result.count.totalPrice;//总金额：
                    // _this.pageData.pages=response.data.data.list.pages;
                    // _this.allMoney=response.data.data.allMoney;
                }else {
                    _this.$Message.error('获取数据失败');
                }
            }).catch(function(error) {});
        },
        // 切换页码
        changePage (current) {
            this.pageData.curPage = current;
            this.tableData = this.mockTableData();
        },
        getcoinList(){
            const _this = this;
            // _this.$http.get(_this.$http.getCoinType, {}).then(function(res) {
            //     if(res.data.code == 200) {
            //         _this.cointypes = res.data.result;
            //     }
            // });
            _this.cointypes = ['AXGY','USDT','ETC8','CLS']
        },
    },
    created: function(){
        this.mockTableData();
        this.getcoinList();
    }
};
</script>
