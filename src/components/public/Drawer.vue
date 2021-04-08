<template>
  <a-drawer
    :width="modalWidth + 'px'"
    :visible="visible"
    @close="closeModal"
    :title="title"
    :closable="true"
    :destroyOnClose="true"
  >
    <slot>
      <div>内容插槽</div>
    </slot>
    <slot name="footer">
      <div class="drawerButtom">
        <a-button :style="{ marginRight: '8px' }" @click="closeModal">
          {{ $t("system.return") }}
        </a-button>
        <a-button
          v-if="showOkBtn"
          @click="okfunc"
          :loading="loading"
          type="primary"
          >{{ $t("system.submit") }}</a-button
        >
      </div>
    </slot>
  </a-drawer>
</template>
<script>
export default {
  props: {
    modalWidth: {
      type: [Number, String],
      default: () => 550
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
        return "修改密码";
      }
    },
    showOkBtn: {
      type: Boolean,
      default: () => true
    },
    loading: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    //关闭弹窗,调用父级方法
    closeModal() {
      this.$emit("closeModal");
    },
    //确定按钮
    okfunc(e) {
      e.preventDefault();
      this.$emit("okfunc");
    }
  }
};
</script>
<style lang="less">
.drawerButtom {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #e9e9e9;
  padding: 10px 16px;
  background: #fff;
  text-align: right;
  z-index: 2;
}
</style>
