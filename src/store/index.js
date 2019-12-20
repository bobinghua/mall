import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    carts: []
  },
  mutations: {
    addCounter(state, payload) {
      payload.count++;
    },
    addToCart(state, payload) {
      state.carts.push(payload);
    }
  },
  actions: {
    addCart(context, pro) {
      let p = context.state.carts.find(x => x.iid === pro.iid);
      console.log(p)
      if (p)
        context.commit('addCounter', p);
      else {
        pro.count = 1
        pro.checked = true
        context.commit('addToCart', pro);
      }
    }
  },
  getters: {
    getCarts(state) {
      return state.carts;
    }
  }
})
