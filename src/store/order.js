import {get,post,post_array} from '../http/axios'
export default{
    namespaced:true,
    state:{
        orders:[],
        // infoUser:{}
    },
    getters:{
        countOrders(state){
            // 统计订单个数
            return state.orders.length
        },
        // 根据订单状态筛选订单
        orderStatusFilter(state){
            // 对订单的状态进行过滤
            return function(status){
                // 如果传递的状态存在则返回过滤
                if(status){
                    return state.orders.filter(item => item.status === status)
                }else{
                    // 不存在则返回全部
                    return state.orders
                }
            }
        }
    },
    mutations:{
        // 刷新订单信息
        refreshOrder(state,orders){
            state.orders = orders
        }
    },
    actions:{
        // 查询所有订单信息
        async findAllOrders(context,id){
            // 获取订单信息
            const response = await get('/order/query',{waiterId:id});
            // 将订单信息设置到state.order中
            context.commit('refreshOrder',response.data);
        },
        // 待接单--拒绝订单
        async refusedOrder({dispatch,rootState},orderId){
            // 请求拒绝订单
            const response = await get('/order/rejectOrder',{waiterId:rootState.user.infoUser.id,orderId});
            // 重新获取订单信息
            dispatch('findAllOrders',rootState.user.infoUser.id);
            return response;
        },
        // 待接单--接受订单
        async acceptOrder({dispatch,rootState},orderId){
            // 请求接单
            const response = await get('/order/takeOrder',{waiterId:rootState.user.infoUser.id,orderId});
            // 重新获取订单信息
            dispatch('findAllOrders',rootState.user.infoUser.id);
            return response;
        },
        // 已接订单--确认完成
        async completeOrder({dispatch,rootState},orderId){
            // 请求接单
            const response = await get('/order/serviceCompleteOrder',{orderId});
            // 重新获取订单信息
            dispatch('findAllOrders',rootState.user.infoUser.id);
            return response;
        }
    }
}