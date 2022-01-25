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
          nota:{{ nota }} <br />

          <span>{{ nota.date | moment("DD/MM/YYYY") }}</span>

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
                    :value="latinDateFormat"
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
import {
  db,
  departmentsCollection,
  municipiosCollection,
} from "@/firebaseConfig";
import moment from "moment";

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
      departamentos: [],
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
    this.getDepartments();
    if (this.type == "edit") {
      this.nota = Object.assign({}, this.item);
    }
    this.loading = false;
  },
  methods: {
    submitNew() {
      // db.collection("municipios")
      //   .add(this.municipio)
      //   .then(() => {
      //     this.$emit("success", "Municipio creado exitosamente.");
      //   })
      //   .catch((err) => {
      this.snackbarText = "Ocurrió un error inesperado, inténtelo nuevamente.";
      this.snackbar = true;
      // console.log("error", err);
      // });
    },
    updateNota() {
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
    getDepartments() {
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
          this.departamentos = departmentArray;
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
    latinDateFormat() {
      return this.nota.date ? moment(this.nota.date).format("DD/MM/YYYY") : "";
    },
  },
};
</script>
