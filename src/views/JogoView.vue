<template>
    <div class="body">
        <div class="principal">
            <div class="COMPRA" v-show="precisacomprar && Algoritmo.getPecasCompra.length != 0">
                <div v-for="item in Algoritmo.getPecasCompra" :key="item" style="margin-right: 5px;"
                    @click="ComprarPeca(item)">
                    <Peca Tamanho="60px" :Valor="item" :Virada="true"></Peca>
                </div>
            </div>
            <div class="Menu" v-show="menu == true">
                <Menu Titulo="Menu" :Mensagem="MenMenu" :Cor="CorMenu" Tipo="menu" @continuar-jogo="cont"></Menu>
            </div>
            <div class="Menu" v-show="fimrodada == true">
                <Menu Titulo="Fim da Rodada" :Mensagem="MenMenu" :Cor="CorMenu" Tipo="rodada"
                    @proxima-rodada="proximaRodada"></Menu>
            </div>
            <div class="Menu" v-show="fimpartida == true">
                <Menu Titulo="Fim da Partida" :Mensagem="MenMenu" :Cor="CorMenu" Tipo="fim"></Menu>
            </div>



            <!--------------------- BTNs----------------------------------- -->


            <div class="divbotao">
                <button class="botaomenu" @click="ativarMenu()">Menu Inicial</button>
            </div>


            <!--------------------- Sobre o jogador e IA----------------------------------- -->

            <div class="SobreIA">
                <div class="perfil">
                    <div class="imgpersonagem"></div>
                    <h3>{{ Algoritmo.PontosIA }} Pontos</h3>
                </div>
                <div style="margin: 0 auto; padding-bottom: 30px;">
                    <h2>Robson</h2>
                </div>
            </div>

            <div class="SobreJogaodor">
                <div class="perfil">
                    <div class="imgJogador"></div>
                    <h3>{{ Algoritmo.PontosJog1 }} Pontos</h3>
                </div>
                <div style="margin: 0 auto; padding-bottom: 30px;">
                    <h2>Jogador</h2>
                </div>
            </div>

            <!--------------------- Rodada----------------------------------- -->
            <div class="NumeroRodadas">
                    <h1>Rodada {{ Algoritmo.NumeroRodadas }}</h1>
                </div>
            <!--------------------- Caixa do topo----------------------------------- -->
            <div class="topo">
                <div style=" width: 100%; height: 100%; justify-content: center; align-items: center; display: flex;">
                    <div class="caixa">
                        <div v-for="item in Algoritmo.getPecasMaoIA" :key="item" style="margin-right: 5px;">
                            <Peca Tamanho="35px" :Valor="item" :Virada="true"></Peca>
                        </div>
                    </div>
                </div>
            </div>

            <!--------------------- Mesa----------------------------------- -->
            <div class="mesa"
                style="color: black; justify-content: center; align-items: center; margin: 0 auto; display: flex; font-size: 30px;">
                <div class="montecompra">
                    <div class="centrocompra">
                        {{ Algoritmo.getPecasCompra.length }}
                    </div>
                </div>
                <mesa :Valor="PecaJogada"></mesa>

                <!-- <h1>{{ Algoritmo.numerospossiveis }}</h1> -->
            </div>

            <!--------------------- Caixa do jogaodr----------------------------------- -->
            <div class="embaixo">

                <div
                    style=" width: 100%; height: 100%; justify-content: center; align-items: center; display: inline-flex; ">

                    <div class="Divbtncomprar" v-show="btncomp">
                        <button class="btncomprar" @click="ativarcomprar()">Comprar</button>
                    </div>
                    <div class="caixa">
                        <div v-for="item in Algoritmo.getPecasMaoJogador1" :key="item" style="margin-right: 5px;"
                            @click="checarvalor(item)">
                            <div class="bloquearpeca"
                                v-show="Algoritmo.posives(Algoritmo.numerospossiveis, Algoritmo.getPecasMaoJogador1).indexOf(item) == -1 || Algoritmo.VezJogador != 1">
                            </div>
                            <Peca Tamanho="35px" :Valor="item" :Virada="false"></Peca>
                        </div>


                    </div>
                </div>
            </div>
            <!-------------------------------------------------------- -->

        </div>
    </div>
