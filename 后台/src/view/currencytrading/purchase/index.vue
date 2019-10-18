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
                    <FormItem label="会员账号">
                        <Input v-model="formItem.account" placeholder="会员账号" />
                    </FormItem>
                </Col>
                <Col span="4" style="width: 280px;">
                    <FormItem label="手机号/邮箱">
                        <Input v-model="formItem.telOrEmail" placeholder="手机号/邮箱" />
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
                   <Col span="5">
                    <FormItem label="交易币种">
                        <Select v-model="formItem.stockCode">
                            <Option value>
                                全部
                            </Option>
                            <Option v-for="item in cointypes" :value="item" :key="item">
                                {{ item }}
                            </Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="3" offset="1" style="width: 280px;">
                    <Button type="primary" @click="onSearch">搜索</Button>
                </Col>
              <Col span="1" offset="1">
                      <Button type="primary" @click="onExport()">导出</Button>
              </Col>
            </Row>
        </Form>
        <!-- height属性：固定表头 -->
        <Table :loading="loading" :columns="tableColumns" :data="tableData" stripe></Table>
        <p class="totle">
            <span>总计单数: {{count.totalBill}}</span>&ensp; &ensp;
            <span>总计金额: {{count.totalMoney}}</span>&ensp; &ensp;
            <span>总计手续费:{{count.totalFee}}</span>&ensp; &ensp;
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
    import { entrustBuy } from '@/api/currencytrading';
    import { getMoneyType } from '@/api/data';
    import excel from '@/libs/excel';
    export default {
        data () {
            return {
                formItem: {
                    timeArea: ['', ''], 
                    entrustNo: '', 
                    account: '', 
                    telOrEmail: '',
                    tatus: '' ,
                   stockCode: '', // 提现币种
                },
                startDate: '',
                endDate: '',
                count:{
                    btcFee: "",
                    ethFee: '',
                    totalBill: "",
                    totalFee: "",
                    totalMoney: "",
                    usdtFee: "",
                },
                status: [
                    { code: '1', name: '进行中' },
                    { code: '2', name: '完成' },
                    { code: '3', name: '撤单' }
                ],
                loading: true,
                cointypes:[],   //充值币种类型
                tableData: [], // 表格数据
                tableColumns: [
                    // 表格列
                    {
                        title: '委托ID',
                        key: 'id',
                        minWidth: 100
                    },
                    {
                        title: '会员账号',
                        key: 'userUid',
                        minWidth: 100
                    },
                    {
                        title: '手机',
                        key: 'tel',
                        minWidth: 130
                    },
                    {
                        title: '邮箱',
                        key: 'email',
                        minWidth: 150
                    },
                    {
                        title: '产品名称',
                        key: 'stockCode',
                        minWidth: 180
                    },
                    {
                        title: '委托价格',
                        key: 'entrustPrice',
                        minWidth: 180
                    },
                    {
                        title: '数量',
                        key: 'transNum',
                        minWidth: 180
                    },
                    {
                        title: '成交价格',
                        key: 'dealPrice',
                        minWidth: 180
                    },
                    {
                        title: '成交数量',
                        key: 'dealsRemainNum',
                        minWidth: 180
                    },
                    {
                        title: '成交金额',
                        key: 'dealMoney',
                        minWidth: 180
                    },
                    {
                        title: '手续费',
                        key: 'iniFee',
                        minWidth: 180
                    },
                    {
                        title: '状态',
                        key: 'state',
                        minWidth: 120,
                        render: (h, params) => {
                            let status = params.row.state
                            let text
                            switch (status) {
                                case 0:
                                    text = '委托中';
                                break
                                case 1:
                                    text = '进行中';
                                break
                                case 2:
                                    text = '已完成';
                                break
                                case 3:
                                    text = '已撤单';
                                break
                                case 4:
                                    text = '未触发';
                                break
                            };
                            return h('div', {}, text)
                        }
                    },
                    {
                        title: '委托时间',
                        key: 'createTime',
                        minWidth: 180
                    },
                    {
                        title: '成交时间',
                        key: 'dealTime',
                        minWidth: 180
                    },
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
                };
                let _data = {
                    pageNumber: _this.pageData.curPage,
                    pageSize: _this.pageData.pageSize,
                    startDate: _this.startDate,
                    endDate: _this.endDate,
                    orderNo: _this.formItem.entrustNo,
                    account: _this.formItem.account,
                    telOrEmail: _this.formItem.telOrEmail,
                    state: _this.formItem.status,
                    stockCode:_this.formItem.stockCode
                }
                for (var key in _data) {
                    if (_data[key] == '') {
                        delete _data[key];
                    };
                };
                _this.loading = true;
                entrustBuy( _data).then(function (response) {
                    _this.loading = false;
                    if (response.data.code == 200) {
                        _this.tableData = response.data.result.list.list;
                        _this.count = response.data.result.count;
                        _this.pageData.total = Number(response.data.result.list.total);
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
                    telOrEmail: _this.formItem.telOrEmail,
                    state: _this.formItem.status
                };
                for(var key in _data){
                    if(_data[key] == ''){
                        delete _data[key]
                    }
                }
                entrustBuy(_data).then(function(response) {
                    if(response.data.code == 200) {
                        for(var j = 0, length2 = response.data.result.list.list.length; j < length2; j++){
                            switch (response.data.result.list.list[j].state) {
                                case 0:
                                    response.data.result.list.list[j].state = '委托中';
                                    break;
                                case 1:
                                    response.data.result.list.list[j].state = '进行中';
                                    break;
                                case 2:
                                    response.data.result.list.list[j].state = '已完成';
                                    break;
                                case 3:
                                    response.data.result.list.list[j].state = '已撤单';
                                    break;
                                case 4:
                                    response.data.result.list.list[j].state = '未触发';
                                    break;
                                default:
                                    response.data.result.list.list[j].state = '--';
                                    break;
                            };
                        }
                        const params = {
                            title: ['委托ID','会员账号','手机','邮箱','产品名称','委托价格','数量','成交价格','成交数量','成交金额','手续费','状态','委托时间','成交时间'],
                            key:  ['id','userUid','tel','email','stockCode','entrustPrice','transNum','dealPrice','dealsRemainNum','dealMoney','iniFee','state','createTime','dealTime'],
                            data: response.data.result.list.list,
                            autoWidth: true,
                            filename: '委托买入' 
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
            },
            //币种
         getcoinList () {// 获取币种列表
            const _this = this
            getMoneyType().then(function (res) {
                if (res.data.code == 200) {
                    _this.cointypes = res.data.result
                }
            });
        }
              //getcoinList(){
            //const _this = this;
            // _this.$http.get(_this.$http.getCoinType, {stockCode}).then(function(res) {
                // if(res.data.code == 200) {
                   //  _this.cointypes = res.data.result;
                 //}
             //});
           // _this.cointypes = ['AXGY','USDT','ETC8','CLS']
        //},
        },
        created: function () {
            this.mockTableData();
            this.getcoinList();
          // this.getstatus();
        }
    }
</script>
      