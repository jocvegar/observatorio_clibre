<template>
  <v-app>
    <v-app-bar app color="white" class="px-4">
      <div class="d-flex align-center">
        <v-img
          alt="Cibre Logo"
          class="shrink mr-2"
          contain
          src="@/assets/clibre_logo.jpg"
          transition="scale-transition"
          width="100"
        />
        <v-toolbar-title
          class="shrink mt-1 hidden-sm-and-down blue--text text--darken-4 ml-1"
        >
          Observatorio C-Libre
        </v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <div class="hidden-sm-and-down">
        <v-btn
          v-for="(item, idx) in items"
          :key="idx"
          :to="item.to"
          text
          exact
          link
          class="no-background-hover"
        >
          <v-icon color="blue darken-4">{{ item.icon }}</v-icon>
          <span class="mr-2 pl-1 blue--text text--darken-4">
            {{ item.title }}
          </span>
        </v-btn>
        <v-btn
          text
          v-if="currentUser"
          @click="logout"
          class="no-background-hover"
        >
          <v-icon color="blue darken-4">fa-sign-out-alt</v-icon>
          <span class="mr-2 pl-1 blue--text text--darken-4">Salir</span>
        </v-btn>
      </div>

      <div class="hidden-sm-and-up">
        <v-btn icon @click.stop="rightDrawer = !rightDrawer">
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      app
      v-model="rightDrawer"
      :right="true"
      temporary
      fixed
    >
      <v-list>
        <v-list-item
          v-for="([icon, text, to], i) in sideItems"
          :key="i"
          link
          :to="to"
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="currentUser" @click="logout">
          <v-list-item-icon>
            <v-icon>fa-sign-out-alt</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Salir</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import { auth } from "@/firebaseConfig";

export default {
  name: "App",
  data: () => ({
    rightDrawer: false,
    sideItems: [["fa-home", "Inicio", "/"]],
    items: [
      {
        icon: "fa-home",
        title: "Inicio",
        to: "/",
      },
    ],
  }),
  created() {
    document.title =
      "C-Libre | Observatorio de Agresiones a Comunicadores Sociales";
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    logout() {
      auth
        .signOut()
        .then(() => {
          this.$store.dispatch("clearData");
          this.$router.push("/login");
        })
        .catch((err) => {
          console.log(err);
        });
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
</style>
