import Vue from 'vue'
import App from './App.vue'
import store from './store' // Import the Vuex store

import Vuetify from 'vuetify'; // Import Vuetify
import 'vuetify/dist/vuetify.min.css'; // Import Vuetify styles

import VueRouter from 'vue-router'; // Import Vue Router
import router from './router'; // Import router configuration

Vue.use(Vuetify); // Use Vuetify as a Vue plugin
Vue.use(VueRouter); // Use Vue Router

const vuetify = new Vuetify(); // Create a Vuetify instance

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  vuetify,
  router,
  store,
}).$mount('#app')
