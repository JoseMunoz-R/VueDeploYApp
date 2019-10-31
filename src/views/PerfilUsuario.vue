<template>
    <div class="mt-5">
        <h1>Perfil: {{perfilusuario.nombre}} {{perfilusuario.apellidos}}</h1>
       
        <div class="mt-3">
    <b-card-group deck class="mb-3">
      <b-card border-variant="danger" header="Perfil" class="text-left">
        <b-card-text>
        Nombre: {{perfilusuario.nombre}} </br>
        Apellidos: {{perfilusuario.apellidos}} </br>
        Nro de identificación: {{perfilusuario.cedula}} </br>
        Nro de contacto: {{perfilusuario.nroContacto}} </br>
        Lenguajes: {{perfilusuario.lenguajes}} </br>
        Experiencia: {{perfilusuario.experiencia}} </br>
        Nivel de Inglés: {{perfilusuario.ingles}} </br>

        </b-card-text>
      </b-card>
    </b-card-group>
  </div>
    </div>
</template>


<script>
import {mapState, mapActions} from 'vuex'
export default {
    name: 'perfilUsuario',
    data() {
        return {
            
        }
    },
    methods: {
        ...mapActions(['getProfileUsuario'])
    },
    computed: {
        ...mapState(['perfilusuario'])
    },
    created() {
        
    },
}
</script>