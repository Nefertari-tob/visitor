import store from "@/store/index";
import config from "@/config";
let VerifyPermission = name => {
  //如果开启鉴权,都要过滤
  if (config.openVP) {
    return store.state.userinfo
      ? store.state.userinfo.permissions.includes(name)
      : false;
  } else {
    //如果不开启鉴权,都通过
    return true;
  }
};
export default VerifyPermission;
