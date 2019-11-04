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
    path: "/registerEmpresa",
    name: "registerEmpresa",
    component: () => import("@/views/RegisterEmpresa.vue")
  },
  {
    path: "/empresa",
    name: "empresa",
    component: () => import("@/views/Empresa.vue")
  },
  {
    path: "/perfilEmpresa",
    name: "perfilEmpresa",
    component: () => import("@/views/PerfilEmpresa.vue")
  },
  
  {
    path: '/empresa/ingresoEmpresa',
    name: 'ingresoEmpresa',
    
    component: () => import(/* webpackChunkName: "about" */ '../views/IngresoEmpresa.vue')
  },
  {
    path: '/empresa/ReguistroEmpresa',
    name: 'ReguistroEmpresa',
    component: () => import(/* webpackChunkName: "about" */ '../views/ReguistroEmpresa.vue')
  },
  
 
  
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
