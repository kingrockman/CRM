import Vue from 'vue'
import App from './App'
import './status/css/main.css'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()