import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import product from './product';
import cart from './cart';
import order from './order';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    product,
    cart,
    order,
  }
});

export default store;