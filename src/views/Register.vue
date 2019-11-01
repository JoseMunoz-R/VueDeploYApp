<template>
  <div class="mt-5">
    <b-container>
      <b-row>
        <b-col cols="12" md="6" lg="4">
          <div>
            <h3>Registro de usuarios</h3>
            <b-form @submit.prevent="crearUsuario({email: email, pass: password})">
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
                  v-model="password"
                  type="password"
                  required
                  placeholder="Ingrese su contraseña"
                ></b-form-input>
              </b-form-group>
              <b-form-group>
                <label for="input-pass2">Confirmación de Contraseña</label>
                <b-form-input
                  id="input-pass2"
                  v-model="password2"
                  type="password"
                  required
                  placeholder="Confirme su contraseña"
                ></b-form-input>
              </b-form-group>
              <b-button type="submit" variant="info" :disabled="!desactivar">Crear Usuario</b-button>
            </b-form>
            <p>{{error}}</p>
            
          </div>
        </b-col>
        <b-col cols="12" md="6" lg="8" align-self="center">
          <div>
            <b-container fluid>
              <img src="@/assets/hiredvue200.png" />
            </b-container>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "register",
  data() {
    return {
      email: "",
      password: "",
      password2: ""
    };
  },
  methods: {
    ...mapActions(['crearUsuario'])
  }, 
  computed: {
    ...mapState(['error']),
    desactivar(){
    return this.password === this.password2 && this.password != ''
  }
  }
  
};
</script>
