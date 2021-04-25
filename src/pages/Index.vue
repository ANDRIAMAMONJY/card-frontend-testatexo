<template>
  <div class="container">
    <div class="text-h4 q-mb-lg text-primary">JEU DE CARTES</div>
    <div class="couleur q-mb-lg">
      <div @click="getOrderColor" class="btn c-cx">Ordre des couleurs</div>
      <div class="text-bold c-cy q-mr-md">
        {{couleurs.join(', ')}}
      </div>
    </div>
    <div class="valeur q-mb-lg">
      <div @click="getOrderValue" class="btn c-cx">Ordre des valeurs</div>
      <div class="text-bold c-cy">
        {{valeurs.map(u => values[u]).join(', ')}}
      </div>
    </div>
    <div class="refresh">
      <div @click="getHandCard" class="btn c-cx">MAIN</div>
    </div>
    <div class="non-trie q-mb-lg">
      <div class="text-bold q-mb-md">Cartes tirées non triées:</div>
      <div class="row">
        <div v-for="(d, i) in cartes" :key="i" class="q-mx-xs q-mb-xs">
          <carte-vue style="width: 100px" :couleur="d.color" :valeur="d.value"></carte-vue>
        </div>
      </div>
    </div>
    <div class="trie q-mb-lg">
      <div class="text-bold q-mb-md">Cartes tirées triées:</div>
      <div class="row">
        <div v-for="(d, i) in cartes_tries" :key="i" class="q-mx-xs q-mb-xs">
          <carte-vue style="width: 100px" :couleur="d.color" :valeur="d.value"></carte-vue>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CarteVue from 'src/components/Carte.vue'
import { util } from 'src/plugins/util'
export default {
  components: {
    CarteVue
  },
  data () {
    return {
      valeurs: [],
      couleurs: [],
      cartes: [],
      cartes_tries: [],
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
    getOrderColor () {
      util.showLoading()
      this.$store.dispatch('card/orderColor')
        .then(res => {
          this.couleurs = res
        })
        .catch(e => {
          console.log('ERROR ON GET ALL ORDER COLOR', e)
        })
        .then(_ => {
          util.hideLoading()
        })
    },
    getOrderValue () {
      util.showLoading()
      this.$store.dispatch('card/orderValue')
        .then(res => {
          this.valeurs = res
        })
        .catch(e => {
          console.log('ERROR ON GET ALL ORDER VALUE', e)
        })
        .then(_ => {
          util.hideLoading()
        })
    },
    getHandCard () {
      util.showLoading()
      this.$store.dispatch('card/handCard')
        .then(res => {
          this.cartes = res
        })
        .catch(e => {
          console.log('ERROR ON GET ALL HAND CARD', e)
        })
        .then(_ => {
          util.hideLoading()
        })
    },
    solve () {
      if (!this.couleurs[0] || !this.valeurs[0] || !this.cartes[0]) return
      const data = {
        color_orders: this.couleurs.join(','),
        value_orders: this.valeurs.join(','),
        choice: 'COLOR'
      }
      for (let i = 0; i < this.cartes.length; i++) {
        const el = this.cartes[i]
        data[`cards[${i}].color`] = el.color
        data[`cards[${i}].value`] = el.value
      }
      util.showLoading()
      this.$store.dispatch('card/solve', data)
        .then(res => {
          this.cartes_tries = res.ordereds
        })
        .catch(e => {
          console.log('ERROR ON SOLVE', e)
        })
        .then(_ => {
          util.hideLoading()
        })
    }
  },
  computed: {
  },
  watch: {
    couleurs (value) {
      if (value) {
        this.solve()
      }
    },
    valeurs (value) {
      if (value) {
        this.solve()
      }
    },
    cartes (value) {
      if (value) {
        this.solve()
      }
    }
  },
  mounted () {
    this.getOrderColor()
    this.getOrderValue()
    this.getHandCard()
    // this.solve()
  }
}
</script>
<style lang="stylus">
  .container {
    width 100%
    height 100%
    display flex
    align-items center
    justify-content center
    flex-direction column
    text-align center
  }
  .btn {
    background $primary
    padding 0.5rem 1rem
    border-radius 5px
    cursor pointer
    color white
    width 200px
    margin-bottom 10px
  }
</style>
