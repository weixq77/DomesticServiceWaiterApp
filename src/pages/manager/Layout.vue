<template>
    <div id="layout">
        <router-view></router-view>
        <div class="tabbar_layout">
            <van-tabbar v-model="active" router>
                <van-tabbar-item icon="wap-home-o" to="/manager/home">首页</van-tabbar-item>
                <van-tabbar-item icon="orders-o" to="/manager/order">订单</van-tabbar-item>
                <van-tabbar-item icon="user-o" to="/manager/mine">我的</van-tabbar-item>
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
            active:0
        }
    },
    created(){
        // 激活当前栏目
        if(this.$route.query.id){
            this.active = this.$route.query.id;
        }
        // if(isToken){
        //     // 有token，拿token去获取用户信息
        //     this.loginInfo(getToken());
        // }else{
        //     // 无token,去登陆
        //     this.$router.push({path:"/login"});
        // }
        
    },
    methods:{
        // 请求获取用户信息
        // ...mapActions('user',['loginInfo']),
    }
}
</script>

<style scoped>
.tabbar_layout::before{
    content: "";
    clear: both;
    display: block;
    height: 50px;
}

</style>