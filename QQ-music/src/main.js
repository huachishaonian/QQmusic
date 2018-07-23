import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import store from './store'

Vue.config.productionTip = false
fastclick.attach(document.body)
Vue.use(VueLazyLoad,{
  loading: require('./assets/音乐.png')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  render: h => h(App),
  store
})
