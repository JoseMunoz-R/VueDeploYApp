<template>
  <div class="mt-5">
  
    <b-container>
      <b-row>
        <b-col cols="12" md="6" lg="4">
          <div>
            <h3>Editar Empresa</h3>
            
            <b-form @submit.prevent="actualizarInfoEmpresa(perfilEmpresa)">
              <b-form-group>
                <b-form-group>
                  <label for="input-pass">Nombre de la Empresa</label>
                  <b-form-input
                    id="input-nombre"
                    v-model="perfilEmpresa.nombre"
                    type="text"
                    required
                    placeholder="Carvajal SA"
                  ></b-form-input>
                </b-form-group>

                <b-form-group>
                  <label for="input-pass">NIT de la Empresa</label>
                  <b-form-input
                    id="input-nit"
                    v-model="perfilEmpresa.nit"
                    type="text"
                    required
                    placeholder="88932993"
                  ></b-form-input>
                </b-form-group>

                <b-form-group>
                  <label for="input-pass">Ciudad</label>
                  <b-form-input
                    id="input-ciudad"
                    v-model="perfilEmpresa.ciudad"
                    type="text"
                    required
                    placeholder="Cali"
                  ></b-form-input>
                </b-form-group>

                <b-form-group>
                  <label for="input-pass">Direccion principal</label>
                  <b-form-input
                    id="input-direccion"
                    v-model="perfilEmpresa.direccion"
                    type="text"
                    required
                    placeholder="Av 4n # 49- 09"
                  ></b-form-input>
                </b-form-group>

                <b-form-group>
                  <label for="input-pass">Sector de la Empresa</label>
                  <b-form-input
                    id="input-sector"
                    v-model="perfilEmpresa.sector"
                    type="text"
                    required
                    placeholder="Textil, manofactura"
                  ></b-form-input>
                </b-form-group>

                <b-form-group>
                  <label for="input-pass">Numero de contacto principal</label>
                  <b-form-input
                    id="input-numero_contacto"
                    v-model="perfilEmpresa.numero_contacto"
                    type="text"
                    required
                    placeholder="321 857 0323"
                  ></b-form-input>
                </b-form-group>
               
              </b-form-group>
              
             
             <b-button type="submit" variant="info">
                <a v-link="{nombre:'perfilEmpresa'}">Actualizar Datos</a>
              </b-button>
            </b-form>
            

      
          </div>
        </b-col>
        <b-col cols="12" md="6" lg="8" align-self="center">
          
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "registerEmpresa",
  data() {
    return {
      data: {
        nombre: "",
        nit: "",
        ciudad: "",
        direccion: "",
        sector: "",
        numero_contacto: ""
      },

    };
  },
  methods: {
    ...mapActions(['getProfileEmpresa', 'actualizarInfoEmpresa'])
  },
  computed: {
    ...mapState(['perfilEmpresa', 'empresa']),
  },
  created(){
    this.getProfileEmpresa()
  }
};
</script>
