<template>
  <div class="Formulario">
    <div class="titulo">
      <h1 style="font-size: 5em; color: rgb(0, 0, 0)">Cheat</h1>
    </div>
    <div class="comandos">
        
      <div class="containerCheckbox">
        <label>Observar as peças do adversário</label>
        <input
          class="checkbox"
          type="checkbox"
          v-model="StoreCheat.getPecasAdversario"
          @click="cheat"
        />
      </div>
      
      <div class="containerNumber">
        <label>Modificar pontos do adversário: </label>
        <input class="Number" type="number" v-model="PontosDaIA" />
        <button class="btn" @click="modificarPontos('IA')">Modificar</button>
      </div>
      <div class="containerNumber">
        <label>Modificar pontos do jogador: </label>
        <input class="Number" type="number" v-model="PontosDoJogador" />
        <button class="btn" @click="modificarPontos('jog1')">Modificar</button>
      </div>
      
    </div>

    <div class="sair">
      <button class="botaoSair" @click="$emit('saircheat')">Sair</button>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, defineComponent } from "vue";
import { usePecasStore } from "../stores/PecasStores";
import { useCheatsStore } from "../stores/Cheats";

export default defineComponent({
  name: "Cheat",
  emits: ["saircheat"],

  setup(props) {
    const Algoritmo = usePecasStore();
    const StoreCheat = useCheatsStore();
    const PontosDaIA = ref(Algoritmo.PontosIA);
    const PontosDoJogador = ref(Algoritmo.PontosJog1);

    onMounted(() => {});

    function modificarPontos(jogador) {
      if (jogador == "IA") {
        Algoritmo.PontosIA = PontosDaIA.value;
      } else if (jogador == "jog1") {
        Algoritmo.PontosJog1 = PontosDoJogador.value;
      }
    }

    function cheat() {
      StoreCheat.setPecasAdversario(!StoreCheat.getPecasAdversario);
    }

    return {
      Algoritmo,
      cheat,
      StoreCheat,
      PontosDaIA,
      modificarPontos,
      PontosDoJogador,
    };
  },
});
</script>

<style scoped>
.Formulario {
  background-color: #ffffffea;
  min-width: 50%;
  min-height: 70%;
  margin: 0 auto;
  color: rgb(15, 3, 3);
  display: inline-flex;
  position: relative;
  border: 5px black solid;
  border-radius: 50px;
  flex-wrap: wrap;
}
.comandos{
    width: 100%;
    display: flex;
    flex-direction: column;
}
.btn {
  width: max-content;
  height: max-content;
  background-color: rgb(12, 36, 139);
  color: aliceblue;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.Number {
  width: 50px;
}
.containerNumber {
  width: 100%;
  height: max-content;
  padding-left: 20%;
  padding-right: 20%;
  font-size: 1.4rem;
  display: flex;
  justify-content: start;
  align-items: center;
}
.btns {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.containerCheckbox {
  width: 100%;
  height: max-content;
  padding-left: 20%;
  padding-right: 20%;
  font-size: 1.4rem;
  display: flex;
  justify-content: start;
  align-items: center;
}
.checkbox {
  width: 25px;
  height: 25px;
}

.msg {
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  word-break: break-all;
}
.cheat {
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mens {
  color: v-bind(Cor);
}

.titulo {
  width: 100%;
  height: max-content;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.sair {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: end;
  text-align: center;
  position: relative;
  padding-bottom: 5px;
}
.botaoSair {
  width: max-content;
  height: max-content;
  font-family: "Handjet", sans-serif;
  font-size: 3rem;
  border-radius: 10%;
  text-align: center;
  border: 3px solid rgb(159, 2, 2);
}
</style>
