import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import {vuetify} from "./plugins/vuetify";
import store from "./vuex/store"
import Vuelidate from 'vuelidate'
import Notifications from 'vue-notification'
import {LMap, LMarker, LTileLayer} from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import titlePlugin from './utils/title.plugin'
import Lightbox from 'vue-easy-lightbox'
import VueMeta from 'vue-meta';

Vue.use(VueMeta);
Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

Vue.use(Lightbox);
Vue.use(Vuelidate);
Vue.use(Notifications);
Vue.use(titlePlugin);
Vue.config.productionTip = false;

new Vue({
    router,
    vuetify,
    store: store,
    render: h => h(App)
}).$mount('#app');
