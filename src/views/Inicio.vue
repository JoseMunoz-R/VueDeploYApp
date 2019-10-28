<template>
    <div class="mt-5">
       <h1>Inicio de la aplicación</h1>
       <p>Bienvenido {{usuario.email}}</p>
    </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
    name: 'Inicio',
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState(['usuario'])
    },
}
</script>