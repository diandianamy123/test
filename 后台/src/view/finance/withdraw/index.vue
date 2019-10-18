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
                    <FormItem label="提现编号">
                        <Input v-model="formItem.swiftNo" placeholder="提现编号"/>
                    </FormItem>
                </Col>
                <Col span="5">
                    <FormItem label="会员UID">
                        <Input v-model="formItem.account" placeholder="会员UID"/>
                    </FormItem>
                </Col>
                <Col span="5">
                    <FormItem label="提现币种">
                        <Select v-model="formItem.code">
                            <Option value>
                                全部
                            </Option>
                            <Option v-for="item in cointypes" :value="item" :key="item">
                                {{ item }}
                            </Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="5">
                    <FormItem label="提现状态">
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
                <Col span="1" offset="1">
                    <Button type="primary" @click="onExport()">导出</Button>
                </Col>
            </Row>
        </Form>
        <!-- height属性：固定表头 -->
        <Table :columns="tableColumns" :data="tableData" stripe></Table>
        <p class="totle">
            提币统计：
            <span>
                总单数：{{ orderCount }}
            </span>&ensp; &ensp;
            <span>
                总金额：{{ totalPrice }}
            </span>&ensp; &ensp;
            <span>
                USDT手续费：{{ usdtFee }}
            </span>&ensp; &ensp;
        </p>
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
import { list, outMoneyAudit } from '@/api/finance';
import { getMoneyType } from '@/api/data';
import excel from '@/libs/excel';
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
            startDate: '',
            endDate: '',
            usdtFee:"",
            orderCount: '', // 总单数：
            totalPrice: '', // 总金额：
            cointypes: [], // 充值币种类型
            checkTypes: [
                { code: '0', name: '待审核' },
                { code: '1', name: '已到账' },
                { code: '2', name: '拒绝' },
                { code: '3', name: '审核失败' }
            ], // 提现状态列表
            tableData: [], // 列表数据
            tableColumns: [
                // 列表列
                {
                    title: '订单编号',
                    key: 'swiftNo',
                    minWidth: 200
                },
                {
                    title: '会员ID',
                    key: 'account',
                    minWidth: 100
                },
                {
                    title: '手机号',
                    key: 'tel',
                    minWidth: 130
                },
                {
                    title: '真实姓名',
                    key: 'username',
                    minWidth: 100
                },
                {
                    title: '币种',
                    key: 'code',
                    minWidth: 80
                },
                {
                    title: '钱包地址',
                    key: 'walletAddr',
                    minWidth: 200
                },
                {
                    title: '提现金额',
                    key: 'usdFee',
                    minWidth: 100
                },
                {
                    title: '手续费',
                    key: 'poundage',
                    minWidth: 100
                },
                {
                    title: '实际到账',
                    key: 'realFee',
                    minWidth: 100,
                },
                {
                    title: '状态',
                    minWidth: 100,
                    render: (h, params) => {
                        const row = params.row
                        const inspectStatus = row.inspectStatus
                        let text = '';
                        switch (inspectStatus) {
                            case 1:
                                text = '已到账';
                            break;
                            case 2:
                                text = '拒绝';
                            break;
                            case 0:
                                text = '待审核';
                            break;
                            case 3:
                                text = '审核失败';
                        };
                        return h('div', {}, text)
                    }
                },
                {
                    title: '提现时间',
                    key: 'createTime',
                    minWidth: 150,
                    render: (h, params) => {
                        const row = params.row
                        const createTime = this.$public.timestampToTimeYMDhms(row.createTime)
                        return h('div', {}, createTime)
                    }
                },
                {
                    title: '审核时间',
                    key: 'inspectTime',
                    minWidth: 150,
                    render: (h, params) => {
                        let inspectTime = "";
                        if (params.row.timestamp) {
                            inspectTime = this.$public.timestampToTimeYMDhms(params.row.timestamp);
                        }else {
                            inspectTime == "---";
                        }

                        return h('div', {}, inspectTime)
                    }
                },
                {
                    title: '操作',
                    key: 'inspectStatus',
                    minWidth: 150,
                    render: (h, params) => {
                        const row = params.row
                        const inspectStatus = row.inspectStatus
                        switch (true) {
                            case inspectStatus == 0 || inspectStatus == 3:
                                return h('div', [
                                    h(
                                        'Button',
                                        {
                                            props: {
                                            type: 'success',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.agree(params.row.id)
                                            }
                                        }
                                    },'审核'),
                                    h(
                                        'Button',
                                        {
                                            props: {
                                                type: 'error',
                                                size: 'small'
                                            },
                                            style: {
                                                marginRight: '5px'
                                            },
                                            on: {
                                                click: () => {
                                                    this.refuse(params.row.id)
                                                }
                                            }
                                        },'拒绝')
                                    ])
                                break;
                            }
                        }
                    }
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
        mockTableData () {// 表格数据
            const _this = this
            if (_this.formItem.timeArea[0] && _this.formItem.timeArea[1]) {
                _this.startDate = _this.formItem.timeArea[0] + ' 00-00-00';
                _this.endDate = _this.formItem.timeArea[1] + ' 23-59-59';
            }else {
                _this.startDate = ''
                _this.endDate = ''
            }
            let _data = {
                pageNumber: _this.pageData.curPage,
                pageSize: _this.pageData.pageSize,
                startDate: _this.startDate,
                endDate: _this.endDate,
                chargeType: 2,
                orderNo: _this.formItem.swiftNo,
                account: _this.formItem.account,
                stockCode: _this.formItem.code,
                status: _this.formItem.inspectStatus
            }
            for (var key in _data) {
                if (_data[key] == '') {
                    delete _data[key]
                }
            }
            list(_data).then(function (response) {
                if (response.data.code == 200) {
                    _this.tableData = response.data.result.list.list
                    _this.pageData.total = Number(response.data.result.list.total)
                    _this.orderCount = response.data.result.count.orderCount //总单数：
                    _this.totalPrice = response.data.result.count.totalPrice //总金额：
                    _this.btcFee = response.data.result.count.btcFee //
                    _this.ethFee = response.data.result.count.ethFee //
                    _this.usdtFee = response.data.result.count.usdtFee //
                    _this.bibFee = response.data.result.count.bibFee //
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
                            }).catch(function (error) {})
                        }
                    },
                onCancel: () => {}
            })
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
                chargeType: 2,
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
                        if (response.data.result.list.list[j].inspectTime) {
                            response.data.result.list.list[j].inspectTime = _this.$public.timestampToTimeYMDhms(response.data.result.list.list[j].inspectTime);
                        }else {
                            response.data.result.list.list[j].inspectTime = "--";
                        }
                    }
                    const params = {
                        title: ['订单编号','会员ID','手机号','真实姓名','币种','钱包地址','提现金额','手续费','实际到账','状态','提现时间','审核时间'],
                        key: ['swiftNo','stockUserId','tel','username','code','walletAddr','usdFee','poundage','realFee','inspectStatus','createTime','inspectTime'],
                        data: response.data.result.list.list,
                        autoWidth: true,
                        filename: '提现记录'
                    };
                    excel.export_array_to_excel(params)
                } else {
                    _this.$Message.info(response.data.message);
                }
            })
        },
        refuse (id) {// 拒绝审核
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
                                    }).catch(function (error) {})
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
        getcoinList () {// 获取币种列表
            const _this = this
            getMoneyType().then(function (res) {
                if (res.data.code == 200) {
                    _this.cointypes = res.data.result
                }
            });
        }
    },
    created: function () {
        this.mockTableData()
        this.getcoinList()
    }
}
</script>

