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
    numerospossiveis: [],
    PontosIA: 0,
    PontosJog1: 0,
    PontosJog2: 0,
    PontosJog3: 0,
    NumeroRodadas:0,
  }),
  actions: {
    $reset(tipo) {
      switch (tipo) {
        case 1:
          this.PecasCompra = {};
          this.PecasMaoIA = {};
          this.PecasMaoJogador1 = {};
          this.PecasMaoJogador2 = {};
          this.PecasMaoJogador3 = {};
          this.VezJogador = 0;
          this.jogadorPrimario = 0;
          this.PecasJogadas = [];
          this.numerospossiveis = [];
          break;
      
        default:
          this.PecasCompra = {};
          this.PecasMaoIA = {};
          this.PecasMaoJogador1 = {};
          this.PecasMaoJogador2 = {};
          this.PecasMaoJogador3 = {};
          this.QuantidadeJogadores = 0;
          this.VezJogador = 0;
          this.jogadorPrimario = 0;
          this.PecasJogadas = [];
          this.numerospossiveis = [];
          this.PontosIA = 0;
          this.PontosJog1 = 0;
          this.PontosJog2 = 0;
          this.PontosJog3 = 0;
          this.NumeroRodadas = 0;
          break;
      }

    },
    jogarPeca(peca) {
      this.checarnumeropossivel(peca);

      this.PecasJogadas.push(peca);
      switch (this.VezJogador) {
        case 0:
          this.PecasMaoIA.splice(this.PecasMaoIA.indexOf(peca), 1);
          this.proximojogar();

          break;
        case 1:
          this.PecasMaoJogador1.splice(this.PecasMaoJogador1.indexOf(peca), 1);
          this.proximojogar();

          break;
        case 2:
          this.PecasMaoJogador2.splice(this.PecasMaoJogador2.indexOf(peca), 1);
          this.proximojogar();

          break;
        case 2:
          this.PecasMaoJogador3.splice(this.PecasMaoJogador3.indexOf(peca), 1);
          this.proximojogar();

          break;
      }
    },
    checarGanhador() {
      //-2 = empate
      //-1 = ninguem ganhou
      //0 = IA ganhou
      //1 = Jd1 ganhou
      if (this.PontosIA > 50 && this.PontosJog1 == this.PontosIA) {
        return -2;
      }
      else if (this.PontosIA > 50 && this.PontosJog1 < this.PontosIA) {
        return 0;
      } else if (this.PontosJog > 50) {
        return 1;
      }
        return -1;
 
    },
    ChecarGanhadorRodada() {
      //-2 = empate
      //-1 = ninguem ganhou
      //0 = IA ganhou
      //1 = Jd1 ganhou

      if (this.PecasMaoIA.length == 0) {
        this.PecasMaoJogador1.forEach((element) => {
          this.PontosIA += this.tamanhoPeca(element);
        });
       
        return 0;
      } else if (this.PecasMaoJogador1.length == 0) {
        this.PecasMaoIA.forEach((element) => {
          this.PontosJog1 += this.tamanhoPeca(element);
        });
       
        return 1;
      }else if(this.PecasCompra.length == 0){
          if(this.posives(this.numerospossiveis, this.PecasMaoJogador1).length == 0 && this.posives(this.numerospossiveis, this.PecasMaoIA).length == 0 ){
            this.PecasMaoIA.forEach((element) => {
              this.PontosJog1 += this.tamanhoPeca(element);
            });
            this.PecasMaoJogador1.forEach((element) => {
              this.PontosIA += this.tamanhoPeca(element);
            }); 
            return -2;
          }
        }
    
        return -1

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
      this.$reset(0);
      this.NumeroRodadas = 1;
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
    NovaRodada() {
      this.$reset(1);
      this.NumeroRodadas += 1;
      const nJogadores = this.QuantidadeJogadores 
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
      if (numeros.length == 0) {
        let maior = 0;
        mao.forEach((elementMao) => {
          let peca = this.getPecas[elementMao];
          if (peca.L2 == peca.L1 && peca.L1 > maior) {
            posibilidade.length = 0;
            posibilidade.push(elementMao);
            maior = peca.L1;
          }
        });
        if (posibilidade.length == 0) {
          mao.forEach((elementMao) => {
            let peca = this.getPecas[elementMao];
            if (peca.L2 + peca.L1 > maior) {
              posibilidade.length = 0;
              posibilidade.push(elementMao);
              maior = peca.L2 + peca.L1;
            }
          });
        }
      } else {
        numeros.forEach((element) => {
          mao.forEach((elementMao) => {
            let peca = this.getPecas[elementMao];
            if (element == peca.L1 || element == peca.L2) {
              posibilidade.push(elementMao);
            }
          });
        });
      }

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
    adicionarPeca(peca, jogador) {
      if (jogador == 1) {
        this.PecasMaoJogador1.push(peca);
      } else if (jogador == 2) {
        this.PecasMaoJogador2.push(peca);
      } else if (jogador == 3) {
        this.PecasMaoJogador3.push(peca);
      } else if (jogador == 0) {
        this.PecasMaoIA.push(peca);
      }
      this.PecasCompra.splice(this.PecasCompra.indexOf(peca), 1);
    },
    escolhaIA(numeros) {
      console.log("Ia");
      const Fuzzy = useFuzzy();
      let pecasPossiveis = this.posives(numeros, this.PecasMaoIA);
      let resposta = null;
      let valor = 0;
      if (numeros.length == 0) {
        resposta = pecasPossiveis[0];
      } else {
        pecasPossiveis.forEach((element) => {
          numeros.forEach((nm) => {
            const peca = this.ConsultaValor(element);
            if (peca.L1 == nm) {
              let vl = this.tamanhoPeca(element);
              let pI = this.quantidadePecasIguais(this.PecasMaoIA, nm);
              let pj = this.quantidadePecasIguais(this.PecasJogadas, nm);
              let teste = Fuzzy.regras(pI, vl, pj);
              if (valor < teste) {
                valor = teste;
                resposta = element;
              }
            }
            if (peca.L2 == nm) {
              let vl = this.tamanhoPeca(element);
              let pI = this.quantidadePecasIguais(this.PecasMaoIA, nm);
              let pj = this.quantidadePecasIguais(this.PecasJogadas, nm);
              let teste = Fuzzy.regras(pI, vl, pj);
              if (valor < teste) {
                valor = teste;
                resposta = element;
              }
            }
          });
        });
      }

      if (resposta != null) {
        return resposta;
      } else {
        // comprar uma peça
        const Posicoes = this.getPecasCompra;
        let encontrar = false;
        while (this.PecasCompra.length > 0 && !encontrar) {
          const randomIndex =
            Posicoes[Math.floor(Math.random() * Posicoes.length)];
          console.log("fff",randomIndex)
          this.adicionarPeca(randomIndex, 0);

          const peca = this.ConsultaValor(randomIndex);
          this.numerospossiveis.forEach((element) => {
            if (element == peca.L1 || element == peca.L2) {
              resposta = randomIndex;
              encontrar = true;
            }
          });
        }
      }
      if (this.PecasCompra.length == 0 && resposta == null) {
        return -1;
      }
      return resposta;
    },
    checarnumeropossivel(valorJogado) {
      const peca = this.ConsultaValor(valorJogado);
      console.log("pecajogada", this.PecasJogadas);

      if (this.PecasJogadas.length == 0) {
        this.numerospossiveis.push(peca.L1);
        this.numerospossiveis.push(peca.L2);
      } else {
        const numeros = this.numerospossiveis;
        let test = false;
        numeros.forEach((element) => {
          if (test == false) {
            console.log("f", element);
            if (element == peca.L1) {
              this.numerospossiveis.splice(
                this.numerospossiveis.indexOf(element),
                1
              );
              this.numerospossiveis.push(peca.L2);
              test = true;
            } else if (element == peca.L2) {
              this.numerospossiveis.splice(
                this.numerospossiveis.indexOf(element),
                1
              );
              this.numerospossiveis.push(peca.L1);
              test = true;
            }
          }
        });
      }
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
