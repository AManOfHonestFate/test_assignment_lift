<template>
  <div class="flex flex-col text-sm m-auto items-center">
    <div :class="{
      'text-transparent': direction !== 'up',
      'text-neutral-50': direction === 'up'
    }">UP</div>
    <div class="flex w-6 h-6 bg-gray-50 rounded-full">
      <div class="m-auto" :class="{'text-transparent': direction === 'none'}">{{ targetFloor }}</div>
    </div>
    <div :class="{
      'text-transparent': direction !== 'down',
      'text-neutral-50': direction === 'down'
    }">DOWN</div>
  </div>
</template>

<script>
export default {
  name: "LiftIndicator",
  props: {
    direction: String,
    targetFloor: Number
  }
}
</script>