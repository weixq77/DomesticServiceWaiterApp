<template>
    <div id="layout">
        <router-view></router-view>
        <div>
            <van-tabbar v-model="active" @change="tabChangeHandler">
                <van-tabbar-item icon="wap-home-o" name="home">首页</van-tabbar-item>
                <van-tabbar-item icon="orders-o" name="order">订单</van-tabbar-item>
                <van-tabbar-item icon="user-o" name="mine">我的</van-tabbar-item>
            </van-tabbar>
        </div>
    </div>
</template>

<script>
import {isToken,getToken} from '@/utils/localStorage.js'
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
    name:'layout',
    data(){
        return{
            active:'home'
        }
    },
    created(){
        // 激活当前栏目
        if(this.$route.query.name){
            this.active = this.$route.query.name;
        }else{
            this.active = 'home';
        }
        if(isToken){
            // 有token，拿token去获取用户信息
            this.loginInfo(getToken());
        }else{
            // 无token,去登陆
            this.$router.push({path:"/login"});
        }
        
    },
    methods:{
        // 请求获取用户信息
        ...mapActions('user',['loginInfo']),
        tabChangeHandler(path){
            this.$router.push({path:"/manager/"+path});
        }
    }
}
</script>

<style scoped>

</style>