import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  if (to.name == 'Login') {
    let id = localStorage.getItem('user_id')
    if (id != null) {
      next('/')
    }
    next()
  }
  next()
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
