<template>
    <div class="body">
      <div class="principal">
        <div class="nav">
          <div class="nav_1">
            <div >
              <h1 class="titulo">CRÉDITOS</h1>
              <div>
                <h2>Alunos de Bacharel em Engenharia de Software UNIVILLE:</h2>

              </div>
              <div class="nav_2">
                <div class="efeitoDomino"></div>
                <h2 style="padding-top: 10px;">Andresa Siedschlag Schmöller</h2> 
              </div>
              <div class="nav_2">
                <div class="efeitoDomino"></div>
                <h2 style="padding-top: 10px;">Eudes Nunes Araújo</h2> 
              </div>
              <div class="nav_2">
                <div class="efeitoDomino"></div>
                <h2 style="padding-top: 10px;">Helen Cristina da Silva</h2> 
              </div>
              <div class="nav_2">
                <div class="efeitoDomino"></div>
                <h2 style="padding-top: 10px;">Rafael Gustavo Reinert</h2> 
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
    name: "CreditosDoJogo",
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
    background-image: url("src/assets/img/fundo_palmeiras.jpg");
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
  .titulo{
    font-size: 4rem;
    font-weight: bold;
    color: black;

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
    color: white;
  }
  
  .nav_2 {
    display: flex;
    font-size: 1.4rem;
    font-family: 'Handjet', sans-serif;
    font-style: normal;
    text-align: start;
    color: #ffffff;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;

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
  .efeitoDomino{
    background-image: url('src/assets/img/efeito-domino.svg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 10%;
    height: auto;
    margin-right: 15px;
  }
  </style>
  