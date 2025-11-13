import "./styles/app.css";
import { createApp } from "vue";
import App from "./components/App.vue";
import router from "./router";

router.afterEach((to) => {
  if (to.meta?.title) {
    document.title = `${to.meta.title} | MonSite`;
  }
});

createApp(App).use(router).mount("#vue-app");
