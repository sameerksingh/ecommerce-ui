// store/modules/product.js

import httpClient from "@/httpclient"

const state = {
    products: [], // Initially empty array to store products
  };
  
  const getters = {
    getProducts: state => state.products,
  };
  
  const actions = {
    async fetchProducts({ commit }) {
      try {
        // Make API call to fetch products
        const response = await httpClient.get('/products');
        const products = response.data;
        commit('SET_PRODUCTS', products); // Commit mutation to update state
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
  };
  
  const mutations = {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
  };
  
  export default {
    namespaced: true, // Ensure that the module is namespace-enabled
    state,
    getters,
    actions,
    mutations,
  };
  