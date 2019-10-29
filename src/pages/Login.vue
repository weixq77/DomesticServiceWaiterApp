<template>
    <div id="login">
        <div class="header">
            <div class="header_title"><h2>家政服务平台●员工</h2></div>
        </div>
        
        <van-cell-group style="margin-bottom: 20px;">
            <van-field
                v-model="loginForm.username"
                required
                clearable
                label="用户名"
                placeholder="请输入用户名"
            />

            <van-field
                v-model="loginForm.password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
            />
        </van-cell-group>
        <van-button type="info" size="large" @click="loginHandler">登录</van-button>
        <span>username:waiter1    password:123321</span>

    </div>
</template>

<script>
import {mapState,mapGetters,mapActions} from 'vuex'
export default {
    name:'login',
    data(){
        return {
            loginForm:{
                type:'waiter',
                password:"123321",
                username:"waiter1"
            },
        }
    },
    methods:{
        ...mapActions("user",["login"]),
        // fun：登录函数
        loginHandler(){
            this.login(this.loginForm)
            .then(()=>{
                // 登录成功跳转我的页面，传递name激活对应栏目
                this.$router.push({path:"/manager", query:{name:"mine"}});
            })
            .catch((error)=>{
                // 登录失败提示信息
                this.$toast.fail(error);
            })
        }
    }
}
</script>

<style scoped>
.header{
    width: 100%;
    height: 200px;
    line-height: 100%;
    padding: 50px 0;
    text-align: center;
    box-sizing: border-box;
    background-color: rgb(48, 169, 250);
    
}
.header_title{
    line-height: 100px;
    color: #ffffff;
}
</style>