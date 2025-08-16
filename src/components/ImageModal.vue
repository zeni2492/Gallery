<script setup lang="ts">
import type {ImageCardData} from "../Types/CardType.ts";
import {onMounted, onUnmounted} from "vue";

const props = defineProps<{
  ImageData : ImageCardData
}>()

const emit = defineEmits(['close'])

const handleClose = () => {
  emit('close')
}

const closeOnBackdrop = (event: MouseEvent) => {
  if ((event.target as HTMLElement).classList.contains('modal')) {
    emit('close');
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    emit('close');
  }
};

onMounted(() => window.addEventListener('keydown', handleKeydown));
onUnmounted(() => window.removeEventListener('keydown', handleKeydown));
</script>

<template>
<div @click="closeOnBackdrop"
     class="modal rounded-md fixed top-1/2
     left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white
     w-1/3 h-auto z-10 cursor-default px-[15px] pt-[15px]
     flex flex-col  pb-12 min-w-80"
>
  <div class="modal-dialog w-full flex justify-between items-start   ">
    <div class="modal-header">
      <h1 >{{props.ImageData.title}}</h1>
      <div>
        {{props.ImageData.Date}} •
        {{props.ImageData.Duration}} •
        {{props.ImageData.comments}}
      </div>
    </div>
    <button @click="handleClose" class="CloseButton mt-2"><img src="../assets/icons/Close.svg" alt="close"></button>
  </div>
  <div class="modal-body flex flex-col items-center justify-center">
    <img class="w-full" :src="ImageData.img" alt="">
    <div class="text-black mt-4">
      {{props.ImageData.fullDescription}}
    </div>
    <div class="w-full mt-[10px]">
      <span v-for="(tag, index) in props.ImageData.tags" :key="index" class="tag px-[14px] py-[6px] mr-2">
            {{ tag }}<span v-if="index !== props.ImageData.tags.length - 1"></span>
      </span>
    </div>
  </div>

  <div class="modal-comments">

  </div>
</div>
</template>

<style scoped>
.modal{
  box-shadow: 0 4px 8px 1000px rgba(0, 0, 0, 0.15);
  @media (max-width: 400px) {
        width: 100%;
        height: 100vh;
  }
}

.tag{
  background: #EEF6FF;
  color: #2884EF;
  border-radius: 20px;
}
</style>