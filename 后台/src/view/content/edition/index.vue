<template>
    <div>
        <div style="margin-bottom:20px;">
            <Button type="primary" @click="add">新增</Button>
        </div>

        <Table stripe :columns="columns" :data="tableData"></Table>
        <div style="text-align:right; margin-top:20px;">
            <Page :current="page.current" :total="page.total" @on-change="changePage" class-name="custom-page" />
        </div>

        <!-- 新增 -->
        <Modal
            v-model="modalAdd"
            title="新增字典"
            :loading="loadingAdd"
            :mask-closable="false"
            @on-ok="okAdd">
                <Form ref="formAdd" :model="formAdd" :rules="rules" :label-width="80">
                    <FormItem label="标题" prop="title">
                        <Input v-model="formAdd.title" placeholder="请输入标题" />
                    </FormItem>
                    <FormItem label="版本号" prop="appVersion">
                        <Input v-model="formAdd.appVersion" placeholder="请输入版本号" />
                    </FormItem>
                    <FormItem label="app类型" prop="appType">
                        <Select v-model="formAdd.appType" placeholder="请输入app类型">
                            <Option value="1">IOS</Option>
                            <Option value="2">ANDROID</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="更新类型" prop="isForcedUpdate">
                        <Select v-model="formAdd.isForcedUpdate" placeholder="请输入更新类型">
                            <Option value="0">普通更新</Option>
                            <Option value="1">强制更新</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="下载地址" prop="downUrl">
                        <Input v-model="formAdd.downUrl" placeholder="请输入下载地址" />
                    </FormItem>
                    <FormItem label="更新内容" prop="details">
                        <Input v-model="formAdd.details" type="textarea" :rows="2" placeholder="请输入更新内容" />
                    </FormItem>
                </Form>
        </Modal>

        <!-- 修改 -->
        <Modal
            v-model="modalEdit"
            title="修改字典"
            :loading="loadingEdit"
            :mask-closable="false"
            @on-ok="okEdit">
                <Form ref="formEdit" :model="formEdit" :rules="rules" :label-width="80">
                   <FormItem label="标题" prop="title">
                        <Input v-model="formEdit.title" placeholder="请输入标题" />
                    </FormItem>
                    <FormItem label="版本号" prop="appVersion">
                        <Input v-model="formEdit.appVersion" placeholder="请输入版本号" />
                    </FormItem>
                    <FormItem label="app类型">
                        <Select v-model="formEdit.appType" placeholder="请输入app类型">
                            <Option value="1">IOS</Option>
                            <Option value="2">ANDROID</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="更新类型" >
                        <Select v-model="formEdit.isForcedUpdate" placeholder="请输入更新类型">
                            <Option value="0">普通更新</Option>
                            <Option value="1">强制更新</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="下载地址" prop="downUrl">
                        <Input v-model="formEdit.downUrl" placeholder="请输入下载地址" />
                    </FormItem>
                    <FormItem label="更新内容" prop="details">
                        <Input v-model="formEdit.details" type="textarea" :rows="2" placeholder="请输入更新内容" />
                    </FormItem>
                </Form>
        </Modal>
    </div>
