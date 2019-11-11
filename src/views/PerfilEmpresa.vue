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

        
          <router-link class="btn btn-info btn-sm mr-2" 
          :to="{name: 'EditarEmpresa'}">
            Edita tu perfil
          </router-link>
        </b-card-text>

      </b-card>
    </b-card-group>
    
  </div>

    <div>
  <b-tabs content-class="mt-3">
    <b-tab title="Candidatos" active><h4>Candidatos</h4><Card></Card></b-tab>
    <b-tab title="Vacantes"> <CrearVacante></CrearVacante></b-tab>
    <b-tab title="Postulantes"><PostulantesFromEmpresa></PostulantesFromEmpresa></b-tab>
  </b-tabs>
</div>

  
    </div>
    
</template>

<script>
import {mapState, mapActions} from 'vuex'
import Card from '@/components/Card'
import CrearVacante from '@/components/CrearVacante'
import PostulantesFromEmpresa from '@/components/PostulantesFromEmpresa'
export default {
    
    name: 'perfilEmpresa',
    data(){
        return{

        }
    },
    components: {
        Card,
        CrearVacante,
        PostulantesFromEmpresa
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
    mounted() {
        this.$forceUpdate();
    },
}
</script>