<script setup lang="ts">
const props = defineProps<{
  Date: string;
  Comments: string;
  Duration: string;
}>()
</script>

<template>
  <div class="additionalData flex gap-2 items-center">
    <p class="date">{{props.Date}} <span class="mx-[10px]">•</span> </p>
    <span><img src="../../assets/icons/duration.svg"></span>
    <p class="date">{{props.Duration}}<span class="mx-[10px]">•</span></p>
    <span><img src="../../assets/icons/comments.svg"></span>
    <p class="date">{{props.Comments}}</p>
  </div>
</template>

<style scoped>
.additionalData{
  color: #7E8299;
  margin-top: 8px;
}
</style>