<template>
    <div class="home">
        <!-- 顶部提示 -->
        <van-nav-bar 
            title="首页"
        />
        <!-- 顶部加载图片 -->
        <van-row>
            <img src="./images/首页1.jpg" width="100%">
        </van-row>
        <div v-for="o in orders" :key="o.id" id="djd">
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
    </div>
</template>

<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
import {Dialog} from 'vant'
export default {
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
        ...mapActions("order",["findAllOrders","beforeClose"]),
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
                if(action === 'confirm'){
                    setTimeout(done,1000)
                }else{
                    // console.log(done);
                    done(console.log("我还不知道这里是返回什么的"));
                }
            };
            // 弹框提醒
           Dialog.confirm({
                title: '订单操作',
                message: '确认拒绝订单？',
                beforeClose
            })
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
            });
        }
        
    }
}
</script>

<style scoped>
#djd{
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
}
</style>