<style>
    .manages_log .ivu-col-offset-6 {
        margin-left: 0px;
    }
  
    .manages_log .ivu-row {
        margin-top: 20px;
    }
    .dankedaun .ivu-form-item{
        margin-bottom: 0px;
    }
</style>
<template>
    <div class="manages_log">
        <Form :model="formItem" :label-width="80">
            <Row>
                <Col span="3" style="width: 200px">
                    <FormItem label="会员ID">
                        <Input v-model="formItem.account" placeholder="会员ID" />
                    </FormItem>
                </Col>
                <Col span="3"  style="width: 200px">
                    <FormItem label="手机号码">
                        <Input v-model="formItem.tel" placeholder="手机号码" />
                    </FormItem>
        
                </Col>
                <Col span="3"  style="width: 200px">
                    <FormItem label="节点类型">
                        <Select v-model="formItem.status">
                            <Option value=" ">全部</Option>
                            <Option v-for="item in disables" :value="item.code" :key="item.name">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="3"  style="width: 200px">
                    <FormItem label="审核状态">
                        <Select v-model="formItem.openStatus">
                            <Option value=" ">全部</Option>
                            <Option v-for="item in realType" :value="item.code" :key="item.name">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                </Col>
        
                <Col span="1" offset="1" style="width: 100px">
                    <Button type="primary" @click="onSearch">搜索</Button>
                </Col>
                <!-- <Col span="2" style="width: 100px">
                    <Button type="primary" @click="authentication">批量认证</Button>
                </Col> -->
                <!-- <Col span="2" style="width: 100px">
                    <Button type="primary" @click="add">添加会员</Button>
                </Col> -->
            </Row>
        </Form>
        <!-- height属性：固定表头 -->
        <Table :columns="tableColumns" :data="tableData" size="small" ref="table" stripe></Table>
        <!-- <Table :columns="columns8" :data="data7" size="small" ref="table"></Table> -->
        <!-- <p class="totle"> <span>总人数:{{num}}</span> -->
        <!-- <span>总可用余额(折合USDT)：{{useMoney}}</span> -->
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
    import { list, updateStatus } from '@/api/user'
    import { imgurl } from '@/api/data'
    export default {
        data() {
            return {
                imgurldizhi:imgurl(),
                IdList: [],
                formItem: {
                    account: '', // 账户
                    tel: '',
                    status: '', // 状态 禁用 为禁用
                    openStatus: '', // 认证状态
                    realType: [], //用户类型
                    // id: '',
                    // parentAccount: '',
                    // email:''
                },
                num: '', //总人数
                useMoney: '',//总可用余额(
                frozenMoney: '', //总冻结金额
                inMoney: '', //总入金
                outMoney: '' , //总出金
                openStatus: [], //所有开户状态
                disables: [ //状态
                    {code: '5', name: '普通节点'},
                    {code: '6', name: '超级节点'}
                ], //所有用户状态
                realType: [
                    {code: '1', name: '待审核'},
                    {code: '2', name: '审核通过'},
                    {code: '3', name: '审核不通过'},
                ], //用户类型
                tableData: [],
                tableColumns: [
                    {
                        title: '会员ID',
                        key: 'userId',
                        minWidth: 80
                    },
                    {
                        title: '昵称',
                        key: 'nickname',
                        minWidth: 80
                    },
                    {
                        title: '手机号码',
                        key: 'tel',
                        minWidth: 130
                    },
                    {
                        title: '真实姓名',
                        key: 'username',
                        minWidth: 100
                    },
                    {
                        title: '节点',
                        key: 'nodeType',
                        minWidth: 100,
                        render: (h, params) => {
                            const row = params.row;
                            const nodeType = row.nodeType;
                            var text;
                            switch(nodeType){
                                case 5:
                                    text = '普通节点';
                                    break;
                                case 6:
                                    text = '超级节点';
                                    break;
                                  break;
                            }
                            return h('div', {}, text);
                        }
                    },
                    { 
                        title: '申请时间',
                        key: 'createTime',
                        minWidth: 150,
                        render: (h, params) => {
                            const row = params.row;
                            const createTime = this.$public.timestampToTimeYMDhms(row.createTime);
                            return h('div', {}, createTime)
                        }
                    },
                    {
                        title: '审核状态',
                        key: 'applyStatus',
                        minWidth: 100,
                        render: (h, params) => {
                            const row = params.row;
                            const applyStatus = row.applyStatus;
                            var text;
                            switch(applyStatus){
                                case 1:
                                    text = '待审核';
                                    break;
                                case 2:
                                    text = '审核通过';
                                    break;
                                case 3:
                                    text = '审核不通过';
                                    break;
                                  break;
                            }
                            return h('div', {}, text);
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        minWidth: 200,
                        align: 'center',
                        fixed: 'right',
                        render: (h, params) => {
                            const row = params.row;
                            const status = row.disable;
                            // const btnText = status === 0 ? '禁用' : '启用';
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.fund(params.row)
                                        }
                                    }
                                }, ' 操作')
                          ]);
                        }
                    },
                ],
                pageData: {
                    total: 0, //总共多少数据
                    pages: 0, //总页数
                    curPage: 1, //当前页
                    pageSize: 15 //每页数据条数
                }
            };
        },
        methods: {
            fund(arrname){
                let _this = this;
                
            },
            //搜索
            onSearch() {
                let _this = this;
                _this.pageData.curPage=1;
                _this.mockTableData();
            },
            // 表格数据
            mockTableData() {
                let _this = this;
                let _data = {
                    pageNumber: _this.pageData.curPage,
                    pageSize: _this.pageData.pageSize,
                    id: _this.formItem.account,
                    tel: _this.formItem.tel,
                    type: _this.formItem.status,
                    status: _this.formItem.openStatus,
                    // status: _this.formItem.openStatus,
                    // email:_this.formItem.email,
                    // account:_this.formItem.account,
                    // isReal:1
                };
                for(var key in _data){
                    if(_data[key] == ''){
                        delete _data[key]
                    }
                }
                list(_data).then(function(response) {
                    if(response.data.code == 200) {
                        _this.tableData = response.data.result.list;
                        // _this.num =   response.data.result.count.num; //总人数
                        // _this.useMoney =   response.data.result.count.useMoney;//总可用余额(
                        // _this.frozenMoney =   response.data.result.count.frozenMoney; //总冻结金额
                        // _this.inMoney =   response.data.result.count.inMoney; //总入金
                        // _this.outMoney =   response.data.result.count.outMoney ; //总出金
                        _this.pageData.total = Number(response.data.total);
                        // _this.pageData.pages = response.data.data.list.pages;
                    } else {
                        _this.$Message.info(response.data.message);
                    }
                })
            },
            // 时间格式化
            formatDate(date) {
                const y = date.getFullYear();
                let m = date.getMonth() + 1;
                m = m < 10 ? '0' + m : m;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + m + '-' + d;
            },
            // 切换页码
            changePage(current) {
                this.pageData.curPage = current;
                this.tableData = this.mockTableData();
            },
        },
        created: function() {
            this.mockTableData();
          // this.getrealType();
        }
    };
</script>
