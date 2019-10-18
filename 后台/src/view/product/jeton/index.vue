<style type="text/css">
  .column-hidden {
    width: 1px;
  }

  .demo-upload-list {
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
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
  }

  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }

  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }

  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }

  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
<template>
  <div class="exchange">
    <Card shadow title="代币配置">
      <Row>
        <Col span="1" offset="1" style="width: 100px">
          <Button type="primary" @click="onSearch">添加</Button>
        </Col>
      </Row>

      <!-- height属性：固定表头 -->
      <Table :columns="tableColumns" :data="tableData" size="small" ref="table" stripe></Table>
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
          <FormItem label="出币地址：" v-if="isUSDT">
            <Input type="text" v-model="formItem.contractAdress" placeholder=""></Input>
          </FormItem>
          <FormItem v-if="!isUSDT" label="归集地址:">
            <Input type="text" v-model="formItem.gjAddr" placeholder=""></Input>
          </FormItem>
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
          <FormItem label="币种系列:">
            <Input type="text" :value="formItem1.stockSeries='ETH'" readonly="true" placeholder=""></Input>
          </FormItem>
          <FormItem label="代币币种:">
            <Input type="text" v-model="formItem1.stockCode" placeholder=""></Input>
          </FormItem>
          <FormItem label="代币合约地址:">
            <Input type="text" v-model="formItem1.contractAdress"></Input>
          </FormItem>
          <!--<FormItem label="归集地址:">-->
          <!--<Input type="text" v-model="formItem1.gjAddr"></Input>-->
          <!--</FormItem>-->
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
  import {jetonList, editJeton, jetonDetail, addJeton} from '@/api/product'
  import {file} from '@/api/data'

  export default {
    name: 'exchange',
    data() {
      return {
        isUSDT: false,
        modal6: false,
        modal7: false,
        formItem: {
          name: ""
        },
        visible: false,
        uploadList: {
          url: "",
          status: "",
        },
        uploadList1: {
          url: "",
          status: "",
        },
        formItem1: {
          gjAddr: '',
          name: "",//名称
          code: "",//币种标识
          publishTime: "",//发行日期
          publishNum: "",//发行数量
          publishPrice: "",//发行单价
          publishWeb: "",//发行网站
          whitePaper: "",//白皮书
          remark: "",//中文简介
          coinImg: "",//币种图标
          minPrice: "",//最小变动价
          remarkUS: "",//英文简介
          coinCoinBuyFee: "",//交易手续费
          minNum: "",//最小下单数
          maxNum: "",//最大下单数
          maxStopLoss: "",//涨停值
          minStopLoss: "",//跌停值
          dealStartTime: "",//上午交易时间
          dealEndTime: "",//下午交易时间
          maxHave: "",//最大持有量
        },
        uploadfile: file(),
        tableData: [],
        tableColumns: [
          {
            title: '币种ID',
            key: 'id',
            minWidth: 80,
            className: 'column-hidden'
          },
          {
            title: '币种系列',
            key: 'stockSeries',
            minWidth: 100
          },
          {
            title: '代币币种',
            key: 'stockCode',
            minWidth: 130
          },
          {
            title: '代币合约地址',
            key: 'contractAdress',
            minWidth: 100,
            render(h, params) {
              if (params.row.stockCode == "USDT") {
                return h('div', {}, `(出币地址)${params.row.contractAdress}`)
              } else {
                return h('div', {}, params.row.contractAdress)
              }
            }
          },
          {
            title: '归集地址',
            key: 'gjAddr',
            minWidth: 100,
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
              if (row.stockCode == "ETH" || row.stockCode == "USDT") {
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
                        }
                        ;
                        jetonDetail({id: row.id}).then(function (response) {
                          if (response.data.code == 200) {
                            _this.modal6 = true;
                            _this.formItem = response.data.result;
                            if (response.data.result.coinImg) {
                              _this.uploadList.url = _this.$config.baseUrl.pro + response.data.result.coinImg;
                              _this.uploadList.status = _this.$config.baseUrl.pro + response.data.result.coinImg;
                            }
                            if (row.stockCode == 'USDT') {
                              _this.isUSDT = true
                            } else {
                              _this.isUSDT = false
                            }
                          } else {
                            _this.$Message.error('获取数据失败')
                          }
                        }).catch(function (error) {
                        });
                      }
                    }
                  }, '编辑')
                ]);
              } else {
                return h('div', {}, '--')
              }
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
    methods: {
      onSearch() {
        let _this = this;
        for (var variable in _this.formItem1) {
          _this.formItem1[variable] = "";
        }
        ;
        _this.modal7 = true;
      },
      // 切换页码
      changePage(current) {
        this.pageData.curPage = current
        this.tableData = this.mockTableData()
      },
      mockTableData() {
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
          }
          ;
        }
        ;
        _this.getWebConfig = [];
        jetonList(_data).then(function (response) {
          if (response.data.code == 200) {
            _this.tableData = response.data.result.list;
            // _this.num =   response.data.result.count.num; //总人数
            // _this.useMoney =   response.data.result.count.useMoney;//总可用余额(
            // _this.frozenMoney =   response.data.result.count.frozenMoney; //总冻结金额
            // _this.inMoney =   response.data.result.count.inMoney; //总入金
            // _this.outMoney =   response.data.result.count.outMoney ; //总出金
            _this.pageData.total = Number(response.data.total);
          } else {
            _this.$Message.error('获取数据失败')
          }
        }).catch(function (error) {
        });
      },
      getstatus(current) {
        let _this = this;
        _this.modal6 = false;
        switch (current) {
          case '2':
            // statements_1
            break;
          default:
            return false;
            break;
        }
        ;
        // _this.formItem1.publishTime = _this.$public.timestampToTimeYMDhms(_this.formItem1.publishTime);
        editJeton(_this.formItem).then(function (response) {
          if (response.data.code == 200) {
            _this.mockTableData();
          } else {
            _this.$Message.error('获取数据失败')
          }
        }).catch(function (error) {
        });
      },
      getstatus1(current) {
        let _this = this;
        _this.modal7 = false;
        switch (current) {
          case '2':
            // statements_1
            break;
          default:
            return false;
            break;
        }
        ;
        for (let a in _this.formItem1) {
          if (_this.formItem1[a] == '') {
            delete _this.formItem1[a]
          }
        }
        // for (var variable in _this.formItem1) {
        //     _this.formItem1[variable] = "";
        //     if (!_this.formItem1[variable]) {
        //         _this.$Message.error('内容不能为空！');
        //         return false;
        //     }
        // // };
        // _this.formItem1.publishTime = _this.$public.timestampToTimeYMDhms(_this.formItem1.publishTime);
        addJeton(_this.formItem1).then(function (response) {
          if (response.data.code == 200) {
            _this.mockTableData();
          } else {
            _this.$Message.error('获取数据失败')
          }
        }).catch(function (error) {
        });
      },
      handleSuccess(res, file) {
        let _this = this;
        if (res.code == 200) {
          _this.uploadList.status = file.status;
          _this.uploadList.url = _this.$config.baseUrl.pro + res.data;
          _this.formItem.coinImg = res.data;
        } else {
          _this.$Notice.warning({
            title: '上传的文件错误',
            desc: res.msg
          });
        }
        ;
      },
      handleSuccess1(res, file) {
        let _this = this;
        if (res.code == 200) {
          _this.uploadList1.status = file.status;
          _this.uploadList1.url = _this.$config.baseUrl.pro + res.data;
          _this.formItem1.coinImg = res.data;
        } else {
          _this.$Notice.warning({
            title: '上传的文件错误',
            desc: res.msg
          });
        }
        ;
      },
      handleFormatError(file) {
        this.$Notice.warning({
          title: '上传的文件类型不正确',
          desc: '上传的' + file.name + ' 文件类型不正确,文件类型不是jpg，png'
        });
      },
      handleMaxSize(file) {
        this.$Notice.warning({
          title: '上传文件过大',
          desc: '上传' + file.name + '体积大于2M，请选择体积小点的文件'
        });
      },
    },
    mounted() {
      this.mockTableData();
    },
    components: {},
    props: {}
  }
</script>
