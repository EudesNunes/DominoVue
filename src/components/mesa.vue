<template>
  <div class="mesa">
    <div class="caixa">
      <div class="verticalE" id="LinhaEsquerda" ref="DivLinhaEsquerda">
        <div class="contornoVeritical LinhaEsquerda">
          <div
            v-for="item in pecasjogadas2"
            :key="item"
            style="margin-right: 5px"
          >
            <div class="rodar">
              <Peca
                Tamanho="30px"
                :Valor="item.value"
                :Virada="false"
                :Rotacionar="item.valuePosicao == 'rotate(0deg)' ? 'rotate(90deg)' : item.valuePosicao"
                style="display: flex"
                :style="{
                  top:  '15px',
                }"
              ></Peca>
            </div>
          </div>
        </div>
      </div>
      <!-- --------------------------------------Linhas Horizontal-------------------------------------------  -->
      <div class="horizontal">
        <div
          class="contornoHorizontal LinhaEmbaixo"
          ref="DivLinhaBaixo"
          :style="{
            display:'flex',
            left: `calc(100% - ${larguraDivBaixo}px - ${vezbaixo}px)`
          }"
        >
          <div
            v-for="item in pecasjogadas5"
            :key="item"
            style="margin-right: 5px"
          >
            <div class="rodar">
              <Peca
                Tamanho="30px"
                :Valor="item.value"
                :Virada="false"
                :Rotacionar="item.valuePosicao == 'rotate(0deg)' ? 'rotate(90deg)' : item.valuePosicao"
                :style="{
                  top: '10px' ,
                }"
              ></Peca>
            </div>
          </div>
        </div>

        <div class="contornoHorizontal LinhaPrincipal">
          <div
            v-for="item in pecasjogadas1"
            :key="item"
            style="margin-right: 5px"
          >
            <div class="rodar">
              <Peca
                Tamanho="30px"
                :Valor="item.value"
                :Virada="false"
                :Rotacionar="item.valuePosicao"
              ></Peca>
            </div>
          </div>
        </div>

        <div class="contornoHorizontal LinhaTopo">
          <div
            v-for="item in pecasjogadas4"
            :key="item"
            style="margin-right: 5px"
          >
            <div class="rodar">
              <Peca
                Tamanho="30px"
                :Valor="item.value"
                :Virada="false"
                :Rotacionar="item.valuePosicao"
                :style="{
                  bottom: '12px',
                }"
              ></Peca>
            </div>
          </div>
        </div>
      </div>
      <!-- --------------------------------------Linhas Vertical-------------------------------------------  -->

      <div class="verticalD" id="LinhaDireita" ref="DivLinhaDireita">
        <div class="contornoVertical LinhaDireita">
          <div
            v-for="item in pecasjogadas3"
            :key="item"
            style="margin-right: 5px"
          >
            <div class="rodar">
              <Peca
                Tamanho="30px"
                :Valor="item.value"
                :Virada="false"
                :Rotacionar="item.valuePosicao == 'rotate(0deg)' ? 'rotate(90deg)' : item.valuePosicao"
                style="display: flex"
                :style="{
                  bottom: '15px',
                }"
              ></Peca>
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
import Peca from "../components/Peca.vue";

