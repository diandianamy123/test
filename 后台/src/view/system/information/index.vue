<template>
    <div class="manage_log">
        <Card :bordered="false">
            <p slot="title">网站信息</p>
            <Form :model="formItem" :label-width="80">
                <FormItem label="网站名称">
                    <Input v-model="formItem.webName" placeholder="网站名称"></Input>
                </FormItem>
                <FormItem label="网站邮箱">
                    <Input v-model="formItem.webEmail" placeholder="网站邮箱"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit()">确定</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>
  
<script>
    import { getWebInfo ,editWeb } from '@/api/system'
    export default {
        data () {
            return {
                formItem:{
                    id:"",
                    webName:"",
                    webEmail:"",
                },
            }
        },
        methods: {
            handleSubmit(){
                let _this = this;

                editWeb(_this.formItem).then(function (response) {
                    if (response.data.code == 200) {
                        _this.$Message.success({
                            content: '操作成功'
                        });
                    } else {
                        _this.$Message.error(response.data.message)
                    };
                    
                }).catch(function (error) {})
            },
            mockTableData(){
                let _this = this;
                getWebInfo().then(function (response) {
                    if (response.data.code == 200) {
                        _this.formItem.id = response.data.result.id;
                        _this.formItem.webName = response.data.result.webName;
                        _this.formItem.webEmail = response.data.result.webEmail;
                    } else {
                        _this.$Message.error(response.data.message)
                    };
                    
                }).catch(function (error) {})
            }
        },
        created: function () {
            this.mockTableData()
        }
    }
</script>
      