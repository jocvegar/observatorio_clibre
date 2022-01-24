<template>
  <div>
    <v-navigation-drawer v-model="drawer" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in navigation"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="white"
      class="px-4 px-md-10"
    >
      <div class="ml-n8">
        <v-btn icon @click.stop="drawer = !drawer">
          <v-icon>mdi-{{ `chevron-${drawer ? "left" : "right"}` }}</v-icon>
        </v-btn>
      </div>

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
var mobile = require("is-mobile");

export default {
  props: {
    currentUser: {
      type: Object,
    },
  },
  data: () => ({
    rightDrawer: false,
    clipped: true,
    mobile: true,
    drawer: true,
    sideItems: [["fa-home", "Inicio", "/"]],
    navigation: [
      {
        icon: "fa-user-shield",
        title: "Administración",
        to: "/admin",
      },
      {
        icon: "fa-globe-americas",
        title: "Departamentos",
        to: "/admin/departamentos",
      },
    ],
    items: [
      {
        icon: "mdi-home-variant",
        title: "Inicio",
        to: "/",
      },
      {
        icon: "mdi-cup-water",
        title: "Admin",
        to: "/admin",
      },
    ],
  }),
  mounted() {
    if (this.mobile) this.drawer = false;
  },
  beforeMount() {
    this.mobile = mobile();
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
