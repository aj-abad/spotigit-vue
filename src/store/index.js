import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    username: localStorage.getItem("username") ?? "",
    token: localStorage.getItem("token") ?? "",
  },
  actions: {
    signIn({ commit }, payload) {
      localStorage.setItem("username", payload.username);
      localStorage.setItem("token", payload.token);
      commit("setUsername", payload.username);
      commit("setToken", payload.token);
    },
    signOut({ commit }) {
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      commit("setUsername", "");
      commit("setToken", "");
    },
  },
  mutations: {
    setUsername(state, username) {
      state.username = username;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.username && !!state.token,
    username: (state) => state.username,
    token: (state) => state.token,
  },
});
export default store;
