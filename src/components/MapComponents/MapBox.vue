<template>
  <div id="container">
    <div id="mapContainer">
      <LMap :zoom="zoom" :center="center" style="z-index: 0">
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
const accessToken =
  "pk.eyJ1Ijoiam9jdmVnYXIiLCJhIjoiY2tvMWljN3R2MG01cTJucnRhajd3OXVvNSJ9.XVf_8jXk9CZg07XolcEZ3Q";
const id = "mapbox/streets-v11";
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet";

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip,
  },
  data() {
    return {
      center: [14.0849, -87.2077],
      url: `https://api.mapbox.com/styles/v1/${id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`,
      zoom: 8,
      markerLatLng: [14.0849, -87.2077],
    };
  },
};
</script>

<style scoped>
#mapContainer {
  height: 80vh;
}
</style>
