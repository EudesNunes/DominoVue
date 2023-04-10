import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "inicial",
      component: () => import("../views/PaginaInicialView.vue"),
    },
    {
      path: "/jogo",
      name: "jogo",
      component: () => import("../views/JogoView.vue"),
    },
    {
      path: "/regras",
      name: "regras",
      component: () => import("../views/RegrasDoJogoView.vue"),
    },
    {
      path: "/creditos",
      name: "creditos",
      component: () => import("../views/CreditosView.vue"),
    },
  ],
});

export default router;
