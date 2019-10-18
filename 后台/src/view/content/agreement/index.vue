<style>
    .article_add .ivu-form{
        width:1000px;
        margin:0 auto;
    }
</style>
<template>
    <div class="article_add">
        <Tabs value="0">
            <TabPane v-for="(item,index) in formItem" :label="item.titlech" :name="index.toString()">
                <Form :model="formItem" :label-width="150">
                    <FormItem label="英文">
                        <vue-ueditor-wrap v-model="item.contentUs" :config="myConfig"></vue-ueditor-wrap>
                    </FormItem>
                    <FormItem label="中文">
                        <vue-ueditor-wrap v-model="item.content" :config="myConfig"></vue-ueditor-wrap>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit()">提交</Button>
                    </FormItem>
                </Form>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import {  getWebAgreement, editWebgreement } from '@/api/content'
import VueUeditorWrap from 'vue-ueditor-wrap'
export default {
    data () {
        return {
            formItem:[],
            myConfig:this.$public.UEconfig
        }
    },
    methods: {
        // 提交
        handleSubmit(){
            let _this = this;
            let _data = JSON.parse(JSON.stringify(_this.formItem));
            for(var j = 0, length2 = _data.length; j < length2; j++){
                delete _data[j].titlech;
            }
            editWebgreement({list:JSON.stringify(_data)}).then(function(response) {
                if(response.data.code == 200){
                    _this.$Message.success('成功');
                }else {
                    _this.$Message.error('失败');
                }

            }).catch(function(error) {});
        },
    },
    mounted:function(){
        var _this = this;
        getWebAgreement().then(function(response) {
            if(response.data.code == 200){
                for (var variable in response.data.result) {
                    switch (response.data.result[variable].id) {
                        case "1":
                            response.data.result[variable].titlech = "交易规则";
                            break;
                        case "3":
                            response.data.result[variable].titlech = "用户协议";
                            break;
                        case "4":
                            response.data.result[variable].titlech = "隐私条款";
                            break;
                        case "5":
                            response.data.result[variable].titlech = "法律说明";
                            break;
                        case "6":
                            response.data.result[variable].titlech = "关于BNRCOIN";
                            break;
                        case "7":
                            response.data.result[variable].titlech = "关于反洗钱";
                            break;
                        case "8":
                            response.data.result[variable].titlech = "费率说明";
                            break;
                        case "9":
                            response.data.result[variable].titlech = "服务协议";
                            break;
                        case "10":
                            response.data.result[variable].titlech = "法币交易";
                            break;
                        case "11":
                            response.data.result[variable].titlech = "币币交易";
                            break;
                        case "12":
                            response.data.result[variable].titlech = "帮助中心";
                            break;
                        case "13":
                            response.data.result[variable].titlech = "商家申请文案";
                            break;
                        case "14":
                            response.data.result[variable].titlech = "商家取消文案";
                            break;
                        default:
                            delete response.data.result[variable]
                            // response.data.result.splice(variable,1)
                            break;
                    };
                };
                _this.formItem = response.data.result;
            }else {
                _this.$Message.error(response.data.message);
            }

        }).catch(function(error) {});
    },
    components: {
        VueUeditorWrap
    },
    // 销毁
    destroyed:function(){
        
    }
};
</script>

<style>
.webuploader-container {
    position: relative;
}
.webuploader-element-invisible {
    position: absolute !important;
    clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
    clip: rect(1px,1px,1px,1px);
}
.webuploader-pick {
    position: relative;
    display: inline-block;
    cursor: pointer;
    background: #00b7ee;
    padding: 0px 15px;
    color: #fff;
    text-align: center;
    border-radius: 3px;
    overflow: hidden;
}
.webuploader-pick-hover {
    background: #00a2d4;
}

.webuploader-pick-disable {
    opacity: 0.6;
    pointer-events:none;
}
</style>
