import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import AdminLayout from "~web/layouts/AdminLayout.vue";
import NonAdminLayout from "~web/layouts/NonAdminLayout.vue";
import App from "./App.vue";

const metaTitle = (sfx: string) => `SelectionQX@${__APP_VERSION__} • ${sfx}`;

const router = createRouter({
  history: createWebHistory(""),
  routes: [
    {
      path: "/admin",
      component: AdminLayout,
      children: [
        {
          path: "",
          component: () => import("~web/views/admin/AdminHomeView.vue"),
          meta: { title: metaTitle("Administration") },
        },
      ],
    },
    {
      path: "/",
      component: NonAdminLayout,
      children: [
        {
          path: "applications",
          component: () =>
            import("~web/views/applications/ApplicationsListView.vue"),
          meta: { title: metaTitle("Candidatures") },
        },
        {
          path: "applications/:id",
          component: () =>
            import("~web/views/applications/ApplicationDetailsView.vue"),
          props: true,
          meta: { title: metaTitle("Candidatures") },
        },
        {
          path: "courses",
          component: () => import("~web/views/courses/CoursesListView.vue"),
          meta: { title: metaTitle("Formations") },
        },
        {
          path: "courses/:id",
          component: () => import("~web/views/courses/CourseDetailsView.vue"),
          props: true,
          meta: { title: metaTitle("Formations") },
        },
        {
          path: "courses/:id/criteria",
          component: () => import("~web/views/courses/CourseCriteriaView.vue"),
          props: true,
          meta: { title: metaTitle("Formations") },
        },
      ],
    },
  ],
});

router.afterEach((to) => {
  if (to.meta?.title) document.title = `${to.meta.title}`;
});

createApp(App).use(router).mount("#app");
