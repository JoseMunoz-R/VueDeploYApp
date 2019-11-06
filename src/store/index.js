import Vue from "vue";
import Vuex from "vuex";
var firebase = require("firebase/app");
import router from "@/router";
//import undefined from "firebase/empty-import";
import db from "@/main";
import { BDropdown } from "bootstrap-vue";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usuario: '',
    empresa: '',
    error: '',
    perfilusuario: { nombre: '', apellidos: '', cedula: '', nrocontacto: '', emailprofile: '', experiencia: '', lenguajes: '', ingles: '', rol: "", foto: ""},
    perfilEmpresa: { nombre: '', nit: '', ciudad: '', direccion: '', sector: '', numero_contacto: '', rol: '' },
    userPerfil: [],
    candidato: []
  },
  mutations: {
    setUsuario(state, payload) {
      state.usuario = payload;
    },
    setEmpresa(state, payload) {
      state.empresa = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setProfile(state, profile) {
      state.perfilusuario = profile;

    },
    setProfileEmpresa(state, profileEmpresa) {
      state.perfilEmpresa = profileEmpresa;
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
          db.collection("users")
            .doc(res.user.email)
            .set({
              nombre: "",
              apellidos: "",
              cedula: "",
              nroContacto: "",
              profileemail: res.user.email,
              experiencia: "",
              lenguajes: "",
              ingles: "",
              rol: "candidato",
              foto: ""
            })
            .then(() => {
              router.push({ name: 'inicio' })
            });
        })
        .catch(err => {
          console.log(err.message);
          commit("setError", err.message);
        });
    },
    loginUsuario({ commit }, payload) {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.pass)
        .then(res => {
          console.log(res);
          commit("setUsuario", { email: res.user.email, uid: res.user.uid });
          router.push({ name: "perfilUsuario" });
        })
        .catch(err => {
          console.log(err);
          commit("setError", err.message);
        });
    },
    detectarUsuario({ commit }, payload) {
      if (payload != null) {
        commit("setUsuario", { email: payload.email, uid: payload.uid });
      } else {
        commit("setUsuario", null);
      }
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit("setUsuario", null);
      router.push({ name: "login" });
    },
    getProfileUsuario({ commit }) {
      const perfilGuardarenSet = [];
      const usuario = firebase.auth().currentUser;
      const docRef= db.collection("users").doc(usuario.email);
      
      docRef.get()
        .then(doc => {
          console.log(usuario.email);
          console.log(doc.data());
          let profile = doc.data();
          profile.id = doc.id;
          perfilGuardarenSet.push(profile);
        }).catch(err=>{
          console.log(err)
        });
      commit("setProfile", perfilGuardarenSet);
    },

    getProfileEmpresa({ commit }) {
      const perfilempresaGuardarenSet = [];
      const usuario = firebase.auth().currentUser;
      const docRef= db.collection("company").doc(usuario.email);
      
      docRef.get().then(doc => {
        //console.log(doc.data());
        let profile=doc.data();
        profile.id = doc.id;
        perfilempresaGuardarenSet.push(profile);
      }).catch(err=>{
        console.log(err)
      });
      commit("setProfileEmpresa", perfilempresaGuardarenSet);
    },

    actualizarInfoUser({ commit }, perfilusuario) {
      const usuario = firebase.auth().currentUser;
      let { email } = usuario;
      //console.log(usuario.email)
      //console.log(perfilusuario)
      let dataResponse = [];
      db.collection("users").doc(usuario.email).update({
        nombre: perfilusuario.nombre,
        apellidos: perfilusuario.apellidos,
        cedula: perfilusuario.cedula,
        nroContacto: perfilusuario.nroContacto,
        experiencia: perfilusuario.experiencia,
        lenguajes: perfilusuario.lenguajes,
        ingles: perfilusuario.ingles
      }).then(() => {
        router.push({ name: 'perfilUsuario' })
      })
    },
    actualizarInfoEmpresa({ commit }, perfilEmpresa) {
      const usuario = firebase.auth().currentUser;
      let { email } = usuario;
      console.log(usuario)
      console.log(perfilEmpresa)

      db.collection("company").doc(email).update({
        nombre: perfilEmpresa.nombre,
        nit: perfilEmpresa.nit,
        ciudad: perfilEmpresa.ciudad,
        direccion: perfilEmpresa.direccion,
        sector: perfilEmpresa.sector,
        numero_contacto: perfilEmpresa.numero_contacto

      }).then(()=>{
        router.push({ name: 'perfilEmpresa' })
      })
    },
    crearEmpresa({ commit }, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.pass)

        .then(res => {
          //console.log(res.user.email);
          console.log(res.user.uid);

          commit("setEmpresa", { email: res.user.email, uid: res.user.uid });

          db.collection("company").doc(res.user.email)
          .set({
            nombre: "ejemplo",
            email: res.user.email,
            nit: '',
            ciudad: '',
            direccion: '',
            sector: '',
            numero_contacto: '',
            rol: 'empresa'
          })
            .then(() => {
              router.push({ name: "registerEmpresa" });
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
          router.push({ name: "perfilEmpresa" });
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
    },

    getCandidatos({commit}){
      const usuario = firebase.auth().currentUser;
      
      console.log(usuario.email)
      try{
        const CandidatoEnSet = [];
        db.collection("semiact-60ded").get().then(snapshot=>{
          snapshot.forEach(doc=>{
            console.log(doc.data());
          })
        })
      }catch(err){
        console.log("Error getting documents: ", err);
      }
    },

    getVacantes({commit}){
      const usuario =firebase.auth().currentUser;
      console.log(usuario.email)
      const docRef= db.collection("company").doc(usuario.email).collection("vacante");
  
      docRef.get().then(snapshot=>{
        snapshot.forEach(doc=>{
          console.log(doc.data())
        })
      }).catch(err=>{
        console.log(err)
      })
    },
  },

  
  modules: {},
  getters: {
    existeUsuario(state) {
      if (
        state.usuario === null ||
        state.usuario === "" ||
        state.usuario === undefined
      ) {
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
