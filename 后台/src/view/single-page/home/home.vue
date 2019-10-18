<template>
    <div v-if="typexianshi">
        <Row :gutter="20">
            <i-col :xs="12" :md="8" :lg="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
                <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
                    <count-to :end="infor.count" count-class="count-style"/>
                    <p>{{ infor.title }}</p>
                </infor-card>
            </i-col>
        </Row>
        <Row :gutter="20" style="margin-top: 10px;">
            <i-col :md="24" :lg="12" style="margin-bottom: 20px;" >
                <Card shadow>
                <chart-bar style="height: 300px;" :value="barDatati" text="提币数量"/></Card>
            </i-col>
            <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
                <Card shadow>
                    <chart-pie style="height: 300px;" :value="pieDatati" text="各币种提币数量比例"></chart-pie>
                </Card>
            </i-col>
        </Row>
        <Row>
            <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
                <Card shadow>
                <chart-bar style="height: 300px;" :value="barDatachong" text="充币数量"/></Card>
            </i-col>
            <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
                <Card shadow>
                    <chart-pie style="height: 300px;" :value="pieDatachong" text="各币种充币数量比例"></chart-pie>
                </Card>
            </i-col>
        </Row>
    </div>
</template>
<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts'
import Example from './example.vue'
import { indexCount } from '@/api/data'
export default {
    name: 'home',
    components: {
        InforCard,
        CountTo,
        ChartPie,
        ChartBar,
        Example
    },
    data () {
        return {
            typexianshi:false,
            inforCardData: [
                { title: '待认证会员', icon: 'ios-aperture-outline', count: 803, color: '#2d8cf0' },
                { title: '正式会员', icon: 'ios-aperture', count: 232, color: '#19be6b' },
                { title: '会员总数', icon: 'md-aperture', count: 142, color: '#ff9900' },
                { title: '待审核提币数', icon: 'md-exit', count: 142, color: '#ed4014' },
                { title: 'C2C交易手续费', icon: 'md-cash', count: 142, color: 'rgb(154, 102, 228)' },
            ],
            pieDatachong: [
                { value: 0, name: '今日BTC充币' },
                { value: 0, name: '今日ETH充币' },
                { value: 0, name: '今日USDT充币' },
            ],
            pieDatati: [
                { value: 0, name: '今日BTC充币' },
                { value: 0, name: '今日ETH充币' },
                { value: 0, name: '今日USDT充币' },
            ],
            barDatachong: {
                BTC: 0,
                ETH: 0,
                USDT: 0,
            },
            barDatati: {
                BTC: 0,
                ETH: 0,
                USDT: 0,
            }
        }
    },
    methods:{
        getdata(){
            let _this = this;
            indexCount().then(function(response) {
                if(response.data.code == 200) {
                    _this.inforCardData[0].count =  response.data.result.waitAuditUser;
                    _this.inforCardData[1].count =  response.data.result.officialUser;
                    _this.inforCardData[2].count =  response.data.result.totalUser;
                    _this.inforCardData[3].count =  response.data.result.waitAuditCoin;
                    _this.inforCardData[4].count =  response.data.result.dealFeeTotal;
                    for (var variable in response.data.result) {
                        switch (variable) {
                            case 'BTC':
                                _this.pieDatachong[0].value = response.data.result[variable].charge;
                                _this.barDatachong.BTC = response.data.result[variable].charge;
                                _this.pieDatati[0].value = response.data.result[variable].mention;
                                _this.barDatati.BTC = response.data.result[variable].mention;
                                break;
                            case 'ETH':
                                _this.pieDatachong[1].value = response.data.result[variable].charge;
                                _this.barDatachong.ETH = response.data.result[variable].charge;
                                _this.pieDatati[1].value = response.data.result[variable].mention;
                                _this.barDatati.ETH = response.data.result[variable].mention;
                                break;
                            case 'USDT':
                                _this.pieDatachong[2].value = response.data.result[variable].charge;
                                _this.barDatachong.USDT = response.data.result[variable].charge;
                                _this.pieDatati[2].value = response.data.result[variable].mention;
                                _this.barDatati.USDT = response.data.result[variable].mention;
                                break;
                            default:
                                // statements_def
                                break;
                        }
                    };

                }else {
                    _this.$Message.error('获取数据失败');
                }
            }).catch(function(error) {});
        }
    },
    mounted () {
        
        let _this = this;
        _this.getdata();
        window.setTimeout(function(){
            _this.typexianshi = true;
        },800)
    }
}
</script>
<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
