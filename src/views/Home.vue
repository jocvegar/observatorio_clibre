<template>
  <div>
    <MapVisual></MapVisual>
    <ul>
      <li v-for="dept in departments" :key="dept.id">
        {{ dept.nombre }}
      </li>
    </ul>
  </div>
</template>

<script>
import MapVisual from "@/components/MapComponents/MapVisual";
import { departmentsCollection } from "@/firebaseConfig";

export default {
  name: "Home",
  components: {
    MapVisual,
  },
  data() {
    return {
      departments: [],
    };
  },
  mounted() {
    departmentsCollection.onSnapshot((departments) => {
      const departmentArray = [];
      departments.docs.forEach((department) => {
        departmentArray.push(
          Object.assign({ id: department.id }, department.data())
        );
      });
      this.departments = departmentArray;
    });
  },
};
</script>
