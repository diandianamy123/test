<template>
    <div class="exchange">
        <Card shadow title="法币交易设置">
            <row class="join-page">
                <i-col span="24">
                    <row type="flex" justify="center">
                        <i-col span="20" offset="2">
                           <Form label-position="left" :label-width="180">
                                <FormItem v-for="(item,index) in getWebConfig"  :label="item.nameNotes" :key="index">
                                    <Input type="number" v-model="item.value" placeholder=""></Input>
                                </FormItem>
                                <FormItem>
                                    <Button @click="handleRemove('reg_type')">保存</Button>
                                </FormItem>
                            </Form>
                        </i-col>
                    </row>
                </i-col>
            </row>
        </Card>
    </div>
</template>
<script>
import './index.less'
import { getCoinCoin , editCoin } from '@/api/product'
export default {
    name: 'exchange',
    data(){
        return {
            formInline: {
                user: '',
                password: ''
            },
            myConfig:this.$public.UEconfig,
            contentUs:[],
            getWebConfig:[],
        }
    },
    methods:{
         handleRemove(asname) {
            let _this = this,_data = new Array();
            _data = JSON.stringify( _this.getWebConfig);
            editCoin({list:_data}).then(function (response) {
                if (response.data.code == 200) {
                    _this.$Message.success('修改成功');
                } else {
                    _this.$Message.error(response.data.message);
                };
                _this.getdata();
            }).catch(function (error) {});
        },
        getdata(){
            let _this = this;
            _this.getWebConfig = [];
            getCoinCoin().then(function (response) {
                if (response.data.code == 200) {
                    for(var j = 0, length2 = response.data.result.length; j < length2; j++){
                        switch (response.data.result[j].name) {
                            case 'coin_min_deal_money':
                                _this.getWebConfig.push(response.data.result[j]);
                                break;
                            case 'coin_coin_profit_rate':
                                _this.getWebConfig.push(response.data.result[j]);
                                break;
                            default:

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
