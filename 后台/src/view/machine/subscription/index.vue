<template>
    <div class="manage_log">
        <Form :model="formItem" :label-width="80">
            <Row>
                <Col span="6">
                    <FormItem label="选择日期">
                        <DatePicker type="daterange" split-panels format="yyyy-MM-dd" placeholder="选择日期"  v-model="formItem.timeArea" @on-change="formItem.timeArea=$event"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="5" >
                    <FormItem label="会员UID">
                        <Input v-model="formItem.account" placeholder="会员UID" />
                    </FormItem>
                </Col>
                <Col span="5" >
                    <FormItem label="手机号">
                        <Input v-model="formItem.tel" placeholder="手机号" />
                    </FormItem>
                </Col>
                <Col span="5">
                    <FormItem label="矿机类型">
                        <Select v-model="formItem.stockCode">
                            <Option value="">全部</Option>
                            <Option v-for="item in cointypes" :value="item.value" :key="item.value">{{ item.title }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <!-- <Col span="3">
                    <FormItem label="财务类型">
                        <Select v-model="formItem.type">
                            <Option value="">全部</Option>
                            <Option v-for="item in moneyTypes" :value="item.code" :key="item.code">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                </Col> -->
                <Col span="2" offset="1">
                    <Button type="primary" @click="onSearch">搜索</Button>
                </Col>
            </Row>

        </Form>
        <!-- height属性：固定表头 -->
        <Table :columns="tableColumns" :data="tableData" stripe></Table>
        <!-- <p style="font-size:18px;color:red;">总收入：{{incomeMoney}}&nbsp;&nbsp;&nbsp;总支出:{{totalMoney}} </p> -->
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
import { buyRecord } from '@/api/machine'
export default {
    data () {
        return {
             formItem: {
                timeArea: [],  // 选择日期
                account: '', // 会员账户
                tel: '', //手机
                stockCode:'',
                // type: '',  // 财务类型
            },
            cointypes:[
                {
                    title: '微型矿机',
                    value: '1',
                },
                {
                    title: '小型矿机',
                    value: '2',
                },
                {
                    title: '中型矿机',
                    value: '3',
                },
                {
                    title: '大型矿机',
                    value: '4',
                },
                {
                    title: '新型矿机',
                    value: '5',
                },
            ],  //充值币种类型
            totalMoney:'',//支出
            incomeMoney:'',//收入
            startTime: '',
            endTime: '',
            // moneyTypes: [], // 财务类型
            // Types:[],    //钱包类型
            tableData: [],   // 列表数据
            tableColumns: [   // 列表列
                {
                    title: '会员UID',
                    key: 'uerUid',
                    minWidth:100,
                },
                {
                    title: '昵称',
                    key: 'username',
                    minWidth: 100,
                },
                {
                    title: '手机号',
                    key: 'tel',
                    minWidth: 200,
                },
                {
                    title: '订单号',
                    key: 'id',
                    minWidth: 200,
                },
                {
                    title: '矿机',
                    key: 'type',
                    minWidth: 150,
                    render: (h, params) => {
                        const row = params.row
                        const type = row.type
                        let text = '';
                        switch (type) {
                            case 1:
                                text = '微型矿机';
                                break
                            case 2:
                                text = '小型矿机';
                                break
                            case 3:
                                text = '中型矿机';
                                break
                            case 4:
                                text = '大型矿机';
                                break;
                            case 5:
                                text = '新型矿机';
                                break;
                        }
                        return h('div', {}, text)
                    }
                },
                {
                    title: '价格',
                    key: 'moneyAfter',
                    minWidth:150,
                    render: (h, params) => {
                        const row = params.row;
                        let text = "";
                        switch (params.row.type) {
                            case 5:
                                text = params.row.priceOne+"个AXGY币 +"+params.row.priceTwo+"个锁仓";
                                break;
                            default:
                                text = params.row.priceOne+"个ETC8 +"+params.row.priceTwo+"个CLS";
                                break;
                        }
                        return h('div', {}, text);
                    }
                },
                {
                    title: '状态',
                    key: 'walletType',
                    minWidth: 120,
                    render: (h, params) => {
                        let walletType = params.row.deleteTag;
                        let text;
                        switch(walletType){
                            case 'N':
                                text = '正在运行';
                                break;
                            case 'Y':
                                text = '已停止';
                                break;
                        }
                        return h('div', {}, text);
                    }
                },
                {
                    title: '购买时间',
                    minWidth:170,
                    key: 'createTime',
                    render: (h, params) => {
                        const row = params.row;
                        const createTime = this.$public.timestampToTimeYMDhms(row.createTime);
                        return h('div', {}, createTime)
                    }
                }
            ],
            pageData: {
                total: 0,               // 数据总条数
                pages: 0,               // 总页码
                curPage: 1,             // 当前页
                pageSize: 15             // 每页条数
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
        // 导出
        // onExport () {
        //     const _this=this;
        //     window.location.href = _this.$http.host+_this.$http.financial_export+'?startDate='+_this.formItem.timeArea[0] + ' 00:00:00' + '&endDate=' + _this.formItem.timeArea[1]  +  ' 23:59:59' + '&type=' + _this.formItem.type +'&account=' + _this.formItem.account;
        // },
        // // 表格数据
        mockTableData () {
            const _this = this;
            if(_this.formItem.timeArea[0] && _this.formItem.timeArea[1]) {
                _this.startTime = _this.formItem.timeArea[0] + " 00-00-00";
                _this.endTime = _this.formItem.timeArea[1] + " 23-59-59";
            } else {
                _this.startTime = '';
                _this.endTime = '';
            }
            let _data = {
                pageNumber: _this.pageData.curPage,
                pageSize: _this.pageData.pageSize,
                startTime: _this.startTime,
                endTime: _this.endTime,
                userUid: _this.formItem.account,
                tel: _this.formItem.tel,
                type:_this.formItem.stockCode,
            };
            for(var key in _data){
                if(_data[key] == ''){
                    delete _data[key]
                }
            }
            buyRecord( _data).then(function(response) {
                if(response.data.code == 200) {
                    _this.tableData = response.data.result.list;
                    _this.pageData.total= Number(response.data.result.total);
                    // _this.pageData.pages=response.data.data.list.pages;
                    // _this.totalMoney=response.data.data.expend;//支出
                    // _this.incomeMoney=response.data.data.incomeMoney;//收入
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
            // })
        },
    },
    created: function(){
        this.mockTableData();
        // this.getcoinList();
    }
};
</script>

<style>

</style>
