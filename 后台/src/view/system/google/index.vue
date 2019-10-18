<style type="text/css">
    .ivu-input-group-append{
        cursor: pointer;
    }
</style>
<template>
    <div class="exchange">
        <Card :bordered="false">
            <p slot="title">谷歌验证</p>
            <Row>
                <Col span="12">
                    <Button type="success" @click="mockTableData()">绑定</Button>
                </Col>
                <Col span="12">
                    <Button type="warning" @click="modal2 = true">解绑</Button>
                </Col>
            </Row>
        </Card>

        <!-- 谷歌绑定弹框 -->
        <Modal
            v-model="modal1"
            title="谷歌验证绑定"
            @on-ok="ok"
            @on-cancel="cancel">
            <Form :model="formItem" :label-width="80">
                <FormItem label="绑定二维码:">
                    <img :src="'http://admin.clsaixingongyi.com'+ formItem.qrcode">
                </FormItem>
                <FormItem label="秘钥:">
                    <Input v-model="formItem.secret" disabled>
                        <span slot="append">选择复制密钥</span>
                    </Input>
                </FormItem>
                <FormItem label="手机验证码:">
                    <Input v-model="formItem.telCode" placeholder="手机验证码">
                        <span slot="append" @click="handleSubmit()">{{codetype.text}}</span>
                    </Input>
                </FormItem>
                <FormItem label="谷歌验证码:">
                    <Input v-model="formItem.code"></Input>
                </FormItem>
            </Form>
        </Modal>

        <!-- 解除谷歌认证 -->
        <Modal
            v-model="modal2"
            title="谷歌验证解除"
            @on-ok="relieve"
            @on-cancel="cancel">
            <Form :model="formItem" :label-width="80">
                <FormItem label="手机验证码:">
                    <Input v-model="formItem12.telCode" placeholder="手机验证码">
                        <span slot="append" @click="handleSubmit()">{{codetype.text}}</span>
                    </Input>
                </FormItem>
                <FormItem label="谷歌验证码:">
                    <Input v-model="formItem12.code"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
import './index.less'
import Clipboard from 'clipboard'; 
import { genSecret, getCode, verify, relieveGoolgeAuth } from '@/api/system'
export default {
  	name: 'error_content',
  	data(){
  		return {
            modal1:false,
            modal2:false,
            formItem:{},//绑定
            formItem12:{
                telCode:"",
                code:"",
                id:JSON.parse(window.sessionStorage.getItem("setToken")).pression.id,
            },//解除
            codetype:{
                text:"获取验证码",
                time:60,
                type:false,
                timedoew:"",
            }
  		}
  	},
  	methods:{
        ok(){
            let _this = this;
            for (var variable in _this.formItem) {
                if (!_this.formItem[variable]) {
                    _this.$Message.error('内容不能为空！');
                    return false;
                };
            };

            verify(_this.formItem).then(function (response) {
                if (response.data.code == 200) {
                    _this.$Message.success({
                        content: '绑定成功'
                    });
                } else {
                    _this.$Message.error(response.data.message)
                };
            }).catch(function (error) {})
        },
        cancel(){
            clearInterval(_this.codetype.timedoew);
            _this.codetype.type = false;
            _this.codetype.time = 60;
            _this.codetype.text = "再次获取验证码";
        },
        mockTableData(){
            let _this = this;
            genSecret({id:JSON.parse(window.sessionStorage.getItem("setToken")).pression.id}).then(function (response) {
                if (response.data.code == 200) {
                    _this.formItem = response.data.result;
                    _this.formItem.telCode = "";
                    _this.formItem.code = "";
                    _this.modal1 = true;
                } else {
                    _this.$Message.error(response.data.message)
                };
                
            }).catch(function (error) {})
        },
        handleSubmit(){
            let _this = this;
            let _data = {
                account:'15670996287',
                codeType:"506",
            };
            if(_this.codetype.type){
                return false;
            };
            _this.codetype.type = true;
            getCode(_data).then(function (response) {
                if (response.data.code == 200) {
                    _this.codetype.timedoew = window.setInterval(function(){
                        _this.codetype.time--;
                        _this.codetype.text = "再次获取"+_this.codetype.time;
                        if (_this.codetype.time < 1) {
                            _this.codetype.type = false;
                            _this.codetype.time = 60;
                            _this.codetype.text = "再次获取验证码";
                            clearInterval(_this.codetype.timedoew);
                        }
                    },1000)
                } else {
                    _this.$Message.error('获取数据失败')
                };
            }).catch(function (error) {})
        },
        relieve(){
            let _this = this;
            relieveGoolgeAuth(_this.formItem12).then(function (response) {
                if (response.data.code == 200) {
                    _this.$Message.success({
                        content: '解除成功'
                    });
                } else {
                    _this.$Message.error('获取数据失败')
                };
            }).catch(function (error) {})
        }
  	},
  	mounted(){
  	},
  	components: {
    	
  	},
  	props: {

  	}
}
</script>
