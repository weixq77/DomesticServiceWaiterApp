<template>
  <div class="cardOrder">
    <van-panel :title="data.customer.realname" :status="data.status" :key="data.id" >
        <div slot="default" id="content_nr">
            <ul>
                <li> <van-icon name="balance-pay" size="mini"></van-icon> 订单总额: {{data.total}}</li>
                <li> <van-icon name="location-o" size="mini"></van-icon> 服务地址: {{data.address.province + data.address.city + data.address.area + data.address.address}}</li>
                <li> <van-icon name="phone-o" size="mini"></van-icon> 联系方式: {{data.customer.telephone}}</li>
                <li> <van-icon name="clock-o" size="mini"></van-icon> 下单时间: {{timestampToTime(data.orderTime)}}</li>
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
        }
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