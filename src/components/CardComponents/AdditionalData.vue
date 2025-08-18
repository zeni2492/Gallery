<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { formatter } from '../../composables/useFormatter.ts';
import { useComments } from '../../composables/useComments.ts';

const props = defineProps<{
  Date: string;
  Comments?: string;
  Duration: string;
  postId: string;
}>();

const { commentsCount, subscribeToCommentsCount } = useComments();
let unsubscribe = () => {};

onMounted(() => {
  unsubscribe = subscribeToCommentsCount(props.postId);
});

onUnmounted(() => {
  unsubscribe();
});
</script>

<template>
  <div class="additionalData flex gap-2 items-center">
    <p class="date">{{ formatter(props.Date) }} <span class="mx-[10px]">•</span> </p>
    <span><img src="../../assets/icons/duration.svg" alt=""></span>
    <p class="date">{{ props.Duration }}<span class="mx-[10px]">•</span></p>
    <span><img src="../../assets/icons/comments.svg" alt=""></span>
    <p class="date">{{ commentsCount }}</p>
  </div>
</template>

<style scoped>
.additionalData {
  color: #7E8299;
  margin-top: 8px;
}
</style>