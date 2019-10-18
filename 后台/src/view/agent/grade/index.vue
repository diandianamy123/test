<template>
    <div class="manage_log">
        <row type="flex" justify="center">
           <!--  <i-col span="24">
                <Form ref="formInline" inline :label-width="80">
                    <FormItem>
                        <Button type="primary" @click="handleSubmit()">添加角色</Button>
                    </FormItem>
                </Form>
            </i-col> -->
        </row>
        <!-- height属性：固定表头 -->
        <Table :columns="tableColumns" :data="tableData" stripe></Table>

        <Modal
            v-model="modal1"
            title="编辑角色权限"
            @on-ok="edit">
                <Row>
                    <Col span="12" offset="6">
                        <Tree :data="data2" show-checkbox ref="one"></Tree>
                    </Col>
                </Row>
        </Modal>

    </div>
</template>

<script>
import { dlList, dlInfo, editDl} from '@/api/agent'
export default {
    data () {
        return {
            endDate: '',
            tableData: [],   // 列表数据
            tableColumns: [   // 列表列
                {
                    title: '角色名称',
                    key: 'name',
                    minWidth:100,
                },
                {
                    title: '时间',
                    minWidth:170,
                    key: 'createTime',
                    render: (h, params) => {
                        return h('div',{},this.$public.timestampToTimeYMDhms(params.row.createTime,2));
                    }
                },
                {
                    title: '操作',
                    minWidth:100,
                    key: 'createTime',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'success',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.check(params.row.id)
                                    }
                                }
                            }, '编辑'),
                            // h('Button', {
                            //     props: {
                            //         type: 'warning',
                            //         size: 'small'
                            //     },
                            //     style: {
                            //         marginRight: '5px'
                            //     },
                            //     on: {
                            //         click: () => {
                            //             this.deleteshuju(params.row.id)
                            //         }
                            //     }
                            // }, '删除')
                        ]);
                    }
                },
            ],
            data2: [
                {
                    title: '全选',
                    expand: true,
                    children: []
                }
            ],
            addtorole:{
                name:"",
                description:"",
                permissionIds:"",
            },
            editrole:{
                id:"",
                name:"",
                description:"",
                permissionIds:"",
            },
            Jurisdiction:{},//总权限
            modal1:false,
            modal2:false,
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
        mockTableData () {
            const _this = this;
            dlList().then(function(response) {
                if(response.data.code == 200) {
                    _this.tableData = response.data.result.list;
                    _this.pageData.total= Number(response.data.result.total);
                }else {
                    _this.$Message.error('获取数据失败');
                }
            }).catch(function(error) {});
        },
        check(current){// 展示数据
            let _this = this;
            _this.modal1 = true;
            _this.data2 = [{
                    title: '全选',
                    expand: true,
                    children: []
                }];
            dlInfo({id:current}).then(function(response) {
                if(response.data.code == 200) {
                    var _data = [];
                    _this.Jurisdiction = response.data.result.list;
                    _this.editrole.id = response.data.result.id;
                    _this.editrole.name = response.data.result.name;
                    _this.editrole.description = response.data.result.description;
                    _this.editrole.permissionIds = response.data.result.permissionIds;
                    for(var k = 0, length3 = response.data.result.list.length; k < length3; k++){
                      _data[k] = {
                            title: response.data.result.list[k].name,
                            expand: true,
                            children:[]
                        };
                        if (response.data.result.list[k].childrens.length != 0) {
                            for(var j = 0, length2 = response.data.result.list[k].childrens.length; j < length2; j++){

                              _data[k].children[j] = {
                                    "title": response.data.result.list[k].childrens[j].name,
                                    "checked":response.data.result.list[k].childrens[j].select,
                                    "selected":response.data.result.list[k].childrens[j].select,
                                 };
                            };
                        };
                    };
                    _this.data2[0].children = _data;
                }else {
                    _this.$Message.error('获取数据失败');
                }
            }).catch(function(error) {});
        },
        edit(){
            let _this = this;
            let Jurisdictiondata = _this.$refs.one.getCheckedAndIndeterminateNodes();
            let _data = "";
            for(var k = 0, length3 = _this.Jurisdiction.length; k < length3; k++){
                for(var a = 0, length4 = Jurisdictiondata.length; a < length4; a++){
                    if (Jurisdictiondata[a].title == _this.Jurisdiction[k].name) {
                        _this.Jurisdiction[k].selected = true;
                        _data = _data + _this.Jurisdiction[k].id + ',' ;
                    };
                };
                if (_this.Jurisdiction[k].childrens.length != 0) {
                    for(var j = 0, length2 = _this.Jurisdiction[k].childrens.length; j < length2; j++){
                        for(var b = 0, length5 = Jurisdictiondata.length; b < length5; b++){
                            if (Jurisdictiondata[b].title == _this.Jurisdiction[k].childrens[j].name) {
                                _this.Jurisdiction[k].childrens[j].selected = true;
                                 _data = _data + _this.Jurisdiction[k].childrens[j].id + ',' ;
                            };
                        };
                    };
                };
            };
            _this.editrole.source = _data;
            editDl(_this.editrole).then(function(response) {
                if(response.data.code == 200) {
                    _this.$Message.success({content: '添加成功'});
                }else {
                    _this.$Message.warning({
                        content: response.data.message
                    });
                }
            }).catch(function(error) {});
        },
    },
    created: function(){
        this.mockTableData();
    }
};
</script>

<style>

</style>
