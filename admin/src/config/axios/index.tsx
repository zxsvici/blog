import axios, {CreateAxiosDefaults} from 'axios';
import {Res} from "@/model";
import {message} from "antd";
import { useNavigate,unstable_HistoryRouter } from 'react-router-dom';

const DEV_BASE_URL = "http://127.0.0.1:8001";

const viciRequest = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? DEV_BASE_URL : '/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    },
} as CreateAxiosDefaults);

viciRequest.interceptors.request.use(
    config => {
        config.headers.set('vici-token', `${localStorage.getItem('vici-token')}`);
        return config;
    }
)

viciRequest.interceptors.response.use(
    (response) => {
        const res = response.data as Res<any>;
        if(res.code === 200) {
            return res.data;
        }else if (res.code === 401) {
            message.error(res.msg);
            localStorage.removeItem('vici-token');
            //这里我巨傻逼，啊啊啊啊，我琢磨了巨久怎么去使用钩子，我是傻呗。。。气死！！
            if(window.location.pathname !== '/login'){
                window.location.href = '/login';
            }
        }else {
            message.error(res.msg);
            throw new Error();
        }
    },
    error => {
        message.error('request fail')
        throw error;
    }
);

export default viciRequest;

export {
    DEV_BASE_URL
}
