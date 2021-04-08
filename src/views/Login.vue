<template>
  <div id="login">
    <img src="@/assets/loginbg.jpg" class="bg" alt="" />
    <div class="logindiv">
      <div class="login_left column">
        <!-- <p class="welcome">Welcome</p> -->
      </div>
      <div class="login_right column">
        <!-- <img src="@/assets/logo.png" class="loginlogo" alt="" /> -->
        <p class="systitle">云析智慧校园管理系统</p>
        <div class="loginForm">
          <a-form :form="form" @submit="handleSubmit">
            <a-form-item>
              <a-input
                size="large"
                type="text"
                placeholder="请输入账号"
                v-decorator="[
                  'username',
                  {
                    rules: [{ required: true, message: '请输入账号' }]
                  }
                ]"
              >
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input-password
                size="large"
                placeholder="请输入密码"
                v-decorator="[
                  'password',
                  {
                    rules: [{ required: true, message: '请输入密码' }]
                  }
                ]"
              >
                <a-icon slot="prefix" type="lock" />
              </a-input-password>
            </a-form-item>
            <a-form-item>
              <a-select
                allowClear
                v-model="type"
                size="large"
                placeholder="请选择"
              >
                <a-select-option value="manager">学校管理员</a-select-option>
                <a-select-option value="admin">系统管理员</a-select-option>
                <a-select-option value="group">集团管理员</a-select-option>
                <a-select-option value="modular"
                  >学校模块管理员</a-select-option
                >
              </a-select>
            </a-form-item>
            <a-form-item>
              <a-input
                size="large"
                style="width:200px;"
                type="text"
                placeholder="请输入验证码"
                v-decorator="[
                  'code',
                  {
                    rules: [{ required: true, message: '请输入验证码' }]
                  }
                ]"
              >
                <a-icon slot="prefix" type="safety" />
              </a-input>
              <img
                @click="getCode()"
                :src="codeimg"
                style="width:150px;height:40px;margin-left:20px;"
              />
            </a-form-item>
            <a-form-item style="margin-top:24px">
              <a-button
                size="large"
                type="primary"
                htmlType="submit"
                class="login-button"
                :loading="loading"
                :disabled="loading"
                >登录</a-button
              >
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "@/less/login.less";
import md5 from "md5";
import { guid } from "@/util";
import config from "@/config";
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      title: config.title,
      loading: false,
      codeimg: null,
      type: undefined,
      uid: null
    };
  },
  mounted() {
    this.getCode();
  },
  methods: {
    //获取验证码
    getCode() {
      this.uid = guid();
      this.$http
        .get("img/code/code", {
          params: {
            uid: this.uid
          }
        })
        .then(res => {
          this.codeimg = this.baseurl + res.data;
        });
    },
    //提交方法
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loginFunc(values);
        }
      });
    },
    //登录方法
    loginFunc(values) {
      this.loading = true;
      this.$http
        .post("admin/doLogin", {
          code: values.code,
          uid: this.uid,
          username: values.username,
          type: this.type,
          password: md5(values.password)
        })
        .then(res => {
          console.log("登录成功", res);
          this.getUserInfo(values);
          this.$store.commit("UserInfoType", this.type);
        })
        .catch(() => {
          this.loading = false;
          this.getCode();
        });
    },
    //获取信息方法
    getUserInfo(values) {
      this.$http
        .get("admin/info")
        .then(res => {
          this.loading = false;
          this.$store.commit("setUserInfo", res.data);
          this.$notification.success({
            message: `欢迎您,${values.username}`,
            description: "登录成功!"
          });
          this.$router.push("/");
        })
        .catch(() => {
          this.loading = false;
          this.getCode();
        });
    }
  }
};
</script>
