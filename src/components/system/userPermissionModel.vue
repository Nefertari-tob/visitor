<template>
  <a-drawer
    width="500px"
    :visible="visible"
    @close="closeModal"
    :title="title"
    :closable="true"
    :destroyOnClose="true"
  >
    <a-form :form="form">
      <a-form-item label="用户名:" v-bind="formItemLayout">
        <a-input
          placeholder="请输入用户名"
          v-decorator="[
            'username',
            {
              rules: [{ required: true, message: '必须填写用户名!' }]
            }
          ]"
        ></a-input>
      </a-form-item>
      <a-form-item v-if="!isEdit" label="密码:" v-bind="formItemLayout">
        <a-input
          placeholder="请输入密码"
          type="password"
          v-decorator="[
            'password',
            {
              rules: [{ required: true, message: '必须填写密码!' }]
            }
          ]"
        ></a-input>
      </a-form-item>
      <a-form-item label="选择角色:" v-bind="formItemLayout">
        <a-select
          placeholder="请选择角色"
          :getPopupContainer="triggerNode => triggerNode.parentNode"
          v-decorator="[
            'roleId',
            {
              rules: [{ required: true, message: '必须选择角色!' }]
            }
          ]"
        >
          <a-select-option
            v-for="item in roleArr"
            :key="item.id"
            :value="item.id"
            >{{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="有效期:" v-bind="formItemLayout">
        <a-date-picker
          style="width:100%"
          placeholder="请选择有效期"
          format="YYYY-MM-DD HH:mm:ss"
          showTime
          :disabledDate="disabledDate"
          v-decorator="[
            'expirationDate',
            {
              rules: [{ required: true, message: '必须选择有效期!' }]
            }
          ]"
        />
      </a-form-item>
      <div class="drawerButtom">
        <a-button :style="{ marginRight: '8px' }" @click="closeModal">
          返回
        </a-button>
        <a-button @click="okfunc" :loading="loading" type="primary"
          >提交</a-button
        >
      </div>
    </a-form>
  </a-drawer>
</template>

<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 17 }
      },
      roleArr: []
    };
  },
  watch: {
    formdata: function(newvalue) {
      if (JSON.stringify(newvalue) != "{}") {
        setTimeout(() => {
          this.form.setFieldsValue({
            username: newvalue.username,
            expirationDate: this.moment(newvalue.expirationDate),
            roleId: newvalue.roleId
          });
        }, 100);
      } else {
        setTimeout(() => {
          this.form.resetFields();
        }, 100);
      }
    }
  },
  mounted() {
    this.getRole();
  },
  props: {
    isEdit: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    //显示loadding
    loading: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    //显示弹窗
    visible: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    //title定制
    title: {
      type: String,
      default: () => {
        return "科室";
      }
    },
    //确定按钮事件
    submitfunc: {
      type: Function,
      default: values => {
        console.log("点击确定的方法", values);
      }
    },
    //formdata
    formdata: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  methods: {
    //查询角色列表
    getRole() {
      this.$http.get("role/menu").then(res => {
        this.roleArr = res.data;
      });
    },
    //关闭按钮
    closeModal() {
      this.$emit("closeModal");
    },
    //确定按钮
    okfunc(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          //调用从父级传过来的方法
          this.submitfunc(values);
        }
      });
    },
    disabledDate(current) {
      return (
        current &&
        current <
          this.moment()
            .add(-1, "days")
            .endOf("day")
      );
    }
  }
};
</script>
