import Vue from "vue";
import VueRouter from "vue-router";

import SignIn from "../views/SignIn";
import SignUp from "../views/SignUp";

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "SignIn",
    component: SignIn,
    meta: {
      title: "Sign in",
      requiresGuest: true,
    },
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
    meta: {
      title: "Create an account",
      requiresGuest: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
    ? `${to.meta.title} - ${process.env.VUE_APP_NAME}`
    : process.env.VUE_APP_NAME;
  if (to.meta.requiresGuest && !!localStorage.getItem("token"))
    return next("/home");
  if (to.meta.requiresAuth && !localStorage.getItem("token"))
    return next("/");
  return next();
});

export default router;
