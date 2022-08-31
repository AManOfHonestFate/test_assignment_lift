<template>
  <div class="flex flex-col-reverse h-full">
    <div class="flex" v-for="button in buttons" :key="button">
      {{ button }}
      <LiftButton :id="button - 1"></LiftButton>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import LiftButton from "@/components/LiftButton";

export default {
  name: "ButtonsContainer",
  components: {LiftButton},
  computed: {
    ...mapState({
      buttons: state => state.buttonStatuses.length
    })
  }
}
</script>