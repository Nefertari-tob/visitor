import axios from "axios";
import qs from "qs";
import router from "./route";
import config from "./config";
import store from "./store/index";
import { notification, message } from "ant-design-vue";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
NProgress.configure({ showSpinner: false }); // NProgress Configuration

const Axios = axios.create({
  timeout: 600 * 1000,
  baseURL: process.env.NODE_ENV === "production" ? config.baseurl : "/api/",
  responseType: "json",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  },
  withCredentials: true
});

//axios 请求 拦截器
Axios.interceptors.request.use(config => {
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
    return config;
  } else if (["post", "put", "patch"].includes(config.method)) {
    // 序列化
    config.data = qs.stringify(config.data);
  }
  return config;
});
//axios 响应 拦截器
Axios.interceptors.response.use(
  res => {
    NProgress.done();
    if (res.data) {
      if ([204, 202].includes(res.data.code)) {
        notification.error({
          message: "登录失效!",
          description: `登录失效,请重新登录!`
        });
        store.commit("resetUserInfo");
        router.push({
          path: "/",
          query: {
            target: "login"
          }
        });
        return Promise.reject(res.data);
      } else if (res.data.code != config.successCode) {
        message.error(res.data.msg);
        return Promise.reject(res.data);
      } else {
        return res.data;
      }
    }
  },
  error => {
    NProgress.done();
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = "请求错误";
          break;
        case 401:
          error.message = "未授权，请登录";
          break;
        case 403:
          error.message = "拒绝访问";
          break;
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`;
          break;
        case 408:
          error.message = "请求超时";
          break;
        case 500:
          error.message = "服务器内部错误";
          break;
        case 501:
          error.message = "服务未实现";
          break;
        case 502:
          error.message = "网关错误";
          break;
        case 503:
          error.message = "服务不可用";
          break;
        case 504:
          error.message = "网关超时";
          break;
        case 505:
          error.message = "HTTP版本不受支持";
          break;
        default:
          error.message = "系统错误";
          break;
      }
    }
    notification.error({
      message: "系统错误",
      description: `${error.message}`
    });
    return Promise.reject(error);
  }
);

export { Axios };

export default {
  install: function(Vue) {
    Object.defineProperty(Vue.prototype, "$http", { value: Axios });
  }
};
