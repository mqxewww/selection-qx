import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import About from "../pages/About.vue";

export default createRouter({
  history: createWebHistory("/app/"),
  routes: [
    { path: "/", component: Home, meta: { title: "Accueil" } },
    { path: "/about", component: About, meta: { title: "À propos" } },
  ],
});
