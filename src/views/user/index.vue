<template>
  <div id="menu">
    <div class="leftmenu">
      <Menu :menuList="menuList" />
    </div>
    <div class="contentview">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
  </div>
</template>

<script>
import user from "@/route/routers/user";
import Menu from "@/components/Menu";
export default {
  components: {
    Menu
  },
  data() {
    return {
      menuList: user.children
    };
  }
};
</script>

<style lang="less" src="@/less/menu.less"></style>
