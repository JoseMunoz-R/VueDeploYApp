<template>


    <div class="mt-5">
      {{usuario}}
      {{perfilEmpresa}}
        <h1>Empresa: {{perfilEmpresa.nombre}}</h1>
       
        <div class="mt-3">
    <b-card-group deck class="mb-3">
      <b-card border-variant="danger" header="Perfil Empresa" class="text-left">
        <b-card-text>
        Nombre: {{perfilEmpresa.nombre}} <br>
        Nit: {{perfilEmpresa.nit}} <br>
        Dirección: {{perfilEmpresa.direccion}} <br>
        Ciudad: {{perfilEmpresa.ciudad}} <br>
        Sector: {{perfilEmpresa.sector}} <br>
        Nro. de Contatcto: {{perfilEmpresa.numero_contatcto}} <br>

        <div>
          <b-button :to="{name:'EditarEmpresa'}">Edita tu perfil</b-button>
          </div>
        </b-card-text>

      </b-card>
    </b-card-group>
  </div>
  <div>
    <h1>Lista de tareas</h1>
    <router-link :to="{name: 'agregar'}">
      <button class="btn btn-success btn-block">Agregar</button>
    </router-link>
    <ul class="list-group mt-5">
      <li class="list-group-item" v-for="item of tareas" :key="item.id">
        {{item.id}} - {{item.nombre}}
        <div class="float-right">
          <router-link
            class="btn btn-warning btn-sm mr-2"
            :to="{name: 'editar', params:{ id: item.id}}"
          >Editar</router-link>
          <button @click="eliminarTarea(item.id)" class="btn btn-danger btn-sm">Eliminar</button>
        </div>
      </li>
    </ul>
  </div>
    </div>
    
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
    
    name: 'perfilEmpresa',
    data(){
        return{

        }
    },
    methods: {
        ...mapActions(['getProfileEmpresa','getTareas', 'eliminarTarea', 'getVacantes'])
    },
    computed: {
        ...mapState(['perfilEmpresa', 'tareas', 'usuario'])
    },
    created() {
        this.getProfileEmpresa(),
        this.getTareas();
        this.getVacantes()
    },
}
</script>