<template>
    <div class="mt-5">
        <h1>Perfil: {{perfilEmpresa[0].nombre}}</h1>
       
        <div class="mt-3">
    <b-card-group deck class="mb-3">
      <b-card border-variant="danger" header="Perfil Empresa" class="text-left">
        <b-card-text>
        Nombre: {{perfilEmpresa[0].nombre}} <br>
        Nit: {{perfilEmpresa[0].nit}} <br>
        Dirección: {{perfilEmpresa[0].direccion}} <br>
        Ciudad: {{perfilEmpresa[0].ciudad}} <br>
        Sector: {{perfilEmpresa[0].sector}} <br>
        Nro. de Contatcto: {{perfilEmpresa[0].numero_contatcto}} <br>

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
    created() {
        this.getProfileEmpresa()
    },
}
</script>