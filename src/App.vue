<template>
  <div id="app">
    <router-view />
    <a-back-top>
      <a-icon
        type="up-circle"
        class="back_up_icon"
        theme="twoTone"
        :twoToneColor="color"
      />
    </a-back-top>
  </div>
</template>
<script>
import { surprise } from "./util";
import themeColor from "@/plugins/themeColor";
import config from "@/config";
export default {
  data() {
    return {
      color: config.primaryColor
    };
  },
  mounted() {
    surprise();
    document.title = this.$t(config.title);
    let color = localStorage.primaryColor;
    if (color) {
      themeColor.changeColor(color);
    } else {
      themeColor.changeColor(this.color);
    }
  }
};
</script>
<style lang="less">
#app {
  height: 100%;
  min-width: 1200px;
  .ant-back-top {
    right: 30px;
  }
  .back_up_icon {
    width: 50px;
    height: 50px;
    font-size: 45px;
  }
}
</style>
