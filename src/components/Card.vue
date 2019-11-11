<template>
<div>

<b-form @submit.prevent="buscador(textoBuscar)">
  <b-input type="text" placeholder="Buscar candidato..." v-model="textoBuscar" class="mt-3 mb-3" v-on:keyup="buscador(textoBuscar)" ></b-input>
</b-form>

<b-card-group columns>
<b-card
      header="Candidato"
      header-tag="header"
      header-text-variant="white"
      header-bg-variant="dark"
      
      v-for="(item, index) of arrayFiltrado" :key="index"
    >
       <b-card-title>{{item.nombre}} {{item.apellidos}}</b-card-title>
       <b-card-sub-title class="mb-2">Correo: {{item.profileemail}}</b-card-sub-title>
        <b-list-group flush>
      <b-list-group-item>Identificación: {{item.cedula}}</b-list-group-item>
      <b-list-group-item>Nivel inglés: {{item.ingles}}</b-list-group-item>
      <b-list-group-item>Contacto: {{item.nroContacto}}</b-list-group-item>
            
    </b-list-group>
      <b-card-text class="mt-2">Experiencia: {{item.experiencia}}</b-card-text>
      <b-button :href="item.urlfile" target="_blank" variant="info" v-if="item.urlfile != ''">Ir a hoja de vida</b-button>
    </b-card>
</b-card-group>

</div>
        
      </template>
      
      <script>

import {mapState, mapActions, mapGetters} from 'vuex'
      export default {
        name: 'card',
        data() {
          return {
           // candidatos: []
           textoBuscar: ''
          }
        },
        computed: {
          ...mapState(['usuario', 'candidatos']),
          ...mapGetters(['arrayFiltrado'])
        },
        methods: {
          ...mapActions(['getCandidatos', 'buscador']),
          
        },
        created() {
          this.getCandidatos()
          
        },
      }
      </script>
      
    