<template>
  <div class="w-24 floor-height px-2 pt-2 translate-lift">
    <div class="h-full rounded-2xl bg-indigo-600 outline outline-2 outline-neutral-900 box-border"></div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "LiftCab",
  props: {
    id: Number
  },
  computed: mapState({floorsPerSecond: state => state.floorsPerSecond + 's'}),
}
</script>

<style scoped>
.translate-lift {
  transition: transform v-bind(floorsPerSecond) linear;
  transform: translateY(v-bind(translate));
}
</style>