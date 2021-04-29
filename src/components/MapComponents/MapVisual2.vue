<template>
  <div style="height: 80vh">
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
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 8,
      center: [47.31322, -1.319482],
      markerLatLng: [47.31322, -1.319482],
    };
  },
};
</script>

<script>
import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup,
  LTooltip,
  LIcon,
} from "vue2-leaflet";
export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip,
    LIcon,
  },
  data() {
    return {
      url: "https://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 8,
      center: [14.805, -86.231],
      bounds: null,
    };
  },
};
</script>
