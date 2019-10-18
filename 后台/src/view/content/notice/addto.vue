<style>
    .article_add .ivu-form{
        width:1000px;
        margin:0 auto;
    }
</style>
<template>
    <div class="article_add">
       <Form :model="formItem" :label-width="150">
            <FormItem label="中文标题:" prop="title" >
                <Input type="text"  placeholder="请输入文章标题" v-model="formItem.title"/>
            </FormItem>
            <FormItem label="中文内容:">
                <vue-ueditor-wrap v-model="formItem.detailsCN" :config="myConfig"></vue-ueditor-wrap>
            </FormItem>
            <FormItem label="英文标题:" prop="titleUS" >
                <Input type="text"  placeholder="请输入文章标题" v-model="formItem.titleUS"/>
            </FormItem>
            <FormItem label="英文内容:">
                <vue-ueditor-wrap v-model="formItem.detailsUS" :config="myConfig"></vue-ueditor-wrap>
            </FormItem>
            <FormItem label="  ">
                <Button type="primary" @click="handleSubmit()">提交</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
import {  addNotice, toUpdateNotice, updateNotice } from '@/api/content'
import VueUeditorWrap from 'vue-ueditor-wrap'
export default {
    data () {
        return {
            formItem:{
                id:"",
                title: '',              // 文章标题
                detailsCN: '',
                titleUS: '',              // 英文标题
                detailsUS: '',   //英文内容
            },
            myConfig:this.$public.UEconfig
        }
    },
    methods: {
        // 提交
        handleSubmit(){
            const _this = this;
            if(_this.formItem.title == '') {
                _this.$Message.warning('中文标题不能为空');
                return ;
            };
            if(_this.formItem.titleUS == '') {
                _this.$Message.warning('英文标题不能为空');
                return ;
            };
            if(_this.formItem.detailsCN == 'false') {
                _this.$Message.warning('中文内容不能为空');
                return;
            };
            if(_this.formItem.detailsUS == 'false') {
                _this.$Message.warning('英文内容不能为空');
                return;
            };
            if (_this.formItem.id) {
                updateNotice(_this.formItem).then(function(response) {
                    if(response.data.code == 200){
                        _this.$Message.success('成功');
                        _this.$router.go(-1);
                    }else {
                        _this.$Message.error('失败');
                    }

                }).catch(function(error) {});
                return false;
            };
            addNotice(_this.formItem).then(function(response) {
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
        if (_this.$route.params.userId) {
            toUpdateNotice({id:_this.$route.params.userId}).then(function(response) {
                if(response.data.code == 200){
                    _this.formItem.id = response.data.result.id;
                    _this.formItem.title = response.data.result.title;
                    _this.formItem.detailsCN = response.data.result.detailsCN;
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
