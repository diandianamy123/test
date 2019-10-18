<template>
  <div class="exchange">
    <Card shadow v-for="(item,index) in getWebConfig" :title="index+'提币设置'" :key="index">
      <row class="join-page" :gutter="32">
        <i-col span="24">
          <row type="flex" justify="center">
            <i-col span="24">
              <Form label-position="left" :label-width="100">
                <FormItem>
                  <Row>
                    <Col span="5" offset="1" v-for="(ite,idx) in item" :key="idx">
                      <Input type="text" v-model="ite.value" placeholder="">
                      <span slot="prepend">{{ite.nameNotes}}</span>
                      <span slot="append">%</span>
                      </Input>
                    </Col>
                    <!--<Col span="6" offset="1">-->
                    <!--<Input type="text" v-model="ite[1]" placeholder="">-->
                    <!--<span slot="prepend">最小提币数量</span>-->
                    <!--<span slot="append">个{{index}}</span>-->
                    <!--</Input>-->
                    <!--</Col>-->
                    <!--<Col span="6" offset="1">-->
                    <!--<Input type="text" v-model="ite[2]" placeholder="">-->
                    <!--<span slot="prepend">最大提币数量</span>-->
                    <!--<span slot="append">个{{index}}</span>-->
                    <!--</Input>-->
                    <!--</Col>-->
                    <Col span="3" offset="1">
                      <Button @click="handleRemove(index)">保存</Button>
                    </Col>
                  </Row>
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
  import {getWebConfig, editSys} from '@/api/product'

  export default {
    name: 'exchange',
    data() {
      return {
        formInline: {
          user: '',
          password: ''
        },
        getWebConfig: {},
      }
    },
    methods: {
      handleRemove(asname) {
        let _this = this, _data = new Array();
        for (var variable in _this.getWebConfig) {
          for (var j = 0, length2 = _this.getWebConfig[variable].length; j < length2; j++) {
            _data.push(_this.getWebConfig[variable][j]);
          }
        }
        ;
        _data = JSON.stringify(_data);
        editSys({list: _data}).then(function (response) {
          if (response.data.code == 200) {
            _this.$Message.success('修改成功');
          } else {
            _this.$Message.error(response.data.message);
          }
          ;
          _this.getdata();
        }).catch(function (error) {
        })
      },
      getdata() {
        let _this = this;
        getWebConfig().then(function (response) {
          if (response.data.code == 200) {
            _this.getWebConfig = JSON.parse(JSON.stringify(response.data.result));
            for (var variable in response.data.result) {
              switch (variable) {
                case 'ADA':
                  delete _this.getWebConfig[variable];
                  break;
                case 'BCH':
                  delete _this.getWebConfig[variable];
                  break;
                case 'BRN':
                  delete _this.getWebConfig[variable];
                  break;
                case 'ETC':
                  delete _this.getWebConfig[variable];
                  break;
                case 'LTC':
                  delete _this.getWebConfig[variable];
                  break;
                case 'OMG':
                  delete _this.getWebConfig[variable];
                  break;
                case 'XMR':
                  delete _this.getWebConfig[variable];
                  break;
                case 'EOS':
                  delete _this.getWebConfig[variable];
                  break;
                case 'XRP':
                  delete _this.getWebConfig[variable];
                  break;
                case 'THA':
                  delete _this.getWebConfig[variable];
                  break;
                default:
                  for (var j = 0, length2 = response.data.result[variable].length; j < length2; j++) {
                    switch (response.data.result[variable][j].name) {
                      case 'tb_fee_btc':
                        _this.getWebConfig[variable][0] = response.data.result[variable][j];
                        break;
                      case 'tb_min_btc':
                        _this.getWebConfig[variable][1] = response.data.result[variable][j];
                        break;
                      case 'tb_max_btc':
                        _this.getWebConfig[variable][2] = response.data.result[variable][j];
                        break;
                      // case 'tb_fee_eos':
                      //     _this.getWebConfig[variable][0] = response.data.result[variable][j];
                      //     break;
                      // case 'tb_min_eos':
                      //      _this.getWebConfig[variable][1] = response.data.result[variable][j];
                      //     break;
                      // case 'tb_max_eos':
                      //      _this.getWebConfig[variable][2] = response.data.result[variable][j];
                      //     break;
                      case 'tb_fee_eth':
                        _this.getWebConfig[variable][0] = response.data.result[variable][j];
                        break;
                      case 'tb_min_eth':
                        _this.getWebConfig[variable][1] = response.data.result[variable][j];
                        break;
                      case 'tb_max_eth':
                        _this.getWebConfig[variable][2] = response.data.result[variable][j];
                        break;
                      case 'tb_fee_usdt':
                        _this.getWebConfig[variable][0] = response.data.result[variable][j];
                        break;
                      case 'tb_min_usdt':
                        _this.getWebConfig[variable][1] = response.data.result[variable][j];
                        break;
                      case 'tb_max_usdt':
                        _this.getWebConfig[variable][2] = response.data.result[variable][j];
                        break;
                      default:
                        // statements_def
                        break;
                    }

                  }
                  break;
              }
            }
            console.log(_this.getWebConfig)
          } else {
            _this.$Message.error('获取数据失败')
          }
        }).catch(function (error) {
        });
      }
    },
    mounted() {
      this.getdata();
    },
    components: {},
    props: {}
  }
</script>
