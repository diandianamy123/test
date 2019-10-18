<template>
    <div>
        <Table :columns="tableColumns" :data="tableData" stripe></Table>
        <div style="float: right; margin-top:20px;">
            <Page :total="pageData.total" :current="pageData.curPage" @on-change="changePage" :page-size="pageData.pageSize"></Page>
        </div>
    </div>
</template>
<script>
import { memberChild } from '@/api/C2C';
export default {
    data () {
        return {
            pageData: {
                total: 0,
                curPage: 1,
                pageSize: 15,
            },
            tableColumns: [
                {
                    title: "用户ID",
                    key: "id"
                },
                {
                    title: "姓名",
                    key: "username"
                },
                {
                    title: "等级",
                    key: "level"
                },
                {
                    title: "加入时间",
                    key: "createTime"
                }
            ],
            tableData: []
        }
    },
    methods: {
        showTable() {
            memberChild({
                pageNumber: this.pageData.curPage,
                pageSize: this.pageData.pageSize,
                id: this.$route.query.id
            }).then(res => {
                if (res.data.code == "200") {
                    this.tableData = res.data.result.list;
                    this.pageData.total = Number(res.data.result.total);
                } else {
                    this.$Message.warning(res.data.message);
                }
            }).catch(err => {})
        },
        changePage(page) {
            this.pageData.curPage = page;
            this.showTable();
        }
    },
    mounted() {
        this.showTable();
    }
}
</script>
