import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userId: localStorage.getItem("userId") || null,
    username: localStorage.getItem("username") ?? null,
    token: localStorage.getItem("token") ?? null,
  },
  actions: {
    signIn({ commit }, payload) {
      const { token, username, userId } = payload;

      localStorage.setItem("userId", userId);
      localStorage.setItem("username", username);
      localStorage.setItem("token", token);
      commit("setUser", {
        userId,
        username,
        token,
      });
    },
    signOut({ commit }) {
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      commit("setUser", {
        userId: null,
        username: null,
        token: null,
      });
    },
  },
  mutations: {
    setUser(state, payload) {
      state.userId = payload.userId;
      state.username = payload.username;
      state.token = payload.token;
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.username && !!state.token,
    username: (state) => state.username,
    token: (state) => state.token,
    userId: (state) => parseInt(state.userId) || null,
  },
});
export default store;
