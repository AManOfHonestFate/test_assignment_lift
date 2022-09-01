<template>
  <div class="flex justify-center items-center m-12">
    <div class="flex w-full bg-neutral-100 total-height solid-lines">
      <LiftShaft v-for="lift in lifts" :key="lift">
        <LiftCab :id="lift - 1"></LiftCab>
      </LiftShaft>
      <ButtonsContainer></ButtonsContainer>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, useStore } from "vuex";
import { onMounted, watch } from "vue";
import LiftShaft from "@/components/LiftShaft";
import LiftCab from "@/components/LiftCab";
import ButtonsContainer from "@/components/ButtonsContainer";

export default {
  name: "LiftsApp",
  components: { ButtonsContainer, LiftCab, LiftShaft },
  computed: {
    // values from store
    ...mapState({
      // floor height for dynamic css
      floorHeight: (state) => state.floorHeight + "rem",

      // number of lifts for v-for
      lifts: (state) => state.liftsStatuses.length,
    }),
    // total height for dynamic css
    ...mapGetters(["totalHeight"]),
  },
  setup() {
    const store = useStore();

    // initializes app states
    onMounted(() => {
      store.commit("setButtonStatuses");
      store.commit("setLiftStatuses");
    });

    // watches for call queue
    // starts finding free lifts and activates them
    watch(store.state.callQueue, () => store.dispatch("resolveLifts"));
  },
};
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

<style>
body {
  @apply bg-slate-900;
}

* {
  box-sizing: border-box;
}

.floor-height {
  height: v-bind(floorHeight);
}
</style>
