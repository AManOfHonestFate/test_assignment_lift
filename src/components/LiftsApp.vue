<template>
  <div class="flex justify-center items-center m-12">
    <div class="flex w-full border-4 border-neutral-900 bg-neutral-100 total-height solid-lines">
      <LiftShaft v-for="shaft in numberOfLifts" :key="shaft"></LiftShaft>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import LiftShaft from "@/components/LiftShaft";
export default {
  name: "LiftsApp",
  components: {LiftShaft},
  computed: {
    ...mapState({
      floorHeight: state => state.floorHeight + 'rem',
      numberOfFloors: state => state.numberOfFloors,
      numberOfLifts: state => state.numberOfLifts
    }),
    ...mapGetters([
        'totalHeight'
    ])
  }
}
</script>

<style scoped>
.solid-lines {
  background-image: linear-gradient(to top, black 2px, transparent 1px);
  background-size: 100% v-bind(floorHeight);
}

.total-height {
  height: v-bind(totalHeight);
}
</style>