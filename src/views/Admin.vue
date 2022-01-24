<template>
  <v-container class="px-2">
    <div class="d-flex align-center">
      <v-img
        alt="Cibre"
        class="shrink mx-auto"
        contain
        src="@/assets/clibre_logo.jpg"
        width="200"
      />
    </div>
    <v-divider class="my-10"></v-divider>

    <h1 class="text-center blue--text text--darken-3">
      Comité por la Libre Expresión
    </h1>
    <div class="d-flex align-center mt-10 px-5">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim repellat
      delectus eveniet voluptatibus reprehenderit ratione accusantium. Ut iusto
      recusandae praesentium sed veniam aperiam repudiandae ullam iste repellat
      rerum, quod unde.
    </div>
  </v-container>
</template>

<script>
export default {
  name: "admin",
  mounted() {
    this.$store.commit("setAdminNavBar", this.$route.meta.adminNavBar);
  },
};
</script>
