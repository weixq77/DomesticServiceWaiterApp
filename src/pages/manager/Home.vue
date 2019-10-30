<template>
    <div class="home">
        <!-- 顶部提示 -->
        <van-nav-bar 
            title="首页"
        />
        <!-- 顶部加载图片 -->
        <van-row>
            <img src="./images/首页1.jpg" width="100%">
        </van-row>
    </div>
</template>

<script>
import {isToken,getToken} from '@/utils/localStorage.js'
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
    created(){
        // if(isToken){
        //     // 有token，拿token去获取用户信息
        //     this.loginInfo(getToken());
        // }else{
        //     // 无token,去登陆
        //     this.$router.push({path:"/login"});
        // }
    },
    methods:{
        // // 获取用户信息
        // ...mapActions('user',['loginInfo']),
    }
}
</script>

<style scoped>

</style>