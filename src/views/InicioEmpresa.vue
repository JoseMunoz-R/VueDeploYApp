<template>
    <div>
      <h1>Ruta protegida</h1>  
      {{empresa}}
      <h3>Bienvenidos {{empresa.email}}</h3>
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: 'InicioEmpresa',
  computed:{
    ...mapState(['empresa'])
  }
}
</script>