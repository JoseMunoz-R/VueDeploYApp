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
    perfilusuario: { nombre: '', apellidos: '', cedula: '', nrocontacto: '', emailprofile: '', experiencia: '', lenguajes: '', ingles: '', rol: "", foto: "", urlfile: ""},
    perfilEmpresa: { nombre: '', nit: '', ciudad: '', direccion: '', sector: '', numero_contacto: '', rol: '', vacantes: [] },
    userPerfil: [],
    candidatos: [],
    urlHv:'',
    vacante: { cargo: '', educacion: '', salario: '', horario: '', descripcion: ''},
    vacantes: [],
    empresas: [],
    info:'',
    vacantePostulante: { cargo: '', educacion: '', salario: '', horario: '', descripcion: '', postulantes: []},
    vacantesPostulantes: [],
    textoBuscar: '',
    postulantesAVacante: [],
    vnte: [],
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
    setVacante(state, vacante){
      state.vacante = vacante
    },
    eliminarVacante(state, id){
      state.vacantes = state.vacantes.filter( doc => {
        return doc.id != id 
      })

    },
    setCandidatos(state, candidatosSet){
      state.candidatos= candidatosSet;
    },
    setFileHv(state, fileHv){
      state.urlHv=fileHv
    },
    setVacantes(state, currentVacant){
      state.vacantes= currentVacant;
    },

    setListaEmpresas(state, ListaEmpresas){
      state.empresas=ListaEmpresas
    },
    setInfo(state, msg){
      state.info=msg
    },
    setVacantePostulante(state, vacante){
      state.vacantePostulante=vacante
    },
    setVacantesPostulantes(state, vacantesPostulante){
      state.vacantesPostulantes= vacantesPostulante
    },
    setPostulantesVacante(state, postulantesAVacante){
      state.postulantesAVacante= postulantesAVacante
    },
    setVnte(state, vacante){
      state.vnte=vacante
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
              foto: "",
              urlfile: ""
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
            rol: 'empresa',
            vacantes: []
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
      const candidatoEnSet = [];
      //console.log(usuario.email)

      try{
       
        db.collection("users").get().then(snapshot=>{
          snapshot.forEach(doc=>{
            //console.log(doc.data());
            let profile=doc.data();
            profile.id=doc.id;
            candidatoEnSet.push(profile);

          })
        })
      }catch(err){
        console.log("Error getting documents: ", err);
      }
      //console.log(candidatoEnSet);
      commit("setCandidatos", candidatoEnSet);
    },

    getVacantes({commit}){
      const vacantesEnSet= [];
      const usuario =firebase.auth().currentUser;
      //console.log(usuario.email)
      const docRef= db.collection("company").doc(usuario.email).collection("vacantes");
  
      docRef.get().then(snapshot=>{
        snapshot.forEach(doc=>{
          console.log(doc.data())
          let profile=doc.data();
          profile.id=doc.id;
          vacantesEnSet.push(profile);
        })
      }).catch(err=>{
        console.log(err)
      })
      commit("setVacantes", vacantesEnSet);
    },

    getVacante({commit}, id){
      const usuario =firebase.auth().currentUser;
      db.collection('company').doc(usuario.email).collection('vacantes').doc(id).get()
      .then(doc => {
        console.log(doc.data());
        console.log(doc.id);
        let vacante = doc.data();
        vacante.id = doc.id
        commit('setVacante', vacante)
      })
    },

    async getUrlFile({commit}, mail){
      
          try{
           const usuario =firebase.auth().currentUser;
           console.log(usuario.email)
           const fileurls= await firebase.storage().ref().child(mail).child('HojaDeVidaPdf');
           fileurls.getDownloadURL().then(url=>{
            console.log("La url es:", url);
           }).catch(err=>{
             console.log("No se encontró archivo", err)
           })
           //this.downloadUrl=loadUrl;
           commit("setFileHv", loadUrl)
           
           
       }catch(err){
           console.log("No se pudo obtener la url",err);
            
       }
      
       
   },
   agregarVacante({commit, dispatch}, vacante){
    const usuario =firebase.auth().currentUser;
    const docRef= db.collection("company").doc(usuario.email);

    console.log(vacante)
    docRef.collection("vacantes").add({
      cargo: vacante.cargo,
      educacion: vacante.educacion,
      salario: vacante.salario,
      horario: vacante.horario,
      descripcion: vacante.descripcion,
      postulantes: []
    }).then(()=>{
      dispatch('getVacantes');
      
    }).catch(err=>{
      console.log("No se ha podido adicionar vacante: ", err)
    })
    

   },

   eliminarVacante({commit}, id){
    const usuario =firebase.auth().currentUser;
    const docRef= db.collection("company").doc(usuario.email).collection("vacantes");

    docRef.doc(id).delete().then(()=>{console.log("La vacante fue eliminada")
  commit("eliminarVacante", id)
  })
   },

   editarVacante({commit}, vacante){
    const usuario =firebase.auth().currentUser;
    db.collection('company').doc(usuario.email).collection('vacantes').doc(vacante.id).update({
      cargo: vacante.cargo,
      educacion: vacante.educacion,
      salario: vacante.salario,
      horario: vacante.horario,
      descripcion: vacante.descripcion
    })
    .then(()=>{
      router.push({name: 'perfilEmpresa'})
    })
   },

   getEmpresas({commit}){
     const empresas=[];
    const docRef= db.collection("company");
    docRef.get()
    .then(snapshot=>{
      snapshot.forEach(doc=>{
        console.log(doc.data())
        let empresa=doc.data();
        empresa.id=doc.id;
        empresas.push(empresa)
      }).catch(err=>{
        console.log("Error getting documents ", err)
      })
      
    })
    commit("setListaEmpresas", empresas)
   },

   getInfoEmpresa({commit}, id){
    db.collection('company').doc(id).get()
    .then(doc => {
      console.log(doc.data());
      console.log(doc.id);
      let empresa = doc.data();
      empresa.id = doc.id
      commit('setProfileEmpresa', empresa)
    })
  },

  getInfoVacantes({commit}, id){
    const vacantesEnSet= [];
    
    //console.log(usuario.email)
    const docRef= db.collection("company").doc(id).collection("vacantes");

    docRef.get().then(snapshot=>{
      snapshot.forEach(doc=>{
        console.log(doc.data())
        let profile=doc.data();
        profile.id=doc.id;
        vacantesEnSet.push(profile);
      })
    }).catch(err=>{
      console.log(err)
    })
    commit("setVacantes", vacantesEnSet);
  },

  postularCandidato( {commit, dispatch}, payload ){
    const msg='postulación agregada Correctamente'
    const usuario =firebase.auth().currentUser;
    const docRef= db.collection("company").doc(payload.emailem).collection("vacantes").doc(payload.idvacante);
    const userAdd= {email: usuario.email};

    docRef.update({
      postulantes: firebase.firestore.FieldValue.arrayUnion(userAdd)

    }).then(()=>{
      console.log("postulación agregada Correctamente")
      commit("setInfo", msg)
      dispatch('getInfoVacantes')
    }).catch(err=>{
      console.log("no se pudo guardar al postulante", err)
    })
  },
  declinarPostulacion( {commit}, payload ){
    const msg='postulación declinada Correctamente'
    const usuario =firebase.auth().currentUser;
    const docRef= db.collection("company").doc(payload.emailem).collection("vacantes").doc(payload.idvacante);
    const userRemove= {email: usuario.email};

    docRef.update({
      postulantes: firebase.firestore.FieldValue.arrayRemove(userRemove)

    }).then(()=>{
      console.log("postulación declinada Correctamente")
      commit("setInfo", msg)
    }).catch(err=>{
      console.log("no se pudo declinar al postulante", err)
    })
  },

  getPostulantes({commit}, emailEmpresa){
    const vacantes= [];
    const usuario =firebase.auth().currentUser;
    const docRef= db.collection("company").doc(emailEmpresa).collection("vacantes");

    docRef.get().then(snapshot =>{
      snapshot.forEach(doc=>{
        //console.log(doc.id, 'jose=>', doc.data())
        let vacante=doc.data();
        vacante.id=doc.id;
        const resultado= vacante.postulantes.find(postu=>postu.email === usuario.email)
        //console.log(resultado)
        //console.log(vacante.postulantes)
        if(vacante.postulantes.find(postu=>postu.email === usuario.email)){
          vacantes.push(vacante)
          console.log(vacantes.id, 'jose=>', vacantes)
        }
      })
      
    }).catch(err=>{
      console.log('Error getting documents', err);
    })
    commit("setPostulantesVacante", vacantes)
  },

  getPrueba({commit}, payload){
    const usuario =firebase.auth().currentUser;
    const vcntPrueba={};
    const docRef= db.collection("company").doc(payload.emailem).collection("vacantes").doc(payload.idvacante);

    docRef.get().then(doc=>{
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        console.log('Document data:', doc.data());
        let vacante = doc.data();
        vacante.id = doc.id
        if(vacante.postulantes.find(postu=>postu.email === usuario.email)){
          console.log("si existe")
          
          commit("setVnte", vacante)
        }
      }
    })
    
  },

  getPostulantesFromEmpresa({commit}){
    const vacantes= [];
    const usuario =firebase.auth().currentUser;
    const docRef= db.collection("company").doc(usuario.email).collection("vacantes");
 
    docRef.get().then(snapshot=>{
      snapshot.forEach(doc=>{
        console.log(doc.id, '=>', doc.data());
        let vacante=doc.data();
        vacante.id=doc.id;
        if(vacante.postulantes.length > 0){
          vacantes.push(vacante)
        }
        
      })
    }).catch(err=>{
      console.log('Error getting documents', err);
    })
    commit("setVacantesPostulantes", vacantes)
  },
  getPerfilcandidatoFromEmpresa({commit}, emailCandidato){
    const docRef= db.collection("users").doc(emailCandidato);

    docRef.get().then(doc=>{
      console.log("Info candidato: ", doc.data())
      let perfil= doc.data();
      perfil.id= doc.id;
      commit("setProfile", perfil)
    }).catch(err=>{
      console.log(err)
    })
    
  },

  buscador({commit, state}, payload){
    console.log(payload);
    state.textoBuscar=payload;
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
    },
    arrayFiltrado(state){
      let arrayFiltrado=[];
      for(let candidato of state.candidatos){
        let nombre = candidato.nombre;
        if(nombre.indexOf(state.textoBuscar) >= 0){
          arrayFiltrado.push(candidato)
        }
      }
      return arrayFiltrado;
    },
    arrayFiltradoEmpresa(state){
      let arrayFiltrado=[];
      for(let empresa of state.empresas){
        let nombre = empresa.nombre;
        if(nombre.indexOf(state.textoBuscar) >= 0){
          arrayFiltrado.push(empresa)
        }
      }
      return arrayFiltrado;
    }

  }
});
