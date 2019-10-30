<template>
    <div class="mt-5">
       <h1>Perfil de Usuario</h1>
       <p>Bienvenido {{usuario.email}} - {{usuario.uid}}</p>
       
       <b-container>
      <b-row>
        <b-col cols="12" md="6" lg="4">
          <div>
           
            <b-form @submit.prevent="actualizarInfoUser(userPerfil)">
              <b-form-group>
                <label for="input-nombre">Nombre Completo</label>
                <b-form-input
                  id="input-nombres"
                  v-model="userPerfil.nombre"
                  type="text"
                  required
                  placeholder="Ingrese sus nombres"
                ></b-form-input>
                </b-form-group>

                <b-form-group>
                <label for="input-apellido">Apellido Completo</label>
                <b-form-input
                  id="input-apellido"
                  v-model="userPerfil.apellidos"
                  type="text"
                  required
                  placeholder="Ingrese sus apellidos"
                ></b-form-input>
               </b-form-group> 

                <b-form-group>
                <label for="input-dni">Numero de Identidad</label>
                <b-form-input
                  id="input-dni"
                  v-model="userPerfil.cedula"
                  type="text"
                  required
                  placeholder="Ingrese su numero de identificación"
                ></b-form-input>
               </b-form-group>

               <b-form-group>
                <label for="input-cel">Numero de contacto</label>
                <b-form-input
                  id="input-cel"
                  v-model="userPerfil.nroContacto"
                  type="text"
                  required
                  placeholder="Ingrese su numero celular"
                ></b-form-input>
               </b-form-group>

               <b-form-group>
                <label for="input-tec">Digite tecnologías que actual/ sepa</label>
                <b-form-input
                  id="input-tec"
                  v-model="userPerfil.lenguajes"
                  type="text"
                  required
                  placeholder="Tecnologías: Java, Dart..."
                ></b-form-input>
               </b-form-group>

               <b-form-group>
                <label for="input-ing">Digite su nivel de inglés</label>
                <b-form-input
                  id="input-ing"
                  v-model="userPerfil.ingles"
                  type="text"
                  required
                  placeholder="C2 - C1 - B2 - B1 - A2 - A1"
                ></b-form-input>
               </b-form-group>

               <b-form-group>
                <label for="input-exp">Describa su experiencia laboral</label>
                <b-form-textarea
                  id="input-exp"
                  v-model="userPerfil.experiencia"
                  type="text"
                  required
                  placeholder="Ingrese su numero de identificación"
                ></b-form-textarea>
                </b-form-group>
              
              <b-button type="submit" variant="info" >Completar información del usuario</b-button>
            </b-form>
            
            
          </div>
        </b-col>
        <b-col cols="12" md="6" lg="8" align-self="center">
          <div>
            
          </div>
        </b-col>
      </b-row>
    </b-container>
       {{userPerfil}}
       {{userPerfil.id}}
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
export default {
    name: 'Inicio',
    data() {
        return {
            perfil: []
        }
    },
    methods: {
       ...mapActions(['getProfileUsuario', 'actualizarInfoUser'])
    },
    computed: {
        ...mapState(['usuario', 'userPerfil'])
    },
    created() {
        this.getProfileUsuario()
    },
}
</script>