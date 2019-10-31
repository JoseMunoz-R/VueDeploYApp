<template>
  <div>
    <h1>Ingreso empresas</h1>
     <form @submit.prevent="ingresoEmpresa({email:email,pass:pass})">
        <input type="email" v-model="email" />
        <input type="password" v-model="pass" />
        <button type="submit">Acceder</button>
    </form>
     <p>{{error}}</p>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: 'ingresoEmpresa',
  data(){
    return{
      email: '',
      pass: ''
    }
  },
  methods:{
    ...mapActions(['ingresoEmpresa'])
  },
  computed:{
    ...mapState(['error'])
  }
}
</script>
