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
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
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
  background: rgba(0, 0, 0, 0.6);
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
    <Card shadow title="币种资产">
      <!-- <Row>
        <Col span="1" offset="1" style="width: 100px">
          <Button type="primary" @click="onSearch">添加</Button>
        </Col>
      </Row>-->

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

      <!-- 拥有者列表 -->
      <Modal v-model="modal6" title="拥有者列表" :ok-text="'导出'" @on-ok="onExport" ref="test" width="800">
        <Form inline :label-width="80">
          <FormItem label="持有量大于">
            <Input v-model="formObj.price" />
          </FormItem>
          <FormItem :label-width="0">
            <Button type="primary" @click="searchModal6">搜索</Button>
          </FormItem>
          <FormItem :label-width="0">
            <Button type="primary" @click="rechargeModal6">充值</Button>
          </FormItem>
          <FormItem :label-width="0">
            <Button type="primary" @click="deductionModal6">扣款</Button>
          </FormItem>
        </Form>
        <Table :columns="tableColumns1" :data="tableData1" size="small" ref="table" @on-selection-change="change" stripe></Table>
        <Page
          :total="pageData1.total"
          :current="pageData1.curPage"
          @on-change="changePage1"
          :page-size="pageData1.pageSize"
        ></Page>
      </Modal>
    </Card>

    <!-- 资产管理 -->
      <Modal v-model="modal8" title="资产管理"  @on-ok="confirmAssets" :loading="loading8">
        <Form inline :label-width="90" :model="assetsMoney" ref="assetsMoney" :rules="assetsRules">
          <FormItem label="金额" prop="money" style="width:100%;">
            <Input v-model="assetsMoney.money" />
          </FormItem>
          <FormItem label="备注" prop="inspectReason" style="width:100%;">
            <Input type="textarea" :row="2" v-model="assetsMoney.inspectReason" />
          </FormItem>
        </Form>
      </Modal>
  </div>
</template>
<script>
import "./index.less";
import { currencyList, assetsList, ownerOperation } from "@/api/product";
import { file } from "@/api/data";
import excel from "@/libs/excel";

