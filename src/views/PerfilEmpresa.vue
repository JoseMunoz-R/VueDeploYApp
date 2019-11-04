<template>
    <div class="mt-5">
        <h1>Perfil: {{perfilEmpresa.nombre}}</h1>
       
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

        </b-card-text>
      </b-card>
    </b-card-group>
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
        ...mapActions(['getProfileEmpresa'])
    },
    computed: {
        ...mapState(['perfilEmpresa'])
    },
}
</script>