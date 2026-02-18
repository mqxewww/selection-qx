import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import AdminLayout from "~/layouts/AdminLayout.vue";
import NonAdminLayout from "~/layouts/NonAdminLayout.vue";

import App from "./App.vue";

const router = createRouter({
  history: createWebHistory(""),
  routes: [
    {
      path: "/admin",
      component: AdminLayout,
      children: [
        {
          path: "/",
          component: () => import("~/views/admin/AdminHomeView.vue"),
          meta: { title: "SelectionQX • Administration" },
        },
        {
          path: "/create-user",
          component: () => import("~/views/admin/AdminCreateUserView.vue"),
          meta: {
            title: "SelectionQX • Administration • Création utilisateur",
          },
        },
        {
          path: "/update-user",
          component: () => import("~/views/admin/AdminUpdateUserView.vue"),
          meta: {
            title: "SelectionQX • Administration • Modification utilisateur",
          },
        },
      ],
    },
    {
      path: "/",
      component: NonAdminLayout,
      children: [
        {
          path: "/applications",
          component: () =>
            import("~/views/applications/ApplicationsListView.vue"),
          meta: { title: "SelectionQX • Candidatures • Liste" },
        },
        {
          path: "/applications/:id",
          component: () =>
            import("~/views/applications/ApplicationDetailsView.vue"),
          props: true,
          meta: { title: "SelectionQX • Candidatures • Détails" },
        },
        {
          path: "/courses",
          component: () => import("~/views/courses/CoursesListView.vue"),
          meta: { title: "SelectionQX • Formations • Liste" },
        },
        {
          path: "/courses/:id",
          component: () => import("~/views/courses/CourseDetailsView.vue"),
          props: true,
          meta: { title: "SelectionQX • Formations • Détails" },
        },
      ],
    },
  ],
});

router.afterEach((to) => {
  if (to.meta?.title) document.title = `${to.meta.title}`;
});

createApp(App).use(router).mount("#app");
