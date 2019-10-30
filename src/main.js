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
  apiKey: "AIzaSyCgog-MxXIdqvuBtvrPpU-mlhw2oS2tWYE",
  authDomain: "vuesem.firebaseapp.com",
  databaseURL: "https://vuesem.firebaseio.com",
  projectId: "vuesem",
  storageBucket: "vuesem.appspot.com",
  messagingSenderId: "423213378884",
  appId: "1:423213378884:web:820131db33b1571925fb11",
  measurementId: "G-R57D31RRGX"
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

