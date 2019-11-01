<template>
    <div class="mt-5">
         <b-container>
      <b-row>
        <b-col cols="12" md="6" lg="4">
          <div>
            <h3>Login de usuarios</h3>
            <b-form @submit.prevent="loginUsuario({email: email, pass: password})">
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
              <b-button type="submit" variant="info" >Acceder</b-button>
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
import {mapActions, mapState} from 'vuex';
export default {
    name:'Login',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        ...mapActions(['loginUsuario'])
    },
    computed: {
        ...mapState(['error'])
    },
}
</script>