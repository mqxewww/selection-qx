import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./styles/app.css";

router.afterEach((to) => {
  if (to.meta?.title) {
    document.title = `${to.meta.title}`;
  }
});

createApp(App).use(router).mount("#vue-app");
