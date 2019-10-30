import {get,post_json,post_array} from '../http/axios'
import {setToken,getToken,removeToken} from '@/utils/localStorage.js'
export default{
    namespaced:true,
    state:{
        token:getToken(),//维护token
        infoUser:{},//存放已登录的员工信息(id,name)
    },
    getters:{

    },
    mutations:{
        // 设置登录获取的员工id和name
        setUser(state,info){
            state.infoUser = info;
        },
        // 刷新token
        refreshToken(state,token){
            state.token = token;
        }
    },
    actions:{
        // 登录请求，获取token
        async login({commit},loginForm){
            // 提交用户登录的请求以获取token
            let response = await post_json("/user/login",loginForm);
            // 本地存储一个token
            setToken(response.data.token);
            // 设置token
            commit('refreshToken',response.data.token);

            return response;
        },
        // 获取用户信息的请求，用token获取
        async loginInfo({commit},token){
            // 拿token去换取用户的基本信息
            let response = await get("/user/info",{token});
            // 2.设置用户信息
            commit('setUser',response.data);

            return response;
        },
        // 退出登录
        async logout(){
            // 退出登录请求
            let response = await post_json("/user/logout");

            // 将本地存储的token清空
            removeToken();

            return response;
        },
    }
}