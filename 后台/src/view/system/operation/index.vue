<template>
  <div class="manage_log">
    <Form :label-width="90">
      <Row style="padding-bottom: 20px">
        <Col span="4" style="width: 280px;">
          <FormItem label="选择日期">
            <DatePicker
              type="daterange"
              placeholder="选择日期"
              clearable
              @on-change="selectTime"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
        </Col>
        <Col span="3" offset="1">
          <Button type="primary" @click="onSearch">搜索</Button>
        </Col>
        <!--<Col span="1" offset="1">
                      <Button type="primary" @click="daochu()">导出</Button>
        </Col>-->
      </Row>
    </Form>
    <!-- height属性：固定表头 -->
    <Table :loading="loading" :columns="tableColumns" :data="tableData" stripe></Table>
    <div style="margin: 10px;overflow: hidden">
      <!-- <div style="float: left;">
                      <p>当前共{{pageData.total}}条数据，共{{pageData.pages}}页</p>
      </div>-->
      <div style="float: right;">
        <Page
          :total="pageData.total"
          :current="pageData.curPage"
          @on-change="changePage"
          :page-size="pageData.pageSize"
        ></Page>
      </div>
    </div>
  </div>
</template>
  
<script>
import { logPage } from "@/api/system";
export default {
  data() {
    return {
      timeObj: {
        startTime: "",
        endTime: ""
      },
      startDate: "",
      endDate: "",
      loading: true,
      tableData: [],
      tableColumns: [
        {
          title: "用户名",
          key: "name",
          minWidth: 200
        },
        {
          title: "描述",
          key: "logType",
          minWidth: 150
        },
        {
          title: "操作时间",
          key: "createTime",
          minWidth: 120
        }
      ],
      pageData: {
        total: 0, // 数据总条数
        pages: 0, // 总页码
        curPage: 1, // 当前页
        pageSize: 10 // 每页条数
      }
    };
  },
  methods: {
    // 选择时间
    selectTime(date) {
      if (date.length) {
          this.timeObj.startTime = date[0] + " 00:00:00";
          this.timeObj.endTime = date[1] + " 23:59:00";
      } else {
          this.timeObj.startTime = "";
          this.timeObj.endTime = "";
      }
    },
    // 搜索
    onSearch() {
      const _this = this;
      _this.tableData = [];
      _this.pageData.curPage = 1;
      _this.mockTableData();
    },
    // 表格数据
    mockTableData() {
      const _this = this;
      let _data = {
        pageNumber: _this.pageData.curPage,
        pageSize: _this.pageData.pageSize,
        type: "1"
      };
      if (_this.timeObj.startTime && _this.timeObj.endTime) {
          _data.startTime = _this.timeObj.startTime;
          _data.endTime = _this.timeObj.endTime;
      }
      _this.loading = true;
      logPage(_data)
        .then(function(response) {
          _this.loading = false;
          if (response.data.code == 200) {
            _this.tableData = response.data.result.list;
            _this.pageData.total = Number(response.data.result.total);
            _this.pageData.pages = response.data.result.list.pages;
          } else {
            _this.$Message.error("获取数据失败");
          }
        })
        .catch(function(error) {});
    },
    // 切换页码
    changePage(current) {
      this.pageData.curPage = current;
      this.tableData = this.mockTableData();
    }
  },
  created: function() {
    this.mockTableData();
    // this.getstatus();
  }
};
</script>
      