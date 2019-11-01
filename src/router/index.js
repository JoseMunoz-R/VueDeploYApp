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
  },
  {
    path: "/perfilUsuario",
    name: "perfilUsuario",
    component: () => import("@/views/PerfilUsuario.vue")
  },
  {
    path: "/register/empresa",
    name: "RegisterEmpresa",
    component: () => import("@/views/RegisterEmpresa.vue")
  },
  {
    path: "/empresa",
    name: "empresa",
    component: () => import("@/views/Empresa.vue")
  },
  {
    path: "/editionProfile",
    name: "editionProfile",
    component: () => import("@/views/EditionProfile.vue")
  },
  {
    path: '/empresa/ingresoEmpresa',
    name: 'ingresoEmpresa',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/IngresoEmpresa.vue')
  },
  {
    path: '/empresa/ReguistroEmpresa',
    name: 'ReguistroEmpresa',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ReguistroEmpresa.vue')
  },
  ,
  {
    path: '/empresa/inicioEmpresa',
    name: 'InicioEmpresa',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/InicioEmpresa.vue'),
    meta: { requiresAuth: true }
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
