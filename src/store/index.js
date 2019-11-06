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
    perfilusuario: { nombre: '', apellidos: '', cedula: '', nrocontacto: '', emailprofile: '', experiencia: '', lenguajes: '', ingles: '' },
    perfilEmpresa: { nombre: '', nit: '', ciudad: '', direccion: '', sector: '', numero_contacto: '' },
    userPerfil: [],
    tareas: [],
    tarea: {nombre: '', id: ''}
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
    },
    setTareas(state, tareas) {
      state.tareas = tareas 
    },
    setTarea(state, tarea){
      state.tarea = tarea
    },
    eliminarTarea(state, id){
      state.tareas = state.tareas.filter( doc => {
        return doc.id != id 
      })

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
          db.collection(res.user.email)
            .add({
              nombre: "",
              apellidos: "",
              cedula: "",
              nroContacto: "",
              profileemail: res.user.email,
              experiencia: "",
              lenguajes: "",
              ingles: ""
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
      db.collection(usuario.email)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            console.log(doc.id);
            console.log(doc.data());
            let profile = doc.data();
            profile.id = doc.id;
            perfilGuardarenSet.push(profile);
          });
        });
      commit("setProfile", perfilGuardarenSet);
    },

    getProfileEmpresa({ commit }) {
      const perfilempresaGuardarenSet = [];
      const usuario = firebase.auth().currentUser;
      db.collection(usuario.email).get().then(snapshot => {
        snapshot.forEach(doc => {
          console.log(usuario.email);
          console.log(doc.data());
          let profileEmpresa = doc.data();
          profileEmpresa.id = doc.id;
          perfilempresaGuardarenSet.push(profileEmpresa);
        });
      });
      commit("setProfileEmpresa", perfilempresaGuardarenSet);
    },

    actualizarInfoUser({ commit }, perfilusuario) {
      const usuario = firebase.auth().currentUser;
      let { email } = usuario;
      //console.log(usuario.email)
      //console.log(perfilusuario)
      let dataResponse = [];
      db.collection(email).doc(perfilusuario[0].id).update({
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

      db.collection(email).doc(perfilEmpresa[0].id).update({
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

          db.collection(res.user.email).add({
            nombre: "ejemplo",
            email: res.user.email,
            nit: '',
            ciudad: '',
            direccion: '',
            sector: '',
            numero_contacto: ''
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
    
    getTareas({ commit }) {
      const usurio =firebase.auth().currentUser
      const tareas = []
      db.collection(usurio.email).get() 
      //db.collection('tareas').get() 
        .then(snapshot => {
          snapshot.forEach(doc => {  
            // console.log (doc.id);
            // console.log (doc.data());
            let tarea = doc.data();
            tarea.id = doc.id
            tareas.push(tarea) 


          })
        })
      commit('setTareas', tareas) //envia el areglo para usarlo
    },

    
    getTarea({ commit }, id) {  //para editar
      const usuario =firebase.auth().currentUser
      db.collection(usuario.email).doc(id).get()//invoco la conexion a firebase
        .then(doc => {
          // console.log(doc.data());
          // console.log(doc.id);
          let tarea = doc.data();
          tarea.id = doc.id
          commit('setTarea', tarea)
          

        })
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
    editarTarea({commit}, tarea){
      const usurio =firebase.auth().currentUser
      db.collection(usurio.email).doc(tarea.id).update({
        nombre: tarea.nombre
      })
      .then(()=>{
        router.push({name: 'inicio'})
      })
    },
    agregarTarea({commit}, nombre){
      const usurio =firebase.auth().currentUser
      db.collection(usurio.email).add({
        nombre: nombre
      })
      .then(doc => {
        console.log(doc.id);
        router.push({name: 'inicio'})
      })
    },
    eliminarTarea({commit, dispatch}, id){
      const usurio =firebase.auth().currentUser
      db.collection(usurio.email).doc(id).delete()
      .then(()=>{
        console.log('Tarea fue eliminada');
        //dispatch('getTareas')//opcion para forzar  la actualizacion de vista
        commit('eliminarTarea',id)
      })
    }
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
