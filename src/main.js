import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import store from './store';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VeeValidate from 'vee-validate';
import Vuex from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import { faHatWizard } from '@fortawesome/free-solid-svg-icons';


library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);
library.add(faHatWizard)


Vue.config.productionTip = false;

Vue.use(VeeValidate);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuex);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
