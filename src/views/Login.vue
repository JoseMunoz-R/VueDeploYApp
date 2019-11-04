<template>
    <div class="mt-5">
         <b-container>
      <b-row>
        <b-col cols="12" md="6" lg="4">
          <div>
            <h3>Login de usuarios</h3>
            <b-form @submit.prevent="loginUsuario({email: $v.email.$model, pass: $v.password.$model})">
              <b-form-group>
                <label for="input-pass">Correo Electronico</label>
                <b-form-input
                  id="input-email"
                  v-model="$v.email.$model"
                  type="email"
                  required
                  placeholder="Ingrese su email"
                  label="EMAIL"
                ></b-form-input>
                <!-- <small v-if="!$v.email.$required" class="text-danger d-block">Campo requerido</small>
                <small v-if="!$v.email.$email" class="text-danger d-block">Email no valido</small> -->
              </b-form-group>
              
              <b-form-group>
                <label for="input-pass">Contraseña</label>
                <b-form-input
                  id="input-pass"
                  v-model="$v.password.$model"
                  type="password"
                  required
                  placeholder="Ingrese su contraseña"
                ></b-form-input>
               <!-- <small v-if="!$v.password.$required" class="text-danger d-block" >Campo requerido</small>
                <small v-if="!$v.password.$minLength" class="text-danger d-block" >Email no valido</small> -->
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
import { required, minLength, between, email } from 'vuelidate/lib/validators'
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
    validations:{
      email:{required, email},
      password:{required, minLength: minLength(6)}
    }
}
</script>