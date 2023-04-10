

<template>
  <main>
    <div>
      <h6>Peças para comprar {{ JogosPecas }}</h6>
      <h3>Peças jogador 1 {{ MaoJogador1 }}</h3>
      <h3>Peças jogador 2 {{ MaoJogador2 }}</h3>
      <h3>Peças jogador 3 {{ MaoJogador3 }}</h3>
      <h3>Peças IA {{ MaoIA }}</h3>
      <h3>Peças IA {{ MaoIA }}</h3>


      <br>
      <h2>Pecas Jogadas{{ PecasJogadas }}</h2>

      <div>
        numeros
        <input type="text" name="valor" id="valor" v-model="resuls">
        <br>
        mao
        <input type="text" name="valor" id="valor" v-model="maoteste">
        <br>
        Pecas Jogadas
        <input type="text" name="valor" id="valor" v-model="pecasjogadasteste">
        
        <input type="button" value="jogar" @click="jogar()">
        
        <h3>Vez de {{ vez }}</h3>
        <h3>resposta é {{ resposta }}</h3>
      </div>


    </div>
  </main>
</template>

<script>
import { onMounted, ref, defineComponent } from 'vue';
import { usePecasStore } from "../stores/PecasStores"
import { useFuzzy } from "../stores/Fuzzy"

export default defineComponent({
  setup() {
    //pinia
    const pecas = usePecasStore();
    const Fuzzy = useFuzzy();


    //Pecas na mão
    const MaoJogador1 = ref({});
    const MaoJogador2 = ref({});
    const MaoJogador3 = ref({});
    const PecasJogadas = ref({});
    const MaoIA = ref({});
    const resposta = ref();
    const vez = ref();
    const resuls = ref("");
    const JogosPecas = ref([]);
    const maoteste = ref("");
    const pecasjogadasteste = ref("");

    const jogadasPosiveis = ref([6, 1]);
    onMounted(() => {


      //pecas.NovoJogo(1);

      // JogosPecas.value = (pecas.getPecasCompra);
      // MaoJogador1.value = (pecas.getPecasMaoJogador1);
      // MaoJogador2.value = (pecas.getPecasMaoJogador2);
      // MaoJogador3.value = (pecas.getPecasMaoJogador3);
      // MaoIA.value = (pecas.getPecasMaoIA);


      // iniciarJogo()
      // vez.value = pecas.VezJogador


      // console.log(pecas.ConsultaValor("I27"))


      //-----------------------------------------------------------------------


    })

    function iniciarJogo() {
      if (pecas.escolhaInicio( )== 0){
        pecas.escolhaIA(resuls.value, maoteste.value);
      }
    }

    function jogar() {
      console.log("A",maoteste.value,resuls.value)

      
    
      const mao = maoteste.value.split(";");
      const num = resuls.value.split(";");
      const pj = pecasjogadasteste.value.split(";");


      console.log("B",mao,num,pj)
     resposta.value =  pecas.escolhaIA(num, mao,pj);
      // console.log("fuzzy", Fuzzy.regras(1, 1 ,1))
     // pecas.jogarPeca(resuls.value);
      // pecas.jogarPeca(resuls.value)

    }


    //----------------------------------------------------------------------------------
    //saber qual peca pode jogar 
    //numeros = jogas posiveis a ser feita dentro de um array ex:[2,6]
    //mão = pecas dentro contabilizads na mao dentro de um array ex:["I3","I6","I20"]
    // function posives(numeros, mao) {
    //   const posibilidade = [];

    //   numeros.value.forEach(element => {
    //     mao.forEach(elementMao => {
    //       let peca = pecas.getPecas[elementMao]
    //       if (element == peca.L1 || element == peca.L2) {
    //         posibilidade.push(elementMao)
    //       }
    //     })
    //   });
    //   return posibilidade

    // }
    //----------------------------------------------------------------------------------


    return {

      JogosPecas,
      MaoIA,
      MaoJogador1,
      MaoJogador2,
      MaoJogador3,
      jogadasPosiveis,
      resuls,
      jogar,
      iniciarJogo,
      vez,
      PecasJogadas,
      maoteste,
      pecasjogadasteste,
      resposta

    }
  }

});


</script>