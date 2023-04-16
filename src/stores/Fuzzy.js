import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useFuzzy = defineStore("fuzzy", () => {
  // const doubleCount = computed(() => count.value * 2)

  function PecaIgual(x) {
    if (x < 0 || x > 6) {
      return 0;
    } else {
      return x / 6;
    }
  }
  function ValorAlto(x) {
    if (x < 0 || x > 12) {
      return 0;
    } else {
      return x / 12;
    }
  }
  function PecaEmjogo(x) {
    if (x < 0 || x > 5) {
      return 0;
    } else {
      return x / 5;
    }
  }

  // Define as regras
  // PecaIgual= (0 até 6)
  // ValorAlto= (0 até 12)
  // PecaEmjogo= (0 até 5)
  function regras(PecaIgual, ValorAlto, PecaEmjogo) {
    var resultado = {};
    if (PecaIgual === NaN || ValorAlto === NaN || PecaEmjogo === NaN) {
      resultado = NaN;
    } else if (
      PecaIgual < 0 ||
      PecaIgual > 6 ||
      ValorAlto < 0 ||
      ValorAlto > 12 ||
      PecaEmjogo < 0 ||
      PecaEmjogo > 5
    ) {
      resultado = NaN;
    } else {
      resultado =
        (this.PecaIgual(PecaIgual) +
          this.ValorAlto(ValorAlto) +
          this.PecaEmjogo(PecaEmjogo)) /
        3;
    }

    return resultado;
  }
  return { PecaIgual, ValorAlto, PecaEmjogo, regras };
});
