import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import ApplicationsPage from "~/modules/applications/pages/ApplicationsPage.vue";
import CourseDetailPage from "~/modules/courses/pages/CourseDetailPage.vue";
import CoursesPage from "~/modules/courses/pages/CoursesPage.vue";
import App from "./App.vue";
import "./app.css";

const router = createRouter({
  history: createWebHistory("/app/"),
  routes: [
    { path: "/courses", component: CoursesPage, meta: { title: "SelectionQX • Formations" } },
    {
      path: "/courses/:idCourse",
      component: CourseDetailPage,
      props: true,
      meta: { title: "SelectionQX • Formations" },
    },
    {
      path: "/applications",
      component: ApplicationsPage,
      meta: { title: "SelectionQX • Candidatures" },
    },

    { path: "/", redirect: "/courses" },
  ],
});

router.afterEach((to) => {
  if (to.meta?.title) {
    document.title = `${to.meta.title}`;
  }
});

createApp(App).use(router).mount("#vue-app");