export default defineComponent({
  name: "Mesa",
  components: { Peca },
  props: { Valor: String },

  setup(props) {
    const Algoritmo = usePecasStore();
    const comeco = ref(-1);
    const fim = ref(-1);
    const pecasjogadas1 = ref([]);
    const pecasjogadas2 = ref([]);
    const pecasjogadas3 = ref([]);
    const pecasjogadas4 = ref([]);
    const pecasjogadas5 = ref([]);

    const DivLinhaEsquerda = ref(null);
    const DivLinhaDireita = ref(null);
    const DivLinhaBaixo = ref(null);

    const larguraDivEsquerda = ref(0);
    const alturaDivEsquerda = ref(0);

    const larguraDivDireita = ref(0);
    const alturaDivDireita = ref(0);

    const larguraDivBaixo = ref(0);
    const alturaDivBaixo = ref(0);

    const vezbaixo = ref(0);

    const sentido = ref("");
    onMounted(() => {});
    watch(
      () => props.Valor,
      (first, second) => {
        organizarpeca(first);
      }
    );

    function organizarpeca(valor) {
      if (valor === "Reset") {
        comeco.value = -1;
        fim.value = -1;
        sentido.value = "";
        pecasjogadas1.value = [];
        pecasjogadas2.value = [];
        pecasjogadas3.value = [];
        pecasjogadas4.value = [];
        pecasjogadas5.value = [];

        return;
      }
      console.log(Algoritmo.JaEscolhido, Algoritmo.Escolhido, comeco.value );
      const pecacolocando = new Audio("/src/assets/musicas/pecaDomino.m4a");
      if (valor == "" || valor == null) {
        return;
      }
      const valores = Algoritmo.ConsultaValor(valor);
      const obj = {};
      if (comeco.value == -1 || fim.value == -1) {
        comeco.value = valores.L1;
        fim.value = valores.L2;
        if (
          valor == "I28" ||
          valor == "I21" ||
          valor == "I15" ||
          valor == "I10" ||
          valor == "I6" ||
          valor == "I3" ||
          valor == "I1"
        ) {
          obj.value = valor;
          obj.valuePosicao = "rotate(0deg)";
        } else {
          obj.value = valor;
          obj.valuePosicao = "rotate(-90deg)";
        }
        pecasjogadas1.value.push(obj);
      } else if ((Algoritmo.JaEscolhido && Algoritmo.Escolhido == comeco.value) || (!Algoritmo.JaEscolhido && (valores.L1 == comeco.value || valores.L2 == comeco.value))) {
        if (valores.L1 == comeco.value && valores.L2 == comeco.value) {
          comeco.value = valores.L1;
          obj.value = valor;
          obj.valuePosicao = "rotate(0deg)";
        } else if (valores.L1 == comeco.value) {
          comeco.value = valores.L2;
          obj.value = valor;
          obj.valuePosicao = "rotate(90deg)";
        } else {
          comeco.value = valores.L1;
          obj.value = valor;
          obj.valuePosicao = "rotate(-90deg)";
        }
        if (pecasjogadas1.value.length < 12) {
          vezbaixo.value = 0;
          pecasjogadas1.value.unshift(obj);
        } else if (pecasjogadas3.value.length < 2) {
          vezbaixo.value = 0;
          pecasjogadas3.value.unshift(obj);
        } else {
          vezbaixo.value = 72;
          pecasjogadas5.value.unshift(obj);
        }
      } else {
        if (valores.L1 == fim.value && valores.L2 == fim.value) {
          fim.value = valores.L1;
          obj.value = valor;
          obj.valuePosicao = "rotate(0deg)";
        } else if (valores.L1 == fim.value) {
          fim.value = valores.L2;
          obj.value = valor;
          obj.valuePosicao = "rotate(-90deg)";
        } else {
          fim.value = valores.L1;
          obj.value = valor;
          obj.valuePosicao = "rotate(90deg)";
        }
        if (pecasjogadas1.value.length < 12) {
          vezbaixo.value = 0;
          pecasjogadas1.value.push(obj);
        } else if (pecasjogadas2.value.length < 2) {
          vezbaixo.value = 0;
          pecasjogadas2.value.push(obj);
        } else {
          vezbaixo.value = 0;
          pecasjogadas4.value.push(obj);
        }
      }
      Algoritmo.JaEscolhido = false;

      larguraDivEsquerda.value = DivLinhaEsquerda.value.offsetWidth;
      alturaDivEsquerda.value = DivLinhaEsquerda.value.offsetHeight;

      larguraDivDireita.value = DivLinhaDireita.value.offsetWidth;
      alturaDivDireita.value = DivLinhaDireita.value.offsetHeight;

      larguraDivBaixo.value = DivLinhaBaixo.value.offsetWidth;
      alturaDivBaixo.value = DivLinhaBaixo.value.offsetHeight;
      pecacolocando.play();
    }

    return {
      Algoritmo,
      comeco,
      fim,
      pecasjogadas1,
      pecasjogadas2,
      pecasjogadas3,
      pecasjogadas4,
      pecasjogadas5,
      organizarpeca,
      sentido,
      alturaDivDireita,
      larguraDivDireita,
      alturaDivEsquerda,
      larguraDivEsquerda,
      DivLinhaEsquerda,
      DivLinhaDireita,
      alturaDivBaixo,
      larguraDivBaixo,
      DivLinhaBaixo,
      vezbaixo
    };
  },
});
</script>

<style scoped>
.caixa {
  width: max-content;
  height: max-content;
  justify-content: center;
  align-items: center;
  display: flex;
  padding: 1%;
}
.horizontal {
  display: block;
  justify-content: center;
  align-items: center;
}
.verticalE {
  display: flex;
  padding: 0;
  margin: 0;
  transform: rotate(-90deg) translateX(calc(85% + 50px));
  transform-origin: bottom right;
}
.verticalD {
  display: flex;
  padding: 0;
  margin: 0;
  transform: rotate(-90deg) translateX(calc(-85% - 40px));
  transform-origin: top left;
}
.contornoVeritical {
  display: flex;
}
.contornoHorizontal {
  width: max-content;
  height: max-content;
  display: flex;
}

.mesa {
  display: flex;
  justify-content: center;
  align-items: center;
}

.rodar {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  transform-style: preserve-3d;
}

/* Linhas  */

.LinhaEsquerda {
  display: flex;
  margin-left: 0;
}
.LinhaDireita {
  display: flex;
  margin-left: 0;
}
.LinhaTopo {

  display: flex;
  position: absolute;
  bottom: calc(100% + 25px);
}
.LinhaPrincipal {
  transform: rotate(180deg);
}

.LinhaEmbaixo {
  position: absolute;
  top: calc(100% + 25px);
}
</style>
