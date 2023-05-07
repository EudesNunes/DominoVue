<template>
  <div class="Formulario">
    <div class="titulo">
      <h1>Escolha o lado</h1>
    </div>
    <div class="Opcao">
      <!-- 1 lado------------------------------------- -->
      <div class="contorno" @click="checarvalor(L1)">
        <div class="lado1">
          <div class="linha">
            <div class="coluna">
              <div class="circulo" v-if="L1 > 3 || L1 == 2"></div>
            </div>
            <div class="coluna"></div>
            <div class="coluna">
              <div class="circulo" v-if="L1 > 2"></div>
            </div>
          </div>
          <div class="linha">
            <div class="coluna">
              <div class="circulo" v-if="L1 == 6"></div>
            </div>
            <div class="coluna">
              <div class="circulo" v-if="L1 == 5 || L1 == 3 || L1 == 1"></div>
            </div>
            <div class="coluna">
              <div class="circulo" v-if="L1 == 6"></div>
            </div>
          </div>
          <div class="linha">
            <div class="coluna">
              <div class="circulo" v-if="L1 > 2"></div>
            </div>
            <div class="coluna"></div>
            <div class="coluna">
              <div class="circulo" v-if="L1 > 3 || L1 == 2"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2 lado------------------------------------- -->
      <div class="contorno" @click="checarvalor(L2)">
        <div class="lado2">
          <div class="linha">
            <div class="coluna">
              <div class="circulo" v-if="L2 > 3 || L2 == 2"></div>
            </div>
            <div class="coluna"></div>
            <div class="coluna">
              <div class="circulo" v-if="L2 > 2"></div>
            </div>
          </div>
          <div class="linha">
            <div class="coluna">
              <div class="circulo" v-if="L2 == 6"></div>
            </div>
            <div class="coluna">
              <div class="circulo" v-if="L2 == 5 || L2 == 3 || L2 == 1"></div>
            </div>
            <div class="coluna">
              <div class="circulo" v-if="L2 == 6"></div>
            </div>
          </div>
          <div class="linha">
            <div class="coluna">
              <div class="circulo" v-if="L2 > 2"></div>
            </div>
            <div class="coluna"></div>
            <div class="coluna">
              <div class="circulo" v-if="L2 > 3 || L2 == 2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, defineComponent, watch } from "vue";
import { usePecasStore } from "../stores/PecasStores";

export default defineComponent({
  name: "Lado",
  props: ["Peca"],
  emit: ["sair", "pecaSelecionada"],

  setup(props, { emit }) {
    const Algoritmo = usePecasStore();
    const L1 = ref('');
    const L2 = ref('');

    onMounted(() => {
      console.log(L1.value, L2.value, props.Peca);
    });
    watch(
      () => props.Peca,
      (first, second) => {
        L1.value = Algoritmo.ConsultaValor(first).L1;
        L2.value = Algoritmo.ConsultaValor(first).L2;
      }
    );

    function checarvalor(valor) {
      console.log(valor, "dentro de lado");
      Algoritmo.Escolhido = valor;
      Algoritmo.JaEscolhido = true;
      Algoritmo.jogarPeca(props.Peca);
      emit("sair");
      emit("pecaSelecionada", props.Peca);
    }
    return {
      Algoritmo,
      L1,
      L2,
      checarvalor,
    };
  },
});
</script>

<style scoped>
.Formulario {
  background-color: #4b575bf8;
  min-width: 20%;
  min-height: 20%;
  margin: 0 auto;
  display: inline-flex;
  position: relative;
  border-radius: 20px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
.Opcao {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}
.comandos {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.titulo {
  width: 100%;
  height: max-content;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1rem;
  color: white;
}
.contorno:active {
  background-color: #31312f;
}
.contorno {
  cursor: pointer;
  background-color: #f6f6f6;
  min-width: 30px;
  min-height: 30px;
  max-width: max-content;
  max-height: max-content;
  display: flex;
  flex-wrap: wrap;
  border: 5px black solid;
  border-radius: 10px;
  margin: 10px;
}
.lado1 {
  background-color: transparent;
  flex-wrap: wrap;
  display: inline-flex;
  width: 50px;
  height: 50px;
  padding: 5%;
}

.lado2 {
  background-color: transparent;
  flex-wrap: wrap;
  display: inline-flex;
  width: 50px;
  height: 50px;
  padding: 5%;
}

.linha {
  width: 100%;
  display: inline-flex;
}
.centro {
  width: 100%;
  height: max-content;
  display: flex;
  justify-content: center;
  align-items: center;
}

.coluna {
  width: 33.3333%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
}

.circulo {
  border-radius: 50%;
  width: 70%;
  height: 70%;
  background-color: #64b1ce;
}
</style>