export default {
  name: "exchange",
  data() {
    return {
      code: "", //缓存code
      modal6: false,
      modal7: false,
      modal8: false,
      loading8: true,
      formItem: {
        name: ""
      },
      visible: false,
      uploadList: {
        url: "",
        status: ""
      },
      uploadList1: {
        url: "",
        status: ""
      },
      formItem1: {
        name: "", //名称
        code: "", //币种标识
        publishTime: "", //发行日期
        publishNum: "", //发行数量
        publishPrice: "", //发行单价
        publishWeb: "", //发行网站
        whitePaper: "", //白皮书
        remark: "", //中文简介
        coinImg: "", //币种图标
        minPrice: "", //最小变动价
        remarkUS: "", //英文简介
        coinCoinBuyFee: "", //交易手续费
        minNum: "", //最小下单数
        maxNum: "", //最大下单数
        maxStopLoss: "", //涨停值
        minStopLoss: "", //跌停值
        dealStartTime: "", //上午交易时间
        dealEndTime: "", //下午交易时间
        maxHave: "" //最大持有量
      },
      uploadfile: file(),
      tableData: [],
      tableData1: [], //拥有者列表
      tableColumns: [
        {
          title: "编号",
          key: "id",
          minWidth: 80,
          className: "column-hidden"
        },
        {
          title: "币种",
          key: "name",
          minWidth: 100
        },
        {
          title: "操作",
          key: "action",
          minWidth: 100,
          align: "center",
          fixed: "right",
          render: (h, params) => {
            let row = params.row;
            let _this = this;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.code = row.name;
                      this.seePossession();
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        }
      ],
      tableColumns1: [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
          title: "ID",
          key: "id",
          minWidth: 80,
          className: "column-hidden"
        },
        {
          title: "姓名",
          key: "username",
          minWidth: 100,
          className: "column-hidden"
        },
        {
          title: "电话",
          key: "tel",
          minWidth: 110,
          className: "column-hidden"
        },
        {
          title: "邮箱",
          key: "email",
          minWidth: 110,
          className: "column-hidden"
        },
        {
          title: "持有量",
          key: "totalCount",
          minWidth: 100
        }
      ],
      pageData: {
        total: 0, //总共多少数据
        pages: 0, //总页数
        curPage: 1, //当前页
        pageSize: 15 //每页数据条数
      },
      pageData1: {
        total: 0, //总共多少数据
        pages: 0, //总页数
        curPage: 1, //当前页
        pageSize: 15 //每页数据条数
      },
      formObj: {
        price: ""
      },
      IdList: [],
      assetsMoney: {
        money: "",
        inspectReason: ""
      },
      assetsRules: {
        money: [
          { required: true, message: "金额不能为空", trigger: "change" }
        ],
        inspectReason: [
          { required: true, message: "备注不能为空", trigger: "change" }
        ],
      }
    };
  },
  methods: {
    // 持有量条件搜索
    searchModal6() {
      this.pageData1.curPage = 1;
      this.ownerList();
    },
    //勾选框
      change(selection) {
        var _this = this;
        _this.IdList = [];
        for (var i = 0; i < selection.length; i++) {
          _this.IdList.push(selection[i].id)
        }
      },
    // 批量充值
    rechargeModal6() {
      if (!this.IdList.length) {
        this.$Message.warning("请先选择充值对象");
        return
      }
      this.modal8 = true;
      this.chargeType = "1";
    },
    // 批量扣款
    deductionModal6() {
      if (!this.IdList.length) {
        this.$Message.warning("请先选择扣款对象");
        return
      }
      this.modal8 = true;
      this.chargeType = "2";
    },
    confirmAssets() {
      this.loading8 = false;
      this.$nextTick(() => {
        this.loading8 = true;
      });
      this.$refs.assetsMoney.validate(valid => {
        if (valid) {
          let _data = {
            chargeType: this.chargeType,
            ids: this.IdList.join(","),
            stockCode: this.code,
            money: this.assetsMoney.money,
            inspectReason: this.assetsMoney.inspectReason
          }
          ownerOperation(_data).then(res => {
            if (res.data.code == "200") {
              this.$Message.success("操作成功");
              this.ownerList();
            } else {
              this.$Message.warning(res.data.message);
            }
            this.IdList = [];
            this.modal8 = false;
          }).catch(err => {
            this.IdList = [];
            this.modal8 = false;
          })
        }
      })
    },
    // 导出持有者列表
    onExport() {
      let _this = this;
      let _data = {
        pageNumber: _this.pageData1.curPage,
        pageSize: _this.pageData1.pageSize,
        code: _this.code
      };
      if (_this.formObj.price) {
        _data.price = _this.formObj.price;
      }
      currencyList(_data).then(function(response) {
        if (response.data.code == 200) {
          const params = {
            title: ["ID", "姓名", "电话", "邮箱", "持有量"],
            key: ["id", "username", "tel", "email", "totalCount"],
            data: response.data.result.list,
            autoWidth: true,
            filename: "拥有者列表"
          };
          excel.export_array_to_excel(params);
        } else {
          _this.$Message.info(response.data.message);
        }
      });
    },
    onSearch() {
      let _this = this;
      for (var variable in _this.formItem1) {
        _this.formItem1[variable] = "";
      }
      _this.modal7 = true;
    },
    // 切换页码
    changePage(current) {
      this.pageData.curPage = current;
      this.tableData = [];
      this.mockTableData();
    },
    changePage1(current) {
      this.pageData1.curPage = current;
      this.tableData1 = [];
      this.ownerList();
    },
    // 查看
    seePossession() {
      this.modal6 = true;
      this.ownerList();
    },
    //拥有者列表
    ownerList(price) {
      let _this = this;
      let _data = {
        pageNumber: _this.pageData1.curPage,
        pageSize: _this.pageData1.pageSize,
        code: this.code
      };
      if (_this.formObj.price) {
        _data.price = _this.formObj.price;
      }
      currencyList(_data)
        .then(function(response) {
          if (response.data.code == 200) {
            _this.tableData1 = response.data.result.list;
            _this.pageData.total = Number(response.data.result.total);
          } else {
            _this.$Message.error("获取数据失败");
          }
        })
        .catch(function(error) {});
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
      };
      for (var key in _data) {
        if (_data[key] == "") {
          delete _data[key];
        }
      }
      _this.getWebConfig = [];
      assetsList(_data)
        .then(function(response) {
          if (response.data.code == 200) {
            let count = 0;
            response.data.result.forEach(item => {
              _this.tableData.push({ id: count++, name: item });
            });
            // _this.num =   response.data.result.count.num; //总人数
            // _this.useMoney =   response.data.result.count.useMoney;//总可用余额(
            // _this.frozenMoney =   response.data.result.count.frozenMoney; //总冻结金额
            // _this.inMoney =   response.data.result.count.inMoney; //总入金
            // _this.outMoney =   response.data.result.count.outMoney ; //总出金
            _this.pageData.total = Number(response.data.total);
          } else {
            _this.$Message.error("获取数据失败");
          }
        })
        .catch(function(error) {});
    },
    getstatus(current) {
      let _this = this;
      _this.modal6 = false;
      switch (current) {
        case "2":
          // statements_1
          break;
        default:
          return false;
          break;
      }
      // _this.formItem1.publishTime = _this.$public.timestampToTimeYMDhms(_this.formItem1.publishTime);
      editJeton(_this.formItem)
        .then(function(response) {
          if (response.data.code == 200) {
            _this.mockTableData();
          } else {
            _this.$Message.error("获取数据失败");
          }
        })
        .catch(function(error) {});
    },
    getstatus1(current) {
      let _this = this;
      _this.modal7 = false;
      switch (current) {
        case "2":
          // statements_1
          break;
        default:
          return false;
          break;
      }
      for (let a in _this.formItem1) {
        if (_this.formItem1[a] == "") {
          delete _this.formItem1[a];
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
      addJeton(_this.formItem1)
        .then(function(response) {
          if (response.data.code == 200) {
            _this.mockTableData();
          } else {
            _this.$Message.error("获取数据失败");
          }
        })
        .catch(function(error) {});
    },
    handleSuccess(res, file) {
      let _this = this;
      if (res.code == 200) {
        _this.uploadList.status = file.status;
        _this.uploadList.url = _this.$config.baseUrl.pro + res.data;
        _this.formItem.coinImg = res.data;
      } else {
        _this.$Notice.warning({
          title: "上传的文件错误",
          desc: res.msg
        });
      }
    },
    handleSuccess1(res, file) {
      let _this = this;
      if (res.code == 200) {
        _this.uploadList1.status = file.status;
        _this.uploadList1.url = _this.$config.baseUrl.pro + res.data;
        _this.formItem1.coinImg = res.data;
      } else {
        _this.$Notice.warning({
          title: "上传的文件错误",
          desc: res.msg
        });
      }
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "上传的文件类型不正确",
        desc: "上传的" + file.name + " 文件类型不正确,文件类型不是jpg，png"
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "上传文件过大",
        desc: "上传" + file.name + "体积大于2M，请选择体积小点的文件"
      });
    }
  },
  mounted() {
    this.mockTableData();
  },
  components: {},
  props: {}
};
</script>
