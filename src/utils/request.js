//1. 导入axios对象
import axios from "axios";
import store from '../store'

//2. 创建对象实例，create方法
const Server = axios.create({
    baseURL: "", //请求接口的基础地址
    timeout: 3000, //超时时间
})

//3. 定义请求拦截器
Server.interceptors.request.use(function (config) {
    //过期token
    config.headers['token'] = store.state.token
    console.log(config);
    return config;
}, function (error) {
    return Promise.reject(error);
});

//4. 定义相应拦截器
Server.interceptors.response.use(function (response) {
    console.log(response);
    //过滤出data的数据
    if (response.status == 200) {
        return response.data;
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});

//5. 抛出对象即可
export default Server;