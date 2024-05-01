// store/modules/order.js

import httpClient from "@/httpclient"

const state = {
    orders: [],
  };
  
  const getters = {
    orders: state => state.orders,
  };
  
  const actions = {
    async fetchOrders({ commit }, user_id) {
      try {
        // Make API call to fetch cart products
        const response = await httpClient.get(`/orders/${user_id}`);
        const orders = response.data;
        commit('SET_ORDERS', orders); // Commit mutation to update state
      } catch (error) {
        console.error('Error fetching user\'s orders:', error);
      }
    },
    async placeOrder(context, user_id) {
        try {
          // Make API call to update cart
          await httpClient.put(`/orders/place_order/${user_id}`)
        } catch (error) {
          console.error('Error placing order:', error);
        }
      },
  };
  
  const mutations = {
    SET_ORDERS(state, orders) {
      state.orders = orders;
    },
  };
  
  export default {
    namespaced: true, // Ensure that the module is namespace-enabled
    state,
    getters,
    actions,
    mutations,
  };
  