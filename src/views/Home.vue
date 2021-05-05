<template>
  <div>
    <!-- <MapVisual></MapVisual> -->
    <MapBox></MapBox>
  </div>
</template>

<script>
// import MapVisual from "@/components/MapComponents/MapVisual";
import MapBox from "@/components/MapComponents/MapBox";
// import { departmentsCollection } from "@/firebaseConfig";

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
};
</script>
