/*
 * @Author: Yangliwei
 * @Date: 2020-05-26 16:01:55
 * @LastEditTime: 2020-06-17 17:00:51
 * @LastEditors: Yangliwei
 * @FilePath: \express_platform_h5\src\route\routers\user.js
 * @Just Think
 * @Description:
 */

export default {
  path: "user",
  component: () => import("@/views/user"),
  meta: {
    title: "router.user",
    key: "user",
    icon: "user"
  },
  children: [
    {
      path: "",
      component: () => import("@/views/routerView"),
      meta: {
        title: "校内人员",
        key: "inside",
        icon: "user",
        notneedLogin: true
      },
      children: [
        {
          path: "addTeacher",
          component: () => import("@/views/user/addTeacher"),
          meta: {
            title: "教师管理",
            key: "teacher",
            keepAlive: false
          }
        },
        {
          path: "",
          component: () => import("@/views/user/addTeacher"),
          meta: {
            title: "职工管理",
            key: "zhiyuan",
            keepAlive: false
          }
        },
        {
          path: "addStudent",
          component: () => import("@/views/user/addStudent"),
          meta: {
            title: "学生管理",
            key: "student",
            keepAlive: false
          }
        }
      ]
    },
    {
      path: "addTeacher",
      component: () => import("@/views/user/addTeacher"),
      meta: {
        title: "校外人员",
        key: "outside",
        icon: "solution",
        keepAlive: false
      },
      children: [
        {
          path: "",
          component: () => import("@/views/user/addTeacher"),
          meta: {
            title: "家长管理",
            key: "parent",
            keepAlive: false
          }
        },
        {
          path: "",
          component: () => import("@/views/user/addTeacher"),
          meta: {
            title: "贵宾管理",
            key: "vip",
            keepAlive: false
          }
        },
        {
          path: "",
          component: () => import("@/views/user/addTeacher"),
          meta: {
            title: "访客管理",
            key: "custom",
            keepAlive: false
          }
        }
      ]
    },
    {
      path: "addTeacher",
      component: () => import("@/views/user/addTeacher"),
      meta: {
        title: "特殊人员",
        key: "dmanager",
        icon: "contacts",
        keepAlive: false
      },
      children: [
        {
          path: "",
          component: () => import("@/views/user/addTeacher"),
          meta: {
            title: "外协人员",
            key: "studentlook",
            keepAlive: false
          }
        },
        {
          path: "",
          component: () => import("@/views/user/addTeacher"),
          meta: {
            title: "特殊授权",
            key: "studenterror",
            keepAlive: false
          }
        },
        {
          path: "",
          component: () => import("@/views/user/addTeacher"),
          meta: {
            title: "禁入名单",
            key: "studentinput",
            keepAlive: false
          }
        }
      ]
    }
  ]
};
