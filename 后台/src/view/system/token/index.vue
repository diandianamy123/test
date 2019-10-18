<template>
    <div class="manage_log">
        <Card :bordered="false">
            <p slot="title">代币销毁</p>
            <Form :model="formItem" :label-width="80">
                <FormItem label="销毁数量">
                    <Input v-model="formItem.amtToken" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem label="钱包秘钥">
                    <Input v-model="formItem.pk" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem label="谷歌验证码">
                    <Input v-model="formItem.code" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="mockTableData()">确定</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>
  
<script>
    import { destroyAxgy } from '@/api/system'
    export default {
        data () {
            return {
                formItem:{
                    amtToken:"",
                    pk:"",
                    code:"",
                    id:JSON.parse(window.sessionStorage.getItem("setToken")).pression.id,
                },
            }
        },
        methods: {
            mockTableData(){
                let _this = this;
                destroyAxgy(_this.formItem).then(function (response) {
                    if (response.data.code == 200) {
                        _this.$Message.success({
                            content: '销毁成功'
                        });
                        for (var variable in _this.formItem) {
                            _this.formItem[variable] = "";
                        };
                    } else {
                        _this.$Message.error(response.data.message)
                    };
                    
                }).catch(function (error) {})
            }
        },
        created: function () {
            
        }
    }
</script>
      