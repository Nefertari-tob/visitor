<template>
  <Drawer
    :visible="visible"
    :title="title"
    :loading="loading"
    @okfunc="okfunc"
    @closeModal="closeModal"
    :showOkBtn="!isEdit"
  >
    <a-form-model
      ref="form"
      :model="form"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-model-item
        label="片区名称"
        prop="name"
        :rules="[
          {
            required: true,
            message: '必须填写片区名称'
          }
        ]"
      >
        <a-input placeholder="片区名称" v-model="form.name" />
      </a-form-model-item>
      <a-form-model-item
        label="校区选择"
        prop="campus"
        :rules="[
          {
            required: true,
            message: '必须选择校区'
          }
        ]"
      >
        <a-select v-model="form.campus" placeholder="校区选择" allowClear>
          <a-select-option
            v-for="item in $store.state.threeLevel"
            :key="item.id"
            :value="item.id"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
    </a-form-model>
  </Drawer>
</template>

<script>
import Drawer from "../public/Drawer";
import { AddArea } from "@/api";
export default {
  data() {
    return {
      CampusList: [],
      form: {
        name: "",
        campus: undefined
      },
      loading: false
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
    clearForm() {
      this.form = {
        name: "",
        campus: undefined
      };
    },
    //关闭弹窗,调用父级方法
    closeModal() {
      this.clearForm();
      this.$emit("closeModal");
    },
    //确定按钮
    okfunc() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.AddDevicefunc();
        }
      });
    },
    //添加
    AddDevicefunc() {
      this.loading = true;
      AddArea(this.form.name, this.form.campus)
        .then(res => {
          this.loading = false;
          this.$message.success(res.msg);
          this.clearForm();
          this.$emit("okfunc");
        })
        .catch(() => (this.loading = false));
    }
  }
};
</script>

<style></style>
