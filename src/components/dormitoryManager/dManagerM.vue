<!--
 * @Author: Yangliwei
 * @Date: 2020-06-03 10:05:46
 * @LastEditTime: 2020-06-03 16:17:36
 * @LastEditors: Yangliwei
 * @FilePath: \express_platform_h5\src\components\dormitoryManager\dManagerM.vue
 * @Just Think
 * @Description: 
-->
<template>
  <Drawer
    :visible="visible"
    :title="title"
    :loading="loading"
    @okfunc="okfunc"
    @closeModal="closeModal"
  >
    <a-form-model
      ref="form"
      :model="form"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-model-item
        label="姓名"
        prop="name"
        :rules="[
          {
            required: true,
            message: '请输入姓名'
          }
        ]"
      >
        <a-input placeholder="姓名" v-model="form.name" />
      </a-form-model-item>
      <a-form-model-item
        label="电话"
        prop="mobile"
        :rules="[
          {
            required: true,
            message: '请输入电话'
          }
        ]"
      >
        <a-input placeholder="电话" v-model="form.mobile" />
      </a-form-model-item>
      <a-form-model-item
        label="用户名"
        prop="username"
        :rules="[
          {
            required: true,
            message: '请输入用户名'
          }
        ]"
      >
        <a-input placeholder="用户名" v-model="form.username" />
      </a-form-model-item>
      <a-form-model-item
        v-if="!isEdit"
        label="密码"
        prop="password"
        :rules="[
          {
            required: true,
            message: '请输入密码'
          }
        ]"
      >
        <a-input placeholder="密码" type="password" v-model="form.password" />
      </a-form-model-item>
    </a-form-model>
  </Drawer>
</template>

<script>
import Drawer from "../public/Drawer";
import { AddDormitoryManager, editDormitoryManager } from "@/api";
import md5 from "md5";
export default {
  data() {
    return {
      loading: false,
      form: {
        name: "",
        mobile: "",
        username: "",
        password: ""
      }
    };
  },
  components: {
    Drawer
  },
  props: {
    visible: Boolean,
    title: String,
    isEdit: Boolean
  },

  methods: {
    checkGroup(rule, value, callback) {
      if (value.length > 2) {
        callback();
      } else {
        callback("请选择三级!");
      }
    },
    clearForm() {
      this.form = {
        name: "",
        mobile: "",
        username: "",
        password: ""
      };
    },
    okfunc() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(this.form);
          if (this.isEdit) {
            this.editFunc();
          } else {
            this.AddTeacherFunc();
          }
        }
      });
    },
    editFunc() {
      editDormitoryManager(this.form.id, {
        mobile: this.form.mobile,
        name: this.form.name,
        username: this.form.username
      }).then(res => {
        console.log(res);
        this.$message.success(res.msg);
        this.$emit("getData");
        this.closeModal();
      });
    },
    AddTeacherFunc() {
      AddDormitoryManager({
        mobile: this.form.mobile,
        name: this.form.name,
        password: md5(this.form.password),
        username: this.form.username
      }).then(res => {
        console.log(res);
        this.$message.success(res.msg);
        this.$emit("getData");
        this.closeModal();
      });
    },
    //关闭弹窗,调用父级方法
    closeModal() {
      this.clearForm();
      this.$emit("closeModal");
    }
  }
};
</script>
