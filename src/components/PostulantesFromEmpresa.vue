<template>
    <div>
        <h4>Postulantes a vacantes creadas</h4>

        <ul class="list-group mt-2">
        <li class="list-group-item" v-for="(item, index) of vacantesPostulantes" :key="index">
        {{item.cargo}} 
        <div class="float-right">
        <b-button v-b-toggle.collapse-2 class="m-1">Ver postulantes</b-button>
        <b-collapse id="collapse-2">
        <ul class="list-group mt-2">
        <li class="list-group-item" v-for="(candidato, index) of item.postulantes" :key="index">
        {{candidato.email}}
        <div class="float-right">
        <router-link
            class="btn btn-warning btn-sm mr-2 ml-2"
            :to="{name: 'verPerfilCandidato', params:{ email: candidato.email}}"
          >Ver perfil</router-link> 
        </div>
        </li>
        </ul>
  </b-collapse>
        </div>
        </li>
        </ul>

    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
    name:'postulantesFromEmpresa',
    methods: {
        ...mapActions(['getPostulantesFromEmpresa'])
    },
    computed: {
        ...mapState(['vacantesPostulantes'])
    },
    created() {
        this.getPostulantesFromEmpresa()
    },
}
</script>