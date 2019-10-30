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
            <van-cell title="我的收入" is-link to="" />
            <van-cell title="我的订单" is-link to="" />
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
            // waiterName:this.infoUser.name,
            // waiterId:this.infoUser.id,
        }
    },
    created(){
        // 初始化
        this.loadDate();
    },
    computed:{
        // 用户的信息(对象，存放有id，name，头像)
        ...mapState('user',["infoUser"]),
    },
    methods:{
        // 设置登录成功获取的员工信息
        ...mapMutations('user',["setUser"]),
        // 退出登录
        ...mapActions('user',["logout"]),
        // 普通函数
        // fun:用户退出登录
        userLogout(){
            this.logout()
            .then(()=>{
                // 退出成功跳转回登录页面
                this.$router.push({path:"/login"});
            })
        },
        loadDate(){
            // 跳转前已经判断过了本地是否有用户信息了，直接拿来设置即可
            // 要先将字符转换为对象
            this.setUser(JSON.parse(localStorage.getItem('infoUser')));
            
        }
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