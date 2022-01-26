<template>
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
          :sort-desc="false"
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
</template>

<script>
export default {
  props: {
    notas: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      search: "",
      loading: true,
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
        },
        {
          text: "Tipo de agresión",
          value: "tipo_de_agresion",
          class: "nowrap",
        },
        {
          text: "Genero",
          value: "genero",
          class: "nowrap",
        },
        {
          text: "Agresor",
          value: "agresor",
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
        },
      ],
    };
  },
  mounted() {
    this.loading = false;
  },
};
</script>
