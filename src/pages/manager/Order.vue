<template>
    <div class="order">
        <!-- 顶部提示 -->
        <van-nav-bar 
            title="订单"
        />
        <!-- 标签页 -->
        <van-tabs v-model="active">
            <van-tab title="全部订单">全部订单</van-tab>
            <van-tab title="待接单">待结单</van-tab>
            <van-tab title="待完成">待完成</van-tab>
            <van-tab title="已完成">已完成</van-tab>
        </van-tabs>
    </div>
</template>

<script>
export default {
    data(){
        return{
            active:0
        }
    }
}
</script>

<style scoped>

</style>