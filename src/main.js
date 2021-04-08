import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./route";
import store from "./store";
import config from "./config";

Vue.config.productionTip = false;
// 权限
import VP from "./util/permissions";
Vue.prototype.$VP = VP;
//全局样式
import "./less/base.less";

// 全局axios
import Axios from "./Axios";
Vue.use(Axios);
Vue.prototype.baseurl = config.baseurl;
Vue.prototype.wskurl = config.wskurl;

//全局code
Vue.prototype.$code = config.successCode;

//图片懒加载
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload, {
  preLoad: 1.3, //预加载的宽高比
  error: "./img/userimage.png", //图片加载失败时使用的图片源
  loading: "./img/loading.gif", //图片加载的路径
  attempt: 3 //尝试加载次数
});

//moment
import moment from "moment";
Vue.prototype.moment = moment; //赋值使用

// ant design组件
import {
  Row,
  Col,
  Affix,
  Tag,
  Button,
  Menu,
  Icon,
  Collapse,
  Dropdown,
  Input,
  Select,
  message,
  Table,
  Popconfirm,
  DatePicker,
  Form,
  Modal,
  Cascader,
  TimePicker,
  Pagination,
  notification,
  Progress,
  Upload,
  Popover,
  Drawer,
  Checkbox,
  ConfigProvider,
  InputNumber,
  Tooltip,
  Badge,
  Spin,
  Tabs,
  List,
  Carousel,
  Radio,
  Empty,
  Steps,
  Switch,
  BackTop,
  Skeleton,
  FormModel
} from "ant-design-vue";

Vue.use(Button);
Vue.use(Menu);
Vue.use(Icon);
Vue.use(Collapse);
Vue.use(Dropdown);
Vue.use(Input);
Vue.use(Select);
Vue.use(Table);
Vue.use(Popconfirm);
Vue.use(DatePicker);
Vue.use(Form);
Vue.use(Cascader);
Vue.use(TimePicker);
Vue.use(Pagination);
Vue.use(Drawer);
Vue.use(Switch);
Vue.use(Popover)
  .use(Checkbox)
  .use(Progress)
  .use(Tag)
  .use(Upload)
  .use(ConfigProvider)
  .use(InputNumber)
  .use(Modal)
  .use(Tooltip)
  .use(Badge)
  .use(Tabs)
  .use(List)
  .use(Spin)
  .use(Carousel)
  .use(Radio)
  .use(Empty)
  .use(Steps)
  .use(BackTop)
  .use(Affix)
  .use(Row)
  .use(Col)
  .use(Skeleton)
  .use(FormModel);
message.config({
  duration: 5
});

Vue.prototype.$notification = notification;
Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$message = message;

//element ui组件
import {
  ColorPicker,
  Button as Btn,
  Input as Inp,
  Icon as Ico
} from "element-ui";
Vue.use(ColorPicker)
  .use(Btn)
  .use(Inp)
  .use(Ico);

//国际化
import VueI18n from "vue-i18n";
import enLocale from "element-ui/lib/locale/lang/en";
import zhLocale from "element-ui/lib/locale/lang/zh-CN";
import zh from "./lang/zh_cn";
import en from "./lang/en_us";
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: "zh_cn",
  messages: {
    zh_cn: {
      ...zhLocale,
      ...zh
    },
    en_us: {
      ...enLocale,
      ...en
    }
  }
});
import ElementLocale from "element-ui/lib/locale";
ElementLocale.i18n((key, value) => i18n.t(key, value));

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
