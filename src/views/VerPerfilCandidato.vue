<template>
    <div class="mt-5">

        <b-button variant="outline-info" :to="{name: 'perfilEmpresa'}">Regresa a tu perfil</b-button>
        <h4 class="mt-5">Perfil candidato</h4>
         <b-card >
         <b-card-title>Nombre: {{perfilusuario.nombre}} {{perfilusuario.apellidos}} </b-card-title>
         <b-card-sub-title>Nro. de identificación: {{perfilusuario.cedula}}</b-card-sub-title>
    <b-card-text>
      Nro. de contacto: {{perfilusuario.nroContacto}} <br>
      Correo electronico: {{perfilusuario.profileemail}} <br>
      Experiencia: {{perfilusuario.experiencia}} <br>
      Nivel de inglés: {{perfilusuario.ingles}} <br>
    </b-card-text>

    <b-button :href="perfilusuario.urlfile"  target="_blank"  v-if="perfilusuario.urlfile != ''" size="sm" variant="info">Ir a hoja de vida</b-button>
  </b-card>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
    name: 'verPerfilCandidato',
    data() {
        return {
            idEmail: this.$route.params.email,
        }
    },
    methods: {
        ...mapActions(['getPerfilcandidatoFromEmpresa'])
    },
    computed: {
        ...mapState(['perfilusuario'])
    },
    created() {
        this.getPerfilcandidatoFromEmpresa(this.idEmail)
    },
}
</script>