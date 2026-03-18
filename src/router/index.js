import LoginView from "@/views/LoginView.vue";
import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/UserStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "",
      redirect: "/app",
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/app",
      name: "app",
      component: () => import("../views/AppView.vue"),
      beforeEnter(to, from) {
        // if (!localStorage.getItem("user")) {
        //   return { name: "login" };
        // }
        const userStore = useUserStore();

        if (!userStore.getUser) {
          return { name: "login" };
        }
      },
    },
  ],
});

export default router;
