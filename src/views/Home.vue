<template>
  <div>
    <v-container>
      <!-- <MapVisual></MapVisual> -->
      <MapBox></MapBox>
    </v-container>
  </div>
</template>

<script>
// import MapVisual from "@/components/MapComponents/MapVisual";
// import { departmentsCollection } from "@/firebaseConfig";
import MapBox from "@/components/MapComponents/MapBox";

export default {
  name: "Home",
  components: {
    // MapVisual,
    MapBox,
  },
  data() {
    return {
      departments: [],
    };
  },
  mounted() {
    this.$store.commit("setAdminNavBar", this.$route.meta.adminNavBar);
  },
};
</script>
