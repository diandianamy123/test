<style type="text/css">
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
<template>
    <div class="exchange">
        <Card shadow title="交易币种">
            <Row>
                <Col span="1" offset="1" style="width: 100px">
                    <Button type="primary" @click="onSearch">添加</Button>
                </Col>
            </Row>

            <!-- height属性：固定表头 -->
            <Table :columns="tableColumns" :data="tableData" size="small" ref="table" stripe></Table>
            <!-- <Table :columns="columns8" :data="data7" size="small" ref="table"></Table> -->
            <!-- <p class="totle"> <span>总人数:{{num}}</span> -->
            <!-- <span>总可用余额(折合USDT)：{{useMoney}}</span> -->
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                <Page
                    :total="pageData.total"
                    :current="pageData.curPage"
                    @on-change="changePage"
                    :page-size="pageData.pageSize"
                ></Page>
            </div>
            </div>

            <!-- 币种编辑 -->
            <Modal
                v-model="modal6"
                title="交易币种"
                ref="test">
                <Form :model="formItem" :label-width="100">
                    <FormItem label="币种名称:">
                        <Input type="text" v-model="formItem.name" placeholder="格式：BTC" />
                    </FormItem>
                    <FormItem label="币种标识:">
                        <Input type="text" disabled v-model="formItem.code" placeholder="格式：BTC/USDT" />
                    </FormItem>
                    <FormItem label="发行日期:">
                        <Input type="text" v-model="formItem.publishTime" placeholder="格式：2019-12-12" />
                    </FormItem>
                    <FormItem label="发行数量:">
                        <Input type="text" v-model="formItem.publishNum" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="发行单价:">
                        <Input type="text" v-model="formItem.publishPrice" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="发行网站:">
                        <Input type="text" v-model="formItem.publishWeb" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="币种logo:">
                        <div class="demo-upload-list" v-if="uploadList.status">
                            <template>
                                <img :src="uploadList.url">
                            </template>
                        </div>
                        <Upload
                            ref="upload"
                            :show-upload-list="false"
                            :on-success="handleSuccess"
                            :format="['jpg','jpeg','png']"
                            :max-size="2048"
                            :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize"
                            multiple
                            type="drag"
                            :action="uploadfile"
                            style="display: inline-block;width:58px;">
                            <div style="width: 58px;height:58px;line-height: 58px;">
                                <Icon type="ios-camera" size="20"></Icon>
                            </div>
                        </Upload>
                    </FormItem>
                    <FormItem label="发行单价:">
                        <Input type="text" v-model="formItem.publishPrice" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="发行网站:">
                        <Input type="text" v-model="formItem.publishWeb" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="币种白皮书:">
                        <Input type="text" v-model="formItem.whitePaper" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="中文简介:">
                        <Input type="textarea" v-model="formItem.remark" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="英文简介:">
                        <Input type="textarea" v-model="formItem.remarkUS" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="最小变动价:">
                        <Input type="text" v-model="formItem.slidingScalePrice" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="交易手续费(%):">
                        <Input type="text" v-model="formItem.coinCoinBuyFee" placeholder=""></Input>
                    </FormItem>
                    <div v-if="formItem.coinArea ==1">
                        <FormItem label="最小下单数:">
                            <Input type="text" v-model="formItem.minNum" placeholder=""></Input>
                        </FormItem>
                        <FormItem label="最大下单数:">
                            <Input type="text" v-model="formItem.maxNum" placeholder=""></Input>
                        </FormItem>
                    </div>
                    <div v-else-if="formItem.coinArea ==2">
                        <FormItem label="最小下单数:">
                            <Input type="text" v-model="formItem.minNum" placeholder=""></Input>
                        </FormItem>
                        <FormItem label="最大下单数:">
                            <Input type="text" v-model="formItem.maxNum" placeholder=""></Input>
                        </FormItem>
                        <FormItem label="涨停率(%):">
                            <Input type="text" v-model="formItem.maxStopLoss" placeholder=""></Input>
                        </FormItem>
                        <FormItem label="跌停率(%):">
                            <Input type="text" v-model="formItem.minStopLoss" placeholder=""></Input>
                        </FormItem>
                        <FormItem label="上午交易时间:">
                            <Input type="text" v-model="formItem.dealStartTime" placeholder="格式：08:10:00,12:10:00"></Input>
                        </FormItem>
                        <FormItem label="下午交易时间:">
                            <Input type="text" v-model="formItem.dealEndTime" placeholder="格式：14:10:00,16:10:00"></Input>
                        </FormItem>
                        <FormItem label="最大余额持有量:">
                            <Input type="text" v-model="formItem.maxHave" placeholder=""></Input>
                        </FormItem>
                    </div>
                </Form>

                <div slot="footer">
                    <Button @click="getstatus('1')">取消</Button>
                    <Button type="primary" @click="getstatus('2')">确定</Button>
                </div>
            </Modal>



            <!-- 币种添加 -->
            <Modal
                v-model="modal7"
                title="交易币种添加"
                ref="test">
                <Form :model="formItem1" :label-width="100">
                    <FormItem label="币种名称:">
                        <Input type="text" v-model="formItem1.name" placeholder="格式：BTC" />
                    </FormItem>
                    <FormItem label="币种标识:">
                        <Input type="text" v-model="formItem1.code" placeholder="格式：BTC/USDT" />
                    </FormItem>
                    <FormItem label="发行日期:">
                        <Input type="text" v-model="formItem1.publishTime" placeholder="格式：2019-12-12" />
                    </FormItem>
                    <FormItem label="币种logo:">
                        <div class="demo-upload-list" v-if="uploadList1.status">
                            <template>
                                <img :src="uploadList1.url">
                            </template>
                        </div>
                        <Upload
                            ref="upload"
                            :show-upload-list="false"
                            :on-success="handleSuccess1"
                            :format="['jpg','jpeg','png']"
                            :max-size="2048"
                            :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize"
                            multiple
                            type="drag"
                            :action="uploadfile"
                            style="display: inline-block;width:58px;">
                            <div style="width: 58px;height:58px;line-height: 58px;">
                                <Icon type="ios-camera" size="20"></Icon>
                            </div>
                        </Upload>
                    </FormItem>
                    <FormItem label="发行数量:">
                        <Input type="text" v-model="formItem1.publishNum" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="发行单价:">
                        <Input type="text" v-model="formItem1.publishPrice" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="发行网站:">
                        <Input type="text" v-model="formItem1.publishWeb" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="币种白皮书:">
                        <Input type="text" v-model="formItem1.whitePaper" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="中文简介:">
                        <Input type="textarea" v-model="formItem1.remark" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="英文简介:">
                        <Input type="textarea" v-model="formItem1.remarkUS" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="最小变动价:">
                        <Input type="text" v-model="formItem1.slidingScalePrice" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="最小下单数:">
                        <Input type="text" v-model="formItem1.minNum" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="最大下单数:">
                        <Input type="text" v-model="formItem1.maxNum" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="涨停率(%):">
                        <Input type="text" v-model="formItem1.maxStopLoss" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="跌停率(%):">
                        <Input type="text" v-model="formItem1.minStopLoss" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="上午交易时间:">
                        <Input type="text" v-model="formItem1.dealStartTime" placeholder="格式：08:10:00,12:10:00"></Input>
                    </FormItem>
                    <FormItem label="下午交易时间:">
                        <Input type="text" v-model="formItem1.dealEndTime" placeholder="格式：14:10:00,16:10:00"></Input>
                    </FormItem>
                    <FormItem label="交易手续费(%):">
                        <Input type="text" v-model="formItem1.coinCoinBuyFee" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="最大余额持有量:">
                        <Input type="text" v-model="formItem1.maxHave" placeholder=""></Input>
                    </FormItem>
                </Form>

                <div slot="footer">
                    <Button @click="getstatus1('1')">取消</Button>
                    <Button type="primary" @click="getstatus1('2')">确定</Button>
                </div>
            </Modal>

        </Card>
    </div>
