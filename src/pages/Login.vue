<template>
    <div id="login">
        <div class="header">
            <div class="header_title"><h2>家政服务平台●员工</h2></div>
        </div>
        
        <van-cell-group style="margin-bottom: 20px;">
            <van-field
                v-model="login.username"
                required
                clearable
                label="用户名"
                placeholder="请输入用户名"
            />

            <van-field
                v-model="login.password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
            />
        </van-cell-group>
        <van-button type="info" size="large" @click="login">登录</van-button>

    </div>
</template>

<script>
export default {
    name:'login',
    data(){
        return {
            login:{
                username:'',
                password:'',
            },
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