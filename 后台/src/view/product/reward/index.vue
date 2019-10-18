<template>
    <div class="exchange">
        <Card shadow title="奖励币种">
            <row class="join-page" :gutter="32">
                <i-col span="24">
                    <row type="flex" justify="center">
                        <i-col span="24">
                           <Form label-position="left" :label-width="100">
                                <FormItem label="奖励币种类型">
                                    <Row>
                                        <Col span="9">
                                           <Select v-model="give_code.value"  style="width:200px">
                                                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                            </Select>
                                        </Col>
                                        <Col span="3" offset="1">
                                            <Button @click="handleRemove('give_auth')">保存</Button>
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
        <Card shadow title="注册奖励">
            <row class="join-page":gutter="32">
                <i-col span="24">
                    <row type="flex" justify="center">
                        <i-col span="24">
                           <Form label-position="left">
                                <FormItem label="注册赠送类型">
                                    <Row>
                                        <Col span="3">
                                            <RadioGroup v-model="reg_type.value">
                                                <Radio label="1">
                                                    <span>余额</span>
                                                </Radio>
                                                <Radio label="2">
                                                    <span>锁仓</span>
                                                </Radio>
                                            </RadioGroup>
                                        </Col>
                                        <Col span="9" offset="1">
                                            <Input type="number" v-model="give_reg.value" placeholder="">
                                                <span slot="prepend">奖励</span>
                                                <span slot="append">个</span>
                                            </Input>
                                        </Col>
                                        <Col span="3" offset="1">
                                            <Button @click="handleRemove('reg_type')">保存</Button>
                                        </Col>
                                    </Row>
                                </FormItem>
                            </Form>
                        </i-col>
                    </row>
                </i-col>
            </row>
        </Card>
        <Card shadow title="实名认证奖励">
            <row class="join-page" :gutter="32">
                <i-col span="24">
                    <row type="flex" justify="center">
                        <i-col span="24">
                           <Form label-position="left" :label-width="100">
                                <FormItem>
                                    <Row>
                                        <Col span="9">
                                            <Input type="number" v-model="give_auth.value" placeholder="">
                                                <span slot="prepend">奖励</span>
                                                <span slot="append">个</span>
                                            </Input>
                                        </Col>
                                        <Col span="3" offset="1">
                                            <Button @click="handleRemove('give_auth')">保存</Button>
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
import './index.less'
import { giveType , editSys } from '@/api/product'
export default {
    name: 'reward',
    data(){
        return {
            formInline: {
                user: '',
                password: ''
            },
            cityList:[
                {
                    label:"ETC8",
                    value:"1",
                },
                {
                    label:"CLS",
                    value:"2",
                },
                {
                    label:"AXGY",
                    value:"3",
                }
            ],
            give_code:{},
            reg_type:{},
            give_reg:{},
            give_auth:{},
        }
    },
    methods:{
        handleRemove(asname) {
            let _this = this,_data;
            switch (asname) {
                case 'reg_type':
                    if (!_this.reg_type.value) {
                         _this.$Message.error('注册赠送类型不能为空');
                        return false;
                    };
                    if (!_this.give_reg.value) {
                         _this.$Message.error('注册赠送数量不能为空');
                        return false;
                    }
                    break;
                case 'give_auth':
                    if (!_this.give_auth.value) {
                         _this.$Message.error('实名认证奖励数量不能为空');
                        return false;
                    }
                    break;
                default:
                    // statements_def
                    break;
            }
            _data = JSON.stringify([_this.reg_type, _this.give_reg, _this.give_auth,_this.give_code])
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
            giveType().then(function (response) {
                if (response.data.code == 200) {
                    for(var j = 0, length2 = response.data.result.length; j < length2; j++){
                        switch (response.data.result[j].name) {
                            case 'reg_type':
                                _this.reg_type = response.data.result[j];
                                break;
                            case 'give_reg':
                                _this.give_reg = response.data.result[j];
                                break;
                            case 'give_auth':
                                _this.give_auth = response.data.result[j];
                                break;
                             case 'give_code':
                                _this.give_code = response.data.result[j];
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
