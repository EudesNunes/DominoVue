<template>
    <div class="contorno">
        <div class="titulo">
            <h1 style="font-size: 6em;color: white;font-family: Handjet, sans-serif;"> {{ Titulo }} </h1>
        </div>
        <div class="msg">
            <p style="font-size: 4em; font-family: Handjet, sans-serif; " class="mens"> {{ Mensagem }}
            </p>
        </div>
        <div class="msg">
            <p style="font-size: 4em;color: white; font-family: Handjet, sans-serif;">Selecione uma opção:</p>
        </div>
        <div class="btns">
            <div class="continuar" v-show="Tipo == 'menu'">
                <button class="botao" style="background-color: #1A9AAB; color: white;border: white 2px solid;" @click="$emit('continuarJogo')">Continuar</button>
            </div>
            <div class="rodada" v-show="Tipo == 'rodada'">
                <button class="botao" style="background-color: #1A9AAB; color: white;border: white 2px solid;" @click="$emit('proximaRodada')">Próxima Rodada</button>
            </div>
            <div class="novo" v-show="Tipo == 'menu' || Tipo == 'fim'">
                <button class="botao" style="background-color: #0A7F55; color: white;border: white 2px solid;" @click="novojogo()">Novo Jogo</button>
            </div>
            <div class="sair" v-show="Tipo == 'menu' || Tipo == 'fim' || Tipo == 'rodada'"><button class="botao"
                    style="background-color: #E6DF37; color: white; border: white 2px solid;" @click="sair()">Menu inicial</button></div>



        </div>

    </div>
</template>
  
<script>
import { onMounted, ref, defineComponent } from 'vue';
import { usePecasStore } from "../stores/PecasStores"

export default defineComponent({
    name: 'Menu',
    props: { Titulo: String, Tipo: String, Cor: String, Mensagem: String },
    emits: ['continuarJogo','proximaRodada'],


    setup(props) {

        const Algoritmo = usePecasStore();

        onMounted(() => {


        })

        function sair(){
            window.location.href = "/";
        }
        function novojogo(){
            window.location.href = "/jogo";
        }

        return {

            Algoritmo,
            sair,
            novojogo

        }
    }

});


</script>

<style scoped>
.contorno {
    background-color: #4b575be3;
    min-width: 50%;
    min-height: 70%;
    margin: 0 auto;
    color: white;
    display: inline-flex;
    position: relative;
    border: 5px black solid;
    border-radius: 50px;
    flex-wrap: wrap;

}

.btns {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}


.msg {
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
    word-break: break-all;

}

.mens {
    color: v-bind(Cor);
}

.titulo {
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
}

.botao {
    width: 300px;
    height: 70px;
    font-family: 'Handjet', sans-serif;
    font-size: 3rem;
    border-radius: 30px;
    text-align: center;
    border: 2px solid rgb(92, 92, 92);
    color: black;
    font-weight: 500;
    padding-left: 10px;
    padding-right: 10px;
    margin-left: 10%;
}

.sair {
    margin-left: 5%;
    margin-right: 5%;

}

.novo {
    margin-left: 5%;
    margin-right: 5%;
}

.continuar {
    margin-left: 5%;
    margin-right: 5%;
}

.rodada {
    margin-left: 5%;
    margin-right: 5%;
}
</style>