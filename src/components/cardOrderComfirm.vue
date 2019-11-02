<template>
  <div class="cardOrderComfirm">
    <van-panel :title="data.customer.realname" :status="data.status" :key="data.id" >
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
                <van-col offset="18" span="5">
                    <van-button size="small" plain type="danger" @click="completeHandler(data.id)">确认完成</van-button>
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
    name: 'cardOrderComfirm',
    props: {
        data: Object
    },
    methods:{
        ...mapActions("order",["completeOrder"]),
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#content_nr{
    padding: 2% 5%;
    font-size: 14px;
}
</style>