import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 导入 DZMFormJson
import DZMFormJson from 'dzm-form-json'
Vue.prototype.$formJson = DZMFormJson

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
