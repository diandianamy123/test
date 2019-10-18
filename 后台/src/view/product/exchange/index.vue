<template>
    <div class="exchange">
        <Card shadow title="USDT兑换">
            <row class="join-page":gutter="32">
                <i-col span="24">
                    <row type="flex" justify="center">
                        <i-col span="24">
                           <Form label-position="left">
                                <FormItem>
                                    <Row>
                                        <Col span="4">
                                            <Input type="number" v-model="usdtetc8.exchangeFee" placeholder="">
                                                <span slot="prepend">USDT兑换ETC8</span>
                                                <span slot="append">%</span>
                                            </Input>
                                        </Col>
                                        <Col span="4" offset="1">
                                            <Input type="number" v-model="usdtetc8.feeRate" placeholder="">
                                                <span slot="prepend">手续费</span>
                                                <span slot="append">%</span>
                                            </Input>
                                        </Col>
                                        <Col span="4" offset="1">
                                            <Input type="number" v-model="usdtetc8.exchangeCoinMax" placeholder="">
                                                <span slot="prepend">最大兑换</span>
                                                <span slot="append">个</span>
                                            </Input>
                                        </Col>
                                        <Col span="4" offset="1">
                                            <Input type="number" v-model="usdtetc8.exchangeCoinMin" placeholder="">
                                                <span slot="prepend">最小兑换</span>
                                                <span slot="append">个</span>
                                            </Input>
                                        </Col>
                                        <Col span="3">
                                            <RadioGroup v-model="usdtetc8.status">
                                                <Radio :label="1">
                                                    <span>开启</span>
                                                </Radio>
                                                <Radio :label="0">
                                                    <span>关闭</span>
                                                </Radio>
                                            </RadioGroup>
                                        </Col>
                                        <Col span="1" offset="1">
                                            <Button @click="handleRemove('usdtetc8')">保存</Button>
                                        </Col>
                                    </Row>
                                </FormItem>
                                 <FormItem>
                                    <Row>
                                        <Col span="4">
                                            <Input type="number" v-model="usdtcls.exchangeFee" placeholder="">
                                                <span slot="prepend">USDT兑换CLS</span>
                                                <span slot="append">%</span>
                                            </Input>
                                        </Col>
                                        <Col span="4" offset="1">
                                            <Input type="number" v-model="usdtcls.feeRate" placeholder="">
                                                <span slot="prepend">手续费</span>
                                                <span slot="append">%</span>
                                            </Input>
                                        </Col>
                                        <Col span="4" offset="1">
                                            <Input type="number" v-model="usdtcls.exchangeCoinMax" placeholder="">
                                                <span slot="prepend">最大兑换</span>
                                                <span slot="append">个</span>
                                            </Input>
                                        </Col>
                                        <Col span="4" offset="1">
                                            <Input type="number" v-model="usdtcls.exchangeCoinMin" placeholder="">
                                                <span slot="prepend">最小兑换</span>
                                                <span slot="append">个</span>
                                            </Input>
                                        </Col>
                                        <Col span="3">
                                            <RadioGroup v-model="usdtcls.status">
                                                <Radio :label="1">
                                                    <span>开启</span>
                                                </Radio>
                                                <Radio :label="0">
                                                    <span>关闭</span>
                                                </Radio>
                                            </RadioGroup>
                                        </Col>
                                        <Col span="1" offset="1">
                                            <Button @click="handleRemove('usdtcls')">保存</Button>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem>
                                    <Row>
                                        <Col span="4">
                                            <Input type="number" v-model="usdtaxgy.exchangeFee" placeholder="">
                                                <span slot="prepend">USDT兑换AXGY</span>
                                                <span slot="append">%</span>
                                            </Input>
                                        </Col>
                                        <Col span="4" offset="1">
                                            <Input type="number" v-model="usdtaxgy.feeRate" placeholder="">
                                                <span slot="prepend">手续费</span>
                                                <span slot="append">%</span>
                                            </Input>
                                        </Col>
                                        <Col span="4" offset="1">
                                            <Input type="number" v-model="usdtaxgy.exchangeCoinMax" placeholder="">
                                                <span slot="prepend">最大兑换</span>
                                                <span slot="append">个</span>
                                            </Input>
                                        </Col>
                                        <Col span="4" offset="1">
                                            <Input type="number" v-model="usdtaxgy.exchangeCoinMin" placeholder="">
                                                <span slot="prepend">最小兑换</span>
                                                <span slot="append">个</span>
                                            </Input>
                                        </Col>
                                        <Col span="3">
                                            <RadioGroup v-model="usdtaxgy.status">
                                                <Radio :label="1">
                                                    <span>开启</span>
                                                </Radio>
                                                <Radio :label="0">
                                                    <span>关闭</span>
                                                </Radio>
                                            </RadioGroup>
                                        </Col>
                                        <Col span="1" offset="1">
                                            <Button @click="handleRemove('usdtaxgy')">保存</Button>
                                        </Col>
                                    </Row>
                                </FormItem>
                            </Form>
                        </i-col>
                    </row>
                </i-col>
            </row>
        </Card>
        <Card shadow title="AXGY兑换">
            <row class="join-page" :gutter="32">
                <i-col span="24">
                    <row type="flex" justify="center">
                        <i-col span="24">
                           <Form label-position="left">
                                <FormItem>
                                    <Row>
                                       <Col span="4">
                                            <Input type="number" v-model="axgyusdt.exchangeFee" placeholder="">
                                                <span slot="prepend">"AXGY兑换USDT</span>
                                                <span slot="append">%</span>
                                            </Input>
                                        </Col>
                                        <Col span="4" offset="1">
                                            <Input type="number" v-model="axgyusdt.feeRate" placeholder="">
                                                <span slot="prepend">手续费</span>
                                                <span slot="append">%</span>
                                            </Input>
                                        </Col>
                                        <Col span="4" offset="1">
                                            <Input type="number" v-model="axgyusdt.exchangeCoinMax" placeholder="">
                                                <span slot="prepend">最大兑换</span>
                                                <span slot="append">个</span>
                                            </Input>
                                        </Col>
                                        <Col span="4" offset="1">
                                            <Input type="number" v-model="axgyusdt.exchangeCoinMin" placeholder="">
                                                <span slot="prepend">最小兑换</span>
                                                <span slot="append">个</span>
                                            </Input>
                                        </Col>
                                        <Col span="3">
                                            <RadioGroup v-model="axgyusdt.status">
                                                <Radio :label="1">
                                                    <span>开启</span>
                                                </Radio>
                                                <Radio :label="0">
                                                    <span>关闭</span>
                                                </Radio>
                                            </RadioGroup>
                                        </Col>
                                        <Col span="1" offset="1">
                                            <Button @click="handleRemove('axgyusdt')">保存</Button>
                                        </Col>
                                    </Row>
                                </FormItem>
                            </Form>
                        </i-col>
                        <i-col span="12">
                        </i-col>
                    </row>
                </i-col>
            </row>
        </Card>
    </div>