</template>
  
<script>
import { onMounted, ref, defineComponent, watch } from 'vue';
import Peca from '../components/Peca.vue';
import Menu from '../components/Menu.vue';
import { usePecasStore } from "../stores/PecasStores"
import mesa from '../components/mesa.vue';
export default defineComponent({
    name: 'Jogo',
    components: { Peca, Menu, mesa },
    setup(props) {


        const Algoritmo = usePecasStore();
        const possiveis = ref([]);
        const rodadas = ref(0);
        const precisacomprar = ref(false);
        const liberado = ref(false);
        const menu = ref(false);
        const btncomp = ref(false);
        const fimpartida = ref(false);
        const fimrodada = ref(false);
        const MenMenu = ref('');
        const CorMenu = ref('Black');
        const PecaJogada = ref('');



        onMounted(() => {

            comecar();



        })

        function cont() {
            menu.value = false;
        }
        function ativarMenu() {
            MenMenu.value = '';
            CorMenu.value = 'Black';
            menu.value = true;

        }

        function ativarcomprar() {
            if (precisacomprar.value == true) {
                precisacomprar.value = false;

            } else {
                precisacomprar.value = true;
            }

        }
        function proximaRodada() {

            Algoritmo.NovaRodada();
            fimrodada.value = false;
            menu.value = false;
            fimpartida.value = false;
            precisacomprar.value = false;
            PecaJogada.value = '';
            ;
            if (Algoritmo.VezJogador == 0) {
                IaJogar()
            } else if (Algoritmo.VezJogador == 1) {
                jogadorJogar()
            }


        }
        function comecar() {
            Algoritmo.NovoJogo(1);

            if (Algoritmo.VezJogador == 0) {
                IaJogar()
            } else if (Algoritmo.VezJogador == 1) {
                jogadorJogar()
            }


        }
        function reset() {
            possiveis.value = [];
            precisacomprar.value = false;
            liberado.value = false;
            menu.value = false;
            btncomp.value = false;
            PecaJogada.value = 'Reset';
        }

        function checarfim() {
            const gnRodada = Algoritmo.ChecarGanhadorRodada();
            fimrodada.value = false;
            menu.value = false;
            fimpartida.value = false;
            precisacomprar.value = false;
            const gnJogo = Algoritmo.checarGanhador();
            console.log("RODADA", gnRodada, "GNJOGO", gnJogo)
            switch (gnRodada) {
                case -2:
                    if (gnJogo == -2) {

                        fimpartida.value = true;
                        MenMenu.value = `Empate IA:${Algoritmo.PontosIA} pontos e Jogador:${Algoritmo.PontosJog1} pontos`;
                        CorMenu.value = "Yellow"
                        reset()
                        return -2

                    }
                    fimrodada.value = true;
                    MenMenu.value = `Empate na rodada. IA:${Algoritmo.PontosIA} pontos e Jogador:${Algoritmo.PontosJog1} pontos`;
                    CorMenu.value = "Yellow"
                    reset()
                    return -2

                case 0:
                    if (gnJogo == 0) {
                        fimpartida.value = true;
                        MenMenu.value = `Você perdeu!! IA:${Algoritmo.PontosIA} pontos e Jogador:${Algoritmo.PontosJog1} pontos`;
                        CorMenu.value = "Red"
                        reset()
                        return 0
                    }
                    fimrodada.value = true;
                    MenMenu.value = `Você perdeu a rodada. IA:${Algoritmo.PontosIA} pontos e Jogador:${Algoritmo.PontosJog1} pontos`;
                    CorMenu.value = "Red"
                    reset()
                    return 0

                case 1:
                    if (gnJogo == 1) {
                        fimpartida.value = true;
                        MenMenu.value = `Você ganhou!! IA:${Algoritmo.PontosIA} pontos e Jogador:${Algoritmo.PontosJog1} pontos`;
                        CorMenu.value = "green"
                        reset()
                        return 1
                    }
                    fimrodada.value = true;
                    MenMenu.value = `Você ganhou a rodada. IA:${Algoritmo.PontosIA} pontos e Jogador:${Algoritmo.PontosJog1} pontos`;
                    CorMenu.value = "green"
                    reset()
                    return 1
                default:
                    return -1
            }
        }
        function IaJogar() {
            setTimeout(function () {
                if (Algoritmo.VezJogador == 0) {
                    const valor = Algoritmo.escolhaIA(Algoritmo.numerospossiveis)
                    if (valor != -1) {
                        PecaJogada.value = valor
                        Algoritmo.jogarPeca(valor)
                    }
                }
                console.log(checarfim(), "CHECAR IA FIM")
                if (checarfim() == -1) {
                    jogadorJogar()
                }
                if(Algoritmo.getPecasCompra.length == 0 && Algoritmo.posives(Algoritmo.numerospossiveis, Algoritmo.PecasMaoIA).length ==0){
                    jogadorJogar()

                }

            }, 3000);



        }
        function jogadorJogar() {
            if (Algoritmo.VezJogador == 1) {
                const possiveis = Algoritmo.posives(Algoritmo.numerospossiveis, Algoritmo.PecasMaoJogador1)
                if (possiveis == 0 || possiveis == null) {
                    if (Algoritmo.PecasCompra.length == 0) {
                        if (checarfim() == -1) {
                            IaJogar()
                        }
                        if(Algoritmo.posives(Algoritmo.numerospossiveis, Algoritmo.PecasMaoJogador1).length ==0){
                            IaJogar()
                        }
                    } else {
                        btncomp.value = true;
                    }
                }
                else {
                    if (Algoritmo.PecasCompra.length == 0) {
                        if (checarfim() == -1) {
                            IaJogar()
                        }
                    } else {
                        liberado.value = true;
                        btncomp.value = false;
                    }

                }
            }





        }

        function checarvalor(data) {
            if (liberado.value == true) {
                const possiveis = Algoritmo.posives(Algoritmo.numerospossiveis, Algoritmo.PecasMaoJogador1)
                if (possiveis.indexOf(data) != -1) {
                    PecaJogada.value = data
                    Algoritmo.jogarPeca(data)
                }
                console.log(checarfim(), "CHECAR Jogador FIM")
                if (checarfim() == -1) {
                    IaJogar()
                }
            }

        }
        function ComprarPeca(data) {
            Algoritmo.adicionarPeca(data, 1)
            const peca = Algoritmo.ConsultaValor(data)
            if (Algoritmo.numerospossiveis.indexOf(peca.L1) != -1 || Algoritmo.numerospossiveis.indexOf(peca.L2) != -1) {
                precisacomprar.value = false;
                btncomp.value = false;
            }
            else {
                precisacomprar.value = true;
                btncomp.value = true;
            }
            if (Algoritmo.PecasCompra.length == 0) {
                precisacomprar.value = false;
                btncomp.value = false;
                IaJogar()
            }

        }

        return {
            Algoritmo,
            checarvalor,
            possiveis,
            ComprarPeca,
            precisacomprar,
            comecar,
            rodadas,
            liberado,
            jogadorJogar,
            IaJogar,
            menu,
            cont,
            ativarMenu,
            btncomp,
            ativarcomprar,
            fimpartida,
            fimrodada,
            MenMenu,
            CorMenu,
            proximaRodada,
            checarfim,
            PecaJogada,
            reset,
        }
    }

});


