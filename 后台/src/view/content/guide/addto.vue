<style>
    .article_add .ivu-form{
        width:1000px;
        margin:0 auto;
    }
</style>
<template>
    <div class="article_add">
       <Form :model="formItem" :label-width="150">
            <FormItem label="文章标题（中文）:" prop="title" >
                <Input type="text"  placeholder="文章标题（中文）" v-model="formItem.title"/>
            </FormItem>
            <FormItem label="文章内容（中文）:">
                <vue-ueditor-wrap v-model="formItem.content" :config="myConfig"></vue-ueditor-wrap>
            </FormItem>
            <FormItem label="文章标题（英文）:" prop="titleUS" >
                <Input type="text"  placeholder="文章标题（英文）" v-model="formItem.titleUS"/>
            </FormItem>
            <FormItem label="文章内容（英文）:">
                <vue-ueditor-wrap v-model="formItem.contentUS" :config="myConfig"></vue-ueditor-wrap>
            </FormItem>
            <FormItem label="  ">
                <Button type="primary" @click="handleSubmit()">提交</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
import {  addRule, toUpdateRule, updateRule } from '@/api/content'
import VueUeditorWrap from 'vue-ueditor-wrap'
export default {
    data () {
        return {
            formItem:{
                id:"",
                title: '',           
                titleUS: '',
                content: '',
                contentUS:"",
            },
            myConfig:this.$public.UEconfig
        }
    },
    methods: {
        // 提交
        handleSubmit(){
            const _this = this;
            if(_this.formItem.title == '' || _this.formItem.titleUS == '') {
                _this.$Message.warning('文章标题不能为空');
                return ;
            };
            if(_this.formItem.content == 'false' || _this.formItem.contentUS == '') {
                _this.$Message.warning('文章内容不能为空');
                return;
            };
            if (_this.formItem.id) {
                updateRule(_this.formItem).then(function(response) {
                    if(response.data.code == 200){
                        _this.$Message.success('成功');
                        _this.$router.go(-1);
                    }else {
                        _this.$Message.error('失败');
                    }

                }).catch(function(error) {});
                return false;
            };
            addRule(_this.formItem).then(function(response) {
                if(response.data.code == 200){
                    _this.$Message.success('成功');
                    _this.$router.go(-1);
                }else {
                    _this.$Message.error('失败');
                }

            }).catch(function(error) {});
        },
    },
    mounted:function(){
        var _this = this;
        if (_this.$route.query.userId) {
            toUpdateRule({id:_this.$route.query.userId}).then(function(response) {
                if(response.data.code == 200){
                    _this.formItem.id = response.data.result.id;
                    _this.formItem.title = response.data.result.title;
                    _this.formItem.titleUS = response.data.result.titleUS;
                    _this.formItem.content = response.data.result.content;
                    _this.formItem.contentUS = response.data.result.contentUS;
                }else {
                    _this.$Message.error(response.data.message);
                }

            }).catch(function(error) {});
        };
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
