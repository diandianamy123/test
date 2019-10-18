<template>
  <div class="manage_log">
    <row type="flex" justify="center">
      <i-col span="24">
        <Form ref="formInline" inline :label-width="80">
          <FormItem>
            <Button type="primary" @click="handleSubmit()">添加用户</Button>
          </FormItem>
        </Form>
      </i-col>
    </row>
    <!-- height属性：固定表头 -->
    <Table :columns="tableColumns" :data="tableData" stripe></Table>
    <!-- <p style="font-size:18px;color:red;">总收入：{{incomeMoney}}&nbsp;&nbsp;&nbsp;总支出:{{totalMoney}} </p> -->
    <div style="margin: 10px;overflow: hidden">
      <!-- <div style="float: left;">
          <p>当前共{{pageData.total}}条数据，共{{pageData.pages}}页</p>
      </div> -->
      <div style="float: right;">
        <Page :total="pageData.total" :current="pageData.curPage" @on-change="changePage" :page-size="pageData.pageSize"></Page>
      </div>
    </div>
    <Modal
      v-model="modal1"
      title="编辑用户"
      @on-ok="edit">
      <Form ref="formInline" inline :label-width="80">
        <FormItem label="角色名称">
          <Input type="text" v-model="editrole.name" placeholder="角色名称"/>
        </FormItem>
        <FormItem label="角色描述">
          <Input type="text" v-model="editrole.description" placeholder="角色描述"/>
        </FormItem>
      </Form>
    </Modal>
    <Modal
      v-model="modal2"
      title="添加用户"
      @on-ok="addto">
      <Form ref="formInline" inline :label-width="80">
        <FormItem label="用户名">
          <Input type="text" v-model="addtorole.username" placeholder="用户名"></Input>
        </FormItem>
        <FormItem label="密码">
          <Input type="password" v-model="addtorole.password" placeholder="密码"></Input>
        </FormItem>
        <FormItem label="手机号">
          <Input type="text" v-model="addtorole.mobile" placeholder="手机号"></Input>
        </FormItem>
        <FormItem label="角色">
          <Select v-model="addtorole.userRoles" style="width:200px">
            <Option v-for="item in Jurisdiction" :value="item.id" :key="item.value">{{ item.name }}</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
  import {getAllNumberByPage, addUser, getAllRoleByPage, permissiondelete} from '@/api/Jurisdiction'
  export default {
    data() {
      return {
        endDate: '',
        tableData: [],   // 列表数据
        tableColumns: [   // 列表列
          {
            title: '用户名',
            key: 'username',
            minWidth: 100,
          },
          {
            title: '角色名称',
            key: 'roleName',
            minWidth: 100,
          },
          {
            title: '时间',
            minWidth: 170,
            key: 'createTime'
          },
          {
            title: '操作',
            minWidth: 100,
            key: 'createTime',
            render: (h, params) => {
              let text = "";
              switch (params.row.id) {
                case '1':
                  text = "---";
                  break;
                default:
                  text = h('Button', {
                    props: {
                      type: 'warning',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.deleteshuju(params.row.id)
                      }
                    }
                  }, '删除')
                  break;
              }
              return h('div', [text]);
            }
          },
        ],
        addtorole: {
          username: "",
          password: "",
          userRoles: "",
        },
        editrole: {
          id: "",
          name: "",
          description: "",
          permissionIds: "",
        },
        Jurisdiction: [],//角色列表
        modal1: false,
        modal2: false,
        pageData: {
          total: 0,               // 数据总条数
          pages: 0,               // 总页码
          curPage: 1,             // 当前页
          pageSize: 15             // 每页条数
        }
      };
    },
    methods: {
      // // 表格数据
      mockTableData() {
        const _this = this;
        getAllNumberByPage().then(function (response) {
          if (response.data.code == 200) {
            _this.tableData = response.data.result.list;
            _this.pageData.total = Number(response.data.result.total);
          } else {
            _this.$Message.error('获取数据失败');
          }
        }).catch(function (error) {
        });
      },
      check(current) {// 展示数据
        let _this = this;
        _this.modal1 = true;

      },
      edit() {
        let _this = this;

      },
      handleSubmit() {//添加角色获取权限
        let _this = this;

        getAllRoleByPage().then(function (response) {
          _this.modal2 = true;
          if (response.data.code == 200) {
            _this.Jurisdiction = response.data.result.list;
          } else {
            _this.$Message.error('获取数据失败');
          }
        }).catch(function (error) {
        });
      },
      addto() {
        let _this = this;
        _this.addtorole.password = _this.$md5(_this.addtorole.password);
        addUser(_this.addtorole).then(function (response) {
          _this.mockTableData();
          if (response.data.code == 200) {
            _this.$Message.success({content: response.data.message});
          } else {
            _this.$Message.warning({
              content: response.data.message
            });
          }
        }).catch(function (error) {
        });
      },
      deleteshuju(current) {//删除
        let _this = this;
        this.$Modal.confirm({
          title: "提示",
          content: "确定要删除该用户吗？",
          okText: "确定",
          cancelText: "取消",
          onOk: () => {
            this.deleteUser(current);
          },
          onCancel: () => {
            this.$Message.warning("已取消操作");
          }
        })
      },
      // 删除函数
      deleteUser(current) {
        permissiondelete({id: current}).then(response => {
          this.mockTableData();
          if (response.data.code == 200) {
            this.$Message.success({content: response.data.message});
          } else {
            this.$Message.warning({
              content: response.data.message
            });
          }
        }).catch(function (error) {
        });
      },
      // 切换页码
      changePage(current) {
        this.pageData.curPage = current;
        this.tableData = this.mockTableData();
      },
    },
    created: function () {
      this.mockTableData();
    }
  };
</script>
