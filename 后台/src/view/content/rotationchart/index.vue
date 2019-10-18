<style type="text/css">
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
  <div class="manage_log">
    <Form>
      <FormItem label="">
        <Button type="primary" @click="addImg">添加轮播图</Button>
      </FormItem>
    </Form>
    <!-- <Tabs value="1">
        <TabPane v-for="(item,index) in formItem" :label="item.name" :name="item.value"> -->
    <!-- height属性：固定表头 -->
    <Table :columns="tableColumns" :data="tableData" stripe></Table>
    <!-- </TabPane>
</Tabs> -->
    <div style="margin: 10px;overflow: hidden">
      <!-- <div style="float: left;">
          <p>当前共{{pageData.total}}条数据，共{{pageData.pages}}页</p>
      </div> -->
      <div style="float: right;">
        <Page :total="pageData.total" :current="pageData.curPage" @on-change="changePage" :page-size="pageData.pageSize"></Page>
      </div>
    </div>


    <!-- 管理轮播图 -->
    <Modal
      v-model="modal1"
      title="管理轮播图"
      :mask-closable="false"
      :loading="loading"
      @on-ok="addNotice">
      <Form :model="rotationchartaddto" ref="rotationchartaddto" :rules="rules" :label-width="80">
        <FormItem label="中文标题" prop="title">
          <Input v-model="rotationchartaddto.title" placeholder="请输入中文标题"/>
        </FormItem>
        <FormItem label="英文标题" prop="titleUs">
          <Input v-model="rotationchartaddto.titleUs" placeholder="请输入英文标题"/>
        </FormItem>
        <FormItem label="顺序" prop="sort">
          <Select v-model="rotationchartaddto.sort">
            <!-- <Option v-for="item in 5" :value="item" :key="item">{{ item }}</Option> -->
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
          </Select>
        </FormItem>
        <FormItem label="类型" prop="type">
          <Select v-model="rotationchartaddto.type">
            <Option v-for="(item,index) in formItem" :value="item.value" :key="index">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="中文图片" prop="imgUrl">
          <div class="demo-upload-list" v-if="uploadList.status">
            <template>
              <img :src="uploadList.url">
            </template>
          </div>
          <Upload
            ref="upload"
            :show-upload-list="false"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            multiple
            type="drag"
            :action="uploadfile"
            style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload>
        </FormItem>
        <FormItem label="英文图片" prop="imgUrlUs">
          <div class="demo-upload-list" v-if="uploadList1.status">
            <template>
              <img :src="uploadList1.url">
            </template>
          </div>
          <Upload
            ref="upload"
            :show-upload-list="false"
            :on-success="handleSuccess1"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            multiple
            type="drag"
            :action="uploadfile"
            style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload>
        </FormItem>
        <FormItem label="连接" prop="linkUrl">
          <Input v-model="rotationchartaddto.linkUrl" placeholder="请输入链接"/>
        </FormItem>
      </Form>
    </Modal>


  </div>
</template>

