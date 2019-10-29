<template>
    <div id="mine">
        <!-- 顶部提示 -->
        <van-nav-bar 
            title="我的"
        />
        <div id="header">
            <van-row type="flex" justify="center">
                <van-image
                round
                width="10rem"
                height="10rem"
                src="https://img.yzcdn.cn/vant/cat.jpeg"
                />
            </van-row>
            <br>
            <br>
            <p id="name">{{name}}</p>
        </div>
        <br>
        <br>
        <div id="main">
            <van-cell title="我的收入" is-link to="" />
            <van-cell title="我的订单" is-link to="" />
            <van-cell title="退出" is-link to="/" />
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            name:"先写死"
        }
    }
}
</script>

<style scoped>
#header{
    margin-top: 10%;
}
#header #name{
    display: block;
    margin: 0 auto;
    text-align: center;
}

</style>