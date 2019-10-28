import Vue from "vue";
import VueRouter from "vue-router";
var firebase = require("firebase/app");

Vue.use(VueRouter);

const routes = [
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Register.vue")
  },
  {
    path: "/",
    name: "inicio",
    component: () => import("@/views/Inicio.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const rutaProtegida = to.matched.some(record => record.meta.requiresAuth);
  const user = firebase.auth().currentUser;

  if (rutaProtegida === true && user === null) {
    next({ name: 'login' });
  } else {
    next();
  }
})

export default router;
