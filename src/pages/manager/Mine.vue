<template>
    <div id="mine">
        <!-- 顶部提示 -->
        <van-nav-bar 
            title="我的"
        />
        <div id="header">
            <van-row type="flex" justify="center">
                <van-image
                round
                width="10rem"
                height="10rem"
                :src=infoUser.avatar
                />
            </van-row>
            <br>
            <br>
            <p id="name">{{infoUser.name}}</p>
        </div>
        <br>
        <br>
        <div id="main">
            <van-cell title="我的收入" is-link @click="toIncome" />
            <van-cell title="我的订单" is-link @click="toOrderList" />
            <van-cell title="退出" is-link @click="userLogout" />
        </div>
    </div>
</template>

<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
    name:'mine',
    data(){
        return{
            
        }
    },
    created(){
        
    },
    computed:{
        // 用户的信息(对象，存放有id，name，头像)
        ...mapState('user',["infoUser"]),
    },
    methods:{
        // 退出登录
        ...mapActions('user',["logout"]),
        // 普通函数
        // 查看我的收入
        toIncome(){
            // 跳转到我的收入页面
            this.$router.push({path:"/manager/income"})
        },
        // 查看我的订单
        toOrderList(){
            // 跳转到我的订单页面
            this.$router.push({path:"/manager/orderList"})
        },
        // fun:用户退出登录
        userLogout(){
            this.logout()
            .then(()=>{
                // 退出成功跳转回登录页面
                this.$router.push({path:"/login"});
            })
        },
        
    }
}
</script>

<style scoped>
#header{
    margin-top: 10%;
}
#header #name{
    display: block;
    margin: 0 auto;
    text-align: center;
}

</style>