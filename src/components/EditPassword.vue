<template>
  <Drawer
    :visible="visible"
    :title="title"
    @closeModal="closeModal"
    :showOkBtn="true"
    @okfunc="okfunc"
    :loading="loading"
    :modalWidth="600"
  >
    <a-form :form="form">
      <a-form-item :label="$t('login.oldPassword')" v-bind="formItemLayout">
        <a-input
          :placeholder="$t('login.oldPassword')"
          type="password"
          v-decorator="[
            'password',
            {
              rules: [
                {
                  required: true,
                  message: $t('system.pleaseFill') + $t('login.oldPassword')
                }
              ]
            }
          ]"
        ></a-input>
      </a-form-item>
      <a-form-item :label="$t('login.newPassword')" v-bind="formItemLayout">
        <a-input
          :placeholder="$t('login.newPassword')"
          type="password"
          v-decorator="[
            'newPassword',
            {
              rules: [
                {
                  required: true,
                  message: $t('system.pleaseFill') + $t('login.newPassword')
                },
                {
                  min: 6,
                  max: 20,
                  message: $t('login.pwdLength')
                }
              ]
            }
          ]"
        ></a-input>
      </a-form-item>
      <a-form-item :label="$t('login.reNewPassword')" v-bind="formItemLayout">
        <a-input
          :placeholder="$t('login.reNewPassword')"
          type="password"
          v-decorator="[
            'newPassword2',
            {
              rules: [
                {
                  required: true,
                  message: $t('login.reNewPassword')
                },
                {
                  validator: compareToFirstPassword
                }
              ]
            }
          ]"
        ></a-input>
      </a-form-item>
    </a-form>
  </Drawer>
</template>
<script>
import Drawer from "./public/Drawer";
import md5 from "md5";
export default {
  inject: ["loginout"],
  components: {
    Drawer
  },
  data() {
    return {
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 16 }
      }
    };
  },

  props: {
    //显示loadding
    loading: Boolean,
    //显示弹窗
    visible: Boolean,
    //title定制
    title: String
  },
  methods: {
    // 判断两次密码是否一致
    compareToFirstPassword(rule, value, callback) {
      if (value && value !== this.form.getFieldValue("newPassword")) {
        callback(this.$t("login.samePwd"));
      } else {
        callback();
      }
    },
    //关闭弹窗,调用父级方法
    closeModal() {
      this.form.resetFields();
      this.$emit("closeModal");
    },
    //确定按钮
    okfunc() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$http
            .put(`user/updatePassword/${this.$store.state.userinfo.user.id}`, {
              new_password: md5(values.newPassword),
              new_password2: md5(values.newPassword2),
              password: md5(values.password)
            })
            .then(res => {
              this.$message.success(res.msg);
              this.closeModal();
              this.loginout();
            });
        }
      });
    }
  }
};
</script>
