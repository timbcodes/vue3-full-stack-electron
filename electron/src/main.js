import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

/**
 * Import Cookies Config Below
 */
import VueCookies from "vue3-cookies";

/**
 * Import External Libraries Below
 */
import naive from "naive-ui";
import vClickOutside from "click-outside-vue3";
import { Vue3Mq } from "vue3-mq";
import { BootstrapIconsPlugin } from "bootstrap-icons-vue";
import "vfonts/Lato.css";
import "vfonts/FiraCode.css";

const app = createApp(App)
  .use(store)
  .use(router)
  .use(naive)
  .use(VueCookies)
  .use(vClickOutside)
  .use(Vue3Mq, {
    preset: "devices", // default
  })
  .use(BootstrapIconsPlugin);
app.mount("#app");
