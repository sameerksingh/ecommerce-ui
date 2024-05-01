// In auth.js
import httpClient from "@/httpclient"

const state = {
    token: null, // Initially, no token
    user: null,
  };
  
  const mutations = {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, user) {
        state.user = user;
        localStorage.setItem('user', JSON.stringify(user));
    },
  };
  
  const actions = {
    async getToken({ commit }, payload ) {
      try {
        // Make an API call to authenticate and retrieve the token
        const response = await httpClient.post(`/login`, payload)
        
        // If authentication is successful, set the token in the state
        const token = response.data.access_token; // Assuming the token is returned from the server response
        commit('SET_TOKEN', token);
        localStorage.setItem('token', token);
        
        return token; // Return the token for further handling
      } catch (error) {
        console.error('Error fetching token:', error);
        throw error; // Rethrow the error for handling in the component
      }
    },
    async setUser({ commit }, username) {
        try {
          // Make API call to fetch user by email
          const response = await httpClient.get(`/users/${username}?by_email=email`);
          const user = response.data;
          commit('SET_USER', user); // Commit mutation to update state
        } catch (error) {
          console.error('Error fetching user:', error);
        }
    },
    async registerNewUser(context, payload) {
        try {
            // Make API call to fetch user by email
            await httpClient.post(`/users`, payload);
            return ""
          } catch (error) {
            if (error.response && error.response.status == 409 ) {
              return error.response.data["message"]
            }
            console.error(error.response.data);
          }
    },
    logout({commit}) {
      commit('SET_TOKEN', "");
      commit('SET_USER', "");
    }
  };
  
  const getters = {
    isAuthenticated(state) {
      return !!state.token; // Return true if token is present, false otherwise
    },
    getUser: (state) => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user || state.user;
    },
  };
  
  export default {
    namespaced: true, // Ensure that the module is namespace-enabled
    state,
    mutations,
    actions,
    getters
  };
  