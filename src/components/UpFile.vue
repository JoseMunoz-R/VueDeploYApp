<template>
    <div>
    
         <b-button v-b-toggle.collapse-2 class="m-1" variant="info">Subir HV</b-button>

  

  <!-- Element to collapse -->
  <b-collapse id="collapse-2">
    <b-card>
    <b-input-group>
    <b-input-group-prepend>
      <b-button variant="outline-info" @click="$refs.buttonActive.click()" >Seleccionar Archivo</b-button>
      <b-button variant="outline-info" :disabled="file === null" @click="agregarArchivo()" >Subir Archivo</b-button>
    </b-input-group-prepend>

    <input type="file" 
    ref="buttonActive" 
    class="d-none" 
    :disabled="loading"
    id="pdfhv"
    @change="buscarArchivo($event)"
    ></input>
    <!-- {{usuario.email}}
    <p>{{downloadUrl}}</p> -->
    

  </b-input-group>
    <b-card-text v-if="file"><h3>{{file}}</h3></b-card-text>
    <b-card-text v-if="downloadUrl" class="mt-2"><p> Usted ha subido un archivo y se encuentra disponible en el siguiente boton:</p> <b-button variant="outline-danger" :href="downloadUrl" target="_blank">Hoja de vida</b-button></b-card-text>
     <div v-if="!downloadUrl">
    <b-alert show variant="info"  >
      No ha subido ningún archivo aún.
    </b-alert>
    </div>

    <div id="cargaPdf">
     <pdf :src="downloadUrl"></pdf>
    </div> 
   
     
    </b-card>
  </b-collapse>
    </div>
</template>

<script>
import firebase from "firebase";
import 'firebase/storage';
import { mapState } from 'vuex';
import pdf from 'vue-pdf';
export default {
    name: 'upFile',
    data() {
        return {
            file: null,
            loading: false,
            downloadUrl: '',
            alerta: false
        }
    },
    components: {
        pdf
    },
    computed: {
        ...mapState(['usuario'])
    },
    methods: {
        buscarArchivo(event){
            console.log(event.target.files[0]);
            this.file= event.target.file;

    //         const reader = new FileReader();
    //   reader.readAsDataURL(this.file);
    //   reader.onloadend = (e) => {
    //     console.log(e.target.result);
        //this.urlTemporal = e.target.result
      //}
        },

        async agregarArchivo(){
            try{
                const { files } = this.$refs.buttonActive;
                this.loading = true;
                const file = files[0];
                if (file){
                    const isPdf = file.type === 'application/pdf';
                    if(file){
                        const response = await firebase.storage()
                        .ref()
                        .child(this.usuario.email)
                        .child('HojaDeVidaPdf')
                        .put(file);
                        const url = await response.ref.getDownloadURL();
                        console.log('archivo disponible en ', url);
                        this.downloadUrl = url;
                        const urlStorage= await response.getDownloadURL;
                        console.log(urlStorage)
                    } else {
                        console.log('Archivo no valido');
                    }
                }else{
                    console.log('falta el archivo');
                }
            } catch(err){
                console.log(err);
            }
            this.loading = false
        },

        async getUrlFile(){
           if(this.downloadUrl === ''){
               try{
                const fileurls= await firebase.storage().ref().child(this.usuario.email);
                const fileurl= fileurls.child('HojaDeVidaPdf');
                const loadUrl = await fileurl.getDownloadURL();
                this.downloadUrl=loadUrl;
                console.log(downloadUrl)
                
            }catch(err){
                console.log(err);
                 
            }
           }
            
        }
    },
    created() {
        this.getUrlFile()
    },
}
</script>