</template>
<script>
import {
    listAppVersion,
    addAppVersion,
    deleteAppVersion,
    updateAppVersion,
    toUpdateAppVersion
} from "@/api/content"
export default {
    data () {
        return {
            columns: [
                {
                    title: '序号',
                    type: "index"
                },
                {
                    title: 'app类型',
                    key: 'appType',
                    render: (h, params) => {
                        let text = "";
                        switch (params.row.appType) {
                            case 1:
                                text = "苹果";
                                break;
                            case 2:
                                text = "安卓";
                                break;
                            case 3:
                                text = "PC端";
                                break;
                        };
                        return h("span", text)
                    }
                },
                {
                    title: '版本号',
                    key: 'appVersion'
                },
                {
                    title: '更新类型',
                    key: 'isDeleted',
                    render: (h, params) => {
                        let text = "";
                        switch (params.row.isDeleted) {
                            case false:
                                text = "普通更新";
                                break;
                            case true:
                                text = "强制更新";
                                break;
                        };
                        return h("span", text)
                    }
                },
                {
                    title: '时间',
                    key: 'createTime',
                    render: (h, params) => {
                        return h("span", this.$public.timestampToTimeYMDhms(params.row.createTime))
                    }
                },
                {
                    title: "操作",
                    render: (h, params) => {
                        return h("div", [
                            // h("Button", {
                            //     props: {
                            //         size: "small",
                            //         type: "success"
                            //     },
                            //     style: {
                            //         marginRight: "10px"
                            //     },
                            //     on: {
                            //         click: () => {
                            //             this.edit(params.row.id)
                            //         }
                            //     }
                            // }, "修改"),
                            h("Button", {
                                props: {
                                    size: "small",
                                    type: "error"
                                },
                                style: {
                                    marginRight: "10px"
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.row.id)
                                    }
                                }
                            }, "删除")
                        ])
                    }
                }
            ],
            tableData: [],
            modalAdd: false,
            modalEdit: false,
            loadingAdd: true,
            loadingEdit: true,
            formAdd: {
                title: "",
                appVersion: "",
                appType: "",
                isForcedUpdate: "",
                downUrl: "",
                details: ""
            },
            formEdit: {},
            rules: {
                title: [
                    { required: true, message: "标题不能为空", trigger: "change" } 
                ],
                appVersion: [
                    { required: true, message: "版本号不能为空", trigger: "change" } 
                ],
                appType: [
                    { required: true, message: "app类型不能为空", trigger: "change" } 
                ],
                isForcedUpdate: [
                    { required: true, message: "更新类型不能为空", trigger: "change" } 
                ],
                downUrl: [
                    { required: true, message: "下载地址不能为空", trigger: "change" } 
                ],
                details: [
                    { required: true, message: "更新内容不能为空", trigger: "change" } 
                ]
            },
            page: {
                current: 1,
                size: 10,
                total: 0
            }
        }
    },
    methods: {
        // 新增
        add() {
            this.$refs.formAdd.resetFields();
            this.modalAdd = true;
        },
        okAdd() {
            let _this = this;
            _this.loadingAdd = false;
            _this.$nextTick(() => {
                _this.loadingAdd = true;
            });
            _this.$refs.formAdd.validate(valid => {
                if (valid) {
                    addAppVersion(_this.formAdd).then(res => {
                        if (res.data.code == 200) {
                            _this.$Message.success("新增成功");
                            _this.modalAdd = false;
                            _this.showTable();
                        } else {
                            _this.$Message.warning(res.data.msg);
                        }
                    }).catch(err => {})
                }
            })
        },
        // 修改
        edit(id) {
            let _this = this;
            _this.$refs.formEdit.resetFields();
            _this.modalEdit = true;
            toUpdateAppVersion({id: id}).then(res => {
                if (res.data.code == 200) {
                    this.formEdit = res.data.result;
                } else {
                    this.$Message.warning(res.data.msg);
                }
            }).catch(err => {})
        },
        okEdit() {
            this.loadingEdit = false;
            this.$nextTick(() => {
                this.loadingEdit = true;
            });

            this.$refs.formEdit.validate(valid => {
                if (valid) {
                    de
                    updateAppVersion(this.formEdit).then(res => {
                        if (res.data.code == 200) {
                            this.$Message.success("修改成功");
                            this.modalEdit = false;
                            this.showTable();
                        } else {
                            this.$Message.warning(res.data.msg);
                        }
                    }).catch(err => {})
                }
            })
        },
        // 删除
        remove(id) {
            this.$Modal.confirm({
                title: "提示",
                content: "您确定要删除该项吗？",
                onOk: () => {
                    deleteAppVersion({id: id}).then(res => {
                        if (res.data.code == "200") {
                            this.$Message.success("操作成功");
                            this.showTable();
                        } else {
                            this.$Message.warning(res.data.msg);
                        }
                    }).catch(err => {})
                },
                onCancel: () => {
                    this.$Message.info("已取消操作");
                }
            })
        },
        // 列表
        showTable() {
            let _this = this;
            listAppVersion({
                    pageIndex: _this.page.current,
                    pageSize: _this.page.size
                }).then(res => {
                if (res.data.code == 200) {
                    _this.tableData = res.data.result.list;
                    _this.page.current = res.data.data.pageIndex;
                    _this.page.total = res.data.data.total;
                } else {
                    _this.$Message.warning(res.data.msg);
                    _this.tableData = [];
                    _this.page.current = 1;
                    _this.page.total = 0;
                }
            }).catch(err => {})
        },
        // 分页
        changePage(num) {
            this.page.current = num;
            this.showTable();
        }
    },
    mounted() {
        this.showTable();
    }
}
</script>
