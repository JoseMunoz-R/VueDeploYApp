<template>
    <div>
    
    
    <b-container class="mt-5" >
    <h4>Editar Vacante</h4>
  <b-row>
    <b-col>
     <b-form @submit.prevent="editarVacante(vacante)">
      <b-form-group
        id="input-group-1"
        label="Cargo"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="vacante.cargo"
          type="text"
          required
          placeholder="Digite el cargo de la vacante"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Nivel educativo" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="vacante.educacion"
          required
          placeholder="Pregado/posgrado... etc "
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Salario" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="vacante.salario"
          required
          placeholder="$"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Horario" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="vacante.horario"
          required
          placeholder="Horario: Lunes a viernes de 8 am. - 5 pm."
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-descripcion" label="Descripción" label-for="descripcion">
        <b-form-textarea
          id="descripcion"
          v-model="vacante.descripcion"
          required
          placeholder="descripción del cargo"
        ></b-form-textarea>
      </b-form-group>


      <b-button type="submit" variant="info">Actualizar</b-button>
      
    </b-form>
    </b-col>
    <b-col></b-col>
  </b-row>
</b-container>
    
    
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: 'Editar',
  data(){
    return{
      id: this.$route.params.id
    }
  },
  methods:{
    ...mapActions(['editarVacante', 'getVacante'])// recibe para editar
  },
  created(){
    this.getVacante(this.id)
  },
  computed:{
    ...mapState(['vacante'])
  }
}
</script>