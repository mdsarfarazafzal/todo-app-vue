import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import sarfarazVueLogger from "sarfaraz-vue-logger";
// import myPlugin from "./plugins/myPlugin";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
// app.use(myPlugin);
app.use(sarfarazVueLogger);

app.mount("#app");
