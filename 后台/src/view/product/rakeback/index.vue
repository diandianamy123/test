<template>
    <div class="exchange">
        <!-- <Card shadow title="普通矿工">
            <row type="flex" justify="center">
                <i-col span="24">
                    <row type="flex" justify="center">
                        <i-col span="24">
                           <Form label-position="left">
                                <FormItem>
                                    <Row>
                                        <Col span="5">
                                            <Input type="number" v-model="formInline.user" placeholder="">
                                                <span slot="prepend">直接推荐</span>
                                                <span slot="append">个</span>
                                            </Input>
                                        </Col>
                                        <Col span="5" offset="1">
                                            <Input type="number" v-model="formInline.user" placeholder="">
                                                <span slot="prepend">拿一代矿机产币</span>
                                                <span slot="append">%</span>
                                            </Input>
                                        </Col>
                                        <Col span="5" offset="1">
                                            <Input type="number" v-model="formInline.user" placeholder="">
                                                <span slot="prepend">拿二代矿机产币</span>
                                                <span slot="append">%</span>
                                            </Input>
                                        </Col>
                                        <Col span="4" offset="1">
                                            <Input type="number" v-model="formInline.user" placeholder="">
                                                <span slot="prepend">拿三代矿机产币</span>
                                                <span slot="append">%</span>
                                            </Input>
                                        </Col>
                                    </Row>
                                </FormItem>
                            </Form>
                        </i-col>
                    </row>
                </i-col>
            </row>
        </Card> -->
        <Card shadow title="初级矿工">
            <row type="flex" justify="center">
                <i-col span="24">
                    <row type="flex" justify="center">
                        <i-col span="24">
                           <Form label-position="left">
                                <FormItem>
                                    <Row>
                                        <Col span="5">
                                            <Input type="number" v-model="one_miner_num.value" placeholder="">
                                                <span slot="prepend">直接推荐</span>
                                                <span slot="append">个</span>
                                            </Input>
                                        </Col>
                                        <Col span="5" offset="1">
                                            <Input type="number" v-model="one_bubble_return.value" placeholder="">
                                                <span slot="prepend">拿一代矿机产币</span>
                                                <span slot="append">%</span>
                                            </Input>
                                        </Col>
                                        <!-- <Col span="5" offset="1">
                                            <Input type="number" v-model="formInline.user" placeholder="">
                                                <span slot="prepend">拿二代矿机产币</span>
                                                <span slot="append">%</span>
                                            </Input>
                                        </Col>
                                        <Col span="4" offset="1">
                                            <Input type="number" v-model="formInline.user" placeholder="">
                                                <span slot="prepend">拿三代矿机产币</span>
                                                <span slot="append">%</span>
                                            </Input>
                                        </Col> -->
                                    </Row>
                                </FormItem>
                            </Form>
                        </i-col>
                    </row>
                </i-col>
            </row>
        </Card>
        <Card shadow title="中级矿工">
            <row type="flex" justify="center">
                <i-col span="24">
                    <row type="flex" justify="center">
                        <i-col span="24">
                           <Form label-position="left">
                                <FormItem>
                                    <Row>
                                        <Col span="5">
                                            <Input type="number" v-model="two_miner_num.value" placeholder="">
                                                <span slot="prepend">直接推荐</span>
                                                <span slot="append">个</span>
                                            </Input>
                                        </Col>
                                        <!-- <Col span="5" offset="1">
                                            <Input type="number" v-model="formInline.user" placeholder="">
                                                <span slot="prepend">拿一代矿机产币</span>
                                                <span slot="append">%</span>
                                            </Input>
                                        </Col> -->
                                        <Col span="5" offset="1">
                                            <Input type="number" v-model="two_bubble_return.value" placeholder="">
                                                <span slot="prepend">拿二代矿机产币</span>
                                                <span slot="append">%</span>
                                            </Input>
                                        </Col>
                                        <!-- <Col span="4" offset="1">
                                            <Input type="number" v-model="formInline.user" placeholder="">
                                                <span slot="prepend">拿三代矿机产币</span>
                                                <span slot="append">%</span>
                                            </Input>
                                        </Col> -->
                                    </Row>
                                </FormItem>
                            </Form>
                        </i-col>
                    </row>
                </i-col>
            </row>
        </Card>
        <Card shadow title="高级矿工">
            <row type="flex" justify="center">
                <i-col span="24">
                    <row type="flex" justify="center">
                        <i-col span="24">
                           <Form label-position="left">
                                <FormItem>
                                    <Row>
                                        <Col span="5">
                                            <Input type="number" v-model="three_miner_num.value" placeholder="">
                                                <span slot="prepend">直接推荐</span>
                                                <span slot="append">个</span>
                                            </Input>
                                        </Col>
                                        <!-- <Col span="5" offset="1">
                                            <Input type="number" v-model="formInline.user" placeholder="">
                                                <span slot="prepend">拿一代矿机产币</span>
                                                <span slot="append">%</span>
                                            </Input>
                                        </Col>
                                        <Col span="5" offset="1">
                                            <Input type="number" v-model="formInline.user" placeholder="">
                                                <span slot="prepend">拿二代矿机产币</span>
                                                <span slot="append">%</span>
                                            </Input>
                                        </Col> -->
                                        <Col span="5" offset="1">
                                            <Input type="number" v-model="three_bubble_return.value" placeholder="">
                                                <span slot="prepend">拿三代矿机产币</span>
                                                <span slot="append">%</span>
                                            </Input>
                                        </Col>
                                    </Row>
                                </FormItem>
                            </Form>
                        </i-col>
                    </row>
                </i-col>
            </row>
        </Card>
        <Card shadow title="普通节点">
            <row type="flex" justify="center">
                <i-col span="24">
                    <row type="flex" justify="center">
                        <i-col span="24">
                           <Form label-position="left">
                                <FormItem>
                                    <Row>
                                        <Col span="5">
                                            <Input type="number" v-model="four_miner_num.value" placeholder="">
                                                <span slot="prepend">直接推荐</span>
                                                <span slot="append">个</span>
                                            </Input>
                                        </Col>
                                        <Col span="6" offset="1">
                                            <Input type="number" v-model="activate_general_user_coin.value" placeholder="">
                                                <span slot="prepend">激活节点所需平台币数</span>
                                                <span slot="append">个</span>
                                            </Input>
                                        </Col>
                                        <Col span="5" offset="1">
                                            <Input type="number" v-model="four_bubble_return.value" placeholder="">
                                                <span slot="prepend">四至十代矿机产币收入</span>
                                                <span slot="append">%</span>
                                            </Input>
                                        </Col>
                                    </Row>
                                </FormItem>
                            </Form>
                        </i-col>
                    </row>
                </i-col>
            </row>
        </Card>
        <Card shadow title="超级节点">
            <row type="flex" justify="center">
                <i-col span="24">
                    <row type="flex" justify="center">
                        <i-col span="24">
                           <Form label-position="left">
                                <FormItem>
                                    <Row>
                                        <Col span="5">
                                            <Input type="number" v-model="five_miner_num.value" placeholder="">
                                                <span slot="prepend">直接推荐</span>
                                                <span slot="append">个</span>
                                            </Input>
                                        </Col>
                                        <Col span="6" offset="1">
                                            <Input type="number" v-model="activate_super_user_coin.value" placeholder="">
                                                <span slot="prepend">激活节点所需平台币数</span>
                                                <span slot="append">个</span>
                                            </Input>
                                        </Col>
                                        <Col span="6" offset="1">
                                            <Input type="number" v-model="five_bubble_return.value" placeholder="">
                                                <span slot="prepend">十一代至三十代矿机产币</span>
                                                <span slot="append">%</span>
                                            </Input>
                                        </Col>
                                    </Row>
                                </FormItem>
                            </Form>
                        </i-col>
                    </row>
                </i-col>
            </row>
        </Card>
        <Row style="padding-top: 20px;">
            <Col span="3" offset="21">
                <Button @click="handleRemove()">保存</Button>
            </Col>
        </Row>
    </div>
