import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import CoursesListView from "~/views/courses/CoursesListView.vue";
import "./app.css";
import App from "./App.vue";

const router = createRouter({
  history: createWebHistory(""),
  routes: [
    {
      path: "/courses",
      component: CoursesListView,
      meta: { title: "SelectionQX • Formations" },
    },
  ],
});

createApp(App).use(router).mount("#app");
