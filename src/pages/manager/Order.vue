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
                <!-- 待确认、已完成 -->
                <!-- <van-panel v-if="status == '' " title="顾客1" status="状态">
                    <div>相关信息</div>
                </van-panel> -->
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

                <!-- 将查询信息传给面板展示订单信息 -->
                <van-panel title="顾客1" status="状态">
                    <div>相关信息</div>
                </van-panel>
            </van-tab>
            <!-- 未接订单 -->
            <van-tab title="未接订单">
                <!-- 遍历查询信息 -->
                <!-- 将查询信息展示在面板 -->
                <van-panel title="顾客1" status="状态">
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
            </van-tab>
            <!-- 已接订单 -->
            <van-tab title="已接订单">
                <van-panel title="顾客1" status="状态">
                    <div>相关信息</div>
                    <div slot="footer">
                        <van-row>
                            <van-col offset="20" span="20">
                                <van-button size="small" plain type="danger" @click="completeHandler">完成</van-button>
                            </van-col>
                        </van-row>
                    </div>
                </van-panel>
            </van-tab>
            <!-- 待确认 -->
            <van-tab title="待确认">
                <van-panel title="顾客1" status="状态">
                    <div>
                        相关信息
                    </div>
                </van-panel>
            </van-tab>
            <!-- 已完成 -->
            <van-tab title="已完成">
                <van-panel title="顾客1" status="状态">
                    <div>相关信息</div>
                </van-panel>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
export default {
    data(){
        return{
            active:0
        }
    },
    methods:{
        refusedHandler(){
            alert("拒绝");
        },
        acceptHandler(){
            alert("接受")
        },
        completeHandler(){
            alert("完成")
        }
    }
}
</script>

<style scoped>

</style>