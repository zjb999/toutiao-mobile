import axios from 'axios'
import store from "@/store"
import JSONbig from 'json-bigint'
import { Toast } from 'vant'
import router from '../router'
const refreshTokenReq = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/'
})
const request = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/',
    transformResponse: [function(data) {
        try { return JSONbig.parse(data) } catch (err) { return data; }
        // 对 data 进行任意转换处理

    }]
})
request.interceptors.request.use(function(config) {
    // 在发送请求之前做些什么
    const user = store.state.user
    if (user) {
        config.headers.
        Authorization = `Bearer ${user.token}`

    }
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
request.interceptors.response.use(function(response) {

    // 对响应数据做点什么
    return response;
}, async function(error) {
    console.dir(error);
    // 对响应错误做点什么
    const status = error.response.status

    if (status === 400) {
        Toast.fail('客户端请求参数异常')
    } else if (status === 401) {
        const { user } = store.state
        if (!user || !user.token) {
            return redirectLogin()
        }
        try {
            const { data } = await refreshTokenReq({
                url: 'app/v1_0/authorizations',
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${user.refresh_token}`
                }
            })

            user.token = data.data.token
            store.commit('setUser', user)
            return request(error.config)
        } catch (err) {
            router.replace('/login')
        }
    } else if (status === 403) {
        Toast.fail('没有权限操作')
    } else if (status >= 500) {
        Toast.fail('服务端异常,请稍后重试')
    }
    return Promise.reject(error);
});

function redirectLogin() {
    router.replace({
        name: 'login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    })
}

export default request