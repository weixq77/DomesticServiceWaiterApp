<template>
    <div class="orderList">
        <!-- 返回 -->
        <van-nav-bar
            title="我的收入"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />

        <div id="container">
            <p>test</p>
        </div>

    </div>
</template>

<script>
export default {
    methods:{
        // 点击返回时退回前一个操作
        onClickLeft(){
            this.$router.go(-1);
        }
    }
}
</script>

<style scoped>
.orderList{
    display: flex;
    flex-direction: column;
}
#container{
    flex: 1;
}
</style>