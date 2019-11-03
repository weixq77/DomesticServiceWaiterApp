<template>
  <div class="cardOrder">
    <van-panel :key="data.id" >
        <div slot="header" class="cardTop">
            <van-row>
                <van-col span="9">订单编号：{{data.id}}</van-col>
                <van-col offset="11" span="4"><span style="color:red">{{data.status}}</span></van-col>
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
    </van-panel>
  </div>
</template>

<script>
import {Dialog} from 'vant'
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
    name: 'cardOrder',
    props: {
        data: Object
    },
    methods:{
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cardOrder{
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