import {get,post_json,post_array} from '../http/axios'
export default{
    namespaced:true,
    states:{
        infoUser:{},//存放已登录的员工信息(id,name)
    },
    getters:{

    },
    mutations:{
        // 设置登录获取的员工id和name
        setUser(states,info){
            states.infoUser = info;
        },
    },
    actions:{
        // 登录请求，获取token
        async login({dispatch},loginForm){
            // 提交用户登录的请求以获取token
            let response = await post_json("/user/login",loginForm);
            // 2.将获取token，再用token去拿用户的信息(必须先等获取了用户信息再返回，不然进入我的就拿不到数据)
            await dispatch('loginInfo',response.data)

            return response;
        },
        // 获取用户信息的请求，用token获取
        async loginInfo({commit},token){
            // 拿token去换取用户的基本信息
            let response = await get("/user/info",token);
            // 2.设置用户信息
            commit('setUser',response.data);
            
            return response;
        },
    }
}