<template>
    <div>
              <h4 v-if="vacantes.length>0">Lista de Vacantes</h4>
    <ul class="list-group mt-2">
      <li class="list-group-item" v-for="item of vacantes" :key="item.id">
        {{item.cargo}} - {{item.nombre}}
        <div class="float-right">
          <router-link
            class="btn btn-warning btn-sm mr-2"
            :to="{name: 'editar', params:{ id: item.id}}"
          >Editar</router-link> 
          
          <!-- <button @click="editarVacante(item)" class="btn btn-warning btn-sm mr-2">Editar</button> -->
          <button @click="eliminarVacante(item.id)" class="btn btn-danger btn-sm">Eliminar</button>
        </div>
      </li>
    </ul>

    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
export default {
    name: 'listaVacante',
    data() {
        return {
            
        }
    },
    methods: {
        ...mapActions(['eliminarVacante', 'getVacantes'])
    },
    computed: {
      ...mapState(['vacantes'])
    },
}
</script>