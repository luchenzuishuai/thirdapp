/* Name: Chen Lu
Id: 91906
course number: 2228-CSE-6331-980
lab: Assignment3 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// axios.defaults.baseURL = 'http://114.116.10.5:8080'
// axios.defaults.baseURL = 'https://springbootdemo0.azurewebsites.net:8080'
// axios.defaults.baseURL = 'https://20.40.202.19:8080'

// 带SSL，解决https请求http接口报错问题t
axios.defaults.baseURL = 'https://www.2b206.icu:8083'

axios.defaults.timeout = 30000

Vue.prototype.$http = axios

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
