import { defineStore } from "pinia";
import { useFuzzy } from "../stores/Fuzzy";

export const useCheatsStore = defineStore("cheats", {
  state: () => ({
    PecasAdversario: false,
   
  }),
  actions: {
    setPecasAdversario(valor) {
        this.PecasAdversario = valor;
        console.log(valor)
    }
     
  },
  getters: {
    getPecasAdversario: (state) => state.PecasAdversario,
   
  },
});
