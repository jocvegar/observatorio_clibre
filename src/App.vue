<template>
  <v-app>
    <component :is="navComponent" :currentUser="currentUser" />
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Nav from "@/components/Nav";
import AdminNav from "@/components/AdminNav";
import Footer from "@/components/Footer";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    Nav,
    AdminNav,
    Footer,
  },
  created() {
    document.title =
      "C-Libre | Observatorio de Agresiones a Comunicadores Sociales";
  },
  mounted() {
    this.$store.dispatch("setDepartamentos");
  },
  computed: {
    ...mapState(["currentUser"]),
    navComponent() {
      return this.$store.state.adminNavbar ? AdminNav : Nav;
    },
  },
};
</script>

<style>
.v-navigation-drawer--temporary {
  z-index: 1001 !important;
}
.no-background-hover::before {
  background-color: transparent !important;
}
.v-application {
  font-family: "Open Sans", sans-serif !important;
}
.nowrap {
  white-space: nowrap !important;
}
</style>
