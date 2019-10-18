<template>
    <div class="manage_log">
        <Form :model="formItem" :label-width="100">
            <Row style="padding-bottom: 20px">
                <Col span="5">
                    <FormItem label="订单编号">
                        <Input v-model="formItem.entrustNo" placeholder="订单编号"/>
                    </FormItem>
                </Col>
                <Col span="5">
                    <FormItem label="申诉人编号">
                        <Input v-model="formItem.appealAccount" placeholder="申诉人编号"/>
                    </FormItem>
                </Col>
                <Col span="5">
                    <FormItem label="被申诉人编号">
                        <Input v-model="formItem.complaintAccount" placeholder="被申诉人编号"/>
                    </FormItem>
                </Col>
                <Col span="5">
                    <FormItem label="申诉状态">
                        <Select v-model="formItem.status">
                            <Option value>
                                全部
                            </Option>
                            <Option v-for="item in status" :value="item.code" :key="item.code">
                                {{ item.name }}
                            </Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="3" offset="1">
                    <Button type="primary" @click="onSearch">
                        搜索
                    </Button>
                </Col>
                <Col span="2" offset="1">
                    <Button type="primary" @click="onExport()">导出</Button>
                </Col>
            </Row>
        </Form>
        <!-- height属性：固定表头 -->
        <Table :columns="tableColumns" :data="tableData" stripe></Table>
        <p class="totle">
        总计: {{ count }}
        </p>
        <div style="margin: 10px;overflow: hidden">
        <!-- <div style="float: left;">
                  <p>当前共{{pageData.total}}条数据，共{{pageData.pages}}页</p>
            </div>-->
            <div style="float: right;">
            <Page :total="pageData.total" :current="pageData.curPage" @on-change="changePage" :page-size="pageData.pageSize"></Page>
        </div>

        <Modal v-model="editModel" @on-ok="test()" ref="test">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>您是否同意此人的申诉？</span>
            </p>
            <div style="text-align:center">
                <Form :model="formItem" :label-width="80">
                    <FormItem label="审核备注">
                        <Input v-model="refuseVal" placeholder="审核备注"/>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button @click="hideModel">拒绝</Button>
                <Button type="primary" @click="save()">同意</Button>
            </div>
        </Modal>
    </div>
