<template>
  <div>
    <b-form @submit.prevent="crearEmpresa({email:email, pass:pass1})">
      <h1>Registro de empresas</h1>



    
       <b-form-group>
                  <label for="input-pass">Correo Electronico</label>
                  <b-form-input
                    id="input-email"
                    v-model="email"
                    type="email"
                    required
                    placeholder="Ingrese su email"
                    label="EMAIL"
                  ></b-form-input>
                </b-form-group>
              
              <b-form-group>
                <label for="input-pass">Contraseña</label>
                <b-form-input
                  id="input-pass"
                  v-model="pass1" 
                  type="password"
                  required
                  placeholder="Ingrese su contraseña"
                ></b-form-input>
              </b-form-group>
              <b-form-group>
                <label for="input-pass2">Confirmación de Contraseña</label>
                <b-form-input
                  id="input-pass2"
                  v-model="pass2"
                  type="password"
                  required
                  placeholder="Confirme su contraseña"
                ></b-form-input>
              </b-form-group>
              <b-button type="submit" variant="info" :disabled="!desactivar">Crear Usuario</b-button>
     
      <br />
     
    </b-form>
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