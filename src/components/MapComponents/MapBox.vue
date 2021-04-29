<template>
  <div id="container">
    <div id="mapContainer"></div>
  </div>
</template>
<script>
import L from "leaflet";
const accessToken =
  "pk.eyJ1Ijoiam9jdmVnYXIiLCJhIjoiY2tvMWljN3R2MG01cTJucnRhajd3OXVvNSJ9.XVf_8jXk9CZg07XolcEZ3Q";
const id = "mapbox/satellite-v9";

export default {
  name: "Map",
  data() {
    return {
      center: [47.31322, -1.319482],
    };
  },
  methods: {
    setupLeafletMap: function() {
      const mapDiv = L.map("mapContainer").setView(this.center, 13);
      L.tileLayer(
        `https://api.mapbox.com/styles/v1/${id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`,
        {
          attribution:
            'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v11",
          accessToken: accessToken,
        }
      ).addTo(mapDiv);
    },
  },
  mounted() {
    this.setupLeafletMap();
  },
};
</script>

<style scoped>
#mapContainer {
  width: 80vw;
  height: 100vh;
}
</style>
