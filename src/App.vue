<template>
  <LiftsApp></LiftsApp>
</template>

<script>
import LiftsApp from "@/components/LiftsApp";
export default {
  name: "App",
  components: {LiftsApp},
};
</script>

<style>
body {
  @apply bg-slate-900;
}

* {
  box-sizing: border-box;
}
</style>