<template>


    <div class="mt-5">
        <h1>Empresa: {{perfilEmpresa[0].nombre}}</h1>
       
        <div class="mt-3">
    <b-card-group deck class="mb-3">
      <b-card border-variant="danger" header="Perfil Empresa" class="text-left">
        <b-card-text>
        Nombre: {{perfilEmpresa[0].nombre}} <br>
        Nit: {{perfilEmpresa[0].nit}} <br>
        Dirección: {{perfilEmpresa[0].direccion}} <br>
        Ciudad: {{perfilEmpresa[0].ciudad}} <br>
        Sector: {{perfilEmpresa[0].sector}} <br>
        Nro. de Contatcto: {{perfilEmpresa[0].numero_contacto}} <br>

        <div>
          <b-button :to="{name:'EditarEmpresa'}">Edita tu perfil</b-button>
          </div>
        </b-card-text>

      </b-card>
    </b-card-group>
    <Card></Card>
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
import Card from '@/components/Card'
export default {
    
    name: 'perfilEmpresa',
    data(){
        return{

        }
    },
    components: {
        Card,
    },
    methods: {
        ...mapActions(['getProfileEmpresa', 'getVacantes'])
    },
    computed: {
        ...mapState(['perfilEmpresa', 'tareas', 'usuario'])
    },
    created() {
        this.getProfileEmpresa(),
        this.getVacantes()
    },
}
</script>