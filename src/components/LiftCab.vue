<template>
  <div class="w-24 mx-1 cab-height rounded-2xl bg-indigo-600 outline outline-2 outline-neutral-900 box-border translate-lift"></div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "LiftCab",
  data() {
    return {translate: 0}
  },
  computed: {
    ...mapState({
      cabHeight: state => state.floorHeight + "rem"
    }),
  },
}
</script>

<style scoped>
.cab-height {
  height: v-bind(cabHeight);
}

.translate-lift {
  transition: transform 1s linear;
  transform: translateY(v-bind(translate));
}
</style>