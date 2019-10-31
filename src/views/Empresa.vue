<template>
  <div>
    <h1>Empresa</h1>

    <router-link :to="{name:'inicio'}" v-if="existeEmpresa">Inicio</router-link>|
    <router-link :to="{name:'ReguistroEmpresa'}" v-if="!existeEmpresa">ReguistroEmpresa</router-link>|
    <router-link :to="{name:'ingresoEmpresa'}" v-if="!existeEmpresa">Ingreso</router-link>|
    <a @click="cerrarSesion">Cerrar Sesión</a>
  </div>
</template>

<script>
import { mapActions, mapGetters} from "vuex";
export default {
  name: 'empresa',
  methods:{
    ...mapActions(['cerrarSesion'])
  },
  computed:{
    ...mapGetters(['existeEmpresa'])
  }
}
</script>