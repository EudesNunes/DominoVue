import { defineStore } from "pinia";
import { useFuzzy } from "../stores/Fuzzy";

export const usePecasStore = defineStore("pecas", {
  state: () => ({
    GeralPecas: {
      I1: { L1: 0, L2: 0 },
      I2: { L1: 1, L2: 0 },
      I3: { L1: 1, L2: 1 },
      I4: { L1: 2, L2: 0 },
      I5: { L1: 2, L2: 1 },
      I6: { L1: 2, L2: 2 },
      I7: { L1: 3, L2: 0 },
      I8: { L1: 3, L2: 1 },
      I9: { L1: 3, L2: 2 },
      I10: { L1: 3, L2: 3 },
      I11: { L1: 4, L2: 0 },
      I12: { L1: 4, L2: 1 },
      I13: { L1: 4, L2: 2 },
      I14: { L1: 4, L2: 3 },
      I15: { L1: 4, L2: 4 },
      I16: { L1: 5, L2: 0 },
      I17: { L1: 5, L2: 1 },
      I18: { L1: 5, L2: 2 },
      I19: { L1: 5, L2: 3 },
      I20: { L1: 5, L2: 4 },
      I21: { L1: 5, L2: 5 },
      I22: { L1: 6, L2: 0 },
      I23: { L1: 6, L2: 1 },
      I24: { L1: 6, L2: 2 },
      I25: { L1: 6, L2: 3 },
      I26: { L1: 6, L2: 4 },
      I27: { L1: 6, L2: 5 },
      I28: { L1: 6, L2: 6 },
    },
    PecasCompra: {},
    PecasMaoIA: {},
    PecasMaoJogador1: {},
    PecasMaoJogador2: {},
    PecasMaoJogador3: {},
    QuantidadeJogadores: 0,
    VezJogador: 0,
    jogadorPrimario: 0,
    PecasJogadas: [],
  }),
  actions: {
    $reset(state) {
      this.PecasCompra = {};
      this.PecasMaoIA = {};
      this.PecasMaoJogador1 = {};
      this.PecasMaoJogador2 = {};
      this.PecasMaoJogador3 = {};
    },
    jogarPeca(peca) {
      this.PecasJogadas.push(peca);
      switch (this.VezJogador) {
        case 0:
          this.PecasMaoIA.splice(this.PecasMaoIA.indexOf(peca), 1);
          break;
        case 1:
          this.PecasMaoJogador1.splice(this.PecasMaoJogador1.indexOf(peca), 1);
          break;
        case 2:
          this.PecasMaoJogador2.splice(this.PecasMaoJogador2.indexOf(peca), 1);
          break;
        case 2:
          this.PecasMaoJogador3.splice(this.PecasMaoJogador3.indexOf(peca), 1);
          break;
      }
      this.proximojogar();
    },
    maoPecas(state, getters) {
      const Posicoes = this.setPecasCompra;
      const pecasTotais = [];
      for (let index = 0; index <= 6; index++) {
        const randomIndex =
          Posicoes[Math.floor(Math.random() * Posicoes.length)];
        Posicoes.splice(Posicoes.indexOf(randomIndex), 1);
        this.PecasCompra = Posicoes;
        pecasTotais.push(randomIndex);
      }
      return pecasTotais;
    },
    ConsultaValor(peca) {
      let local = peca;
      return this.GeralPecas[local] != undefined ? this.GeralPecas[local] : {};
    },
    ConsultaArrayValor(peca) {
      let local = peca;
      let resultado = [];
      local.forEach((element) => {
        resultado.push(this.GeralPecas[element]);
      });
      return resultado != undefined ? resultado : {};
    },

    NovoJogo(nJogadores) {
      this.$reset();
      this.QuantidadeJogadores = nJogadores;
      this.PecasMaoIA = this.maoPecas();
      switch (nJogadores) {
        case 1: {
          this.PecasMaoJogador1 = this.maoPecas();
          break;
        }
        case 2: {
          this.PecasMaoJogador1 = this.maoPecas();
          this.PecasMaoJogador2 = this.maoPecas();
          break;
        }
        case 3: {
          this.PecasMaoJogador1 = this.maoPecas();
          this.PecasMaoJogador2 = this.maoPecas();
          this.PecasMaoJogador3 = this.maoPecas();
          break;
        }
        default:
          break;
      }
      this.jogadorPrimario = this.escolhaInicio();
      this.VezJogador = this.jogadorPrimario;
    },
    proximojogar() {
      if (this.VezJogador != this.QuantidadeJogadores) {
        this.VezJogador = this.VezJogador + 1;
      } else {
        this.VezJogador = 0;
      }
    },
    posives(numeros, mao) {
      const posibilidade = [];
      numeros.forEach((element) => {
        mao.forEach((elementMao) => {
          let peca = this.getPecas[elementMao];
          if (element == peca.L1 || element == peca.L2) {
            posibilidade.push(elementMao);
          }
        });
      });
      return posibilidade;
    },
    escolhaInicio() {
      let index = 6;
      let resultado = -1;
      while (index >= 0 && resultado == -1) {
        if (this.QuantidadeJogadores >= 1) {
          this.PecasMaoJogador1.forEach((element) => {
            if (
              this.ConsultaValor(element).L1 == index &&
              this.ConsultaValor(element).L2 == index
            ) {
              resultado = 1;
            }
          });
        }
        if (this.QuantidadeJogadores >= 2) {
          this.PecasMaoJogador2.forEach((element) => {
            if (
              this.ConsultaValor(element).L1 == index &&
              this.ConsultaValor(element).L2 == index
            ) {
              resultado = 2;
            }
          });
        }

        if (this.QuantidadeJogadores >= 3) {
          this.PecasMaoJogador3.forEach((element) => {
            if (
              this.ConsultaValor(element).L1 == index &&
              this.ConsultaValor(element).L2 == index
            ) {
              resultado = 3;
            }
          });
        }

        this.PecasMaoIA.forEach((element) => {
          if (
            this.ConsultaValor(element).L1 == index &&
            this.ConsultaValor(element).L2 == index
          ) {
            resultado = 0;
          }
        });
        index--;
      }
      if (resultado == -1) {
        index = 27;
        const geral = Object.keys(this.GeralPecas);
        while (index >= 0 && resultado == -1) {
          if (this.QuantidadeJogadores >= 1) {
            this.PecasMaoJogador1.forEach((element) => {
              if (element == geral[index]) {
                resultado = 1;
              }
            });
          }
          if (this.QuantidadeJogadores >= 2) {
            this.PecasMaoJogador2.forEach((element) => {
              if (element == geral[index]) {
                resultado = 2;
              }
            });
          }
          if (this.QuantidadeJogadores >= 3) {
            this.PecasMaoJogador3.forEach((element) => {
              if (element == geral[index]) {
                resultado = 3;
              }
            });
          }
          this.PecasMaoIA.forEach((element) => {
            if (element == geral[index]) {
              resultado = 0;
            }
          });
          index--;
        }
      }
      return resultado;
    },
    tamanhoPeca(peca) {
      let valor = this.ConsultaValor(peca);
      return valor.L1 + valor.L2;
    },
    quantidadePecasIguais(jogo, valor) {
      let array = this.ConsultaArrayValor(jogo);
      let resultado = 0;
      array.forEach((element) => {
        if (element.L1 == valor || element.L2 == valor) {
          resultado++;
        }
      });
      return resultado;
    },
    escolhaIA(numeros,pecasjogo,pecasJogadas) {
      const Fuzzy = useFuzzy();
     // let pecasPossiveis = this.posives(numeros, this.PecasMaoIA);
      let pecasPossiveis = this.posives(numeros, pecasjogo);
      //console.log(pecasPossiveis);
      let resposta;
      let valor = 0;
      pecasPossiveis.forEach((element) => {
        numeros.forEach((nm) => {
          const peca = this.ConsultaValor(element);
          if (peca.L1 == nm) {
            let vl = this.tamanhoPeca(element);
            let pI = this.quantidadePecasIguais(pecasjogo, nm);
            // let pI = this.quantidadePecasIguais(this.PecasMaoIA, nm);
            let pj = this.quantidadePecasIguais(pecasJogadas, nm);
            console.log(pj, pecasJogadas)
            // let pj = this.quantidadePecasIguais(this.PecasJogadas, nm);
            let teste = Fuzzy.regras(pI, vl, pj);
            if (valor < teste) {
              valor = teste;
              resposta = element;
            }
          }
          if (peca.L2 == nm) {
            let vl = this.tamanhoPeca(element);
            let pI = this.quantidadePecasIguais(pecasjogo, nm);
            //let pI = this.quantidadePecasIguais(this.PecasMaoIA, nm);
            let pj = this.quantidadePecasIguais(pecasJogadas, nm);
            // let pj = this.quantidadePecasIguais(this.PecasJogadas, nm);
            let teste = Fuzzy.regras(pI, vl, pj);
            if (valor < teste) {
              valor = teste;
              resposta = element;
            }
          }
        });
      });
      console.log(resposta);
      return resposta
      // if (resposta != null){
      //   this.jogarPeca(resposta);
      // }else{
      //   proximojogar()
      // }
    },
  },
  getters: {
    getPecas: (state) => state.GeralPecas,
    setPecasCompra() {
      this.PecasCompra = Object.keys(this.GeralPecas);
      return this.PecasCompra;
    },
    getPecasCompra: (state) => state.PecasCompra,

    getPecasMaoIA: (state) => state.PecasMaoIA,
    getPecasMaoJogador1: (state) => state.PecasMaoJogador1,
    getPecasMaoJogador2: (state) => state.PecasMaoJogador2,
    getPecasMaoJogador3: (state) => state.PecasMaoJogador3,
  },
});