<script>
  import {listView, addView, updateView, delView} from '@/api/content'
  import {file} from '@/api/data'

  export default {
    data() {
      return {
        formItem: [
          {
            value: "1",
            name: 'APP首页',
          },
          {
            value: "2",
            name: 'PC首页',
          },
          {
            value: "3",
            name: 'APP资讯',
          },
          {
            value: "4",
            name: '指南',
          }
        ],
        uploadfile: file(),
        uploadList: {
          url: "",
          status: "",
        },
        uploadList1: {
          url: "",
          status: "",
        },
        modal1: false,
        modal2: true,
        loading: true,
        rotationchartaddto: {
          sort: "",
          type: "",
          imgUrl: "",
          imgUrlUs: "",
          linkUrl: "",
          title: "",
          titleUs: ""
        },
        rules: {
          title: [
            {required: true, message: "中文标题不能为空", trigger: "change"}
          ],
          titleUs: [
            {required: true, message: "英文标题不能为空", trigger: "change"}
          ],
          sort: [
            {required: true, message: "顺序不能为空", trigger: "change"}
          ],
          type: [
            {required: true, message: "类型不能为空", trigger: "change"}
          ],
          imgUrl: [
            {required: true, message: "中文图片不能为空", trigger: "change"}
          ],
          imgUrlUs: [
            {required: true, message: "英文图片不能为空", trigger: "change"}
          ],
          linkUrl: [
            {required: false, message: "链接不能为空", trigger: "change"}
          ],
        },
        tableData: [],                      // 表格数据
        tableColumns: [                     // 表格列
          {
            title: '序号',
            key: 'sort',
            render: (h, params) => {
              return h('div', {}, params.index + (this.pageData.curPage - 1) * this.pageData.pageSize + 1);
            },
            minWidth: 150,
          },
          {
            title: '类型',
            key: 'type',
            minWidth: 150,
            render: (h, params) => {
              const row = params.row;
              const inspectAuthStatus = row.type;
              var text;
              switch (inspectAuthStatus) {
                case 1:
                  text = 'APP首页';
                  break;
                case 2:
                  text = 'PC首页';
                  break;
                case 3:
                  text = 'APP资讯';
                  break;
                case 4:
                  text = '指南';
                  break;
              }
              return h('div', {}, text);
            }
          },
          {
            title: '中文图片',
            minWidth: 150,
            render: (h, params) => {
              let text = this.$config.baseUrl.pro + params.row.imgUrl;
              return h('img', {
                attrs: {
                  src: text
                },
                style: {
                  width: '25px'
                }
              })
            }
          },
          {
            title: '英文图片',
            minWidth: 150,
            render: (h, params) => {
              let text = this.$config.baseUrl.pro + params.row.imgUrlUs;
              return h('img', {
                attrs: {
                  src: text
                },
                style: {
                  width: '25px'
                }
              })
            }
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            minWidth: 150,
            render: (h, params) => {
              let row = params.row;
              let _this = this;
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.edit(params.row)

                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.row.id)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        pageData: {
          total: 0,           // 数据总条数
          pages: 0,           // 总页码
          curPage: 1,         // 当前页
          pageSize: 10        // 每页条数
        }
      };
    },
    methods: {
      addImg() {
        this.modal1 = true;
        this.modal2 = true;
        this.$refs.rotationchartaddto.resetFields();
        this.rotationchartaddto = {
          sort: "",
          type: "",
          imgUrl: "",
          imgUrlUs: "",
          linkUrl: "",
          title: "",
          titleUs: ""
        };
        this.uploadList = {
          url: "",
          status: "",
        };
        this.uploadList1 = {
          url: "",
          status: "",
        };
      },
      // 添加公告
      addNotice() {
        let _this = this;
        this.loading = false;
        this.$nextTick(() => {
          this.loading = true;
        });

        this.$refs.rotationchartaddto.validate(valid => {
          if (valid) {
            if (_this.modal2) {
              delete _this.rotationchartaddto.id;
              addView(_this.rotationchartaddto).then(function (response) {
                if (response.data.code == 200) {
                  _this.$Message.success('修改成功');
                  for (var variable in _this.rotationchartaddto) {
                    _this.rotationchartaddto[variable] = '';
                  }
                  ;
                  _this.mockTableData();
                } else {
                  _this.$Message.error(response.data.message);
                }
                _this.modal1 = false;
              }).catch(function (error) {
                _this.modal1 = false;
              });
            } else {
              updateView(_this.rotationchartaddto).then(function (response) {
                if (response.data.code == 200) {
                  _this.$Message.success('修改成功');
                  _this.mockTableData();
                  for (var variable in _this.rotationchartaddto) {
                    _this.rotationchartaddto[variable] = '';
                  }
                  ;
                } else {
                  _this.$Message.error(response.data.message);
                }
                _this.modal1 = false;
              }).catch(function (error) {
                _this.modal1 = false;
              });
            }
            ;
          }
        })
      },
      // 表格数据
      mockTableData() {
        const _this = this;
        let _data = {
          pageNumber: _this.pageData.curPage,
          pageSize: _this.pageData.pageSize,
        };
        listView(_data).then(function (response) {
          if (response.data.code == 200) {
            _this.tableData = response.data.result.list;
            _this.pageData.total = Number(response.data.result.total);
            _this.pageData.pages = response.data.result.pages;
          } else {
            _this.$Message.error('获取数据失败');
          }
        }).catch(function (error) {
        });
      },
      handleSuccess(res, file) {
        let _this = this;
        if (res.code == 200) {
          _this.uploadList.status = file.status;
          _this.uploadList.url = _this.$config.baseUrl.pro + res.data;
          _this.rotationchartaddto.imgUrl = res.data;
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
          _this.rotationchartaddto.imgUrlUs = res.data;
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
      // 切换页码
      changePage(current) {
        this.pageData.curPage = current;
        this.tableData = this.mockTableData();
      },
      // 编辑
      edit(cunderm) {
        let _this = this;
        _this.modal1 = true;
        _this.modal2 = false;
        _this.rotationchartaddto.id = cunderm.id;
        _this.rotationchartaddto.sort = String(cunderm.sort);
        _this.rotationchartaddto.type = String(cunderm.type);
        _this.rotationchartaddto.imgUrl = cunderm.imgUrl;
        _this.rotationchartaddto.imgUrlUs = cunderm.imgUrlUs;
        _this.rotationchartaddto.linkUrl = cunderm.linkUrl;
        _this.rotationchartaddto.title = cunderm.title;
        _this.rotationchartaddto.titleUs = cunderm.titleUs;
        _this.uploadList.url = _this.$config.baseUrl.pro + cunderm.imgUrl;
        _this.uploadList.status = 'file.status';
        _this.uploadList1.url = _this.$config.baseUrl.pro + cunderm.imgUrlUs;
        _this.uploadList1.status = 'file.status';
        //  updateView(_this.rotationchartaddto).then(function (response) {
        //     if (response.data.code == 200) {
        //       _this.$Message.success('修改成功');
        //       _this.mockTableData();
        //       for (var variable in _this.rotationchartaddto) {
        //         _this.rotationchartaddto[variable] = '';
        //       }
        //       ;
        //     } else {
        //       _this.$Message.error('获取数据失败');
        //     }
        //   }).catch(function (error) {
        //   });
      },
      // 删除
      remove(id) {
        const _this = this;
        _this.$Modal.confirm({
          title: '提示',
          content: '确定要删除该条信息么？',
          onOk: () => {
            delView({id: id}).then(function (response) {
              if (response.data.code == 200) {
                _this.$Message.success('删除成功');
                _this.mockTableData();
              } else {
                _this.$Message.error('删除失败');
              }
              ;
              _this.mockTableData();

            }).catch(function (error) {
            });
          },
          onCancel: () => {
            _this.$Message.info('取消操作');
          }
        })
      }
    },
    created: function () {
      this.mockTableData();
    }
  };
</script>
