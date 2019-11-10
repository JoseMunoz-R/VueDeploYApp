<template>
    <div>
        <h4>Lista de Empresas</h4>
        

        <ul class="list-group mt-2">
      <li class="list-group-item" v-for="item of empresas" :key="item.id">
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
import {mapActions, mapState} from 'vuex'
export default {
    name: "listaEmpresas",
    methods: {
        ...mapActions(['getEmpresas'])
    },
    computed: {
       ...mapState(['empresas'])
    },
    created() {
         this.getEmpresas()
    },
}
</script>