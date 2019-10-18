<template>
    <div class="manage_log">
        <Form :model="formItem" :label-width="80">
            <Row>
                <!-- <Col span="6">
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
                </Col> -->
                <!-- <Col span="3">
                    <FormItem label="财务类型">
                        <Select v-model="formItem.type">
                            <Option value="">全部</Option>
                            <Option v-for="item in moneyTypes" :value="item.code" :key="item.code">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                </Col> -->
                <!-- <Col span="2" offset="1">
                    <Button type="primary" @click="onSearch">搜索</Button>
                </Col> -->
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
        <Modal
            v-model="modal1"
            title="编辑矿机"
            @on-ok="bianji"
            @on-cancel="cancel">
            <Form :model="millList" :label-width="80">
                <FormItem label="矿机名字">
                    <Input v-model="millList.name" clearable placeholder=""></Input>
                </FormItem>
                <FormItem label="矿机类型" >
                    <Input v-model="millList.text" disabled placeholder=""></Input>
                </FormItem>
                <FormItem label="出售数量">
                    <Input v-model="millList.sellNum" clearable placeholder=""></Input>
                </FormItem>
                <FormItem label="已售数量">
                    <Input v-model="millList.soldNum" clearable placeholder=""></Input>
                </FormItem>
                <FormItem :label="kongji.priceOne">
                    <Input v-model="millList.priceOne" clearable placeholder=""></Input>
                </FormItem>
                <FormItem :label="kongji.priceTwo">
                    <Input v-model="millList.priceTwo" clearable placeholder=""></Input>
                </FormItem>
                <FormItem label="运行时长">
                    <Input v-model="millList.lastTime" clearable placeholder=""></Input>
                </FormItem>
                <FormItem label="算力">
                    <Input v-model="millList.hashRate" clearable placeholder=""></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
import { millList, addOrUpdateMill } from '@/api/machine'
export default {
    data () {
        return {
             formItem: {
                timeArea: [],  // 选择日期
                account: '', // 会员账户
                tel: '', //手机
                stockCode:'',
            },
            kongji:{
                priceOne:"ETC8价格",
                priceTwo:"CLS价格",
            },
            millList:{},//矿机数据
            modal1:false,
            totalMoney:'',//支出
            incomeMoney:'',//收入
            startDate: '',
            endDate: '',
            tableData: [],   // 列表数据
            tableColumns: [   // 列表列
                {
                    title: '编号',
                    key: 'id',
                    minWidth:100,
                },
                {
                    title: '类型',
                    key: 'type',
                    minWidth:100,
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
                    title: '名称',
                    key: 'name',
                    minWidth: 100,
                },
                {
                    title: '算力',
                    key: 'hashRate',
                    minWidth: 150,
                },
                {
                    title: '运行时长(H)',
                    key: 'lastTime',
                    minWidth: 150,
                },
                {
                    title: '已售数',
                    key: 'soldNum',
                    minWidth:150,
                },
                
                {
                    title: '出售数量',
                    minWidth:170,
                    key: 'sellNum'
                },
                {
                    title: '在线状态',
                    minWidth:170,
                    key: 'deleteTag',
                    render: (h, params) => {
                        const row = params.row
                        const deleteTag = row.deleteTag
                        let text = '';
                        switch (deleteTag) {
                            case 'N':
                                text = '在售';
                                break
                            case 'Y':
                                text = '售罄';
                                break;
                        }
                        return h('div', {}, text)
                    }
                },
                {
                    title: '价格',
                    minWidth:170,
                    key: 'priceOne',
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
                    title: '时间',
                    key: 'createTime',
                    minWidth: 180,
                    render: (h, params) => {
                        const row = params.row;
                        const createTime = this.$public.timestampToTimeYMDhms(row.updateTime);
                        return h('div', {}, createTime)
                    }
                },
                {
                    title: '操作',
                    minWidth:100,
                    key: 'createTime',
                    render:(h, params) =>{
                        return h('div', [
                          h('Button',{
                                props: {
                                    type: 'success',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.modal1 = true;
                                        let text = "";
                                        switch (params.row.type) {
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
                                        };
                                         switch (params.row.type) {
                                            case 5:
                                                this.kongji.priceOne = "AXGY币价格";
                                                this.kongji.priceTwo = "锁仓价格";
                                                break;
                                            default:
                                                
                                                this.kongji.priceOne = "ETC8价格";
                                                this.kongji.priceTwo = "CLS价格";
                                                break;
                                        };
                                        this.millList = params.row;
                                        this.millList.text = text;
                                    }
                                }
                            }, '编辑')
                        ])
                    }
                },
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
            millList(_data).then(function(response) {
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
        bianji(current){
            let _this=this;
            _this.millList.flag = 2;
            delete _this.millList._index;
            delete _this.millList._rowKey;
            delete _this.millList.createTime;
            delete _this.millList.updateTime;
            addOrUpdateMill(_this.millList).then(function(response) {
                if(response.data.code == 200) {
                    _this.mockTableData();
                }else {
                    _this.$Message.error('获取数据失败');
                }
            }).catch(function(error) {});
        },
        cancel(){

        },
        // 切换页码
        changePage (current) {
            this.pageData.curPage = current;
            this.tableData = this.mockTableData();
        },
    },
    created: function(){
        this.mockTableData();
    }
};
</script>

<style>

</style>
