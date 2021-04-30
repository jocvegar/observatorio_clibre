<template>
  <div id="container">
    <div id="mapContainer">
      <LMap :zoom="zoom" :center="center">
        <LTileLayer :url="url"></LTileLayer>
        <LMarker :lat-lng="[14.0849, -87.2077]">
          <LPopup>300 Casos</LPopup>
        </LMarker>
        <LMarker :lat-lng="[15.5313, -88.1384]">
          <LPopup>100 Casos</LPopup>
          <LTooltip>Click más informacion</LTooltip>
        </LMarker>
      </LMap>
    </div>
  </div>
</template>
<script>
// import L from "leaflet";
const accessToken =
  "pk.eyJ1Ijoiam9jdmVnYXIiLCJhIjoiY2tvMWljN3R2MG01cTJucnRhajd3OXVvNSJ9.XVf_8jXk9CZg07XolcEZ3Q";
const id = "mapbox/streets-v11";
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
  },
  data() {
    return {
      center: [14.0849, -87.2077],
      url: `https://api.mapbox.com/styles/v1/${id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`,
      zoom: 8,
      markerLatLng: [14.0849, -87.2077],
    };
  },
  methods: {
    setupLeafletMap: function() {
      // const mapDiv = L.map("mapContainer").setView(this.center, 13);
      // L.tileLayer(
      //   `https://api.mapbox.com/styles/v1/${id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`,
      //   {
      //     attribution:
      //       'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
      //     maxZoom: 8,
      //     id: "mapbox/streets-v11",
      //     accessToken: accessToken,
      //   }
      // ).addTo(mapDiv);
    },
  },
  mounted() {
    this.setupLeafletMap();
  },
};
</script>

<style scoped>
#mapContainer {
  height: 80vh;
}
</style>
