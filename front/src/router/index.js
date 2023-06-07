import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import auth from "../providers/apis/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      beforeEnter: async (from, to, next) => {
        const hasLogin = await auth.getMe();
        if (hasLogin) next();
        else next({ name: "login" });
      },
    },
  ],
});

router.beforeEach(async (to, from, next)=>{
  const hasLogin =await auth.getMe();

  if(to.name.includes('home') && !hasLogin) next({name : 'login'})
  else next();
})

export default router;
