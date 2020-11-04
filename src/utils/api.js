import axios from 'axios'
import { Message } from 'element-ui';
import router from '../router'

//将响应拦截做统一处理
axios.interceptors.response.use(success=>{

    //如果是业务逻辑返回的错误
    if(success.status&& success.status==200&&success.data.status==500)
    {
        //提示业务逻辑错误
        Message.error({message:success.data.msg})
        return;
    }

    if(success.data.msg)
       Message.success({message:success.data.msg})

     return success.data;
},error => {
    if (error.response.status == 504 || error.response.status == 404) {
        Message.error({message: '服务器被吃了( ╯□╰ )'})
    } else if (error.response.status == 403) {
        Message.error({message: '权限不足，请联系管理员'})
    } else if (error.response.status == 401) {
        Message.error({message: '尚未登录，请登录'})
        router.replace('/'); //定向到登录页
    } else {
        if (error.response.data.msg) {
            Message.error({message: error.response.data.msg})
        } else {
            Message.error({message: '未知错误!'})
        }
    }
    return;

})

let base = '';

export const postKeyValueRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`, //不是单引号
        data: params,
        transformRequest: [function (data) {
            let ret = '';
            for (let i in data) {
                ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
            }
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}

export const postRequest = (url,params)=>{
    return axios({
        method:'post',
        url: `${base}${url}`, //不是单引号
        data:params
    })
}

export const putRequest = (url,params)=>{
    return axios({
        method:'put',
        url: `${base}${url}`, //不是单引号
        data:params
    })
}

export const getRequest = (url,params)=>{
    return axios({
        method:'get',
        url: `${base}${url}`, //不是单引号
        data:params
    })
}

export const delRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`, //不是单引号
        data: params
    })
}

