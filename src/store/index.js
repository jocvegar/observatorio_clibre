import Vue from "vue";
import Vuex from "vuex";
import { auth } from "@/firebaseConfig";

Vue.use(Vuex);

auth.onAuthStateChanged((firebaseUser) => {
  if (firebaseUser) {
    store.commit("setCurrentUser", firebaseUser);
  }
});

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    adminNavbar: true,
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
  },
  actions: {
    clearData({ commit }) {
      commit("setCurrentUser", null);
    },
  },
  modules: {},
});
