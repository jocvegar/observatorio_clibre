<template>
  <v-main>
    <v-container fluid fill-height>
      <v-snackbar top :timeout="3000" v-model="snackbar">
        {{ snackbarText }}
      </v-snackbar>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card elevation="4">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Ingresar</v-toolbar-title>
              <v-spacer></v-spacer>

              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn to="/" icon large v-on="on" class="mx-2">
                    <v-icon>fa-home</v-icon>
                  </v-btn>
                </template>
                <span>Inicio</span>
              </v-tooltip>
            </v-toolbar>
            <v-card-text>
              <v-form class="px-2">
                <v-text-field
                  class="my-4"
                  prepend-icon="fa-user-alt"
                  v-model.trim="email"
                  label="Correo"
                  type="text"
                ></v-text-field>
                <v-text-field
                  class="my-4"
                  id="password"
                  prepend-icon="fa-lock"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  name="password"
                  v-model.trim="password"
                  label="Contraseña"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="login" color="primary" class="ma-4">
                Ingresar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
import { auth } from "@/firebaseConfig";
export default {
  data: () => ({
    email: "",
    password: "",
    snackbarText: "",
    snackbar: false,
    showPassword: false,
  }),
  methods: {
    login() {
      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then((firebaseUser) => {
          this.$store.commit("setCurrentUser", firebaseUser.user);
          this.$router.push("/");
        })
        .catch((err) => {
          console.log("error => ", err);
          this.snackbarText = err;
          this.snackbar = true;
        });
    },
  },
};
</script>
