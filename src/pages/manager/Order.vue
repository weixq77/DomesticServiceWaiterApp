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
                <!-- 根据状态判断获取不同的面板订单信息 -->
                <div v-for="o in orders" :key="o.id">
                    <!-- 待确认、已完成 -->
                    <div v-if="o.status === '待确认' || o.status === '已完成' ">
                        <van-panel :title="o.customer.realname" :status="o.status" :key="o.id">
                            <div>相关信息</div>
                        </van-panel>
                    </div>
                <!-- 未接订单 -->
                <!-- <van-panel v-else-if="status == '' " title="顾客1" status="状态">
                    <div>相关信息</div>
                    <div slot="footer">
                        <van-row>
                            <van-col offset="16" span="16">
                                <van-button size="small" plain type="danger" @click="refusedHandler">拒绝</van-button>
                                &nbsp;&nbsp;&nbsp;
                                <van-button size="small" plain type="primary" @click="acceptHandler">接受</van-button>
                            </van-col>
                        </van-row>
                    </div>
                </van-panel> -->
                <!-- 已接订单 -->
                <!-- <van-panel v-else title="顾客1" status="状态">
                    <div>相关信息</div>
                    <div slot="footer">
                        <van-row>
                            <van-col offset="20" span="20">
                                <van-button size="small" plain type="danger" @click="completeHandler">完成</van-button>
                            </van-col>
                        </van-row>
                    </div>
                </van-panel> -->
               </div>

                <!-- 将查询信息传给面板展示订单信息 -->
                <van-panel title="顾客1" status="状态">
                    <div>相关信息</div>
                </van-panel>
            </van-tab>
            <!-- 未接订单 -->
            <van-tab title="未接订单">
                <!-- 遍历查询信息 -->
                <!-- 将查询信息展示在面板 -->
                <div v-for="o in orders" :key="o.id" >
                    <div v-if="o.status === '待接单'">
                        <van-panel :title="o.customer.realname" :status="o.status" :key="o.id" >
                            <div>相关信息</div>
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
                            <div>相关信息</div>
                            <div slot="footer">
                                <van-row>
                                    <van-col offset="20" span="20">
                                        <van-button size="small" plain type="danger" @click="completeHandler">完成</van-button>
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
                            <div>
                                相关信息
                            </div>
                        </van-panel>
                    </div>
                </div>
            </van-tab>
            <!-- 已完成 -->
            <van-tab title="已完成">
                <div v-for="o in orders" :key="o.id">
                    <div v-if="o.status === '已完成'">
                        <van-panel :title="o.customer.realname" :status="o.status">
                            <div>相关信息</div>
                        </van-panel>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
    data(){
        return{
            active:0,
        }
    },
    created(){
       
    },
    watch:{
        // 监听infoUser，当拿token去异步请求成功后infoUser被改变了再去查询员工的订单
        infoUser: function(){
            this.loadData();
        }
    },
    computed:{
        ...mapState("order",["orders"]),
        ...mapState("user",["infoUser"]),
        ...mapGetters("order",["orderStatusFilter"])
    },
    methods:{
        ...mapActions("order",["findAllOrders"]),

        loadData(){
            this.findAllOrders(this.infoUser.id)
        },

        refusedHandler(){
            alert("拒绝");
        },
        acceptHandler(){
            alert("接受")
        },
        completeHandler(){
            alert("完成")
        },
    }
}
</script>

<style scoped>

</style>