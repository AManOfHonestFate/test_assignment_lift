<template>
  <div class="floor-height pl-4 pt-4">
    <div
      @click="addToQueue"
      class="rounded-full bg-neutral-900 w-4 h-4 flex cursor-pointer"
    >
      <div
        class="rounded-full w-1.5 h-1.5 m-auto"
        :class="{
          'bg-green-500': !status.pressed,
          'bg-red-500': status.pressed,
        }"
      ></div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "LiftButton",
  props: {
    id: Number,
  },
  setup(props) {
    const store = useStore();

    // gets its status from store
    const status = computed(() => store.state.buttonStatuses[props.id]);

    // dispatches action on click
    function addToQueue() {
      store.dispatch("addToQueue", props.id);
    }

    return {
      addToQueue,
      status,
    };
  },
};
</script>
