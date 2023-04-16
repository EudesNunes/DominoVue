<template>
    <div class="contorno">
        <div v-for="item in pecasjogadas" :key="item" style="margin-right: 5px;">
            <div class="rodar"
                v-bind:style="{ transform: item.valuePosicao, 'margin-right': item.marginLeft, 'margin-left': item.marginRight }">
                <Peca Tamanho="40px" :Valor="item.value" :Virada="false"></Peca>
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
        const pecasjogadas = ref([]);
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
                pecasjogadas.value  = [];
                sentido.value  = '';
                return
            }

            const pecacolocando = new Audio('src/assets/musicas/pecaDomino.m4a');
            if (valor == '' || valor == null) {
                return
            }
            const valores = Algoritmo.ConsultaValor(valor);
            const obj = {};
            console.log("comeco", comeco.value, "fim", fim.value, "val", valores)
            if (comeco.value == -1 || fim.value == -1) {
                comeco.value = valores.L1;
                fim.value = valores.L2;
                if (valor == 'I28' || valor == 'I21' || valor == 'I15' || valor == 'I10' || valor == '6' || valor == 'I3' || valor == 'I1') {
                    obj.value = valor;
                    obj.valuePosicao = 'rotate(0deg)';
                    obj.marginRight = '5px'
                    obj.marginLeft = '5px'

                } else {
                    obj.value = valor;
                    obj.valuePosicao = 'rotate(-90deg)';
                    obj.marginRight = '5px'
                    obj.marginLeft = '28px'

                }
                pecasjogadas.value.push(obj);
            }
            else if (valores.L1 == comeco.value || valores.L2 == comeco.value) {
                if (valores.L1 == comeco.value && valores.L2 == comeco.value) {
                    comeco.value = valores.L1;
                    obj.value = valor;
                    obj.valuePosicao = 'rotate(0deg)';
                    obj.marginRight = '0px'
                    obj.marginLeft = '0px'
                }
                else if (valores.L1 == comeco.value) {
                    comeco.value = valores.L2;
                    obj.value = valor;
                    obj.valuePosicao = 'rotate(90deg)';
                    obj.marginRight = '28px'
                    obj.marginLeft = '5px'
                } else {
                    comeco.value = valores.L1;
                    obj.value = valor;
                    obj.valuePosicao = 'rotate(-90deg)';
                    obj.marginRight = '5px'
                    obj.marginLeft = '28px'
                }
                console.log("comeco")

                pecasjogadas.value.unshift(obj);

            }
            else {
                if (valores.L1 == fim.value && valores.L2 == fim.value) {
                    fim.value = valores.L1;
                    obj.value = valor;
                    obj.valuePosicao = 'rotate(0deg)';
                    obj.marginRight = '0px'
                    obj.marginLeft = '0px'

                }
                else if (valores.L1 == fim.value) {
                    fim.value = valores.L2;
                    obj.value = valor;
                    obj.valuePosicao = 'rotate(-90deg)';
                    obj.marginRight = '5px'
                    obj.marginLeft = '25px'

                } else {
                    fim.value = valores.L1;
                    obj.value = valor;
                    obj.valuePosicao = 'rotate(90deg)';
                    obj.marginRight = '25px'
                    obj.marginLeft = '5px'
                }
                console.log("fim")

                pecasjogadas.value.push(obj);
            }
            pecacolocando.play();

            console.log(pecasjogadas.value)
        }

        return {

            Algoritmo,
            comeco,
            fim,
            pecasjogadas,
            organizarpeca,
            sentido,

        }
    }

});


</script>

<style scoped>
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

.rodar {
    display: inline-flex;
    margin: 0 auto;
    padding: auto;
    position: relative;
    transform-style: preserve-3d;
}
</style>