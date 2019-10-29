<template>
    <div class="layout">
        <router-view></router-view>
        <div>
            <van-tabbar v-model="active" @change="tabChangeHandler">
                <van-tabbar-item icon="wap-home-o" name="/home">首页</van-tabbar-item>
                <van-tabbar-item icon="orders-o" name="/order">订单</van-tabbar-item>
                <van-tabbar-item icon="user-o" name="/mine">我的</van-tabbar-item>
            </van-tabbar>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            active:0
        }
    },
    methods:{
        tabChangeHandler(path){
            this.$router.push({path})
        }
    }
}
</script>

<style scoped>

</style>