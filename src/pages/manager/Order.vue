<template>
    <div class="order">
        <!-- 顶部提示 -->
        <van-nav-bar 
            title="订单"
        />
        <!-- 标签页 -->
        <van-tabs v-model="active">
            <van-tab title="所有订单">所有订单</van-tab>
            <van-tab title="未接订单">未接订单</van-tab>
            <van-tab title="已接订单">已接订单</van-tab>
            <van-tab title="待确认">待确认</van-tab>
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