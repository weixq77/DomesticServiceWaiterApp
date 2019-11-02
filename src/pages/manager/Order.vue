<template>
    <div class="order">
        <!-- 顶部提示 -->
        <van-nav-bar 
            title="订单"
            fixed
        />
        <!-- 标签页 -->
        <van-tabs v-model="active"  swipeable :offset-top="46" sticky>
            <!-- 所有订单 -->
            <van-tab title="所有订单">
                
                <!-- 如果订单状态为待接单，显示待接单订单信息 -->
                <div v-for="o in orderStatusFilter('待接单')" :key="o.id" id="content">
                    <vicki-cardOrderAccept :data=o></vicki-cardOrderAccept>
                </div>
               
                <!-- 如果订单状态为待完成，显示待完成订单信息 -->
                <div v-for="o in orderStatusFilter('待服务')" :key="o.id" id="content">
                    <vicki-cardOrderComfirm :data=o></vicki-cardOrderComfirm>
                </div>
                
                <!-- 否则显示待确认订单信息 -->
                <div v-for="o in orderStatusFilter('待确认')" :key="o.id" id="content">
                    <vicki-cardOrder :data=o></vicki-cardOrder>
                </div>
               
                <!-- 如果订单状态为已完成，显示已完成订单信息 -->
                    <!-- 将查询信息传给面板展示订单信息 -->
                <div v-for="o in orderStatusFilter('已完成')" :key="o.id" id="content">
                    <vicki-cardOrder :data=o></vicki-cardOrder>
                </div>
                
            </van-tab>
            
            <!-- 未接订单 -->
            <van-tab title="未接订单">
                <!-- 遍历查询信息 -->
                <!-- 将查询信息展示在面板 -->
                <div v-if="orderStatusFilter('待接单').length!=0">
                    <div v-for="o in orderStatusFilter('待接单')" :key="o.id" id="content">
                        <vicki-cardOrderAccept :data=o></vicki-cardOrderAccept>
                    </div>
                </div>                
                <div v-else id="order_none">
                    <img src="./images/tips.jpg" alt="">
                </div>
            </van-tab>
            <!-- 已接订单 -->
            <van-tab title="已接订单">
                <div v-if="orderStatusFilter('待服务').length!=0">
                    <div v-for="o in orderStatusFilter('待服务')" :key="o.id" id="content">
                        <vicki-cardOrderComfirm :data=o></vicki-cardOrderComfirm>
                    </div>
                </div>
                <div v-else id="order_none">
                    <img src="./images/tips.jpg" alt="">
                </div>
            </van-tab>
            <!-- 待确认 -->
            <van-tab title="待确认">
                <div v-if="orderStatusFilter('待确认').length!=0">
                    <div  v-for="o in orderStatusFilter('待确认')" :key="o.id" id="content">
                        <vicki-cardOrder :data=o></vicki-cardOrder>
                    </div>
                </div>
                <div v-else id="order_none">
                    <img src="./images/tips.jpg" alt="">
                </div>
            </van-tab>
            <!-- 已完成 -->
            <van-tab title="已完成">
                <div v-if="orderStatusFilter('已完成').length!=0">
                    <div  v-for="o in orderStatusFilter('已完成')" :key="o.id" id="content">
                        <vicki-cardOrder :data=o></vicki-cardOrder>
                    </div>
                </div>
                <div v-else id="order_none">
                    <img src="./images/tips.jpg" alt="">
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import {Dialog} from 'vant'
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'

export default {
    data(){
        return{
            // 默认所有订单为订单首选项
            active:0,
        }
    },
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
        ...mapActions("order",["findAllOrders","refusedOrder","acceptOrder","completeOrder"]),
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
                message: '是否确认拒绝订单？'
                }).then(() => {
                    // 确认接受订单
                    this.refusedOrder(id);
                }).catch(() => {
                    // on cancel
                    
                });
        },
        // 待接单--接受订单
        acceptHandler(id){
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
        },
        // 已接订单--确认完成
        completeHandler(id){
            // 弹框提醒
            Dialog.confirm({
                title: '订单操作',
                message: '是否确认完成订单？'
                }).then(() => {
                    // 确认接受订单
                    this.completeOrder(id);
                }).catch(() => {
                    // on cancel   
                });
        },
    }
}
</script>

<style scoped>
/*#content{
     padding: 5% 0% 0%; 
    border-top: 1px solid #ebedf0;
    border-bottom: 1px solid #ebedf0;
}

.van-cell{
    padding: 0% 5%;
    font-size: 16px;
    line-height: 1.7em;
}
#content_nr{
    padding: 2% 5%;
    font-size: 14px;
}
#order_none img{
    width: 100%;
    height: 100%;
    border-radius: 10px;
}*/
</style>