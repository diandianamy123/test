<template>
    <div class="manage_log">
        <Form :model="formItem" :label-width="80">
            <FormItem label="">
                    <!-- <Col span="4">
                        <DatePicker type="daterange" split-panels format="yyyy-MM-dd" placeholder="选择日期"  v-model="formItem.timeArea" @on-change="formItem.timeArea=$event"></DatePicker>
                    </Col>
                    <Col span="11">
                        <Button type="primary" @click="onSearch">搜索</Button>
                    </Col> -->
                        <Button type="primary" @click="addNotice">添加资讯</Button>
            </FormItem>
        </Form>
        <!-- height属性：固定表头 -->
        <Table :columns="tableColumns" :data="tableData" stripe></Table>
        <div style="margin: 10px;overflow: hidden">
            <!-- <div style="float: left;">
                <p>当前共{{pageData.total}}条数据，共{{pageData.pages}}页</p>
            </div> -->
            <div style="float: right;">
                <Page :total="pageData.total" :current="pageData.curPage" @on-change="changePage" :page-size="pageData.pageSize"></Page>
            </div>
        </div>
    </div>
</template>

<script>
import {  zixun, deleteZX } from '@/api/content'
export default {
    data () {
        return {
             formItem: {
                timeArea: [null, null]          // 日期段 ["2018-06-29", "2018-06-30"]
            },
            tableData: [],                      // 表格数据
            tableColumns: [                     // 表格列
                {
                    title: '标题',
                    key: 'bmTitle',
                    minWidth:150,
                },
                {
                    title: '阅读量',
                    key: 'pageViews',
                    minWidth:150,
                },
                {
                    title: '发布时间',
                    minWidth:150,
                    render: (h, params) => {
                        return h('div',{},this.$public.timestampToTimeYMDhms(params.row.issueTime,2));
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    minWidth:150,
                    render: (h, params) => {
                        return h('div', [
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
        // 搜索
        onSearch(){
            const _this = this;
            _this.mockTableData();
        },

        // 添加公告
        addNotice () {
            this.$router.push("/content/addtoinformation")
        },

        // 表格数据
        mockTableData () {
            const _this = this;
            let _data = {
                pageNumber: _this.pageData.curPage,
                pageSize: _this.pageData.pageSize,
            };
            if(_this.formItem.timeArea[0] && _this.formItem.timeArea[1]) {
                _data['startDate'] = _this.formItem.timeArea[0] + " 00:00:00";
                _data['endDate'] = _this.formItem.timeArea[1] + " 23:59:59";
            };
            zixun(_data ).then(function(response) {
                if(response.data.code == 200) {
                    _this.tableData = response.data.result.list;
                    _this.pageData.total= Number(response.data.result.total) ;
                    _this.pageData.pages=response.data.result.pages;
                }else {
                    _this.$Message.error('获取数据失败');
                }
            }).catch(function(error) {});
        },

        // 切换页码
        changePage (current) {
            this.pageData.curPage = current;
            this.tableData = this.mockTableData();
        },

        // 编辑
        edit (id) {
            this.$router.push({ name: 'addtoguide', params: { userId: id }})
        },

        // 删除
        remove (id) {
            const _this = this;
            _this.$Modal.confirm({
                title: '提示',
                content: '确定要删除该条信息么？',
                onOk: () => {
                    deleteZX({ids: id}).then(function(response) {
                        if(response.data.code == 200){
                            _this.$Message.success('删除成功');
                            _this.mockTableData();
                        }else {
                            _this.$Message.error('删除失败');
                        }

                    }).catch(function(error) {});
                },
                onCancel: () => {
                    _this.$Message.info('取消操作');
                }
            })
        }
    },
    created: function(){
        this.mockTableData();
    }
};
</script>

<style>

</style>
