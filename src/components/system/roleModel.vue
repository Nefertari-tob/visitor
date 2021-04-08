<template>
  <a-drawer
    width="800px"
    :visible="visible"
    @close="closeModal"
    :title="title"
    :closable="true"
    :destroyOnClose="true"
  >
    <a-form :form="form">
      <a-form-item label="角色名称:" v-bind="formItemLayout">
        <a-input
          placeholder="请输入角色名称"
          v-decorator="[
            'username',
            {
              rules: [{ required: true, message: '必须填写角色名称!' }]
            }
          ]"
        ></a-input>
      </a-form-item>

      <a-form-item label="菜单&权限:" required v-bind="formItemLayout">
        <div>
          <div
            style="margin-bottom:15px;display: flex;align-items: center;height: 40px;"
            v-for="(menu, _index) in allPermission"
            :key="menu.menuName"
          >
            <a-tag
              @click="checkAll(_index)"
              class="customtag"
              style="margin-right:20px;"
              :color="
                isMenuNone(_index) ? '' : isMenuAll(_index) ? 'blue' : 'purple'
              "
              >{{ menu.menuName }}</a-tag
            >
            <div
              style="display: inline-block;max-width: 400px;line-height: initial;"
            >
              <a-checkbox-group :value="tempRole.permissions">
                <a-checkbox
                  v-for="perm in menu.permissions"
                  :value="perm.id"
                  :key="perm.id"
                  @change="checkRequired(perm, _index)"
                >
                  <span :class="{ requiredPerm: perm.requiredPerm === 1 }">{{
                    perm.name
                  }}</span>
                </a-checkbox>
              </a-checkbox-group>
            </div>
          </div>
        </div>
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
        labelCol: { span: 4 },
        wrapperCol: { span: 18 }
      },
      allPermission: [],
      tempRole: {
        roleName: "",
        roleId: "",
        permissions: []
      }
    };
  },
  watch: {
    formdata: function(newvalue) {
      if (JSON.stringify(newvalue) != "{}") {
        setTimeout(() => {
          this.form.setFieldsValue({
            username: newvalue.name
          });
          this.tempRole.permissions = newvalue.permissions;
        }, 100);
      } else {
        setTimeout(() => {
          this.form.resetFields();
          this.tempRole.permissions = [];
        }, 100);
      }
    }
  },
  mounted() {
    this.getAllPermissions();
  },
  props: {
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
    //查询全部权限
    getAllPermissions() {
      this.$http.get("permission/list").then(res => {
        this.allPermission = res.data;
      });
    },
    isMenuNone(_index) {
      //判断本级菜单内的权限是否一个都没选
      let menu = this.allPermission[_index].permissions;
      let result = true;
      for (let j = 0; j < menu.length; j++) {
        if (this.tempRole.permissions.indexOf(menu[j].id) > -1) {
          result = false;
          break;
        }
      }
      return result;
    },
    isMenuAll(_index) {
      //判断本级菜单内的权限是否全选了
      let menu = this.allPermission[_index].permissions;
      let result = true;
      for (let j = 0; j < menu.length; j++) {
        if (this.tempRole.permissions.indexOf(menu[j].id) < 0) {
          result = false;
          break;
        }
      }
      return result;
    },
    checkRequired(_perm) {
      //本方法会在勾选状态改变之后触发
      let permId = _perm.id;
      let itemindex = this.tempRole.permissions.indexOf(permId);
      if (itemindex < 0) {
        this.tempRole.permissions.push(permId);
      } else {
        this.tempRole.permissions.splice(itemindex, 1);
      }
    },
    makeReuqiredPermissionChecked(_index) {
      //将本菜单必选的权限勾上
      let menu = this.allPermission[_index].permissions;
      for (let j = 0; j < menu.length; j++) {
        let perm = menu[j];
        if (perm.requiredPerm === 1) {
          //找到本菜单的必选权限,将其勾上
          this.addUnique(perm.id, this.tempRole.permissions);
        }
      }
    },
    //全选按钮
    checkAll(_index) {
      console.log(this.allPermission[_index], this.isMenuAll(_index));
      if (this.isMenuAll(_index)) {
        this.noPerm(_index);
      } else {
        this.allPerm(_index);
      }
    },
    //全选本组
    allPerm(_index) {
      //全部选中
      let menu = this.allPermission[_index].permissions;
      for (let j = 0; j < menu.length; j++) {
        this.addUnique(menu[j].id, this.tempRole.permissions);
      }
      console.log(this.tempRole.permissions);
    },
    addUnique(val, arr) {
      //数组内防重复地添加元素
      let _index = arr.indexOf(val);
      if (_index < 0) {
        arr.push(val);
      }
    },
    noPerm(_index) {
      //全部取消选中
      let menu = this.allPermission[_index].permissions;
      for (let j = 0; j < menu.length; j++) {
        let idIndex = this.tempRole.permissions.indexOf(menu[j].id);
        if (idIndex > -1) {
          this.tempRole.permissions.splice(idIndex, 1);
        }
      }
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
          if (this.tempRole.permissions.length > 0) {
            //调用从父级传过来的方法
            values.permissions = this.tempRole.permissions;
            this.submitfunc(values);
          } else {
            this.$message.error("请选择权限!");
          }
        }
      });
    }
  }
};
</script>
