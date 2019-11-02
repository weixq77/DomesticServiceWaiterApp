<template>
    <div id="home">
        <!-- 顶部提示 -->
        <van-nav-bar 
            title="首页"
            fixed
        />
        <!-- 顶部加载图片 -->
        <van-row> 
            <van-swipe :autoplay="3000" indicator-color="white" class="banner">
                <van-swipe-item ><img src="./images/首页1.jpg"></van-swipe-item>
                <van-swipe-item><img src="./images/首页2.jpg"></van-swipe-item>
                <van-swipe-item><img src="./images/首页3.jpg"></van-swipe-item>
                <van-swipe-item><img src="./images/首页4.jpg"></van-swipe-item>
            </van-swipe>
        </van-row> 

        <div v-for="o in orderStatusFilter('待接单')" :key="o.id" id="djd">
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
    watch:{
        // 监听infoUser，当拿token去异步请求成功后infoUser被改变了再去查询员工的订单
        infoUser: function(){
            this.loadData();
        }
    },
    computed:{
        // 订单所有信息
        ...mapState("order",["orders"]),
        // 登陆者信息
        ...mapState("user",["infoUser"]),

        ...mapGetters("order",["orderStatusFilter"])
    },
    methods:{
        ...mapActions("order",["findAllOrders","refusedOrder","acceptOrder"]),
        // 根据登录id加载数据
        loadData(){
            this.findAllOrders(this.infoUser.id)
        },
        // 时间转换
        timestampToTime(datetime){
            if(datetime){
                datetime = new Date(datetime);
                let y = datetime.getFullYear() + '-';
                let mon = datetime.getMonth()+1 + '-';
                let d = datetime.getDate() + ' ';
                let h = datetime.getHours() + ':';
                let m = datetime.getMinutes() + ':';
                let s = datetime.getSeconds();
                return y + mon + d + h + m + s
            }
            return '';
        },
        // 待接单--拒绝订单
        refusedHandler(id){
            // 弹框提醒
            Dialog.confirm({
                title: '订单操作',
                message: '是否确认接受订单？'
                }).then(() => {
                    // 确认接受订单
                    this.refusedOrder(id);
                }).catch(() => {
                    // on cancel
                    
                });
        },
        // 待接单--接受订单
        acceptHandler(id){
            // this.acceptOrder(id);
            // 弹框提醒
            Dialog.confirm({
                title: '订单操作',
                message: '是否确认接受订单？'
                }).then(() => {
                    // 确认接受订单
                    this.acceptOrder(id);
                }).catch(() => {
                    // on cancel

                });
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
/* #djd{
    margin-top: 5%;
    border: 1px solid #ebedf0;
}
#content{
    padding: 4% 0%;
    border-top: 1px solid #ebedf0;
}

.van-cell{
    padding: 0% 5%;
    font-size: 16px;
    line-height: 1.7em;
}
#content_nr{
    padding: 2% 5%;
    font-size: 14px;
} */
</style>