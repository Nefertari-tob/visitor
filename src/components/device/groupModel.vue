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
        label="设备组名称"
        prop="name"
        :rules="[
          {
            required: true,
            message: '请输入设备组名称'
          }
        ]"
      >
        <a-input placeholder="设备组名称" v-model="form.name" />
      </a-form-model-item>

      <a-form-model-item
        label="校区,片区,设备组"
        prop="group"
        :rules="[
          {
            required: true,
            message: '必须选择校区,片区,设备组'
          },
          {
            validator: checkGroup
          }
        ]"
      >
        <a-cascader
          :fieldNames="{
            label: 'name',
            value: 'id',
            children: 'children'
          }"
          :options="DeviceTwoLevelArr"
          v-model="form.group"
          placeholder="校区、片区、设备组选择"
        />
      </a-form-model-item>
    </a-form-model>
  </Drawer>
</template>

<script>
import Drawer from "../public/Drawer";
import { DeviceTwoLevel, AddGroup } from "@/api";
export default {
  data() {
    return {
      DeviceTwoLevelArr: [],
      form: {
        name: "",
        group: []
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
  mounted() {
    // this.getTwo();
  },
  methods: {
    checkGroup(rule, value, callback) {
      if (value.length > 1) {
        callback();
      } else {
        callback("请选择二级!");
      }
    },
    getTwo() {
      DeviceTwoLevel().then(res => {
        this.DeviceTwoLevelArr = [...res.data];
      });
    },
    clearForm() {
      this.form = {
        name: "",
        group: []
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
      AddGroup(this.form.group[1], this.form.name)
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
