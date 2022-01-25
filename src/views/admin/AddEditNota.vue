<template>
  <div id="add-edit-nota">
    <v-card class="px-2">
      <v-card-title>
        <span class="headline">
          {{ type == "new" ? "Nuevo" : "Editar" }} Nota
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
              <v-menu
                v-model="dateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="formattedDate"
                    label="Fecha"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="nota.date"
                  @input="dateMenu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row align="end">
            <v-col cols="12" md="6">
              <v-text-field
                label="Titular"
                v-model="nota.titular"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                :items="agresionItems"
                label="Tipo de agresión"
                v-model="nota.tipo_de_agresion"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                :items="generoItems"
                label="Género"
                v-model="nota.genero"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Agresor"
                v-model="nota.agresor"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                :items="communicationItems"
                label="Medio de comunicación"
                v-model="nota.medio_de_comunucacion"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Link"
                v-model="nota.link"
                type="url"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                :items="departamentos"
                label="Departamento"
                v-model="nota.departamento"
                item-value="id"
                item-text="nombre"
                return-object
                @change="getMunicipios"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                :items="municipios"
                label="Municipio"
                v-model="nota.municipio"
                item-value="id"
                item-text="nombre"
                return-object
                required
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-textarea
                name="input-7-1"
                label="Narración"
                v-model="nota.narracion"
                required
              ></v-textarea>
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
                  @click="updateNota()"
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
import { municipiosCollection, notasCollection } from "@/firebaseConfig";
import moment from "moment";
import { mapState } from "vuex";

export default {
  name: "AddEditNota",
  props: {
    type: {
      type: String,
      required: true,
    },
    item: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      municipios: [],
      loading: true,
      snackbarText: "",
      snackbar: false,
      dateMenu: false,
      nota: {
        date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substring(0, 10),
        titular: "",
        tipo_de_agresion: "",
        genero: "",
        agresor: "",
        medio_de_comunucacion: "",
        link: "",
        departamento: "",
        municipio: "",
        narracion: "",
      },
      agresionItems: [
        "Agresión física",
        "Amenazas",
        "Asesinato",
        "Censura",
        "Criminalización de la protesta pública",
        "Detención arbitraria",
        "Estigmatización",
        "Intimidación",
        "Obstrucción informativa",
        "Otro",
        "Procesos legales",
        "Uso abusivo del poder del Estado",
      ],
      generoItems: ["Femenino", "Masculino", "LGTTBQ+"],
      communicationItems: [
        "Tv",
        "Radio",
        "Digital",
        "Ninguno",
        "Varios",
        "Otro",
      ],
    };
  },
  mounted() {
    let scrollPosition = document.getElementsByClassName("v-dialog")[0];
    if (scrollPosition) scrollPosition.scrollTop = 0;
    if (this.type == "edit") {
      let selectedDepartamento = this.departamentos.filter(
        (departamento) => departamento.id == this.item.departamentoId
      )[0];

      let selectedMunicipio = this.allMunicipios.filter(
        (municipio) => municipio.id == this.item.municipioId
      )[0];

      this.nota = Object.assign({}, this.item, {
        departamento: selectedDepartamento,
        municipio: selectedMunicipio,
      });

      this.getMunicipios(selectedDepartamento);
    }
    this.loading = false;
  },
  methods: {
    submitNew() {
      notasCollection
        .add({
          date: this.nota.date,
          titular: this.nota.titular,
          tipo_de_agresion: this.nota.tipo_de_agresion,
          genero: this.nota.genero,
          agresor: this.nota.agresor,
          medio_de_comunucacion: this.nota.medio_de_comunucacion,
          link: this.nota.link,
          departamentoNombre: this.nota.departamento.nombre,
          departamentoId: this.nota.departamento.id,
          municipioNombre: this.nota.municipio.nombre,
          municipioId: this.nota.municipio.id,
          latitud: this.nota.municipio.latitud,
          longitud: this.nota.municipio.longitud,
          narracion: this.nota.narracion,
        })
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
    updateNota() {
      notasCollection
        .doc(this.item.id)
        .update({
          date: this.nota.date,
          titular: this.nota.titular,
          tipo_de_agresion: this.nota.tipo_de_agresion,
          genero: this.nota.genero,
          agresor: this.nota.agresor,
          medio_de_comunucacion: this.nota.medio_de_comunucacion,
          link: this.nota.link,
          departamentoNombre: this.nota.departamento.nombre,
          departamentoId: this.nota.departamento.id,
          municipioNombre: this.nota.municipio.nombre,
          municipioId: this.nota.municipio.id,
          latitud: this.nota.municipio.latitud,
          longitud: this.nota.municipio.longitud,
          narracion: this.nota.narracion,
        })
        .then(() => {
          this.$emit("success", "Nota actualizado exitosamente.");
        })
        .catch((err) => {
          this.snackbarText =
            "Ocurrió un error inesperado, inténtelo nuevamente.";
          this.snackbar = true;
          console.log(`error:`, err);
        });
    },
    getMunicipios(department) {
      this.municipios = [];
      municipiosCollection
        .where("departamentoId", "==", department.id)
        .orderBy("nombre", "asc")
        .get()
        .then((municipios) => {
          municipios.forEach((item) => {
            this.municipios.push(Object.assign({ id: item.id }, item.data()));
          });
        });
    },
  },
  computed: {
    ...mapState(["departamentos", "allMunicipios"]),
    formattedDate() {
      return this.nota.date ? moment(this.nota.date).format("DD/MM/YYYY") : "";
    },
  },
};
</script>
