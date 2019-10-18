<style>
    .article_add .ivu-form{
        width:1000px;
        margin:0 auto;
    }
</style>
<template>
    <div class="article_add">
       <Form :model="formItem" :label-width="150">
            <FormItem label="文章标题:" prop="title" >
                <Input type="text"  placeholder="请输入文章标题" v-model="formItem.bm_title"/>
            </FormItem>
            <FormItem label="图片地址:" prop="title" >
                <Input type="text"  placeholder="请输入图片地址" v-model="formItem.pic_addr"/>
            </FormItem>
            <FormItem label="摘要:" prop="title" >
                <Input type="text"  placeholder="请输入摘要" v-model="formItem.abstracts"/>
            </FormItem>
            <FormItem label="文章地址:" prop="title" >
                <Input type="text"  placeholder="请输入文章地址" v-model="formItem.context"/>
            </FormItem>
            <FormItem label="文章内容:">
                <vue-ueditor-wrap v-model="formItem.content" :config="myConfig"></vue-ueditor-wrap>
            </FormItem>
            <FormItem label="  ">
                <Button type="primary" @click="handleSubmit()">提交</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
import {  addRule } from '@/api/content'
import VueUeditorWrap from 'vue-ueditor-wrap'
export default {
    data () {
        return {
            formItem:{
                bm_title:"",
                pic_addr: '',              // 文章标题
                abstracts: '',
                context:"",
                content:"",
            },
            myConfig:this.$public.UEconfig
        }
    },
    methods: {
        // 提交
        handleSubmit(){
            const _this = this;
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
    mounted:function(){},
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
