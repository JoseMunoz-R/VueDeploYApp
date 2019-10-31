import Vue from "vue";
import Vuex from "vuex";
var firebase = require("firebase/app");
import router from "@/router";
//import undefined from "firebase/empty-import";
import db from '@/main';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usuario: '',
    empresa: '',
    error: '',
    perfilusuario: { nombre: '', apellidos: '', cedula: '', nrocontacto: '', emailprofile: '', experiencia: '', lenguajes: '', ingles: '' },
    perfilEmpresa: { nombre: '', nit: '', ciudad: '', direccion: '', sector: '', numero_contacto: ''},
    userPerfil: []
  },
  mutations: {
    setUsuario(state, payload) {
      state.usuario = payload;
    },
    setEmpresa(state, payload) {
      state.empresa = payload;/////////////////////////////////////
    },
    setError(state, payload) {
      state.error = payload
    },
    setProfile(state, profile) {
      state.userPerfil = profile
    }
  },
  actions: {
    crearUsuario({ commit }, payload) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.pass)
        .then(res => {
          console.log(res);
          commit("setUsuario", { email: res.user.email, uid: res.user.uid });
          //router.push({ name: 'inicio' });

          //Crear Colección Perfil de usuario
          db.collection(res.user.email).add({
            nombre: '',
            apellidos: '',
            cedula: '',
            nroContacto: '',
            profileemail: res.user.email,
            experiencia: '',
            lenguajes: '',
            ingles: ''
          }).then(() => {
            //router.push({ name: 'inicio' })
          })
        })
        .catch(err => {
          console.log(err.message);
          commit('setError', err.message)
        });
    },
    loginUsuario({ commit }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.pass)
        .then(res => {
          console.log(res);
          commit("setUsuario", { email: res.user.email, uid: res.user.uid });
          router.push({ name: 'inicio' });
        }).catch(err => {
          console.log(err);
          commit('setError', err.message);
        })
    },
    detectarUsuario({ commit }, payload) {
      if (payload != null) {
        commit('setUsuario', { email: payload.email, uid: payload.uid });
      } else {
        commit('setUsuario', null)
      }


    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit('setUsuario', null);
      router.push({ name: 'login' });
    },
    getProfileUsuario({ commit }) {
      const perfilGuardarenSet = []
      const usuario = firebase.auth().currentUser;
      db.collection(usuario.email).get().then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id);
          console.log(doc.data());
          let profile = doc.data();
          profile.id = doc.id
          perfilGuardarenSet.push(profile)
        })
      })
      commit('setProfile', perfilGuardarenSet)
    },
    actualizarInfoUser({ commit }, userPerfil) {
      const usuario = firebase.auth().currentUser;
      db.collection(usuario.email).doc(userPerfil.id).update({
        nombre: userPerfil.nombre,
        apellidos: userPerfil.apellidos,
        cedula: userPerfil.cedula,
        nroContacto: userPerfil.nroContacto,
        experiencia: userPerfil.experiencia,
        lenguajes: userPerfil.lenguajes,
        ingles: userPerfil.ingles
      }).then(() => {

      })
    },
    crearEmpresa({ commit }, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.pass)
     
        .then(res => {
          console.log(res.user.email);
          console.log(res.user.uid);
          
          

          commit("setEmpresa", {email: res.user.email, uid: res.user.uid});

          db.collection(res.user.email).add({
            nombre: "ejemplo" 
          })
          .then(() => {
            router.push({ name: "InicioEmpresa" });
          });
        })
        .catch(err => {
          console.log(err.message), commit("setError", err.message);
        });
    },
    ingresoEmpresa({ commit }, payload) {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.pass)
        .then(res => {
          console.log(res);
          commit("setEmpresa", { email: res.user.email, uid: res.user.uid });
          router.push({ name: "InicioEmpresa" });
        })
        .catch(err => {
          console.log(err);
          commit("setError", err.message);
        });
    },
    detectarEmpresa({ commit }, payload) {
      if (payload != null) {
        commit("setEmpresa", { email: payload.email, uid: payload.uid });
      } else {
        commit("setEmpresa", null);
      }
    },

    cerrarSesion({ commit }) {
      firebase.auth().signOut();
      commit("setEmpresa", null);
      router.push({ name: "ingresoEmpresa" });
    }
  },
  modules: {},
  getters: {
    existeUsuario(state) {
      if (state.usuario === null || state.usuario === '' || state.usuario === undefined) {
        return false;
      } else {
        return true;
      }
    },
    existeEmpresa(state) {
      if (
        state.empresa === null ||
        state.empresa === "" ||
        state.empresa === undefined
      ) {
        return false;
      } else {
        return true;
      }
    }
  }
});
