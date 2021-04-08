<template>
  <a-config-provider :locale="locale">
    <div id="basepage">
      <div class="header between">
        <div class="headerdiv">
          <img src="@/assets/logo1.png" class="headerimg" alt="" />
        </div>
        <div class="headermid">云析智慧校园管理系统</div>
        <!-- 已登录 -->
        <div class="headerright between">
          <!-- 个人中心 -->
          <a-dropdown placement="bottomCenter" v-if="$store.state.userinfo">
            <div class="rightitem">
              <a-icon type="poweroff" />
              {{
                $store.state.userinfo
                  ? $store.state.userinfo.manager.username
                  : ""
              }}
            </div>
            <a-menu slot="overlay">
              <a-menu-item @click="editpassword" key="2">
                <a-icon type="edit" />{{
                  $t("system.changePassword")
                }}</a-menu-item
              >
              <a-menu-item @click="loginout" key="1" style="color:red">
                <a-icon type="logout" />{{ $t("system.logout") }}</a-menu-item
              >
            </a-menu>
          </a-dropdown>
          <a-radio-group @change="changeLang" v-model="lang" size="small">
            <a-radio-button value="zh_cn">中文</a-radio-button>
            <a-radio-button value="en_us">English</a-radio-button>
          </a-radio-group>
        </div>
      </div>
      <div class="navbar">
        <a-menu style="flex-grow:1" theme="dark" mode="horizontal">
          <a-menu-item
            style="min-width:150px;text-align:center;"
            v-for="item in navBar"
            :key="item.key"
            class="item"
          >
            <router-link to="/"> {{ item.title }} </router-link>
          </a-menu-item>
        </a-menu>
      </div>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
      <!-- 修改密码 -->
      <EditPassword :visible="visible" @closeModal="visible = false" />
    </div>
  </a-config-provider>
</template>
<script>
//全局样式
import EditPassword from "@/components/EditPassword";
import themeColor from "@/plugins/themeColor";
import "@/less/basepage.less";
// import { children } from "@/route/routers";
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import enUs from "ant-design-vue/lib/locale-provider/en_US";
import config from "@/config";
import moment from "moment";
moment.locale("en");
import "moment/locale/zh-cn";
export default {
  data() {
    return {
      visible: false,
      color: localStorage.primaryColor,
      navBar: [
        { title: "首页", url: "/", key: "1" },
        { title: "基础管理", url: "/", key: "2" },
        { title: "人员管理", url: "/", key: "3" },
        { title: "业务管理", url: "/", key: "4" },
        { title: "统计分析", url: "/", key: "5" },
        { title: "系统设置", url: "/", key: "6" }
      ],
      predefineColors: [
        "#1890ff",
        "#f5222d",
        "#fa541c",
        "#faad14",
        "#13c2c2",
        "#6f59ff",
        "#2f54eb",
        "#722ed1"
      ],
      lang: "zh_cn",
      locale: zhCN
    };
  },
  components: {
    EditPassword
  },
  provide() {
    return {
      loginout: this.loginout
    };
  },
  mounted() {
    if (localStorage.lang) this.changeLangFunc(localStorage.lang);
  },
  methods: {
    changeLang(e) {
      this.changeLangFunc(e.target.value);
    },
    changeLangFunc(value) {
      this.lang = value;
      if (this.lang == "en_us") {
        this.locale = enUs;
        moment.locale("en");
      }
      if (this.lang == "zh_cn") {
        this.locale = zhCN;
        moment.locale("zh-cn");
      }
      this.$i18n.locale = this.lang;
      localStorage.lang = this.lang;
      document.title = this.$t(config.title);
    },
    //改变颜色
    colorChange(color) {
      console.log(color);
      if (color) {
        themeColor.changeColor(color).then(() => {
          localStorage.primaryColor = color;
        });
      } else {
        themeColor.changeColor(config.primaryColor).then(() => {
          localStorage.removeItem("primaryColor");
        });
      }
    },
    //修改密码
    editpassword() {
      this.visible = true;
    },
    //判断是否大于1500
    windowSize() {
      if (document.body.clientWidth < 1300) {
        this.$store.commit("hideswitch");
      } else {
        this.$store.commit("showswitch");
      }
    },
    //收缩菜单
    switchfunc() {
      this.$store.commit("switchfunc");
    },
    //退出
    loginout() {
      this.$store.commit("resetUserInfo");
      this.$http.put("admin/logout").then(res => {
        this.$message.success(res.msg);
      });
      this.$router.push("/login");
    }
  }
};
</script>
<style lang="less">
#basepage {
  .rightitem {
    .ant-badge {
      line-height: 50px;
      .ant-badge-count {
        top: 12px;
      }
    }
  }
  .el-color-picker__trigger {
    border: 0;
    .el-color-picker__color {
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