</template>
<script>
import './index.less'
import { codeList , editStock, codeInfo, addStock ,stockStatus } from '@/api/product'
import { file } from '@/api/data'
export default {
    name: 'exchange',
    data(){
        return {
            modal6:false,
            modal7:false,
            formItem:{
                name:"",//名称
                code:"",//币种标识
                publishTime:"",//发行日期
                publishNum:"",//发行数量
                publishPrice:"",//发行单价
                publishWeb:"",//发行网站
                whitePaper:"",//白皮书
                remark:"",//中文简介
                coinImg:"",//币种图标
                slidingScalePrice:"",//最小变动价
                remarkUS:"",//英文简介
                coinCoinBuyFee:"",//交易手续费
                minNum:"",//最小下单数
                maxNum:"",//最大下单数
                maxStopLoss:"",//涨停值
                minStopLoss:"",//跌停值
                dealStartTime:"",//上午交易时间
                dealEndTime:"",//下午交易时间
                maxHave:"",//最大持有量
            },
            visible: false,
            uploadList:{
                url:"",
                status:"",
            },
            uploadList1:{
                url:"",
                status:"",
            },
            formItem1:{
                name:"",//名称
                code:"",//币种标识
                publishTime:"",//发行日期
                publishNum:"",//发行数量
                publishPrice:"",//发行单价
                publishWeb:"",//发行网站
                whitePaper:"",//白皮书
                remark:"",//中文简介
                coinImg:"",//币种图标
                slidingScalePrice:"",//最小变动价
                remarkUS:"",//英文简介
                coinCoinBuyFee:"",//交易手续费
                minNum:"",//最小下单数
                maxNum:"",//最大下单数
                maxStopLoss:"",//涨停值
                minStopLoss:"",//跌停值
                dealStartTime:"",//上午交易时间
                dealEndTime:"",//下午交易时间
                maxHave:"",//最大持有量
            },
            uploadfile:file(),
            tableData: [],
            tableColumns: [
                {
                    title: '币种ID',
                    key: 'id',
                    minWidth: 80
                },
                {
                    title: '币种名称',
                    key: 'name',
                    minWidth: 100
                },
                {
                    title: '当前价格',
                    key: 'price',
                    minWidth: 130
                },
                {
                    title: '买一价',
                    key: 'buy',
                    minWidth: 100
                },
                {
                    title: '卖一价',
                    key: 'sell',
                    minWidth: 100,
                },
                { 
                    title: '图片',
                    key: 'image',
                    minWidth: 150,
                    render: (h, params) => {
                        let text = this.$config.baseUrl.pro + params.row.image;
                        return h('img', {attrs: {
                                src: text
                            },
                            style: {
                                width: '25px'
                            }
                        })
                    }
                },
                {
                    title: "昨日收盘价",
                    key: "open",
                    minWidth: 100
                },
                {
                    title: '类型',
                    key: 'isDeleted',
                    minWidth: 100,
                    render: (h, params) => {
                        const row = params.row;
                        const applyStatus = row.isDeleted;
                        var text,status,type;
                        if (applyStatus) {
                            text = "禁用"
                            type='warning'
                            status=0
                        }else {
                            text = '启用'
                            status=1
                              type='success'
                        }

                           return h('div', [
                            h('Button', {
                                props: {
                                    type: type,
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        stockStatus({id:row.id,status:status}).then((response) =>{
                                            if (response.data.code == 200) {
                                               this.mockTableData()
                                                       this.$Message.success(response.data.message)
                                            } else {
                                                this.$Message.error('获取数据失败')
                                            }
                                        })
                                    }
                                }
                            }, text)
                      ]);
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    minWidth: 200,
                    align: 'center',
                    fixed: 'right',
                    render: (h, params) => {
                        let row = params.row;
                        let _this = this;
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
                                        for (var variable in _this.formItem) {
                                            delete _this.formItem[variable];
                                        };
                                        codeInfo({id:row.id}).then(function (response) {
                                            if (response.data.code == 200) {
                                                _this.modal6 = true;
                                                _this.formItem = response.data.result;
                                                if (response.data.result.coinImg) {
                                                    _this.uploadList.url = _this.$config.baseUrl.pro +  response.data.result.coinImg;
                                                    _this.uploadList.status = _this.$config.baseUrl.pro +  response.data.result.coinImg;
                                                };
                                            } else {
                                                _this.$Message.error('获取数据失败')
                                            }
                                        }).catch(function (error) {});
                                    }
                                }
                            }, '编辑')
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
        }
    },
    methods:{
        onSearch() {
            let _this = this;
            for (var variable in _this.formItem1) {
                _this.formItem1[variable] = "";
            };
            _this.modal7 = true;
        },
        // 切换页码
        changePage (current) {
            this.pageData.curPage = current
            this.tableData = this.mockTableData()
        },
        mockTableData(){
            let _this = this;
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
            _this.getWebConfig = [];
            codeList(_data).then(function (response) {
                if (response.data.code == 200) {
                    _this.tableData = response.data.result.list;
                        // _this.num =   response.data.result.count.num; //总人数
                    // _this.useMoney =   response.data.result.count.useMoney;//总可用余额(
                    // _this.frozenMoney =   response.data.result.count.frozenMoney; //总冻结金额
                    // _this.inMoney =   response.data.result.count.inMoney; //总入金
                    // _this.outMoney =   response.data.result.count.outMoney ; //总出金
                    _this.pageData.total = Number(response.data.result.total);
                } else {
                    _this.$Message.error('获取数据失败')
                }
            }).catch(function (error) {});
        },
        getstatus(current){
            let _this = this;
            _this.modal6 = false;
            switch (current) {
                case '2':
                    // statements_1
                    break;
                default:
                    return false;
                    break;
            };
            // _this.formItem1.publishTime = _this.$public.timestampToTimeYMDhms(_this.formItem1.publishTime);
            editStock(_this.formItem).then(function (response) {
                if (response.data.code == 200) {
                    _this.mockTableData();
                } else {
                    _this.$Message.error('获取数据失败')
                }
            }).catch(function (error) {});
        },
        getstatus1(current){
            let _this = this;
            _this.modal7 = false;
            switch (current) {
                case '2':
                    // statements_1
                    break;
                default:
                    return false;
                    break;
            };
            // for (var variable in _this.formItem1) {
            //     _this.formItem1[variable] = "";
            //     if (!_this.formItem1[variable]) {
            //         _this.$Message.error('内容不能为空！');
            //         return false;
            //     }
            // // };
            // _this.formItem1.publishTime = _this.$public.timestampToTimeYMDhms(_this.formItem1.publishTime);
            addStock(_this.formItem1).then(function (response) {
                if (response.data.code == 200) {
                    _this.mockTableData();
                } else {
                    _this.$Message.error('获取数据失败')
                }
            }).catch(function (error) {});
        },
        handleSuccess (res, file) {
            let _this = this;
            if (res.code == 200) {
                _this.uploadList.status = file.status;
                _this.uploadList.url = _this.$config.baseUrl.pro + res.data;
                _this.formItem.coinImg = res.data;
            }else {
                _this.$Notice.warning({
                    title: '上传的文件错误',
                    desc: res.msg
                });
            };
        },
        handleSuccess1 (res, file) {
            let _this = this;
            if (res.code == 200) {
                _this.uploadList1.status = file.status;
                _this.uploadList1.url = _this.$config.baseUrl.pro + res.data;
                _this.formItem1.coinImg = res.data;
            }else {
                _this.$Notice.warning({
                    title: '上传的文件错误',
                    desc: res.msg
                });
            };
        },
        handleFormatError (file) {
            this.$Notice.warning({
                title: '上传的文件类型不正确',
                desc: '上传的' + file.name + ' 文件类型不正确,文件类型不是jpg，png'
            });
        },
        handleMaxSize (file) {
            this.$Notice.warning({
                title: '上传文件过大',
                desc: '上传' + file.name + '体积大于2M，请选择体积小点的文件'
            });
        },
    },
    mounted(){
        this.mockTableData();
    },
    components: {

    },
    props: {

    }
}
</script>
