/*
 * @Author: Yangliwei
 * @Date: 2020-05-26 16:01:55
 * @LastEditTime: 2020-06-17 09:23:33
 * @LastEditors: Yangliwei
 * @FilePath: \express_platform_h5\src\store\index.js
 * @Just Think
 * @Description:
 */

import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
var ls = new SecureLS({
  encodingType: "aes",
  isCompression: false,
  encryptionSecret: config.vueXKey + "ylw"
});
import config from "@/config";
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: config.vueXKey,
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      }
    })
  ],
  state: {
    isopen: true,
    userinfo: null,
    identity: null,
    threeLevel: []
  },
  mutations: {
    switchfunc(state) {
      state.isopen = !state.isopen;
    },
    hideswitch(state) {
      if (state.isopen) {
        state.isopen = false;
      }
    },

    showswitch(state) {
      if (!state.isopen) {
        state.isopen = true;
      }
    },
    UserInfoType(state, identity) {
      state.identity = identity;
    },
    setUserInfo(state, userinfo) {
      state.userinfo = userinfo;
    },
    //清除用户信息
    resetUserInfo(state) {
      state.userinfo = null;
    },
    //保存三级
    saveThreeLevel(state, threearr) {
      state.threeLevel = [...threearr];
    }
  },
  actions: {},
  modules: {}
});
