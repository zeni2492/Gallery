<script setup lang="ts">
import { ref } from "vue";
import type { ImageCardData } from "../Types/CardType.ts";
import ImageModal from "./ImageModal.vue";

const props = defineProps<{
  ImageData: ImageCardData[];
}>();

const OpenModal = ref(false);
const selectedImage = ref<ImageCardData | null>(null);

const openImageModal = (image: ImageCardData, event: MouseEvent) => {
  event.stopPropagation();
  selectedImage.value = image;
  OpenModal.value = true;
};

const closeModal = () => {
  OpenModal.value = false;
  selectedImage.value = null;
};

</script>

<template>
  <div v-for="data in props.ImageData" :key="data.id" class="card bg-white rounded-lg cursor-pointer">
    <img
        :src="data.img"
        :alt="data.title"
        class="card-image"
        @click.stop="openImageModal(data, $event)"
    >
    <div class="card-content">
      <div class="flex gap-2">
        <p class="date">{{ data.Date }} •</p>
        <p class="date">{{ data.Duration }} •</p>
        <p class="date">{{ data.comments }}</p>
      </div>
      <h2 class="title">{{ data.title }}</h2>
      <p class="description">{{ data.desc }}</p>
      <div class="actions">
        <div class="tags">
          <span v-for="(tag, index) in data.tags" :key="index" class="tag px-[14px] py-[6px] mr-2">
            {{ tag }}<span v-if="index !== data.tags.length - 1"></span>
          </span>
        </div>
      </div>
    </div>

    <ImageModal
        v-if="OpenModal && selectedImage"
        :ImageData="selectedImage"
        @close="closeModal"
    />
  </div>
</template>

<style scoped>
.card {
  overflow: hidden;
  font-family: Arial, sans-serif;
  width: 100%;
  max-width: 100%;
}

.card-image {
  width: 100%;
  height: auto;
  display: block;
}

.card-content {
  padding-top: 10px;
}

.date {
  font-size: 12px;
  color: #666;
}

.title {
  font-size: 18px;
  margin: 5px 0;
}

.description {
  font-size: 14px;
  color: #333;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

button {
  padding: 5px 10px;
  border: none;
  background-color: #f0f0f0;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #e0e0e0;
}
.tag{
  background: #EEF6FF;
  color: #2884EF;
  border-radius: 20px;
}
</style>