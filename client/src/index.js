import Vue from 'vue';
import Vuelidate from 'vuelidate';
import iView from 'iview';

import { router } from './_helpers';
import App from './app/App';

Vue.use(Vuelidate);
Vue.use(iView);

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});