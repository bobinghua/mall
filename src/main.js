import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

Vue.config.productionTip = false

// 给vue原型添加事件总线对象
Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

