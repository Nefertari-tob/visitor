/*
 * @Author: Yangliwei
 * @Date: 2020-05-26 16:01:54
 * @LastEditTime: 2020-06-17 16:58:18
 * @LastEditors: Yangliwei
 * @FilePath: \express_platform_h5\src\route\routers\other.js
 * @Just Think
 * @Description:
 */

const other = [
  {
    path: "/login",
    component: () => import("@/views/Login.vue"),
    meta: {
      title: "云析智慧校园管理后台",
      key: "login",
      notneedLogin: true
    }
  },
  {
    path: "/404",
    component: () => import("@/views/error/404"),
    meta: {
      key: "404",
      notneedLogin: true
    }
  },
  // {
  //   path: "/403",
  //   component: () => import("@/views/error/403"),
  //   meta: {
  //     key: "403",
  //     notneedLogin: true
  //   }
  // },
  {
    path: "/500",
    component: () => import("@/views/error/500"),
    meta: {
      key: "500",
      notneedLogin: true
    }
  },
  {
    path: "/*",
    name: "/*",
    redirect: "/404",
    meta: {
      key: "*",
      notneedLogin: true
    }
  }
];
export default other;