</template>
<script>
import './index.less';
import { exchangeList , editExchangCode } from '@/api/product'
export default {
    name: 'exchange',
    data(){
        return {
            usdtetc8:{},
            usdtcls:{},
            usdtaxgy:{},
            axgyusdt:{},
        }
    },
    methods:{
        handleRemove(asname) {
            let _this = this,_data;
            switch (asname) {
                case 'usdtetc8':
                    if (!_this.$public.yanzhziduan(_this.usdtetc8)) {
                        _this.$Message.error('USDT兑换ETC8内容不能为空');
                        return false;
                    };
                    _data = _this.usdtetc8;
                    break;
                case 'usdtcls':
                    if (!_this.$public.yanzhziduan(_this.usdtcls)) {
                        _this.$Message.error('USDT兑换CLS内容不能为空');
                        return false;
                    };
                    _data = _this.usdtcls;
                    break;
                case 'usdtaxgy':
                    if (!_this.$public.yanzhziduan(_this.usdtaxgy)) {
                        _this.$Message.error('USDT兑换AXGY内容不能为空');
                        return false;
                    };
                    _data = _this.usdtaxgy;
                    break;
                case 'axgyusdt':
                    if (!_this.$public.yanzhziduan(_this.axgyusdt)) {
                        _this.$Message.error('AXGY兑换USDT内容不能为空');
                        return false;
                    };
                    _data = _this.axgyusdt;
                    break;
                default:
                    // statements_def
                    break;
            }
            editExchangCode(_data).then(function (response) {
                if (response.data.code == 200) {
                    _this.$Message.success('修改成功');
                } else {
                    _this.$Message.error(response.data.message);
                };
                _this.getdata();
            }).catch(function (error) {})
        },
        getdata(){
            let _this = this;
            exchangeList({}).then(function (response) {
                if (response.data.code == 200) {
                    for(var j = 0, length2 = response.data.result.list.length; j < length2; j++){
                        response.data.result.list[j].stockCode
                        switch (response.data.result.list[j].stockCode) {
                            case 'AXGY/USDT':
                                _this.axgyusdt = response.data.result.list[j];
                                break;
                            case 'USDT/AXGY':
                                _this.usdtaxgy = response.data.result.list[j];
                                break;
                            case 'USDT/ETC8':
                                _this.usdtetc8 = response.data.result.list[j];
                                break;
                            case 'USDT/CLS':
                                _this.usdtcls = response.data.result.list[j];
                                break;
                            default:
                                // statements_def
                                break;
                        }
                    }
                } else {
                    _this.$Message.error('获取数据失败')
                }
            }).catch(function (error) {});
        }
    },
    mounted(){
        this.getdata();
    },
    components: {
        
    },
    props: {

    }
}
</script>
