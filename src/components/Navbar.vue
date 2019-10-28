<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="danger">
      <b-container>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-navbar-brand>Hired</b-navbar-brand>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item :to="{name: 'register'}" v-if="!existeUsuario">Registro</b-nav-item>
            <b-nav-item :to="{name: 'login'}" v-if="!existeUsuario">Login</b-nav-item>
            <b-nav-item :to="{name: 'inicio'}" v-if="existeUsuario" exact >Inicio</b-nav-item>
            
            <b-nav-item @click="logout" v-if="existeUsuario" right>Cerrar Sesión</b-nav-item>
            

          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import firebase from "firebase";
export default {
  name: "navbar",
  data() {
    return {
      isLoggedIn: false,
      CurrentUser: false
    };
  },
  methods: {
    ...mapActions(['logout'])
  },
  computed: {
    ...mapGetters(['existeUsuario'])
  },
};
</script>