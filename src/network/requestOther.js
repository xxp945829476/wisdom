import Vue from 'vue';
import router from '../router';
import axios from "axios";
import {message} from "ant-design-vue";



const request = axios.create({//npm创建axios实例，设置请求的默认配置
    // 设置超时时间
    // timeout: 50000,
    // 基础url，会在请求url中自动添加前置链接
    baseURL: 'http://221.231.140.166:88',
})

// 请求拦截
request.interceptors.request.use(
	//config 代表是你请求的一些信息
    config => {
        
        // 在请求发送之前的操作
        return config
    },
    error => {
        // 对错误请求的处理
        // 弹出错误请求消息
      
        return Promise.reject(error)
    }
)

//  response拦截器 响应拦截器 请求之后的操作
request.interceptors.response.use(
    config => {
        const code = config.status
        return config
    },
    error => {
        console.log(error.response.status)
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    message.error('请求参数错误')
                    break
                case 401:
                    // 返回401 清除token信息并跳转到登陆页面
                    router.replace({
                        path: '/login'
                    })
                    break
                case 403:
                    message.error('服务器拒绝本次访问')
                    break
                case 404:
                    message.error('网络请求不存在')
                    break
                case 500:
                    // message.error('')
                    break
                case 501:
                    message.error('服务器不支持该请求中使用的方法')
                    break
                case 502:
                    message.error('网关错误')
                    break
                case 504:
                    message.error('网关超时')
                    break
                default:
                    message.error(error.response.data.message)
            }
        } else {
            // 请求超时或者网络有问题
            if (error.message.includes('timeout')) {
                message.error('请求超时！请检查网络是否正常')
            } else {
                message.error('请求失败，请检查网络是否已连接')
            }
        }
        return Promise.reject(error)
    }
)

export default request;