/*
 * @Author: Yangliwei
 * @Date: 2020-05-26 16:01:54
 * @LastEditTime: 2020-09-30 17:31:52
 * @LastEditors: Yangliwei
 * @FilePath: \dormitory_platform_h5\src\api\index.js
 * @Just Think
 * @Description:api
 */

import { Axios } from "@/Axios.js";
// import config from "../config";

// const teacherUrl = "https://njga.cn/vapi/";
//新增教师
export const addTeacher = async params => {
  return await Axios.post("teacher/add", params);
};
//上传头像
export const addteacherphoto = async params => {
  return await Axios.post("teacher/updateAvatar", params);
};
//查询教师列表
export const getTeacherList = async params => {
  return await Axios("teacher/getList", { params });
};
// 查询教师列表
export const getStudentList = async params => {
  return await Axios("student/getList", { params });
};
// 下载教师模板
export const teacherModel = async () => {
  return await Axios("teacher/exportModel");
};

// 下载学生模板
export const studentModel = async () => {
  return await Axios("student/exportModel");
};

// 新增学生
export const studentAdd = async params => {
  return await Axios.post("student/add", params);
};

// 上传学生头像
export const studentAvatar = async params => {
  return await Axios.post("student/importAvatar", params);
};

// 查看学生详情
export const studentDetail = async params => {
  console.log(123, params);
  return await Axios(`student/detail/${params.id}`);
};
