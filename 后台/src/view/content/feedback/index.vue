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
    <Card shadow title="反馈列表">
      <!--<Row>-->
        <!--<Col span="1" offset="1" style="width: 100px">-->
          <!--<Button type="primary" @click="onSearch">添加</Button>-->
        <!--</Col>-->
      <!--</Row>-->

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
      <!--<Modal-->
      <!--v-model="modal6"-->
      <!--title="拥有者列表"-->
      <!--ref="test">-->
      <!--<Table :columns="tableColumns1" :data="tableData1" size="small" ref="table" stripe></Table>-->
      <!--<Page-->
      <!--:total="pageData1.total"-->
      <!--:current="pageData1.curPage"-->
      <!--@on-change="changePage1"-->
      <!--:page-size="pageData1.pageSize"-->
      <!--&gt;</Page>-->
      <!--</Modal>-->
    </Card>
  </div>
</template>
<script>
  import './index.less'
  import {feedback, feedbackDelete} from '@/api/content'
  import {file} from '@/api/data';
  import excel from '@/libs/excel';

  export default {
    name: 'exchange',
    data() {
      return {
        code: '',//缓存code
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
        uploadfile: file(),
        tableData: [],
        tableData1: [],  //拥有者列表
        tableColumns: [
          {
            title: '账号姓名',
            key: 'stockUserName',
            minWidth: 80,
            className: 'column-hidden',
            render: (h, params) => {
              if (params.row.stockUserName) {
                return h("span", params.row.stockUserName)
              } else {
                return h("span", "--")
              }
            }
          },
          {
            title: '联系方式',
            key: 'contactInformation',
            minWidth: 100
          },
          {
            title: '内容',
            key: 'content',
            minWidth: 100
          },
          {
            title: '创建时间',
            key: 'createTime',
            minWidth: 100
          },
          {
            title: "操作",
            minWidth: 100,
            render: (h, params) => {
              return h("Button", {
                props: {
                  size: "small",
                  type: "primary"
                },
                on: {
                  click: () => {
                    this.deleteFeedback(params.row.id);
                  }
                }
              }, "删除")
            }
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
        }
      }
    },
    methods: {
      // 切换页码
      changePage(current) {
        this.pageData.curPage = current
        this.tableData = []
        this.mockTableData()
      },
      mockTableData() {
        let _this = this;
        let _data = {
          pageNumber: _this.pageData.curPage,
          pageSize: _this.pageData.pageSize,
        }
        for (var key in _data) {
          if (_data[key] == '') {
            delete _data[key];
          }
          ;
        }
        ;
        _this.getWebConfig = [];
        feedback(_data).then(function (response) {
          if (response.data.code == 200) {
            _this.tableData = response.data.result.list
            _this.pageData.total = Number(response.data.result.total);
          } else {
            _this.$Message.error('获取数据失败')
          }
        }).catch(function (error) {
        });
      },
      // 删除
      deleteFeedback(id) {
        feedbackDelete({id: id}).then(res => {
          if (res.data.code == "200") {
            this.$Message.success("操作成功");
            this.mockTableData();
          } else {
            this.$Message.warning(res.data.message);
          }
        }).catch(err => {})
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