</script>

<style scoped>
.robo {
    width: 2vw;
    height: 4vh;
    background-color: white;
    border-radius: 50%;
    text-align: center;
    display: flex;
    justify-content: center;
}

.jogador {
    width: 8vw;
    height: 5vh;
    text-align: left;
    margin-left: 0.5vw;
    margin-top: -0.7vh;
}

.nav_1 {
    width: max-content;
    height: max-content;
    top: 0;
    left: 0;
    text-align: center;
    display: flex;
    position: absolute;
    z-index: 30;
}

.body {
    background-image: url("src/assets/img/fundo_palmeiras.jpeg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
}

.principal {
    background-color: #1e1e1ed3;
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
    text-align: center;
    display: flex;
    margin: 0;

}

.caixa {
    background-image: url('../assets/img/teste.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    /* background-color: #376272;
    border: 5px black solid; */
    min-width: 500px;
    max-width: max-content;
    padding-left: 30px;
    padding-right: 28px;
    height: max-content;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    display: flex;
    padding-top: 55px;
    padding-bottom: 55px;

}

.bloquearpeca {
    z-index: 30;
    width: 44px;
    height: 82px;
    background-color: #1e1e1e9c;
    display: flex;
    position: absolute;
    margin: 0 auto;
    border-radius: 9px;
}

.centrocompra {
    background-color: #376272;
    width: max-content;
    height: max-content;
    text-align: center;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    padding: 0;
    display: flex;
    font-family: 'Handjet', sans-serif;
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
    left: 11px;
    top: 6px;
    border-radius: 10px;
    padding-left: 5px;
    padding-right: 5px;

}

.montecompra {
    background-image: url('src/assets/img/compra.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 100px;
    height: 100px;
    position: absolute;
    right: 20px;
    top: 20px;
    justify-content: center;
    align-items: center;
    display: flex;
}

.mesa {
    background-image: url('src/assets/img/mesa.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 85%;
    height: 75%;
    margin: 0 auto;
    border-radius: 20px;
    
}


.topo {
    position: fixed;
    top: 0;
    padding-top: 10px;
    width: 100%;
    display: flex;
    height: 20%;
    z-index: 10;
}

.embaixo {
    position: fixed;
    bottom: 0;
    padding-bottom: 10px;
    display: flex;
    width: 100%;
    height: 20%;
    z-index: 10;

}


.COMPRA {
    position: absolute;
    border: 5px black solid;
    border-radius: 50px;
    background-color: #376272;
    width: 80%;
    height: 300px;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    z-index: 30;
    display: flex;

}

.Menu {
    position: absolute;
    background-color: #1e1e1eea;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    z-index: 50;
    display: flex;
}

.divbotao {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 2%;
    margin-bottom: 2%;
    z-index: 30;
}


.Divbtncomprar {
    position: absolute;
    bottom: 0;
    display: block;
    justify-content: center;
    align-items: center;
    margin-left: 0%;
    margin-bottom: 10%;
    z-index: 30;
}

.botaomenu {
    width: max-content;
    height: 6vh;
    background-color: #0A7F55;
    font-family: 'Handjet', sans-serif;
    color: white;
    font-size: 1.6rem;
    border-radius: 30px;
    border: white 1px solid;
}

.btncomprar {
    width: max-content;
    height: 6vh;
    background-color: #1A31AB;
    font-family: 'Handjet', sans-serif;
    color: white;
    font-size: 1.6rem;
    border-radius: 30px;
    border: white 1px solid;
    padding-left: 10px;
    padding-right: 10px;

}

.NumeroRodadas {
    width: max-content;
    height: max-content;
    position: absolute;
    font-weight: bold;
    font-family: 'Handjet', sans-serif;
    font-size: 0.8rem;
    color: white;
    right: 5%;
    top: 5%;
    justify-content: center;
    align-items: center;
    display: flex;
    position: absolute;

}

.SobreIA {
    position: absolute;
    top: 15px;
    left: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 2%;
    margin-bottom: 2%;
    z-index: 30;
    width: max-content;
    height: max-content;
    font-family: 'Handjet', sans-serif;
    font-size: 1rem;
    color: white;
}

.SobreJogaodor {
    position: absolute;
    bottom: -25px;
    right: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 2%;
    margin-bottom: 2%;
    z-index: 30;
    width: max-content;
    height: max-content;
    font-weight: bold;
    font-family: 'Handjet', sans-serif;
    font-size: 1rem;
    color: white;

    text-align: center;
}

.perfil {
    justify-content: center;
    align-items: center;
    display: block;
}

.imgpersonagem {
    background-color: #fff;
    background-image: url('src/assets/img/robson.svg');
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin: 0 auto;
    background-repeat: no-repeat;
    background-size: 60%;
    background-position: center;
    display: flex;

}

.imgJogador {
    background-color: #fff;
    background-image: url('src/assets/img/jogador.svg');
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin: 0 auto;
    background-repeat: no-repeat;
    background-size: 80%;
    background-position: center;
    display: flex;
}</style>