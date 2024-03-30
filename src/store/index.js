import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import product from './product';
import cart from './cart';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    product,
    cart,
  }
});

export default store;