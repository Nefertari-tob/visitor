/*
 * @Author: Yangliwei
 * @Date: 2020-05-26 16:01:54
 * @LastEditTime: 2020-09-29 10:04:25
 * @LastEditors: Yangliwei
 * @FilePath: \dormitory_platform_h5\src\route\index.js
 * @Just Think
 * @Description:
 */

import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress";
import store from "@/store";
import { notification } from "ant-design-vue";
import routes from "./routers";
import config from "@/config";

Vue.use(Router);
//去除当点击相同路由报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
const router = new Router({
  routes
});

router.beforeEach((to, from, next) => {
  NProgress.start(); // start progress bar
  let hasUserInfo = store.state.userinfo;
  //如果不需要登录
  if (to.meta.notneedLogin) {
    next();
  } else {
    //如果有登录信息:
    if (hasUserInfo) {
      //如果开启鉴权
      if (config.openVP) {
        //如果有权限
        if (store.state.userinfo.menu.includes(to.meta.key)) {
          next();
        } else {
          NProgress.done();
          next({
            path: "/403"
          });
        }
      } else {
        next();
      }
    } else {
      notification.info({
        message: "请先登录",
        description: "您还没有登录,请先登录!"
      });
      NProgress.done();
      next({
        path: "/login"
      });
    }
  }
});

//结束跳转
router.afterEach(() => {
  NProgress.done();
});

export default router;
