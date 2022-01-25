import Vue from "vue";
import Vuex from "vuex";
import { auth } from "@/firebaseConfig";
import { departmentsCollection, municipiosCollection } from "@/firebaseConfig";

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
    departamentos: [],
    allMunicipios: [],
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
    setAdminNavBar(state, val) {
      state.adminNavbar = val;
    },
    setDepartamentos(state, val) {
      state.departamentos = val;
    },
    setMunicipios(state, val) {
      state.allMunicipios = val;
    },
  },
  actions: {
    clearData({ commit }) {
      commit("setCurrentUser", null);
    },
    setDepartamentos({ commit }) {
      console.log(" I am called");
      departmentsCollection
        .orderBy("nombre", "asc")
        .get()
        .then((departments) => {
          const departmentArray = [];
          departments.docs.forEach((department) => {
            departmentArray.push(
              Object.assign({ id: department.id }, department.data())
            );
          });
          commit("setDepartamentos", departmentArray);
        });
    },
    setMunicipios({ commit }) {
      municipiosCollection
        .orderBy("nombre", "asc")
        .get()
        .then((municipios) => {
          const municipiosArray = [];
          municipios.docs.forEach((municipio) => {
            municipiosArray.push(
              Object.assign({ id: municipio.id }, municipio.data())
            );
          });
          commit("setMunicipios", municipiosArray);
        });
    },
  },
  modules: {},
});
