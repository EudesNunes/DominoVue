import { defineStore } from "pinia";
import { useFuzzy } from "../stores/Fuzzy";

export const useCheatsStore = defineStore("cheats", {
  state: () => ({
    PecasAdversario: false,
    PecasCompra: false,
    BotaoCompra: false,
  }),
  actions: {
    setPecasAdversario(valor) {
      this.PecasAdversario = valor;
    },
    setPecasCompra(valor) {
      this.PecasCompra = valor;
    },
    setBotaoCompra(valor) {
      this.BotaoCompra = valor;
    },
  },
  getters: {
    getPecasAdversario: (state) => state.PecasAdversario,
    getPecasCompra: (state) => state.PecasCompra,
    getBotaoCompra: (state) => state.BotaoCompra,

  },
});