</div>
</template>
<script>
    import { appealList , audit } from '@/api/C2C';
    import excel from '@/libs/excel';
    export default {
        data () {
            return {
                editModel:false,
                formItem: {
                    timeArea: ['', ''], // 选择日期
                    entrustNo: '',
                    appealAccount: '',
                    complaintAccount: '',
                    status: ''
                },
                count: '',
                status: [
                    { code: '1', name: '进行中' },
                    { code: '2', name: '通过(卖家胜诉)' },
                    { code: '3', name: '拒绝' }
                ], // 申述订单状态
                uid:"",
                refuseVal:"",
                tableData: [], // 表格数据
                tableColumns: [
                  // 表格列
                  {
                    title: '订单编号',
                    key: 'entrustNo',
                    minWidth: 180
                  },
                  {
                    title: '申诉口令',
                    key: 'command',
                    minWidth: 90
                  },
                  {
                    title: '付款参考号',
                    key: 'refer',
                    minWidth: 100
                  },
                  {
                    title: '申诉人编号',
                    key: 'applyAccount',
                    minWidth: 100
                  },
                  {
                    title: '申诉人姓名',
                    key: 'applyName',
                    minWidth: 100
                  },
                  {
                    title: '申诉人电话/邮箱',
                    key: 'applyPhone',
                    minWidth: 130,
                    render: (h, params) => {
                        if (params.row.applyPhone) {
                            return h("span", params.row.applyPhone)
                        } else if (params.row.applyEmail) {
                            return h("span", params.row.applyEmail)
                        }
                    }
                  },
                  {
                    title: '被申诉人编号',
                    key: 'complaintAccount',
                    minWidth: 120
                  },
                  {
                    title: '被申诉人姓名',
                    key: 'complaintName',
                    minWidth: 110
                  },
                  {
                    title: '被申诉人电话/邮箱',
                    key: 'complaintPhone',
                    minWidth: 140,
                    render: (h, params) => {
                      if (params.row.complaintPhone) {
                          return h("span", params.row.complaintPhone)
                      } else if (params.row.complaintEmail) {
                          return h("span", params.row.complaintEmail)
                      }   
                    }
                  },
                  // {
                  //     title: '申诉类型',
                  //     key: 'type',
                  //     minWidth: 150,
                  // },
                  {
                    title: '提交申诉时间',
                    key: 'createTime',
                    minWidth: 160
                  },
                  {
                    title: '状态',
                    key: 'status',
                    minWidth: 130,
                    render: (h, params) => {
                      const row = params.row
                      const status = row.status
                      var text
                      switch (status) {
                        case '1':
                          text = '进行中';
                          break
                        case '2':
                          text = '通过(卖家胜诉)';
                          break
                        case '3':
                          text = '拒绝';
                          break
                      }
                      return h('div', {}, text)
                    }
                  },
                  {
                    title: '胜诉人编号',
                    key: 'winAccount',
                    minWidth: 100,
                    render: (h, params) => {
                      const row = params.row
                      const winAccount = row.winAccount
                      let text = winAccount != null ? winAccount : '----';
                      return h('div', {}, text)
                    }
                  },
                  {
                    title: '判决备注',
                    key: 'judgmentRemark',
                    minWidth: 100,
                    render: (h, params) => {
                      const row = params.row
                      const judgmentRemark = row.judgmentRemark
                      let text = judgmentRemark != null ? judgmentRemark : '----';
                      return h('div', {}, text)
                    }
                  },
                  {
                    title: '操作',
                    key: 'entrustTime',
                    minWidth: 130,
                    render: (h, params) => {
                      return h('div', [
                        h(
                          'Button',
                          {
                            props: {
                              type: 'primary',
                              size: 'small'
                            },
                            style: {
                              marginRight: '5px'
                            },
                            on: {
                              click: () => {
                                this.check(params.row.id, params.index)
                              }
                            }
                          },
                          '原因'
                        ),
                        h(
                          'Button',
                          {
                            props: {
                              type: 'warning',
                              size: 'small'
                            },
                            style: {
                              marginRight: '5px',
                              display: params.row.status == '1' ? 'inline-block' : 'none'
                            },
                            on: {
                              click: () => {
                                this.examine(params.row.id, params.row.entrustNo)
                              }
                            }
                          },
                          '审核'
                        )
                      ])
                    }
                  }
                ],
                pageData: {
                    total: 0, // 数据总条数
                    pages: 0, // 总页码
                    curPage: 1, // 当前页
                    pageSize: 15 // 每页条数
                }
            }
        },
        methods: {
            // 搜索
            onSearch () {
                const _this = this
                _this.pageData.curPage = 1
                _this.tableData = []
                _this.mockTableData()
            },
            // 表格数据
            mockTableData () {
                const _this = this
                let _data = {
                    pageNumber: _this.pageData.curPage,
                    pageSize: _this.pageData.pageSize,
                    orderNo: _this.formItem.entrustNo,
                    applyAccount: _this.formItem.appealAccount,
                    complaintAccount: _this.formItem.complaintAccount,
                    status: _this.formItem.status
                }
                for (var key in _data) {
                    if (_data[key] == '') {
                        delete _data[key]
                    }
                }
                appealList( _data).then(function (response) {
                    if (response.data.code == 200) {
                        _this.tableData = response.data.result.list.list
                        _this.count = response.data.result.count
                        _this.pageData.total = Number(response.data.result.list.total)
                      // _this.pageData.pages=response.data.data.list.pages;
                    } else {
                        _this.$Message.error('获取数据失败')
                    }
                }).catch(function (error) {})
            },
            onExport() {// 导出EXCEL
                let _this = this;
                if (_this.formItem.timeArea[0] && _this.formItem.timeArea[1]) {
                    _this.startDate = _this.formItem.timeArea[0] + ' 00-00-00';
                    _this.endDate = _this.formItem.timeArea[1] + ' 23-59-59';
                }else {
                    _this.startDate = ''
                    _this.endDate = ''
                }
                let _data = {
                    orderNo: _this.formItem.entrustNo,
                    applyAccount: _this.formItem.appealAccount,
                    complaintAccount: _this.formItem.complaintAccount,
                    status: _this.formItem.status
                };
                for(var key in _data){
                    if(_data[key] == ''){
                        delete _data[key]
                    }
                }
                appealList(_data).then(function(response) {
                    if(response.data.code == 200) {
                        for(var j = 0, length2 = response.data.result.list.list.length; j < length2; j++){
                            switch (response.data.result.list.list[j].status) {
                                case "1":
                                    response.data.result.list.list[j].status = '进行中';
                                    break;
                                case "2":
                                    response.data.result.list.list[j].status = '通过（卖家胜诉）';
                                    break;
                                case "3":
                                    response.data.result.list.list[j].status = '拒绝';
                                    break;
                                default:
                                    response.data.result.list.list[j].status = '--';
                                    break;
                            };

                            if (response.data.result.list.list[j].applyPhone) {
                                response.data.result.list.list[j].applyPhone = response.data.result.list.list[j].applyPhone;
                            } else if (response.data.result.list.list[j].applyEmail) {
                                response.data.result.list.list[j].applyPhone =response.data.result.list.list[j].applyEmail;
                            }

                            if (response.data.result.list.list[j].complaintPhone) {
                                response.data.result.list.list[j].complaintPhone = response.data.result.list.list[j].complaintPhone;
                            } else if (response.data.result.list.list[j].complaintEmail) {
                                response.data.result.list.list[j].complaintPhone = response.data.result.list.list[j].complaintEmail;
                            } 

                            response.data.result.list.list[j].winAccount = response.data.result.list.list[j].winAccount != null ? response.data.result.list.list[j].winAccount : '----';
                            response.data.result.list.list[j].judgmentRemark = response.data.result.list.list[j].judgmentRemark != null ? response.data.result.list.list[j].judgmentRemark : '----';
                        }
                        const params = {
                            title: ['订单编号','申诉口令','付款参考号','申诉人编号','申诉人姓名','申诉人电话','被申诉人编号','被申诉人姓名','被申诉人电话','提交申诉时间','状态','胜诉人编号','判决备注'],
                            key:   ['entrustNo','command','refer','applyAccount','applyName','applyPhone','complaintAccount','complaintName','complaintPhone','createTime','status','winAccount','judgmentRemark'],
                            data: response.data.result.list.list,
                            autoWidth: true,
                            filename: '申诉记录' 
                        };
                        excel.export_array_to_excel(params)
                    } else {
                        _this.$Message.info(response.data.message);
                    }
                })
            },
            // 查看申诉原因
            check (id, index) {
                const _this = this
                _this.$Modal.confirm({
                    title: '申诉原因',
                    closable: true,
                    content: _this.tableData[index].remarkInfo
                })
            },
            hideModel(){
                let _this = this;
                // 拒绝原因
                let _data = {
                    id: _this.uid,
                    status: '3',
                    remark: _this.refuseVal,
                };
                if (_data.remark == '') {
                    _this.$Message.error('审核备注不能为空')
                    return false
                };
                _this.editModel = false;
                audit( _data).then(function (response) {
                    if (response.data.code == 200) {
                        _this.$Message.success('成功')
                        _this.mockTableData()
                    } else {
                        _this.$Message.error(response.data.message)
                    }
                }).catch(function (error) {})
            },
            save(){
                let _this = this;
                let _data = {
                    id: _this.uid,
                    status: '2',
                    remark: _this.refuseVal,
                };
                if (_data.remark == '') {
                    _this.$Message.error('审核备注不能为空')
                    return false
                };
                _this.editModel = false;
                audit(_data).then(function (response) {
                    if (response.data.code == 200) {
                        _this.$Message.success('成功')
                        _this.mockTableData()
                    } else {
                        _this.$Message.error(response.data.message)
                    }
                }).catch(function (error) {})
            },
            // 审核 申诉
            examine (id, entrustNo) {
                let _this = this
                _this.uid = id;
                _this.editModel = true;
        },
        // 切换页码
        changePage (current) {
            this.pageData.curPage = current
            this.tableData = this.mockTableData()
        }
    },
    created: function () {
        this.mockTableData()
          // this.getstatus();
        }
    }
</script>