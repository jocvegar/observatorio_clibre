<template>
  <v-app>
    <Nav :currentUser="currentUser" />
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    Nav,
    Footer,
  },
  created() {
    document.title =
      "C-Libre | Observatorio de Agresiones a Comunicadores Sociales";
  },
  computed: {
    ...mapState(["currentUser"]),
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
</style>
