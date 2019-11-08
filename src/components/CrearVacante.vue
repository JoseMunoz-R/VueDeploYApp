<template>
    <div>
        <div>

        <b-container class="bv-example-row">
            <b-row>
            <b-col>
            <h4>Crear vacantes</h4>
                 <b-form @submit.prevent="agregarVacante(vacante)">
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

      <b-form-group id="input-group-2" label="Salario" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="vacante.salario"
          required
          placeholder="$"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Horario" label-for="input-4">
        <b-form-input
          id="input-4"
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


      <b-button type="submit" variant="info">Agregar</b-button>
      
    </b-form>
            </b-col>
            <b-col>
                <ListaVacante></ListaVacante>
            </b-col>
            
            </b-row>
        </b-container>
       

   
  </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ListaVacante from '@/components/ListaVacante'
export default {
    name: 'crearVacante',
    data() {
        return {
            vacante: { cargo: '', educacion: '', salario: '', horario: '', descripcion: ''}
           
        }
    },
    computed: {
        ...mapState(['vacantes'])
    },
    methods: {
        ...mapActions(['agregarVacante','eliminarVacante', 'getVacantes'])
    },
    components:{
        ListaVacante
    },
    created() {
        this.getVacantes()
    },
    mounted() {
        
    },
}
</script>