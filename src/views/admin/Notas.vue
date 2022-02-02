<template>
  <v-container class="px-2">
    <v-row class="pa-0 ma-0">
      <v-col cols="12">
        <h1>Notas</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="py-0">
        <v-row justify="end" class="mr-2">
          <v-btn
            color="primary"
            class="ma-2 white--text"
            :loading="loading"
            @click="newNota"
          >
            <v-icon right dark class="mr-3">fas fa-plus</v-icon>
            Crear nota
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
    <br />
    <v-row class="pa-0 ma-0">
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="notas"
            :items-per-page="10"
            :loading="loading"
            :sort-desc="true"
            sort-by="date"
            :search="search"
            :footer-props="{
              itemsPerPageOptions: [10, 25, 50, 100, 250],
            }"
          >
            <template v-slot:[`item.date`]="{ item }">
              <span>{{ item.date | moment("DD/MM/YYYY") }}</span>
            </template>

            <template v-slot:[`item.options`]="{ item }">
              <v-btn
                @click="editNota(item)"
                small
                class="mx-4"
                rounded
                outlined
                color="secondary"
              >
                Editar
              </v-btn>
              <v-btn
                @click="deleteNota(item)"
                small
                class="mx-4"
                rounded
                outlined
                color="red"
              >
                Eliminar
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog persistent v-model="modalAddEdit" max-width="90vw">
      <add-edit-nota
        :type="type"
        @cancel="modalAddEdit = false"
        @success="handleSuccess"
        :key="randomKey"
        :item="item"
      ></add-edit-nota>
    </v-dialog>
  </v-container>
</template>

<script>
import AddEditNota from "./AddEditNota";
import { notasCollection } from "@/firebaseConfig";
export default {
  name: "notas",
  components: {
    AddEditNota,
  },
  data() {
    return {
      search: "",
      loading: true,
      snackbar: false,
      snackbarText: "",
      notas: [],
      type: "",
      item: null,
      randomKey: 0,
      modalAddEdit: false,
      headers: [
        {
          text: "Fecha",
          value: "date",
          class: "nowrap",
        },
        {
          text: "Titular",
          value: "titular",
          class: "nowrap",
          width: "400px",
        },
        {
          text: "Tipo de agresión",
          value: "tipo_de_agresion",
          class: "nowrap",
        },
        {
          text: "Agresor",
          value: "agresor",
          class: "nowrap",
        },
        {
          text: "Alerta",
          value: "alerta",
          class: "nowrap",
        },
        {
          text: "Victima",
          value: "victima",
          class: "nowrap",
        },
        {
          text: "Género",
          value: "genero",
          class: "nowrap",
        },
        {
          text: "Medio de comunicación",
          value: "medio_de_comunucacion",
          class: "nowrap",
        },
        {
          text: "Link",
          value: "link",
          class: "nowrap",
        },
        {
          text: "Departamento",
          value: "departamentoNombre",
          class: "nowrap",
        },
        {
          text: "Municipio",
          value: "municipioNombre",
          class: "nowrap",
        },
        {
          text: "Narración",
          value: "narracion",
          class: "nowrap",
          width: "600px",
        },
        {
          value: "options",
          align: "end",
          sortable: false,
          width: "300px",
        },
      ],
    };
  },
  mounted() {
    this.getNotas();
    this.$store.commit("setAdminNavBar", this.$route.meta.adminNavBar);
  },
  methods: {
    getNotas() {
      notasCollection.onSnapshot((notas) => {
        const notasArray = [];
        notas.docs.forEach((nota) => {
          notasArray.push(Object.assign({ id: nota.id }, nota.data()));
        });
        this.notas = notasArray;
      });
      this.loading = false;
    },
    newNota() {
      this.randomKey = Math.random();
      this.type = "new";
      this.item = null;
      this.modalAddEdit = true;
    },
    editNota(item) {
      this.randomKey = Math.random();
      this.type = "edit";
      this.item = item;
      this.modalAddEdit = true;
    },
    deleteNota(item) {
      if (confirm(`¿Estás seguro de eliminar nota?`)) {
        notasCollection
          .doc(item.id)
          .delete()
          .then(() => {
            this.snackbarText = "Nota borrado";
            this.snackbar = true;
          })
          .catch((error) => {
            this.snackbarText = `Ocurrió un error inesperado, inténtelo nuevamente. ${error}`;
            this.snackbar = true;
          });
      }
    },
    handleSuccess(data) {
      this.snackbarText = data;
      this.snackbar = true;
      this.modalAddEdit = false;
    },
  },
};
</script>
