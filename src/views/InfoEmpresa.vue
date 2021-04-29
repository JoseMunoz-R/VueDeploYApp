<template>
    <div>
        {{vnte}}
        {{info}}
        <b-container class="mt-5">
    

        <b-button variant="outline-info" :to="{name: 'perfilUsuario'}">Regresa a tu perfil</b-button>
        
         <h4 class="mt-3">Información de la empresa</h4>
    <b-card  border-variant="danger">
    <b-card-title class="info mr-2">{{perfilEmpresa.nombre}}</b-card-title>
      
        <b-list-group flush>
      <b-list-group-item>Ciudad: {{perfilEmpresa.ciudad}}</b-list-group-item>
      <b-list-group-item>Dirección: {{perfilEmpresa.direccion}}</b-list-group-item>
      <b-list-group-item>Sector: {{perfilEmpresa.sector}}</b-list-group-item>
      
    </b-list-group>
       
      </b-card>
    
  <b-row class="mt-2">

    <b-col>

    <h4 v-if="vacantes.length>0">Vacantes creadas por {{perfilEmpresa.nombre}}</h4>
    <h4 v-if="vacantes.length==0">Actualmente no hay vacantes creadas por {{perfilEmpresa.nombre}}</h4>

    <div>
    <b-card-group columns>
   
  <b-card
    header="Vacante"
    header-text-variant="white"
    header-tag="header"
    header-bg-variant="dark"
    style="max-width: 20rem;"
    class="mb-2 "

    v-for="(item, index) of vacantes" :key="index"
  >
    <b-card-title>{{item.cargo}}</b-card-title>
     <b-list-group flush>
      <b-list-group-item>Funciones: {{item.descripcion}}</b-list-group-item>
      <b-list-group-item>Nivel Educativo: {{item.educacion}}</b-list-group-item>
      <b-list-group-item>Horario: {{item.horario}}</b-list-group-item>
      <b-list-group-item>Salario: {{item.salario}}</b-list-group-item>
      <b-list-group-item>Postulantes actuales: {{item.postulantes.length}}</b-list-group-item>
      
    </b-list-group>
    <b-button v-if="item.postulantes.email === vnte.email" class="mt-3 mr-2" variant="info" @click="postularCandidato({emailem: perfilEmpresa.email, idvacante: item.id}); getPrueba({emailem: perfilEmpresa.email, idvacante: item.id})">Postularme</b-button>
    <b-button v-if="!item.postulantes.email != null" class="mt-3" variant="warning" @click="declinarPostulacion({emailem: perfilEmpresa.email, idvacante: item.id})">Declinar</b-button>
    <!--<b-button  class="mt-3" variant="warning" @click="getPostulantes({emailem: perfilEmpresa.email, idvacante: item.id})">obtener Postulación</b-button> -->
  </b-card>
   </b-card-group deck>
</div>
    </b-col>
    
  </b-row>
</b-container>
        
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
    name: 'infoEmpresa',
    data() {
        return {
             idEmail: this.$route.params.id,
             showDismissibleAlert: false
        }
    },
    methods: {
        ...mapActions(['getInfoEmpresa', 'getInfoVacantes', 'postularCandidato', 'declinarPostulacion', 'getPostulantes', 'getPrueba'])
    },
    computed: {
        ...mapState(['perfilEmpresa', 'vacantes', 'info', 'vacantePostulante', 'postulantesAVacante', 'vnte'])
    },
    created() {
        this.getInfoEmpresa(this.idEmail),
        this.getInfoVacantes(this.idEmail),
        this.getPostulantes(this.idEmail)
    },
}
</script>