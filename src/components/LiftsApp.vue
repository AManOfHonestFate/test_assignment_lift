<template>
  <div class="flex justify-center items-center m-12">
    <div class="flex w-full bg-neutral-100 total-height solid-lines">
      <LiftShaft v-for="lift in lifts" :key="lift">
        <LiftCab></LiftCab>
      </LiftShaft>
      <ButtonsContainer></ButtonsContainer>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, useStore } from 'vuex';
import {onMounted, watch} from "vue";
import LiftShaft from "@/components/LiftShaft";
import LiftCab from "@/components/LiftCab";
import ButtonsContainer from "@/components/ButtonsContainer";

export default {
  name: "LiftsApp",
  components: {ButtonsContainer, LiftCab, LiftShaft},
  computed: {
    ...mapState({
      floorHeight: state => state.floorHeight + 'rem',
      numberOfFloors: state => state.numberOfFloors,
      lifts: state => state.liftsStatuses.length
    }),
    ...mapGetters([
        'totalHeight'
    ])
  },
  setup() {
    const store = useStore();

    onMounted(() => {
      store.commit('setButtonStatuses');
      store.commit('setLiftStatuses');
    });

    function resolveLifts() {

    }

    watch(store.state.callQueue, resolveLifts)
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

:global(.floor-height) {
  height: v-bind(floorHeight);
}
</style>