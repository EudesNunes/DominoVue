<template>
  <div class="body">
    <PaginaInicialView/>
  </div>
</template>

<script>
import { onMounted, ref, defineComponent } from 'vue';
import PaginaInicialView from './views/PaginaInicialView.vue';
export default defineComponent({
    name: "App",
    components: { PaginaInicialView },
    setup() {
        onMounted(() => {
        });
        return {};
    },
});


</script>


<style scoped>
.body{
  margin: 0; 
  padding: 0;
}
</style>