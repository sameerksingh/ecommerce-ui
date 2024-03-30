// store/modules/cart.js

import httpClient from "@/httpclient"

const state = {
    cartProducts: [], // Initially empty array to store cart products
  };
  
  const getters = {
    cartProducts: state => state.cartProducts,
  };
  
  const actions = {
    async fetchCartProducts({ commit }, user_id) {
      try {
        // Make API call to fetch cart products
        const response = await httpClient.get(`/carts/${user_id}`);
        const cartProducts = response.data.products;
        commit('SET_CART_PRODUCTS', cartProducts); // Commit mutation to update state
      } catch (error) {
        console.error('Error fetching cart products:', error);
      }
    },
    async updateCart({ dispatch }, payload) {
        try {
          // Make API call to update cart
          await httpClient.patch(`/carts?user_id=${payload.userId}&product_id=${payload.product_id}&quantity=${payload.quantity}`);
          dispatch('fetchCartProducts', payload.userId); // Refresh cart products after updating cart
        } catch (error) {
          console.error('Error updating cart:', error);
        }
      },
    async clearCart({ dispatch }, userId) {
        try {
          // Make API call to update cart
          await httpClient.put(`/carts/${userId}`);
          dispatch('fetchCartProducts', userId); // Refresh cart products after updating cart
        } catch (error) {
          console.error('Error updating cart:', error);
        }
    },
  };
  
  const mutations = {
    SET_CART_PRODUCTS(state, cartProducts) {
      state.cartProducts = cartProducts;
    },
  };
  
  export default {
    namespaced: true, // Ensure that the module is namespace-enabled
    state,
    getters,
    actions,
    mutations,
  };
  