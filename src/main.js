import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//import { firestorePlugin } from "vuefire";

import BootstrapVue from "bootstrap-vue";

Vue.use(BootstrapVue);

Vue.config.productionTip = false;
//Vue.use(firestorePlugin);

var firebase = require("firebase/app");
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

require("firebase/auth");
require("firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyDs72PKkd8CTQDmTS23X5EK33LJq9TP4Nw",
  authDomain: "semiact-60ded.firebaseapp.com",
  databaseURL: "https://semiact-60ded.firebaseio.com",
  projectId: "semiact-60ded",
  storageBucket: "semiact-60ded.appspot.com",
  messagingSenderId: "438206249410",
  appId: "1:438206249410:web:0ce3ca6d15451942fc7e5b"
};
// Initialize Firebase
//firebase.initializeApp(firebaseConfig);

const firebaseApp = firebase.initializeApp(firebaseConfig);
//firebaseApp.firestore().settings({ timestampsInSnapshots: true });
export default firebaseApp.firestore();


firebase.auth().onAuthStateChanged((user) => {
  console.log(user);
  if (user) {
    store.dispatch('detectarUsuario', { email: user.email, uid: user.uid });
  } else {
    store.dispatch('detectarUsuario', null);
  }

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
})

