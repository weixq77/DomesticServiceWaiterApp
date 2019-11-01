<template>
    <div class="order">
        <!-- 顶部提示 -->
        <van-nav-bar 
            title="订单"
        />
        <!-- 标签页 -->
        <van-tabs v-model="active" >
            <!-- 所有订单 -->
            <van-tab title="所有订单">
                
                <!-- 如果订单状态为待接单，显示待接单订单信息 -->
                <div v-if="orderStatusFilter('待接单').length!=0">
                    <div v-for="o in orderStatusFilter('待接单')" :key="o.id" id="content">
                        <div>
                            <van-panel :title="o.customer.realname" :status="o.status" :key="o.id" >
                                <div slot="default" id="content_nr">
                                    <ul>
                                        <li> <van-icon name="balance-pay" size="mini"></van-icon> 订单总额: {{o.total}}</li>
                                        <li> <van-icon name="location-o" size="mini"></van-icon> 服务地址: {{o.address.province + o.address.city + o.address.area + o.address.address}}</li>
                                        <li> <van-icon name="phone-o" size="mini"></van-icon> 联系方式: {{o.customer.telephone}}</li>
                                        <li> <van-icon name="clock-o" size="mini"></van-icon> 下单时间: {{timestampToTime(o.orderTime)}}</li>
                                    </ul>
                                </div>
                                <div slot="footer">
                                    <van-row>
                                        <van-col offset="16" span="16">
                                            <van-button size="small" plain type="danger" @click="refusedHandler(o.id)">拒绝</van-button>
                                            &nbsp;&nbsp;&nbsp;
                                            <van-button size="small" plain type="primary" @click="acceptHandler(o.id)">接受</van-button>
                                        </van-col>
                                    </van-row>
                                </div>
                            </van-panel>
                        </div>
                    </div>
                </div>
                <!-- 如果订单状态为待完成，显示待完成订单信息 -->
                <div v-if="orderStatusFilter('待完成').length!=0">
                    <div v-for="o in orderStatusFilter" :key="o.id" id="content">
                        <div>
                            <van-panel :title="o.customer.realname" :status="o.status" :key="o.id">
                                <div slot="default" id="content_nr">
                                    <ul>
                                        <li> <van-icon name="balance-pay" size="mini"></van-icon> 订单总额: {{o.total}}</li>
                                        <li> <van-icon name="location-o" size="mini"></van-icon> 服务地址: {{o.address.province + o.address.city + o.address.area + o.address.address}}</li>
                                        <li> <van-icon name="phone-o" size="mini"></van-icon> 联系方式: {{o.customer.telephone}}</li>
                                        <li> <van-icon name="clock-o" size="mini"></van-icon> 下单时间: {{timestampToTime(o.orderTime)}}</li>
                                    </ul>
                                </div>
                                <div slot="footer">
                                    <van-row>
                                        <van-col offset="20" span="20">
                                            <van-button size="small" plain type="danger" @click="completeHandler(o.id)">确认完成</van-button>
                                        </van-col>
                                    </van-row>
                                </div>
                            </van-panel>
                        </div>
                    </div>
                </div>
                <!-- 否则显示待确认订单信息 -->
                <div v-if="orderStatusFilter('待确认').length!=0">
                    <!-- 将查询信息传给面板展示订单信息 -->
                    <div v-for="o in orderStatusFilter('待确认')" :key="o.id" id="content">
                        <div>
                            <van-panel :title="o.customer.realname" :status="o.status" >
                                <div slot="default" id="content_nr">
                                    <ul>
                                        <li> <van-icon name="balance-pay" size="mini"></van-icon> 订单总额: {{o.total}}</li>
                                        <li> <van-icon name="location-o" size="mini"></van-icon> 服务地址: {{o.address.province + o.address.city + o.address.area + o.address.address}}</li>
                                        <li> <van-icon name="phone-o" size="mini"></van-icon> 联系方式: {{o.customer.telephone}}</li>
                                        <li> <van-icon name="clock-o" size="mini"></van-icon> 下单时间: {{timestampToTime(o.orderTime)}}</li>
                                    </ul>
                                </div>
                            </van-panel>
                        </div>
                    </div>
                </div>
                <!-- 如果订单状态为已完成，显示已完成订单信息 -->
                <div v-else>
                    <!-- 将查询信息传给面板展示订单信息 -->
                    <div v-for="o in orderStatusFilter('已完成')" :key="o.id" id="content">
                        <div>
                            <van-panel :title="o.customer.realname" :status="o.status" >
                                <!-- 订单相关信息 -->
                                <div slot="default" id="content_nr">
                                    <ul>
                                        <!-- 订单服务金额、服务地址、及下单时间 -->
                                        <li> <van-icon name="balance-pay" size="mini"></van-icon> 订单总额: {{o.total}}</li>
                                        <li> <van-icon name="location-o" size="mini"></van-icon> 服务地址: {{o.address.province + o.address.city + o.address.area + o.address.address}}</li>
                                        <li> <van-icon name="phone-o" size="mini"></van-icon> 联系方式: {{o.customer.telephone}}</li>
                                        <li> <van-icon name="clock-o" size="mini"></van-icon> 下单时间: {{timestampToTime(o.orderTime)}}</li>
                                    </ul>
                                </div>
                            </van-panel>
                        </div>
                    </div>
                </div>
                
            </van-tab>
            
            <!-- 未接订单 -->
            <van-tab title="未接订单">
                <!-- 遍历查询信息 -->
                <!-- 将查询信息展示在面板 -->
                <div v-if="orderStatusFilter('待接单').length!=0">
                    <div v-for="o in orderStatusFilter('待接单')" :key="o.id" id="content">
                        <div>
                            <van-panel :title="o.customer.realname" :status="o.status" :key="o.id" >
                                <div slot="default" id="content_nr">
                                    <ul>
                                        <li> <van-icon name="balance-pay" size="mini"></van-icon> 订单总额: {{o.total}}</li>
                                        <li> <van-icon name="location-o" size="mini"></van-icon> 服务地址: {{o.address.province + o.address.city + o.address.area + o.address.address}}</li>
                                        <li> <van-icon name="phone-o" size="mini"></van-icon> 联系方式: {{o.customer.telephone}}</li>
                                        <li> <van-icon name="clock-o" size="mini"></van-icon> 下单时间: {{timestampToTime(o.orderTime)}}</li>
                                    </ul>
                                </div>
                                <div slot="footer">
                                    <van-row>
                                        <van-col offset="16" span="16">
                                            <van-button size="small" plain type="danger" @click="refusedHandler(o.id)">拒绝</van-button>
                                            &nbsp;&nbsp;&nbsp;
                                            <van-button size="small" plain type="primary" @click="acceptHandler(o.id)">接受</van-button>
                                        </van-col>
                                    </van-row>
                                </div>
                            </van-panel>
                        </div>
                    </div>
                </div>                
                <div v-else id="order_none">
                    <img src="./images/tips.jpg" alt="">
                </div>
            </van-tab>
            <!-- 已接订单 -->
            <van-tab title="已接订单">
                <!-- {{orderStatusFilter('待完成')}} -->
                <div v-if="orderStatusFilter('待服务').length!=0">
                    <div v-for="o in orderStatusFilter('待服务')" :key="o.id" id="content">
                        <div>
                            <van-panel :title="o.customer.realname" :status="o.status" :key="o.id">
                                <div slot="default" id="content_nr">
                                    <ul>
                                        <li> <van-icon name="balance-pay" size="mini"></van-icon> 订单总额: {{o.total}}</li>
                                        <li> <van-icon name="location-o" size="mini"></van-icon> 服务地址: {{o.address.province + o.address.city + o.address.area + o.address.address}}</li>
                                        <li> <van-icon name="phone-o" size="mini"></van-icon> 联系方式: {{o.customer.telephone}}</li>
                                        <li> <van-icon name="clock-o" size="mini"></van-icon> 下单时间: {{timestampToTime(o.orderTime)}}</li>
                                    </ul>
                                </div>
                                <div slot="footer">
                                    <van-row>
                                        <van-col offset="20" span="20">
                                            <van-button size="small" plain type="danger" @click="completeHandler(o.id)">确认完成</van-button>
                                        </van-col>
                                    </van-row>
                                </div>
                            </van-panel>
                        </div>
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
                        <div>
                            <van-panel :title="o.customer.realname" :status="o.status">
                                <!-- {{o.customer.realname}} -->
                                <div slot="default" id="content_nr">
                                    <ul>
                                        <li> <van-icon name="balance-pay" size="mini"></van-icon> 订单总额: {{o.total}}</li>
                                        <li> <van-icon name="location-o" size="mini"></van-icon> 服务地址: {{o.address.province + o.address.city + o.address.area + o.address.address}}</li>
                                        <li> <van-icon name="phone-o" size="mini"></van-icon> 联系方式: {{o.customer.telephone}}</li>
                                        <li> <van-icon name="clock-o" size="mini"></van-icon> 下单时间: {{timestampToTime(o.orderTime)}}</li>
                                    </ul>
                                </div>
                            </van-panel>
                        </div>
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
                        <div>
                            <van-panel :title="o.customer.realname" :status="o.status">
                                <div slot="default" id="content_nr">
                                    <ul>
                                        <li> <van-icon name="balance-pay" size="mini"></van-icon> 订单总额: {{o.total}}</li>
                                        <li> <van-icon name="location-o" size="mini"></van-icon> 服务地址: {{o.address.province + o.address.city + o.address.area + o.address.address}}</li>
                                        <li> <van-icon name="phone-o" size="mini"></van-icon> 联系方式: {{o.customer.telephone}}</li>
                                        <li> <van-icon name="clock-o" size="mini"></van-icon> 下单时间: {{timestampToTime(o.orderTime)}}</li>
                                    </ul>
                                </div>
                            </van-panel>
                        </div>
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
#content{
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
}
</style>