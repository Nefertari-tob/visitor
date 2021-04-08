/*
 * @Author: Yangliwei
 * @Date: 2020-05-26 16:01:54
 * @LastEditTime: 2020-06-17 15:23:41
 * @LastEditors: Yangliwei
 * @FilePath: \express_platform_h5\src\data\index.js
 * @Just Think
 * @Description:
 */

const errorReason = [
  {
    id: 1,
    title: "无对应人员",
    value: "no"
  },
  {
    id: 2,
    title: "照片体积过大",
    value: "bigger"
  },
  {
    id: 3,
    title: "文件格式错误",
    value: "typeerror"
  },
  {
    id: 4,
    title: "照片体积过小",
    value: "smaller"
  }
];
const userTypeObj = {
  "-1": "无状态",
  0: "离校",
  1: "在校",
  2: "请假",
  3: "晚归"
};
const parentApplicationState = {
  "-1": "未通过",
  0: "未审批",
  1: "审批通过"
};

export const userType = {
  undergraduates: "学生",
  teacher: "教师",
  temporaryWorkers: "临时人员"
};
export const sex = ["男", "女"];
// 级
export const grade = [
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
  "2026"
];
// 分类
export const type = ["文科生", "理科生", "体育生", "艺术生"];
// 类型
export const genre = [0, 1];
export { errorReason, userTypeObj, parentApplicationState };
