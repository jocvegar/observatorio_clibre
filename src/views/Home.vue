<template>
  <div>
    <vue-excel-xlsx
      :data="filteredNotas"
      :columns="headers"
      :file-name="'notas_' + new Date().toISOString().slice(0, 10)"
      :file-type="'xlsx'"
      class="pt-6 d-flex justify-end pr-5"
      id="export-excel"
    >
      <v-btn
        color="primary"
        elevation="2"
        :disabled="filteredNotas.length == 0"
      >
        Descargar Reporte
      </v-btn>
    </vue-excel-xlsx>
    <v-card :loading="loading" class="mx-auto mt-4" elevation="0">
      <template slot="progress">
        <v-progress-linear color="blue" indeterminate></v-progress-linear>
      </template>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="3" sm="6" class="pb-0">
            <v-select
              :items="yearsArray"
              v-model="year"
              label="Año"
              outlined
              dense
            ></v-select>
          </v-col>
          <v-col cols="12" md="3" sm="6" class="pb-0">
            <v-select
              clearable
              :items="departamentos"
              v-model="departamento"
              item-value="id"
              item-text="nombre"
              label="Departamento"
              outlined
              dense
            ></v-select>
          </v-col>
          <v-col cols="12" md="3" sm="6" class="pb-0">
            <v-select
              clearable
              :items="agresionItems"
              v-model="agresion"
              label="Tipo de Agresión"
              outlined
              dense
            ></v-select>
          </v-col>
          <v-col cols="12" md="3" sm="6" class="pb-0">
            <v-select
              clearable
              :items="items"
              v-model="violacion"
              label="Tipo de Violación"
              outlined
              dense
            ></v-select>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-container fluid>
      <!-- <MapVisual></MapVisual> -->
      <MapBox :notas="notasByDepartamento"></MapBox>
      <NotasLoop :notas="filteredNotas" />
    </v-container>
  </div>
</template>

<script>
// import MapVisual from "@/components/MapComponents/MapVisual";
import { mapState } from "vuex";
import MapBox from "@/components/MapComponents/MapBox";
import NotasLoop from "@/components/NotasLoop";

export default {
  name: "Home",
  components: {
    // MapVisual,
    MapBox,
    NotasLoop,
  },
  data() {
    return {
      items: ["Foo", "Bar", "Fizz", "Buzz"],
      year: new Date().getFullYear(),
      departamento: "",
      agresion: "",
      violacion: "",
      loading: true,
      yearsArray: [],
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
      headers: [
        {
          label: "Fecha",
          field: "date",
        },
        {
          label: "Titular",
          field: "titular",
        },
        {
          label: "Tipo de agresión",
          field: "tipo_de_agresion",
        },
        {
          label: "Genero",
          field: "genero",
        },
        {
          label: "Agresor",
          field: "agresor",
        },
        {
          label: "Medio de comunicación",
          field: "medio_de_comunucacion",
        },
        {
          label: "Link",
          field: "link",
        },
        {
          label: "Departamento",
          field: "departamentoNombre",
        },
        {
          label: "Municipio",
          field: "municipioNombre",
        },
        {
          label: "Narración",
          field: "narracion",
        },
      ],
    };
  },
  mounted() {
    this.$store.commit("setAdminNavBar", this.$route.meta.adminNavBar);
    this.getYearArray();
    this.loading = false;
  },
  computed: {
    ...mapState(["notas", "departamentos"]),
    filteredNotas() {
      let filteredNotas = [];
      filteredNotas = this.notas.filter((nota) =>
        nota.date.includes(this.year)
      );

      if (this.departamento && this.departamento.length > 0) {
        filteredNotas = filteredNotas.filter(
          (nota) => nota.departamentoId == this.departamento
        );
      }

      if (this.agresion && this.agresion.length > 0) {
        filteredNotas = filteredNotas.filter(
          (nota) => nota.tipo_de_agresion == this.agresion
        );
      }

      return filteredNotas;
    },
    notasByDepartamento() {
      return this.lodash.groupBy(this.filteredNotas, "municipioId");
    },
  },
  methods: {
    getYearArray() {
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let i = currentYear; i > currentYear - 15; i--) {
        years.push(i);
      }
      this.yearsArray = years;
    },
  },
};
</script>

<style scoped>
#export-excel {
  width: 100%;
}
</style>
