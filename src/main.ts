import { createApp } from "vue";
import { Quasar } from "quasar";
import "quasar/src/css/index.sass";
import "./css/app.css";
import "./css/feature-pages.css";
import "./css/app-previews.css";
import App from "./App.vue";

createApp(App)
  .use(Quasar, {
    config: { brand: { primary: "#03328d", secondary: "#eaf0fb" } },
  })
  .mount("#app");
