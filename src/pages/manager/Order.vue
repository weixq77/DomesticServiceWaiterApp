<template>
    <div class="order">
        <!-- 顶部提示 -->
        <van-nav-bar 
            title="订单"
        />
        <!-- 标签页 -->
        <van-tabs v-model="active">
            <!-- 所有订单 -->
            <van-tab title="所有订单">
               <div v-for="o in orders" :key="o.id" id="content">
                    <!-- 将查询信息传给面板展示订单信息 -->
                    <van-panel :title="o.customer.realname" :status="o.status" >
                        <div slot="default" id="content_nr">
                            <ul>
                                <li> <van-icon name="balance-pay" size="mini"></van-icon> 总额: {{o.total}}</li>
                                <li> <van-icon name="location-o" size="mini"></van-icon> 地址: {{o.address.province + o.address.city + o.address.area + o.address.address}}</li>
                                <li> <van-icon name="clock-o" size="mini"></van-icon> 下单时间: {{timestampToTime(o.orderTime)}}</li>
                            </ul>
                        </div>
                    </van-panel>
                    <!-- <br> -->
               </div>
            </van-tab>
            <!-- 未接订单 -->
            <van-tab title="未接订单">
                <!-- 遍历查询信息 -->
                <!-- 将查询信息展示在面板 -->
                <div v-for="o in orders" :key="o.id" >
                    <div v-if="o.status === '待接单'">
                        <van-panel :title="o.customer.realname" :status="o.status" :key="o.id" >
                            <div slot="default" id="content_nr">
                                <ul>
                                    <li> <van-icon name="balance-pay" size="mini"></van-icon> 总额: {{o.total}}</li>
                                    <li> <van-icon name="location-o" size="mini"></van-icon> 地址: {{o.address.province + o.address.city + o.address.area + o.address.address}}</li>
                                    <li> <van-icon name="clock-o" size="mini"></van-icon> 下单时间: {{timestampToTime(o.orderTime)}}</li>
                                </ul>
                            </div>
                            <div slot="footer">
                                <van-row>
                                    <van-col offset="16" span="16">
                                        <van-button size="small" plain type="danger" @click="refusedHandler">拒绝</van-button>
                                        &nbsp;&nbsp;&nbsp;
                                        <van-button size="small" plain type="primary" @click="acceptHandler">接受</van-button>
                                    </van-col>
                                </van-row>
                            </div>
                        </van-panel>
                    </div>
                </div>
            </van-tab>
            <!-- 已接订单 -->
            <van-tab title="已接订单">
                <div v-for="o in orders" :key="o.id">
                    <div v-if="o.status === '待完成'">
                        <van-panel :title="o.customer.realname" :status="o.status" :key="o.id">
                            <div slot="default" id="content_nr">
                                <ul>
                                    <li> <van-icon name="balance-pay" size="mini"></van-icon> 总额: {{o.total}}</li>
                                    <li> <van-icon name="location-o" size="mini"></van-icon> 地址: {{o.address.province + o.address.city + o.address.area + o.address.address}}</li>
                                    <li> <van-icon name="clock-o" size="mini"></van-icon> 下单时间: {{timestampToTime(o.orderTime)}}</li>
                                </ul>
                            </div>
                            <div slot="footer">
                                <van-row>
                                    <van-col offset="20" span="20">
                                        <van-button size="small" plain type="danger" @click="completeHandler">确认完成</van-button>
                                    </van-col>
                                </van-row>
                            </div>
                        </van-panel>
                    </div>
                </div>
            </van-tab>
            <!-- 待确认 -->
            <van-tab title="待确认">
                <div v-for="o in orders" :key="o.id">
                    <div v-if="o.status === '待确认'">
                        <van-panel :title="o.customer.realname" :status="o.status">
                            <!-- {{o.customer.realname}} -->
                            <div slot="default" id="content_nr">
                                <ul>
                                    <li> <van-icon name="balance-pay" size="mini"></van-icon> 总额: {{o.total}}</li>
                                    <li> <van-icon name="location-o" size="mini"></van-icon> 地址: {{o.address.province + o.address.city + o.address.area + o.address.address}}</li>
                                    <li> <van-icon name="clock-o" size="mini"></van-icon> 下单时间: {{timestampToTime(o.orderTime)}}</li>
                                </ul>
                            </div>
                        </van-panel>
                    </div>
                    <div v-else-if="!( o.status==='待接单' || o.status==='待完成')" id="dqr_none">
                        <van-image src="">
                            <template v-slot:loading>加载失败</template>
                        </van-image>
                    </div>
                </div>
            </van-tab>
            <!-- 已完成 -->
            <van-tab title="已完成">
                <div v-for="o in orders" :key="o.id">
                    <div v-if="o.status === '已完成'">
                        <van-panel :title="o.customer.realname" :status="o.status">
                            <div slot="default" id="content_nr">
                                <ul>
                                    <li> <van-icon name="balance-pay" size="mini"></van-icon> 总额: {{o.total}}</li>
                                    <li> <van-icon name="location-o" size="mini"></van-icon> 地址: {{o.address.province + o.address.city + o.address.area + o.address.address}}</li>
                                    <li> <van-icon name="clock-o" size="mini"></van-icon> 下单时间: {{timestampToTime(o.orderTime)}}</li>
                                </ul>
                            </div>
                        </van-panel>
                    </div>
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
        ...mapActions("order",["findAllOrders"]),
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
        refusedHandler(){
            // 异步操作订单--拒绝订单
            function beforeClose(action,done){
                // 当点击确认时
                if(action === 'confirm'){
                    setTimeout(done,1000)
                }else{
                    // 取消
                    // console.log(done);
                    done(console.log("我还不知道这里是返回什么的"));
                }
            };
            // 弹框提醒
            Dialog.confirm({
                title: '订单操作',
                message: '确认拒绝订单？',
                beforeClose
                });
        },
        // 待接单--接受订单
        acceptHandler(){
            // 异步操作订单--接受订单
            function beforeClose(action,done){
                if(action === 'confirm'){
                    setTimeout(done,3000)
                }else{
                    // console.log(done);
                    done(console.log("我还不知道这里是返回什么的"));
                }
            };
            // 弹框提醒
            Dialog.confirm({
                title: '订单操作',
                message: '确认接受订单？',
                beforeClose
                })
        },
        // 已接订单--确认完成
        completeHandler(){
            // 异步操作订单--确认完成订单
            function beforeClose(action,done){
                if(action === 'confirm'){
                    setTimeout(done,3000)
                }else{
                    // console.log(done);
                    done(console.log("我还不知道这里是返回什么的"));
                }
            };
            // 弹框提醒
            Dialog.confirm({
                title: '订单操作',
                message: '确认完成顾客订单要求',
                beforeClose
                })
        },
    }
}
</script>

<style scoped>
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
}
#dqr_none van-image .van-icon{
    margin: 30% 20%;
}
</style>