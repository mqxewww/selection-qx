import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import ApplicationsPage from "../pages/applications/ApplicationsPage.vue";
import CourseDetailPage from "../pages/courses/CourseDetailPage.vue";
import CoursesPage from "../pages/courses/CoursesPage.vue";

export default createRouter({
  history: createWebHistory("/app/"),
  routes: [
    { path: "/", component: HomePage, meta: { title: "SelectionQX • Authentification" } },
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
  ],
});
