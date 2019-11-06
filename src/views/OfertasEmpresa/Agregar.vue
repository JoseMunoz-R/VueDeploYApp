<template>
    <div>
        <h1>Agregar</h1>
        <form @submit.prevent="agregarTarea(nombre)">
        <input type="text" v-model="nombre">
        <button type="submit">Agregar</button>
        
        </form>
        {{nombre}}
    
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name: 'Agregar',
    data(){
        return{
            nombre: ''
        }
    },
    methods:{
    ...mapActions(['agregarTarea'])
  }
}
</script>