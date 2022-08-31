<template>
  <div class="flex justify-center items-center m-12">
    <div class="flex w-full bg-neutral-100 total-height solid-lines">
      <LiftShaft v-for="shaft in numberOfLifts" :key="shaft">
        <LiftCab></LiftCab>
      </LiftShaft>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, useStore } from 'vuex';
import {onMounted} from "vue";
import LiftShaft from "@/components/LiftShaft";
import LiftCab from "@/components/LiftCab";
export default {
  name: "LiftsApp",
  components: {LiftCab, LiftShaft},
  computed: {
    ...mapState({
      floorHeight: state => state.floorHeight + 'rem',
      numberOfFloors: state => state.numberOfFloors,
      numberOfLifts: state => state.numberOfLifts
    }),
    ...mapGetters([
        'totalHeight'
    ])
  },
  setup() {
    const store = useStore();

    onMounted(() => store.commit('setStatuses'));
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