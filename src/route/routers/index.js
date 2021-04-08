/*
 * @Author: Yangliwei
 * @Date: 2020-05-26 16:01:54
 * @LastEditTime: 2020-06-17 16:58:00
 * @LastEditors: Yangliwei
 * @FilePath: \express_platform_h5\src\route\routers\index.js
 * @Just Think
 * @Description:
 */

import user from "./user";
import other from "./other";
const children = [
  {
    path: "chart",
    component: () => import("@/views/user/addTeacher"),
    meta: {
      title: "router.chart",
      key: "chart",
      icon: "line-chart"
    }
  },
  user
];
const routes = [
  {
    path: "/",
    component: () => import("@/views/BasePage.vue"),
    meta: {
      key: "home",
      title: "云析智慧校园管理后台",
      notneedLogin: true
    },
    redirect: "/user/addTeacher",
    children: [
      ...children,
      {
        path: "/403",
        component: () => import("@/views/error/403"),
        meta: {
          key: "403",
          notneedLogin: true
        }
      }
    ]
  },
  ...other
];
export { children };
export default routes;
