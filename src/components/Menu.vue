<!--
 * @Author: Yangliwei
 * @Date: 2020-05-26 16:01:54
 * @LastEditTime: 2020-06-17 16:53:32
 * @LastEditors: Yangliwei
 * @FilePath: \express_platform_h5\src\components\Menu.vue
 * @Just Think
 * @Description: 
-->
<template>
  <a-menu
    mode="inline"
    style="height: 100%;wdith:100%"
    :theme="theme"
    :openKeys="openKeys"
    @openChange="onOpenChange"
    :selectedKeys="[
      this.$route.matched[this.$route.matched.length - 1].meta.key
    ]"
  >
    <template v-for="item in menuList">
      <a-menu-item
        style="width: 100%; background-color: #352D7D;"
        v-if="!item.children && !item.meta.noshow"
        :key="item.meta.key"
      >
        <router-link
          :to="{
            path: `${$route.matched[1].path}${item.path ? '/' + item.path : ''}`
          }"
        >
          <a-icon :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </router-link>
      </a-menu-item>
      <a-sub-menu :key="item.meta.key" v-else>
        <span slot="title">
          <a-icon :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </span>
        <a-menu-item v-for="subitem in item.children" :key="subitem.meta.key">
          <router-link
            v-if="!subitem.meta.noshow"
            :to="{
              path: `${$route.matched[1].path}${
                item.path ? '/' + item.path : ''
              }${subitem.path ? '/' + subitem.path : ''}`
            }"
          >
            {{ subitem.meta.title }}{{ subitem.meta.noshow }}
          </router-link>
        </a-menu-item>
      </a-sub-menu>
    </template>
  </a-menu>
</template>

<script>
export default {
  data() {
    return {
      rootSubmenuKeys: [],
      openKeys: [this.$route.matched[2].meta.key],
      theme: "dark"
    };
  },
  props: {
    menuList: {
      type: Array
    }
  },
  mounted() {
    this.setMenuKeys();
    console.log(this.$route.matched[2].meta.key);
  },
  methods: {
    setMenuKeys() {
      this.menuList.map(item => {
        this.rootSubmenuKeys.push(item.meta.key);
      });
    },
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        key => this.openKeys.indexOf(key) === -1
      );
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    }
  }
};
</script>
