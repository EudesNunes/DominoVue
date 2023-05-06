<template>
  <div class="body">
    <div class="principal">
      <div class="nav">
        <div class="nav_1">
          <div>
            <h1>Regras do jogo</h1>
            <div></div>
            <div class="nav_2">
              <p>
                - Jogado em 2, 3 ou 4 pessoas; <br />
                - Cada pessoa pega 7 peças embaralhadas; <br /><br />
                - Se sobrar peças, elas ficam em um monte para a compra;
                <br /><br />
                - Quando o jogador não tiver a peça que deseja usar, deve
                comprar. E se não sobrarem peças para a compra, ele deve passar
                a vez para o próximo jogador; <br /><br />
                - Na primeira rodada começa o jogo quem possuir a peça dupla 6x6
                (sena), se ninguém possuí-la passa para a próxima de maior valor
                (5x5, 4x4, etc.); <br /><br />
                - Na segunda rodada, joga a pessoa que está depois do jogador
                que começou na primeira rodada (sentido horário); <br /><br />
                - Ganha a rodada a primeira pessoa que “bater”, ou seja, que
                ficar sem peças; <br /><br />
                - Os perdedores da rodada devem somar os números das suas peças,
                e essa será a pontuação do ganhador; <br /><br />
                - Ganha o jogo quem atingir 50 pontos primeiro.
              </p>
            </div>
          </div>
         
        </div>
      </div>
      <footer>
            <button class="botao_menu" @click=sair()>
              <p1 class="menu"> Menu inicial </p1>
            </button>
          </footer>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, defineComponent } from "vue";

export default defineComponent({
  name: "RegrasDoJogo",
  setup() {
    onMounted(() => {});
    function sair(){
            window.location.href = "/";
        }
    return {
        sair
    };
  },
});
</script>

<style scoped>
.body {
  background-image: url("/src/assets/img/fundo_palmeiras.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  width: 100%;
  min-height: 100vh;
  max-height: max-content;
  border: 0%;
  padding: 0%;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.principal {
  width: 100%;
  height: 100vh;
  background-color: #000000a9;
  align-items: center;
  text-align: center;
  justify-content: center;
  display: flex;

}

.nav {
  width: 60%;
  height: max-content;
  background-color: #6598a8b8;
  border-radius: 30px;
  text-align: center;
  vertical-align: center;
  justify-content: center;
  display: flex;
}

.nav_1 {
  text-align: center;
  vertical-align: center;
  justify-content: center;
  display: flex;
  margin-top: 5px;
  font-size: 30px;
  font-family: 'Handjet', sans-serif;
  font-style: normal;
  color: #2f3e6d;
  text-transform: uppercase;
  padding: 1px;
}

.nav_2 {
  display: flex;
  font-size: 1.2rem;
  font-family: 'Handjet', sans-serif;
  font-style: normal;
  text-align: justify;
  color: #ffffff;
  padding-left: 20px;
  padding-right: 20px;
}

footer {
  width: 10%;
  min-height: 10vh;
  max-height: 10%;
  position: absolute;
  bottom: 0%;
  left: 0;
}

.botao_menu {
  background-color: #0a7f55;
  width: 110%;
  min-height: 45px;
  max-height: 55%;
  margin-left: 10px;
  margin-top: 20px;
  border-radius: 30px;
  text-align: center;
  vertical-align: center;
  justify-content: center;
  display: flex;
  align-items: center;
  border-color: #ffffff;
}

.menu {
  font-size: 25px;
  font-family: 'Handjet', sans-serif;
  font-style: normal;
  text-align: center;
  align-items: center;
  justify-content: center;
  color: #ffffff;
}
</style>
