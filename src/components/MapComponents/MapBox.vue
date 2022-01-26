<template>
  <div id="container">
    <div id="mapContainer">
      <LMap
        :zoom="zoom"
        :center="center"
        style="z-index: 0"
        :minZoom="7"
        :options="{ scrollWheelZoom: false }"
      >
        <LTileLayer :url="url"></LTileLayer>
        <LMarker
          v-for="nota in notas"
          :lat-lng="[nota[0].latitud, nota[0].longitud]"
          :key="nota[0].id"
        >
          <LTooltip>{{ nota.length }}</LTooltip>
        </LMarker>
      </LMap>
    </div>
  </div>
</template>

<script>
import { mapbox } from "../../../mapConfig";
const accessToken = mapbox.apiKey;
const id = "mapbox/streets-v11";
import { LMap, LTileLayer, LMarker, LTooltip } from "vue2-leaflet";

export default {
  name: "Map",
  props: {
    notas: {
      type: Object,
      required: true,
    },
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
  },
  data() {
    return {
      center: [14.594215561943921, -86.9293212890625],
      url: `https://api.mapbox.com/styles/v1/${id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`,
      zoom: 8,
      noticias: [],
    };
  },
};
</script>

<style scoped>
#mapContainer {
  height: 70vh;
}
</style>
