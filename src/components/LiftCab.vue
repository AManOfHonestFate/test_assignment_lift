<template>
  <div class="w-24 floor-height px-2 pt-2 pb-1 translate-lift">
    <div
        class="h-full rounded-2xl bg-indigo-600 outline outline-2 outline-neutral-900 box-border"
        :class="{'animate-pulse': resting}"
    ></div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "LiftCab",
  props: {
    id: Number
  },
  computed: {
    ...mapState({
      floorsPerSecond: state => state.floorsPerSecond,
      floorHeight: state => state.floorHeight,
    }),
    target() {return this.$store.state.liftsStatuses[this.id].targetFloor},
    current() {return this.$store.state.liftsStatuses[this.id].currentFloor},
    resting() {return this.$store.state.liftsStatuses[this.id].resting},
    translate() {
      return '-' + this.target * this.floorHeight + 'rem';
    },
    time() {
      return Math.abs(this.floorsPerSecond * (this.target - this.current)) + 's';
    },
  },
}
</script>

<style scoped>
.translate-lift {
  transition: transform v-bind(time) linear;
  transform: translateY(v-bind(translate));
}
</style>