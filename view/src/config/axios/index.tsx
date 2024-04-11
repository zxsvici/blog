import axios from 'axios';
import {Res} from "@/model";
import {message} from "antd";

// const BASE_URL = "http://81.69.248.115:8001";
const BASE_URL = "http://127.0.0.1:8001";

const baseRequest = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? BASE_URL : '/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    },
    // validateStatus: (status) => status >= 200 && status < 300
});

baseRequest.interceptors.response.use(
    response => {
        const res = response.data as Res<any>;
        if(res.code === 200) {
            return res.data;
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

export default baseRequest;
