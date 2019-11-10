<template>
    <div class="mt-5">
      
        <h1>Perfil: {{perfilusuario[0].nombre}} {{perfilusuario[0].apellidos}}</h1>
       
        <div class="mt-3">
    <b-card-group deck class="mb-3">
      <b-card border-variant="danger" header="Perfil" class="text-left">
        <b-card-text>
        Nombre: {{perfilusuario[0].nombre}} <br>
        Apellidos: {{perfilusuario[0].apellidos}} <br>
        Nro de identificación: {{perfilusuario[0].cedula}} <br>
        Nro de contacto: {{perfilusuario[0].nroContacto}} <br>
        Lenguajes: {{perfilusuario[0].lenguajes}} <br>
        Experiencia: {{perfilusuario[0].experiencia}} <br>
        Nivel de Inglés: {{perfilusuario[0].ingles}} <br>

          <div>
          <b-button size="sm" variant="info" :to="{name:'editionProfile'}">Edita tu perfil</b-button>
          </div>
              
            
        </b-card-text>
      </b-card>
    </b-card-group>
  </div>

    <b-tabs content-class="mt-3">
    <b-tab title="Hoja de Vida" active><h4>Hoja de Vida</h4> <UpFile></UpFile></b-tab>
    <b-tab title="Ver Empresas"><ListaEmpresa></ListaEmpresa></b-tab>
    
  </b-tabs>
    </div>
</template>


<script>
import {mapState, mapActions} from 'vuex'
import UpFile from '@/components/UpFile'
import ListaEmpresa from '@/components/ListaEmpresa'
export default {
    name: 'perfilUsuario',
    data() {
        return {
            
        }
    },
    methods: {
        ...mapActions(['getProfileUsuario'])
    },
    computed: {
        ...mapState(['perfilusuario', 'usuario'])
    },
    created() {
        this.getProfileUsuario()
    },
    components: {
      UpFile,
      ListaEmpresa
    }
}
</script>