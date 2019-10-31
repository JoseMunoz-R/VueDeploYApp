<template>
  <div>
    <form @submit.prevent="crearEmpresa({email:email, pass:pass1})">
      <h1>Registro de empresas</h1>

      <input type="email" v-model="email" />
      <input type="password" v-model="pass1" />
      <input type="password" v-model="pass2" />
     
      <br />
      <button type="submit" :disabled="!desactivar">Crear Usuario</button>
    </form>
    <p>{{error}}</p>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "ReguistroEmpresa",
  data() {
    return {
      email: "",
      pass1: "",
      pass2: "",
      tarea: "",
      data: {
        tarea: ""
      }
    };
  },
  methods: {
    ...mapActions(["crearEmpresa"])
  },
  computed: {
    ...mapState(["error"]),
    desactivar() {
      return this.pass1 === this.pass2 && this.pass1 != "";
    }
  }
};
</script>