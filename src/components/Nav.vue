<template>
  <div>
    <v-app-bar app color="white" class="px-4 px-md-10">
      <div class="d-flex align-center">
        <v-img
          alt="Cibre Logo"
          class="shrink mr-2"
          contain
          src="@/assets/clibre_logo.jpg"
          transition="scale-transition"
          width="100"
          @click="$router.push('/')"
        />
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
          <span class="blue--text text--darken-4 font-weight-bold subtitle-1">
            {{ item.title }}
          </span>
        </v-btn>
        <v-btn
          text
          v-if="currentUser"
          @click="logout"
          class="no-background-hover"
        >
          <span class="blue--text text--darken-4 font-weight-bold subtitle-1">
            Salir
          </span>
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
  </div>
</template>

<script>
import { auth } from "@/firebaseConfig";

export default {
  props: {
    currentUser: {
      type: Object,
    },
  },
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
