<template>
    <div class="contorno rotacao">
        <div class="lado1">

            <div class="linha" v-show="!Virada">
                <div class="coluna">
                    <div class="circulo" v-if="L1 > 3 || L1 == 2"></div>
                </div>
                <div class="coluna">
                </div>
                <div class="coluna">
                    <div class="circulo" v-if="L1 > 2"></div>
                </div>
            </div>
            <div class="linha" v-show="!Virada">
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
            <div class="linha" v-show="!Virada">
                <div class="coluna">
                    <div class="circulo" v-if="L1 > 2"></div>
                </div>
                <div class="coluna">
                </div>
                <div class="coluna">
                    <div class="circulo" v-if="L1 > 3 || L1 == 2"></div>
                </div>
            </div>

        </div>
        <div class="centro">
            <div class="linha-centro" v-show="!Virada"></div>
        </div>
        <div class="lado2">
            <div class="linha" v-show="!Virada">
                <div class="coluna">
                    <div class="circulo" v-if="L2 > 3 || L2 == 2"></div>
                </div>
                <div class="coluna">
                </div>
                <div class="coluna">
                    <div class="circulo" v-if="L2 > 2"></div>
                </div>
            </div>
            <div class="linha" v-show="!Virada">
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
            <div class="linha" v-show="!Virada">
                <div class="coluna">
                    <div class="circulo" v-if="L2 > 2"></div>
                </div>
                <div class="coluna">
                </div>
                <div class="coluna">
                    <div class="circulo" v-if="L2 > 3 || L2 == 2"></div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { onMounted, ref, defineComponent } from 'vue';
import { usePecasStore } from "../stores/PecasStores"

export default defineComponent({
    name: 'Peca',
    props: { Tamanho: String, Valor: String, Virada: Boolean, Rotacionar: String },


    setup(props) {

        const Algoritmo = usePecasStore();
        const L1 = ref(0);
        const L2 = ref(0);

        const Rotacao = ref('rotate(0deg)');

        const marginleft = ref('0px');
        const marginright = ref('0px');

        onMounted(() => {

            const valores = Algoritmo.ConsultaValor(props.Valor);

            L1.value = valores.L1;
            L2.value = valores.L2;

            switch (props.Rotacionar) {
                case 'rotate(0deg)':
                    Rotacao.value = 'rotate(0deg)';
                    marginright.value = '-2px'
                    marginleft.value = '-2px'
                    break;
                case 'rotate(90deg)':
                    Rotacao.value = 'rotate(90deg)';
                    marginright.value = '12px'
                    marginleft.value = '12px'

                    break;
                case 'rotate(-90deg)':
                    Rotacao.value = 'rotate(-90deg)';
                    marginright.value = '12px'
                    marginleft.value = '12px'
                    break;
                default:
                    Rotacao.value = 'rotate(0deg)';
                    marginright.value = '0px'
                    marginleft.value = '0px'
                    break;
            }


        })


        return {

            Algoritmo,
            L1,
            L2,
            Rotacao,
            marginright,
            marginleft

        }
    }

});


</script>

<style scoped>
.rotacao {
    transform: v-bind(Rotacao);
    margin-left:v-bind(marginright);
    margin-right: v-bind(marginleft);
}

.contorno {
    background-color: #F6F6F6;
    min-width: 30px;
    min-height: 30px;
    max-width: max-content;
    max-height: max-content;
    display: inline-flex;
    flex-wrap: wrap;
    border: 5px black solid;
    border-radius: 10px;
}

.lado1 {
    background-color: transparent;
    flex-wrap: wrap;
    display: inline-flex;
    width: v-bind(Tamanho);
    height: v-bind(Tamanho);
}

.lado2 {
    background-color: transparent;
    flex-wrap: wrap;
    display: inline-flex;
    width: 100%;
    height: v-bind(Tamanho);
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

.linha-centro {
    background-color: black;
    width: 90%;
    height: 2px;


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
    background-color: #64B1CE;
}
</style>