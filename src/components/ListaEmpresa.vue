<template>
    <div>
        <h4>Lista de Empresas</h4>
        
        <b-form @submit.prevent="buscador(textoBuscar)">
  <b-input type="text" placeholder="Buscar empresa..." v-model="textoBuscar" class="mt-3 mb-3" v-on:keyup="buscador(textoBuscar)" ></b-input>
</b-form>

        <ul class="list-group mt-2">
      <li class="list-group-item" v-for="item of arrayFiltradoEmpresa" :key="item.id">
        {{item.nombre}} 
        <div class="float-right">
         <router-link
            class="btn btn-info btn-sm mr-2"
            :to="{name: 'infoEmpresa', params:{ id: item.id}}"
          >Ver vacantes</router-link> 
          
          <!-- <button @click="editarVacante(item)" class="btn btn-warning btn-sm mr-2">Editar</button> -->
          
        </div>
      </li>
    </ul>

    </div>
</template>

<script>
import {mapActions, mapState, mapGetters} from 'vuex'
export default {
    name: "listaEmpresas",
    data() {
        return {
            textoBuscar: ''
        }
    },
    methods: {
        ...mapActions(['getEmpresas', 'buscador'])
    },
    computed: {
       ...mapState(['empresas']),
       ...mapGetters(['arrayFiltradoEmpresa'])
    },
    created() {
         this.getEmpresas()
    },
}
</script>