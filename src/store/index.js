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
    adminNavbar: false,
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
    setAdminNavBar(state, val) {
      state.adminNavbar = val;
    },
  },
  actions: {
    clearData({ commit }) {
      commit("setCurrentUser", null);
    },
  },
  modules: {},
});
