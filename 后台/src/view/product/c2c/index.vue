<template>
  <div class="exchange">
    <Card shadow title="法币交易设置">
      <row class="join-page" :gutter="32">
        <i-col span="24">
          <row type="flex" justify="center">
            <i-col span="12" offset="3">
              <Form label-position="left" :label-width="180">
                <FormItem v-for="(item,index) in getWebConfig" :label="item.nameNotes" :key="index">
                  <Input type="number" v-model="item.value" placeholder>
                    <span slot="append">{{item.danwei}}</span>
                  </Input>
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
import { getc2c , editSys } from '@/api/product'
export default {
    name: 'exchange',
    data(){
        return {
            formInline: {
                user: '',
                password: ''
            },
            getWebConfig:{},
        }
    },

    methods:{
         handleRemove(asname) {
            let _this = this,_data = new Array();
            _data = JSON.stringify( _this.getWebConfig);
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
            getc2c().then(function (response) {
                if (response.data.code == 200) {
                    _this.getWebConfig = JSON.parse(JSON.stringify(response.data.result));
                    for(var j = 0, length2 = _this.getWebConfig .length; j < length2; j++){
                        switch (_this.getWebConfig[j].name) {
                            case 'fb_fee':
                                _this.getWebConfig[j].danwei = "%";
                                break;
                            case 'ck_price':
                                _this.getWebConfig[j].danwei = "CNY";
                                break;
                            case 'fb_time':
                                _this.getWebConfig[j].danwei = "分钟";
                                break;
                            case 'qr_time':
                                _this.getWebConfig[j].danwei = "分钟";
                                break;
                            case 'freeze_fee':
                                _this.getWebConfig[j].danwei = "USTD";
                                break;
                            case 'fb_open_min_num':
                                _this.getWebConfig[j].danwei = "个";
                                break;
                            default:
                                _this.getWebConfig[j].danwei = "";
                                break;
                        }
                    };
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
