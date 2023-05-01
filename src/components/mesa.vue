<template>
    
    <div class="mesa">

        <div class="contorno2 linha5" style="transform: rotate(180deg);">
        <div v-for="item in pecasjogadas5" :key="item" style="margin-right: 5px;">
            <div class="rodar ">
                <Peca Tamanho="30px" :Valor="item.value" :Virada="false" :Rotacionar="item.valuePosicao"></Peca>
            </div>
        </div>
    </div>
        <div class="contorno linha3" style="transform: rotate(90deg);">
        <div v-for="item in pecasjogadas3" :key="item" style="margin-right: 5px;">
            <div class="rodar ">
                <Peca Tamanho="30px" :Valor="item.value" :Virada="false" :Rotacionar="item.valuePosicao"></Peca>
            </div>
        </div>
    </div>
    <div class="contorno linha1">
        <div v-for="item in pecasjogadas1" :key="item" style="margin-right: 5px;">
            <div class="rodar ">
                <Peca Tamanho="30px" :Valor="item.value" :Virada="false" :Rotacionar="item.valuePosicao"></Peca>
            </div>
        </div>
        
    </div>

    <div class="contorno linha2" style="transform: rotate(90deg);">
        <div v-for="item in pecasjogadas2" :key="item" style="margin-right: 5px;">
            <div class="rodar ">
                <Peca Tamanho="30px" :Valor="item.value" :Virada="false" :Rotacionar="item.valuePosicao"></Peca>
            </div>
        </div>
    </div>

    
    <div class="contorno2 linha4" style="transform: rotate(180deg);">
        <div v-for="item in pecasjogadas4" :key="item" style="margin-right: 5px;">
            <div class="rodar ">
                <Peca Tamanho="30px" :Valor="item.value" :Virada="false" :Rotacionar="item.valuePosicao"></Peca>
            </div>
        </div>
    </div>

    
</div>
</template>
  
<script>
import { onMounted, ref, defineComponent, watch } from 'vue';
import { usePecasStore } from "../stores/PecasStores"
import Peca from '../components/Peca.vue';

export default defineComponent({
    name: 'Mesa',
    components: { Peca },
    props: { Valor: String, },


    setup(props) {

        const Algoritmo = usePecasStore();
        const comeco = ref(-1);
        const fim = ref(-1);
        const pecasjogadas1 = ref([]);
        const pecasjogadas2 = ref([]);
        const pecasjogadas3 = ref([]);
        const pecasjogadas4 = ref([]);
        const pecasjogadas5 = ref([]);

        const sentido = ref('');
        onMounted(() => {


        })
        watch(() => props.Valor, (first, second) => {
            organizarpeca(first);
        });

        function organizarpeca(valor) {
            if (valor === 'Reset') {
                comeco.value  = -1;
                fim.value  = -1;
                sentido.value  = '';
                pecasjogadas1.value = [];
                pecasjogadas2.value = [];
                pecasjogadas3.value = [];
                pecasjogadas4.value = [];
                pecasjogadas5.value = [];

                return
            }

            const pecacolocando = new Audio('src/assets/musicas/pecaDomino.m4a');
            if (valor == '' || valor == null) {
                return
            }
            const valores = Algoritmo.ConsultaValor(valor);
            const obj = {};
            if (comeco.value == -1 || fim.value == -1) {
                comeco.value = valores.L1;
                fim.value = valores.L2;
                if (valor == 'I28' || valor == 'I21' || valor == 'I15' || valor == 'I10' || valor == 'I6' || valor == 'I3' || valor == 'I1') {
                    obj.value = valor;
                    obj.valuePosicao = 'rotate(0deg)';

                } else {
                    obj.value = valor;
                    obj.valuePosicao = 'rotate(-90deg)';

                }
                pecasjogadas1.value.push(obj);
            }
            else if (valores.L1 == comeco.value || valores.L2 == comeco.value) {
                if (valores.L1 == comeco.value && valores.L2 == comeco.value) {
                    comeco.value = valores.L1;
                    obj.value = valor;
                    obj.valuePosicao = 'rotate(0deg)';


                }
                else if (valores.L1 == comeco.value) {
                    comeco.value = valores.L2;
                    obj.value = valor;
                    obj.valuePosicao = 'rotate(90deg)';

                } else {
                    comeco.value = valores.L1;
                    obj.value = valor;
                    obj.valuePosicao = 'rotate(-90deg)';


                }
                if (pecasjogadas1.value.length < 12) {
                    pecasjogadas1.value.unshift(obj);

                }else if(pecasjogadas3.value.length < 2){
                    pecasjogadas3.value.unshift(obj);

                }else{
                    pecasjogadas5.value.unshift(obj);
                }

            }
            else {
                if (valores.L1 == fim.value && valores.L2 == fim.value) {
                    fim.value = valores.L1;
                    obj.value = valor;
                    obj.valuePosicao = 'rotate(0deg)';
                }
                else if (valores.L1 == fim.value) {
                    fim.value = valores.L2;
                    obj.value = valor;
                    obj.valuePosicao = 'rotate(-90deg)';


                } else {
                    fim.value = valores.L1;
                    obj.value = valor;
                    obj.valuePosicao = 'rotate(90deg)';

                }
                if (pecasjogadas1.value.length < 12) {
                    pecasjogadas1.value.push(obj);

                }else if(pecasjogadas2.value.length < 2){
                    pecasjogadas2.value.push(obj);

                }else{
                    pecasjogadas4.value.push(obj);
                }

            }
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

        }
    }

});


</script>

<style scoped>
.mesa{
    display: flex;
    justify-content: center;
    align-items: center;

}
.linha1{
    
}
.linha4{
  right: 18%;

}
.linha5{
    top: -33%;
  left: 18%;

}
.linha2{
    right: 90px;
    top:  89px;
}
.linha3{
    right: -86px;
    top:  -89px;
}
.contorno {
    min-width: 30px;
    min-height: 30px;
    max-width: max-content;
    max-height: max-content;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    border-radius: 10px;
}
.contorno2 {
    min-width: 30px;
    min-height: 30px;
    position: absolute;
    max-width: max-content;
    max-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    border-radius: 10px;
    bottom: 30px;
}

.rodar {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    transform-style: preserve-3d;
}
</style>