// 登录存储获取本地缓存的用户信息(以判断是否登录)

// 存储本地信息

// 设置用户的token
export function setToken(token){
    // 本地存储一个token
    localStorage.setItem('token', token);
}
// 获取用户的token
export function getToken(){
    return localStorage.getItem('token');
}
 // 判断当前是否存在token
export function isToken(){
    if(getStorage()){
        // token 存在
        return true;
    }else{
        return false;
    }
}
 // 清空本地缓存
 export function removeToken(){
    localStorage.removeItem('token');
}