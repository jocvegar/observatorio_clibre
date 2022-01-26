<template>
  <div>
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
    </v-container>
  </div>
</template>

<script>
// import MapVisual from "@/components/MapComponents/MapVisual";
import { mapState } from "vuex";
import MapBox from "@/components/MapComponents/MapBox";

export default {
  name: "Home",
  components: {
    // MapVisual,
    MapBox,
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
    };
  },
  mounted() {
    this.$store.commit("setAdminNavBar", this.$route.meta.adminNavBar);
    this.getYearArray();
    this.loading = false;
  },
  computed: {
    ...mapState(["notas", "departamentos"]),
    notasByDepartamento() {
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

      return this.lodash.groupBy(filteredNotas, "municipioId");
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
