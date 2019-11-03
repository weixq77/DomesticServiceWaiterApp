<template>
  <div class="cardOrderAccept">
    <van-panel  :key="data.id" >
         <div slot="header" class="cardTop">
            <van-row>
                <van-col span="8">订单编号：{{data.id}}</van-col>
                <van-col offset="12" span="4"><span style="color:red">{{data.status}}</span></van-col>
            </van-row>
        </div>
        <div slot="default" id="content_nr">
            <ul>
                <li> <van-icon name="balance-pay" size="mini"></van-icon> 订单总额: {{data.total}}</li>
                <li> <van-icon name="location-o" size="mini"></van-icon> 服务地址: {{data.address.province + data.address.city + data.address.area + data.address.address}}</li>
                <li> <van-icon name="phone-o" size="mini"></van-icon> 联系方式: {{data.customer.telephone}}</li>
                <li> <van-icon name="clock-o" size="mini"></van-icon> 下单时间: {{data.orderTime | datefmt}}</li>
            </ul>
        </div>
        <div slot="footer">
            <van-row>
                <van-col offset="14" span="10">
                    <van-button size="small" plain type="danger" @click="refusedHandler(data.id)">拒绝</van-button>
                    &nbsp;&nbsp;&nbsp;
                    <van-button size="small" plain type="primary" @click="acceptHandler(data.id)">接受</van-button>
                </van-col>
            </van-row>
        </div>
    </van-panel>
  </div>
</template>

<script>
import {Dialog} from 'vant'
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
    name: 'cardOrderAccept',
    props: {
        data: Object
    },
    methods:{
        ...mapActions("order",["refusedOrder","acceptOrder"]),
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

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cardOrderAccept{
    border-top: 1px solid #bbb9b9;
    border-bottom: 1px solid #bbb9b9;
    margin-bottom: 10px;
}
#content_nr{
    padding: 2% 5%;
    font-size: 14px;
}
.cardTop{
    box-sizing: border-box;
    padding: 5px 16px;
}
</style>