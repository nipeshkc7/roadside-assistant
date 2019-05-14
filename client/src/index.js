import Vue from 'vue'
import App from './app/App'
import Vuelidate from 'vuelidate'
import { store } from './store'
import { router } from './_helpers'
import './plugins/iview.js'
import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'

Vue.config.productionTip = false

Vue.use(Vuelidate);

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});