</template>
<script>
import './index.less'
import { giveCon , editSys } from '@/api/product'
export default {
    name: 'reward',
    data(){
        return {
            formInline: {
                user: '',
                password: ''
            },
            one_miner_num:{},
            two_miner_num:{},
            three_miner_num:{},
            four_miner_num:{},
            five_miner_num:{},
            one_bubble_return:{},
            two_bubble_return:{},
            three_bubble_return:{},
            four_bubble_return:{},
            five_bubble_return:{},
            activate_general_user_coin:{},
            activate_super_user_coin:{},
        }
    },
    methods:{
        handleRemove(name) {
            let _this = this,_data;
            if (!_this.one_miner_num.value) {
                 _this.$Message.error('初级矿工最小直接推荐人数不能为空');
                return false;
            };
            if (!_this.two_miner_num.value) {
                 _this.$Message.error('中级矿工最小直接推荐人数不能为空');
                return false;
            };
            if (!_this.three_miner_num.value) {
                 _this.$Message.error('高级矿工最小直接推荐人数不能为空');
                return false;
            };
            if (!_this.four_miner_num.value) {
                 _this.$Message.error('普通节点最小直接推荐人数不能为空');
                return false;
            };
            if (!_this.five_miner_num.value) {
                 _this.$Message.error('超级节点最小直接推荐人数不能为空');
                return false;
            };
            if (!_this.one_bubble_return.value) {
                 _this.$Message.error('一代矿机产币返佣比例百分比不能为空');
                return false;
            };
            if (!_this.two_bubble_return.value) {
                 _this.$Message.error('二代矿机产币返佣比例百分比不能为空');
                return false;
            };
            if (!_this.three_bubble_return.value) {
                 _this.$Message.error('三代矿机产币返佣比例百分比不能为空');
                return false;
            };
            if (!_this.four_bubble_return.value) {
                 _this.$Message.error('四至十代矿机产币返佣比例百分比不能为空');
                return false;
            };
            if (!_this.five_bubble_return.value) {
                 _this.$Message.error('十一代至三十代矿机产币返佣比例百分比不能为空');
                return false;
            };
            if (!_this.activate_general_user_coin.value) {
                 _this.$Message.error('激活普通节点所需平台币数不能为空');
                return false;
            };
            if (!_this.activate_super_user_coin.value) {
                 _this.$Message.error('激活超级节点所需平台币数不能为空');
                return false;
            };
            _data = JSON.stringify([
                _this.one_miner_num,
                _this.two_miner_num,
                _this.three_miner_num,
                _this.four_miner_num,
                _this.five_miner_num,
                _this.one_bubble_return,
                _this.two_bubble_return,
                _this.three_bubble_return,
                _this.four_bubble_return,
                _this.five_bubble_return,
                _this.activate_general_user_coin,
                _this.activate_super_user_coin,
                ]);
            editSys({list:_data}).then(function (response) {
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
            giveCon().then(function (response) {
                if (response.data.code == 200) {
                    for(var j = 0, length2 = response.data.result.length; j < length2; j++){
                        switch (response.data.result[j].name) {
                            case 'one_miner_num':
                                _this.one_miner_num = response.data.result[j];
                                break;
                            case 'two_miner_num':
                                _this.two_miner_num = response.data.result[j];
                                break;
                            case 'three_miner_num':
                                _this.three_miner_num = response.data.result[j];
                                break;
                            case 'four_miner_num':
                                _this.four_miner_num = response.data.result[j];
                                break;
                            case 'five_miner_num':
                                _this.five_miner_num = response.data.result[j];
                                break;
                            case 'one_bubble_return':
                                _this.one_bubble_return = response.data.result[j];
                                break;
                            case 'two_bubble_return':
                                _this.two_bubble_return = response.data.result[j];
                                break;
                            case 'three_bubble_return':
                                _this.three_bubble_return = response.data.result[j];
                                break;
                            case 'four_bubble_return':
                                _this.four_bubble_return = response.data.result[j];
                                break;
                            case 'five_bubble_return':
                                _this.five_bubble_return = response.data.result[j];
                                break;
                            case 'activate_general_user_coin':
                                _this.activate_general_user_coin = response.data.result[j];
                                break;
                            case 'activate_super_user_coin':
                                _this.activate_super_user_coin = response.data.result[j];
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
