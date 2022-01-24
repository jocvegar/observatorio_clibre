<template>
  <div id="container">
    <div id="mapContainer">
      <LMap :zoom="zoom" :center="center" style="z-index: 0">
        <LTileLayer :url="url"></LTileLayer>
        <LMarker
          v-for="noticia in noticias"
          :lat-lng="[noticia.latitud, noticia.longitud]"
          :key="noticia.id"
        >
          <LPopup>{{ noticia.noticia }}</LPopup>
          <LTooltip>{{ noticia.noticia }}</LTooltip>
        </LMarker>
      </LMap>
    </div>
  </div>
</template>

<script>
import { mapbox } from "../../../mapConfig";
const accessToken = mapbox.apiKey;
const id = "mapbox/streets-v11";
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet";
import { noticiasCollection } from "@/firebaseConfig";
// import { municipiosCollection } from "@/firebaseConfig";

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
      center: [14.594215561943921, -86.9293212890625],
      url: `https://api.mapbox.com/styles/v1/${id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`,
      zoom: 8,
      noticias: [],
      loading: true,
    };
  },
  mounted() {
    this.getNoticias();
  },
  methods: {
    getNoticias() {
      noticiasCollection.onSnapshot((noticias) => {
        const noticiasArray = [];
        noticias.docs.forEach((noticia) => {
          noticiasArray.push(Object.assign({ id: noticia.id }, noticia.data()));
        });
        this.noticias = noticiasArray;
      });
      this.loading = false;
    },
  },
};
</script>

<style scoped>
#mapContainer {
  height: 80vh;
}
</style>
