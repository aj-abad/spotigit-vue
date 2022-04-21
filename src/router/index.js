import Vue from "vue";
import VueRouter from "vue-router";

import SignIn from "../views/SignIn";
import SignUp from "../views/SignUp";
import Home from "../views/Home";
import Playlist from "../views/Playlist";

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
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      title: "Home",
      requiresAuth: true,
    },
  },
  {
    path: "/playlist/:id",
    name: "Playlist",
    component: Playlist,
    meta: {
      title: "Playlist details",
      requiresAuth: true,
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
