import Vue from 'vue';
import Vuelidate from 'vuelidate';
import iView from 'iview';
import locale from 'iview/dist/locale/en-US';

import { store } from './store';
import { router } from './_helpers';
import App from './app/App';

Vue.use(Vuelidate);
Vue.use(iView, { locale });

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});