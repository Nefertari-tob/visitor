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
        label="设备名称"
        prop="name"
        :rules="[
          {
            required: true,
            message: '请输入设备名称'
          }
        ]"
      >
        <a-input placeholder="设备名称" v-model="form.name" />
      </a-form-model-item>
      <a-form-model-item
        label="序列号"
        prop="sn"
        :rules="[
          {
            required: true,
            message: '必须输入序列号'
          }
        ]"
      >
        <a-input placeholder="序列号" v-model="form.sn" />
      </a-form-model-item>
      <a-form-model-item
        label="服务器IP"
        prop="serverIp"
        :rules="[
          {
            required: true,
            message: '必须输入服务器IP'
          }
        ]"
      >
        <a-input placeholder="服务器IP" v-model="form.serverIp" />
      </a-form-model-item>
      <a-form-model-item
        label="视频流地址"
        prop="ipAddress"
        :rules="[
          {
            required: true,
            message: '必须输入视频流地址'
          }
        ]"
      >
        <a-input placeholder="视频流地址" v-model="form.ipAddress" />
      </a-form-model-item>
      <a-form-model-item
        label="设备类型"
        prop="type"
        :rules="[
          {
            required: true,
            message: '必须选择设备类型'
          }
        ]"
      >
        <a-select v-model="form.type" placeholder="设备类型" allowClear>
          <a-select-option key="1" :value="1">进门</a-select-option>
          <a-select-option key="0" :value="0">出门</a-select-option>
        </a-select>
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
          :options="DeviceThreeLevelArr"
          v-model="form.group"
          placeholder="校区、片区、设备组选择"
        />
      </a-form-model-item>
    </a-form-model>
  </Drawer>
</template>

<script>
import Drawer from "../public/Drawer";
import { DeviceThreeLevel, AddDevice } from "@/api";
export default {
  data() {
    return {
      DeviceThreeLevelArr: [],
      form: {
        name: "",
        sn: "",
        serverIp: "",
        ipAddress: "",
        group: [],
        type: undefined
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
    this.getFour();
  },
  methods: {
    checkGroup(rule, value, callback) {
      if (value.length > 2) {
        callback();
      } else {
        callback("请选择三级!");
      }
    },
    getFour() {
      DeviceThreeLevel().then(res => {
        this.DeviceThreeLevelArr = [...res.data];
      });
    },
    clearForm() {
      this.form = {
        name: "",
        sn: "",
        serverIp: "",
        ipAddress: "",
        group: [],
        type: undefined
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
      const params = {
        ...this.form,
        campusId: this.form.group[0],
        deviceAreaId: this.form.group[1],
        deviceGroupId: this.form.group[2]
      };
      AddDevice(params)
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
