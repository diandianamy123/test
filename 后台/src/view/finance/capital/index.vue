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
                    <FormItem label="币种类型">
                        <Select v-model="formItem.stockCode">
                            <Option value="">全部</Option>
                            <Option v-for="item in cointypes" :value="item" :key="item">{{ item }}</Option>
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
                <Col span="2" offset="1">
                    <Button type="primary" @click="onExport()">导出</Button>
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
import { record } from '@/api/finance'
import { getMoneyType } from '@/api/data';
import excel from '@/libs/excel';
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
            cointypes:[ ],  //充值币种类型
            totalMoney:'',//支出
            incomeMoney:'',//收入
            startDate: '',
            endDate: '',
            // moneyTypes: [], // 财务类型
            // Types:[],    //钱包类型
            tableData: [],   // 列表数据
            tableColumns: [   // 列表列
                {
                    title: 'ID',
                    key: 'id',
                    minWidth:100,
                },
                {
                    title: '会员UID',
                    key: 'account',
                    minWidth:100,
                },
                {
                    title: '手机号/邮箱',
                    key: 'tel',
                    minWidth:130,
                    render: (h, params) => {
                        if (params.row.tel) {
                            return h("span", params.row.tel);
                        } else {
                            return h("span", params.row.email);
                        }
                    }
                },
                {
                    title: '账号',
                    key: 'account',
                    minWidth: 100,
                },
                {
                    title: '原资产',
                    key: 'moneyBefore',
                    minWidth: 150,
                },
                {
                    title: '收入/支出',
                    key: 'money',
                    minWidth: 150,
                },
                {
                    title: '现资产',
                    key: 'moneyAfter',
                    minWidth:150,
                },
                {
                    title: '资产类型',
                    key: 'stockCode',
                    minWidth: 100,
                },
                {
                    title: '描述',
                    key: 'detail',
                    minWidth:150,
                    render: (h, params) => {
                        const row = params.row;
                        const text = row.detail === "" ? '--' : row.detail;
                        return h('div', {
                        }, text);
                    }
                },
                {
                    title: '时间',
                    minWidth:170,
                    key: 'createTime'
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
                account: _this.formItem.account,
                tel: _this.formItem.tel,
                stockCode:_this.formItem.stockCode,
            };
            for(var key in _data){
                if(_data[key] == ''){
                    delete _data[key]
                }
            }
            record(_data).then(function(response) {
                if(response.data.code == 200) {
                    response.data.result.list.forEach(val => {
                        if (val.tel) {
                            val.tel = val.tel;
                        } else {
                            val.tel = val.email;
                        }
                    });

                    const params = {
                        title: ['ID','会员UID','账号','手机号/邮箱','原资产','收入/支出','现资产','资产类型','描述','时间'],
                        key: ['id','userId','account','tel','moneyBefore','money','moneyAfter','stockCode','detail','createTime'],
                        data: response.data.result.list,
                        autoWidth: true,
                        filename: '资产记录'
                    };
                    excel.export_array_to_excel(params)
                } else {
                    _this.$Message.info(response.data.message);
                }
            })
        },
        // // 表格数据
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
                account: _this.formItem.account,
                tel: _this.formItem.tel,
                stockCode:_this.formItem.stockCode,
            };
            for(var key in _data){
                if(_data[key] == ''){
                    delete _data[key]
                }
            }
            record(_data).then(function(response) {
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
            getMoneyType().then(function(res) {
                if(res.data.code == 200) {
                    _this.cointypes = res.data.result;
                }
            });
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
