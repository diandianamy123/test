<template>
    <div class="manage_log">
        <Form :model="formItem" :label-width="120">
            <Row>
                <Col span="6">
                    <FormItem label="选择日期">
                        <DatePicker type="daterange" split-panels format="yyyy-MM-dd" placeholder="选择日期"  v-model="formItem.timeArea" @on-change="formItem.timeArea=$event"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="5" >
                    <FormItem label="会员UID">
                        <Input v-model="formItem.userUid" placeholder="会员UID" />
                    </FormItem>
                </Col>
                <Col span="5" >
                    <FormItem label="上级会员UID">
                        <Input v-model="formItem.upUserUid" placeholder="会员UID" />
                    </FormItem>
                </Col>
                <!-- <Col span="5">
                    <FormItem label="币种类型">
                        <Select v-model="formItem.stockCode">
                            <Option value="">全部</Option>
                            <Option v-for="item in cointypes" :value="item" :key="item">{{ item }}</Option>
                        </Select>
                    </FormItem>
                </Col> -->
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
import { stockUserConcession } from '@/api/finance'
export default {
    data () {
        return {
             formItem: {
                timeArea: [],  // 选择日期
                userUid:"",
                uid:"",
                upUserUid:"",
            },
            cointypes:[ ],  //充值币种类型
            totalMoney:'',//支出
            incomeMoney:'',//收入
            startTime: '',
            endTime: '',
            // moneyTypes: [], // 财务类型
            // Types:[],    //钱包类型
            tableData: [],   // 列表数据
            tableColumns: [   // 列表列
                {
                    title: '真实姓名',
                    key: 'username',
                    minWidth:100,
                },
                {
                    title: '会员UID',
                    key: 'userUid',
                    minWidth:100,
                },
                {
                    title: '上级真实姓名',
                    key: 'upUsername',
                    minWidth:100,
                },
                {
                    title: '上级会员UID',
                    key: 'upUserUid',
                    minWidth:100,
                },
                // {
                //     title: '账号',
                //     key: 'account',
                //     minWidth: 100,
                // },
                // {
                //     title: '订单号',
                //     key: 'moneyBefore',
                //     minWidth: 150,
                // },
                {
                    title: '佣金',
                    key: 'userReturnFee',
                    minWidth: 150,
                },
                {
                    title: '币种',
                    key: 'stockCode',
                    minWidth:150,
                },
                {
                    title: '时间',
                    minWidth:170,
                    key: 'timestamp'
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
            }else {
                _this.startTime = '';
                _this.endTime = '';
            }
            let _data = {
                pageNumber: _this.pageData.curPage,
                pageSize: _this.pageData.pageSize,
                startTime: _this.startTime,
                endTime: _this.endTime,
                uid: _this.formItem.userUid,
                // uid: _this.formItem.uid,
                upUserUid:_this.formItem.upUserUid,
            };
            for(var key in _data){
                if(_data[key] == ''){
                    delete _data[key]
                }
            }
            stockUserConcession(_data).then(function(response) {
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
            _this.cointypes = ['AXGY','USDT','ETC8','CLS']
        },
    },
    created: function(){
        this.mockTableData();
        this.getcoinList();
    }
};
</script>

<style>

</style>
