<template>
  <v-container class="px-2">
    <v-row class="pa-0 ma-0">
      <v-col cols="12">
        <h1>Municipios</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="py-0">
        <v-row justify="end">
          <v-btn
            color="primary"
            class="ma-2 white--text"
            :loading="loading"
            @click="newMunicipio"
          >
            <v-icon right dark class="mr-3">fas fa-plus</v-icon>
            Crear municipio
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
    <br />
    <v-row class="pa-0 ma-0">
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="municipios"
          :items-per-page="10"
          :loading="loading"
          :sort-desc="true"
          sort-by="nombre"
          :footer-props="{
            itemsPerPageOptions: [10, 25, 50, 100, 250],
          }"
        >
          <template v-slot:[`item.departamentoId`]="{ item }">
            {{ handleDepartamentoName(item.departamentoId) }}
          </template>

          <template v-slot:[`item.options`]="{ item }">
            <v-btn
              @click="editMunicipio(item)"
              small
              class="mx-4"
              rounded
              outlined
              color="secondary"
            >
              Editar
            </v-btn>

            <v-btn
              @click="deleteMunicipio(item)"
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
      </v-col>
    </v-row>

    <v-dialog persistent v-model="modalAddEdit" max-width="90vw">
      <add-edit-municipio
        :type="type"
        :departamentos="departamentos"
        @cancel="modalAddEdit = false"
        @success="handleSuccess"
        :key="randomKey"
        :item="item"
      ></add-edit-municipio>
    </v-dialog>
  </v-container>
</template>

<script>
import AddEditMunicipio from "./AddEditMunicipio";
import {
  db,
  departmentsCollection,
  municipiosCollection,
} from "@/firebaseConfig";
export default {
  name: "admin",
  components: {
    AddEditMunicipio,
  },
  data() {
    return {
      loading: true,
      snackbar: false,
      snackbarText: "",
      municipios: [],
      departamentos: [],
      type: "",
      item: null,
      randomKey: 0,
      modalAddEdit: false,
      headers: [
        {
          text: "Nombre",
          value: "nombre",
        },
        {
          text: "Departamento",
          value: "departamentoId",
        },
        {
          text: "Latitud",
          value: "latitud",
        },
        {
          text: "Longitud",
          value: "longitud",
        },
        {
          value: "options",
          sortable: false,
        },
      ],
    };
  },
  mounted() {
    this.getDepartments();
    this.getMunicipios();
  },
  methods: {
    getDepartments() {
      departmentsCollection.onSnapshot((departments) => {
        const departmentArray = [];
        departments.docs.forEach((department) => {
          departmentArray.push(
            Object.assign({ id: department.id }, department.data())
          );
        });
        this.departamentos = departmentArray;
      });
    },
    getMunicipios() {
      municipiosCollection.onSnapshot((municipios) => {
        const municipioArray = [];
        municipios.docs.forEach((municipio) => {
          municipioArray.push(
            Object.assign({ id: municipio.id }, municipio.data())
          );
        });
        this.municipios = municipioArray;
      });
      this.loading = false;
    },
    newMunicipio() {
      this.randomKey = Math.random();
      this.type = "new";
      this.item = null;
      this.modalAddEdit = true;
    },
    editMunicipio(item) {
      this.randomKey = Math.random();
      this.type = "edit";
      this.item = item;
      this.modalAddEdit = true;
    },
    deleteMunicipio(item) {
      if (confirm(`¿Estás seguro de eliminar ${item.nombre}?`)) {
        db.collection("municipios")
          .doc(item.id)
          .delete()
          .then(() => {
            this.snackbarText = "Municipio borrado";
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
    handleDepartamentoName(departamentoId) {
      return this.departamentos.find((dept) => dept.id == departamentoId)
        .nombre;
    },
  },
};
</script>
