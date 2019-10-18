<template>
    <div class="exchange">
        <Card shadow title="团队详情">
            <row class="join-page":gutter="32">
                <i-col span="24">
                    <row type="flex" justify="center">
                        <i-col span="24">
                            <Form ref="formInline" inline :label-width="80">
                                <FormItem label="会员账号">
                                    <Input type="text" v-model="formInline.user" placeholder="Username">
                                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                                    </Input>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" @click="handleSubmit('formInline')">搜索</Button>
                                </FormItem>
                            </Form>
                        </i-col>
                    </row>
                </i-col>
            </row>
            <row class="join-page":gutter="32">
                <i-col span="24">
                    <row type="flex" justify="center">
                        <i-col span="24">
                            <Tree :data="data1" :load-data="loadData"></Tree>
                        </i-col>
                    </row>
                </i-col>
            </row>
        </Card>
    </div>
</template>
<script>
import './index.less'
import { myTeam , myTeamLevel } from '@/api/user'
export default {
  	name: 'error_content',
  	data(){
  		return {
            formInline:{
                user:"",
            },
            data1: [],
  		}
  	},
  	methods:{
        loadData (item, callback) {
            let _this = this;
            myTeamLevel({id:item.ids}).then(function(response) {
                let _data = [];
                if(response.data.code == 200) {
                    let texttitle = "";
                    for(var j = 0, length2 = response.data.result.length; j < length2; j++){
                        texttitle = "姓名：" + response.data.result[j].username + "，手机号："+ response.data.result[j].tel + '，账号：' + response.data.result[j].userUid;
                        _data[j] = {
                            title: texttitle,
                            loading: false,
                            ids:response.data.result[j].id,
                            children: [],   
                        };
                    };
                    callback(_data);
                } else {
                    _this.$Message.info(response.data.message);
                };
            })
        },
        handleSubmit(){
            let _this = this;
            let _dataget = {
                userUid:_this.formInline.user
            };
            myTeamLevel(_dataget).then(function(response) {
                if(response.data.code == 200) {
                    let texttitle = "";
                    for(var j = 0, length2 = response.data.result.length; j < length2; j++){
                        texttitle = "姓名：" + response.data.result[j].username + "，手机号："+ response.data.result[j].tel + '，账号：' + response.data.result[j].userUid;
                        _this.$set(_this.data1, j, {
                            title: texttitle,
                            loading: false,
                            ids:response.data.result[j].id,
                            children: [],   
                        });
                    };
                } else {
                    _this.$Message.info(response.data.message);
                };
            })
        }
  	},
  	mounted(){
        
  	},
    created(){
        let _this = this;
        myTeam().then(function(response) {
            if(response.data.code == 200) {
                let texttitle = "";
                for(var j = 0, length2 = response.data.result.length; j < length2; j++){
                    texttitle = "姓名：" + response.data.result[j].username + "，手机号："+ response.data.result[j].tel + '，账号：' + response.data.result[j].userUid;
                    _this.$set(_this.data1, j, {
                        title: texttitle,
                        loading: false,
                        ids:response.data.result[j].id,
                        children: [],   
                    });
                };
            } else {
                _this.$Message.info(response.data.message);
            };
        })
    },
  	components: {
    	
  	},
  	props: {

  	}
}
</script>
