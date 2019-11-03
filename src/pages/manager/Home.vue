<template>
    <div id="home">
        <!-- 顶部提示 -->
         <div class="orderTab">
            <van-nav-bar title="首页" fixed/>
        </div>
        <!-- 顶部加载图片 -->
        <van-row> 
            <van-swipe :autoplay="3000" indicator-color="white" class="banner">
                <van-swipe-item ><img src="./images/首页1.jpg"></van-swipe-item>
                <van-swipe-item><img src="./images/首页2.jpg"></van-swipe-item>
                <van-swipe-item><img src="./images/首页3.jpg"></van-swipe-item>
                <van-swipe-item><img src="./images/首页4.jpg"></van-swipe-item>
            </van-swipe>
        </van-row> 

        <div v-for="o in orderStatusFilter('待接单')" :key="o.id">
            <vicki-cardOrderAccept :data=o></vicki-cardOrderAccept>
        </div>
    </div>
</template>

<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
import {Dialog} from 'vant'
export default {
    name:'home',
    created(){
        // 激活当前数据
       this.loadData();
    },
    computed:{
        // 订单所有信息
        ...mapState("order",["orders"]),
        // 登陆者信息
        ...mapState("user",["infoUser"]),

        ...mapGetters("order",["orderStatusFilter"])
    },
    methods:{
        // ...mapActions("order",["findAllOrders","refusedOrder","acceptOrder"]),
        // 根据登录id加载数据
        loadData(){
            // this.findAllOrders(this.infoUser.id)
        }
        
    }
}
</script>

<style scoped>
.banner img{
    height: 170px;
}
img{
    width: 100%;
}
.orderTab{
    height: 50px;
}
</style>