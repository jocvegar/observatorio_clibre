import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import vuetify from "./plugins/vuetify";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { auth } from "@/firebaseConfig";
import VueLodash from "vue-lodash";
import lodash from "lodash";
import VueExcelXlsx from "vue-excel-xlsx";

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

Vue.config.productionTip = false;
Vue.use(require("vue-moment"));
Vue.use(VueLodash, { lodash: lodash });
Vue.use(VueExcelXlsx);

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
