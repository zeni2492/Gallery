<script setup lang="ts">
const props = defineProps<{
  IsPrimaryButton?: boolean
}>()
</script>

<template>
  <button v-if="!IsPrimaryButton"
          class="bg-Primary-Light text-Primary py-3 px-9 rounded-md hover:bg-[#E0ECFF]">
    <slot></slot>
  </button>
  <button v-else
          class="bg-Primary text-white py-3 px-4 rounded-md hover:bg-[#2D83EB] disabled:opacity-50 disabled:cursor-not-allowed">
    <slot></slot>
  </button>
</template>
