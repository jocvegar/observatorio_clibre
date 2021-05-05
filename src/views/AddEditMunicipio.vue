<template>
  <div id="add-edit-municipio">
    <v-card class="px-2">
      <v-card-title>
        <span class="headline">
          {{ type == "new" ? "Nuevo" : "Editar" }} Municipio
        </span>

        <v-btn
          style="right:10px; top:10px;"
          icon
          color="primary"
          fab
          absolute
          @click="$emit('cancel')"
        >
          <v-icon dark>fa-times</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-snackbar top :timeout="3000" v-model="snackbar">
            {{ snackbarText }}
          </v-snackbar>

          <v-row align="end">
            <v-col cols="12" md="6">
              <p>Escoger Departamento</p>
              <v-select
                v-model="municipio.departamentoId"
                :items="departamentos"
                placeholder="Seleccione Departamento"
                outlined
                dense
                item-value="id"
                item-text="nombre"
                rounded
              />
            </v-col>
            <v-col cols="12" md="6">
              <p>Nombre del Municipio</p>
              <v-text-field
                type="text"
                outlined
                dense
                rounded
                placeholder="Municipio"
                v-model.trim="municipio.nombre"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <p>Latitud</p>
              <v-text-field
                outlined
                dense
                rounded
                type="number"
                placeholder="Latitud"
                v-model.trim="municipio.latitud"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <p>Longitud</p>
              <v-text-field
                outlined
                dense
                rounded
                type="number"
                placeholder="Longitud"
                v-model.trim="municipio.longitud"
              >
              </v-text-field>
            </v-col>
          </v-row>

          <v-row class="pa-0 ma-0 mt-8">
            <v-col cols="12">
              <v-divider></v-divider>
            </v-col>
            <v-col cols="6">
              <v-row align="center" justify="end">
                <v-btn
                  v-if="type == 'new'"
                  @click="submitNew()"
                  class="mt-4"
                  color="primary"
                >
                  Guardar
                </v-btn>
                <v-btn
                  v-else
                  class="mt-4"
                  @click="updateMunicipio()"
                  color="primary"
                >
                  Editar
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { db } from "@/firebaseConfig";

export default {
  name: "AddEditMunicipio",
  props: {
    type: {
      type: String,
      required: true,
    },
    departamentos: {
      required: true,
    },
    item: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      loading: true,
      snackbarText: "",
      snackbar: false,
      municipio: {
        nombre: "",
        departamentoId: "",
        latitud: null,
        longitud: null,
      },
    };
  },
  mounted() {
    let scrollPosition = document.getElementsByClassName("v-dialog")[0];
    if (scrollPosition) scrollPosition.scrollTop = 0;
    if (this.type == "edit") {
      this.municipio = Object.assign({}, this.item);
    }
    this.loading = false;
  },
  methods: {
    submitNew() {
      db.collection("municipios")
        .add(this.municipio)
        .then(() => {
          this.$emit("success", "Municipio creado exitosamente.");
        })
        .catch((err) => {
          this.snackbarText =
            "Ocurrió un error inesperado, inténtelo nuevamente.";
          this.snackbar = true;
          console.log("error", err);
        });
    },
    updateMunicipio() {
      db.collection("municipios")
        .doc(this.item.id)
        .update(this.municipio)
        .then(() => {
          this.$emit("success", "Municipio actualizado exitosamente.");
        })
        .catch((err) => {
          this.snackbarText =
            "Ocurrió un error inesperado, inténtelo nuevamente.";
          this.snackbar = true;
          console.log(`error:`, err);
        });
    },
  },
};
</script>
