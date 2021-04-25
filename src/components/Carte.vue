<template>
  <div class="ct column carte" :style="`width: 100px; min-width:100px; height: 156px;`">
    <div class="div-up row">
      <div class="q-ml-sm q-mt-xs">
        <div :class="couleur === 'CARREAUX' || couleur === 'COEUR' ? 'text-red' : ''" class="text-center text-bold">{{values[valeur]}}</div>
        <img :width="width_little" :src="`/${colors[couleur]}.png`" alt="">
      </div>
      <q-space></q-space>
      <div class="q-mr-sm q-mt-xs">
        <div :class="couleur === 'CARREAUX' || couleur === 'COEUR' ? 'text-red' : ''" class="text-center text-bold">{{values[valeur]}}</div>
        <img :width="width_little" :src="`/${colors[couleur]}.png`" alt="">
      </div>
    </div>
    <div class="div-center col">
      <img :width="width_center" :src="`/${colors[couleur]}.png`" alt="">
    </div>
    <div class="div-bottom row">
      <div class="q-ml-sm q-mt-xs">
        <div :class="couleur === 'CARREAUX' || couleur === 'COEUR' ? 'text-red' : ''" class="text-center text-bold">{{values[valeur]}}</div>
        <img :width="width_little" :src="`/${colors[couleur]}.png`" alt="">
      </div>
      <q-space></q-space>
      <div class="q-mr-sm q-mt-xs">
        <div :class="couleur === 'CARREAUX' || couleur === 'COEUR' ? 'text-red' : ''" class="text-center text-bold">{{values[valeur]}}</div>
        <img :width="width_little" :src="`/${colors[couleur]}.png`" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['width', 'valeur', 'couleur'],
  data () {
    return {
      width_little: 12,
      width_center: 40,
      colors: {
        PIQUE: 'pique',
        TREFLE: 'trefle',
        CARREAUX: 'carreaux',
        COEUR: 'coeur'
      },
      values: {
        AS: 'A',
        DEUX: '2',
        TROIS: '3',
        QUATRE: '4',
        CINQ: '5',
        SIX: '6',
        SEPT: '7',
        HUIT: '8',
        NEUF: '9',
        DIX: '10',
        VALET: 'J',
        DAME: 'Q',
        ROI: 'K'
      }
    }
  },
  methods: {
    init () {
      // const carte = document.querySelector('.carte')
      // const width = carte.offsetWidth
      // this.width_center = width / 5
      // const height = width * (89 / 57)
    },
    listenerWidth () {
      this.init()
      window.addEventListener('resize', ev => {
        this.init()
      })
    }
  },
  mounted () {
    this.listenerWidth()
  },
  watch: {
    width (value) {
    }
  }
}
</script>

<style>
  .carte {
    border-radius: 3px;
    border: 1px grey solid;
  }
  .div-center {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .div-bottom {
    transform: rotate(180deg);
  }
</style>
