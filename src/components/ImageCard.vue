<script setup lang="ts">
import { ref } from "vue";
import type { ImageCardData } from "../Types/CardType.ts";
import ImageModal from "./ImageModal.vue";
import AdditionalData from "./CardComponents/AdditionalData.vue";

const props = defineProps<{
  ImageData: ImageCardData[];
}>();

const OpenModal = ref<boolean>(false);
const selectedImage = ref<ImageCardData | null>(null);

const openImageModal = (image: ImageCardData, event: MouseEvent) : void => {
  event.stopPropagation();
  selectedImage.value = image;
  OpenModal.value = true;
};

const closeModal = () :void => {
  OpenModal.value = false;
  selectedImage.value = null;
};

</script>

<template>
  <div v-for="data in props.ImageData" :key="data.id" class="card rounded-lg cursor-pointer">
    <div class="image-container">
      <img
          :src="data.img"
          :alt="data.img"
          class="card-image h-64 rounded-md "
          @click.stop="openImageModal(data, $event)"
      >
    </div>
    <div class="card-content">
      <div class="flex gap-2">
        <AdditionalData :Date="data.Date" :Duration="data.Duration" :Comments="data.comments" :postId="data.id"/>
      </div>
      <h2 class="title text-2xl font-semibold">{{ data.title }}</h2>
      <p class="description text-base font-medium">{{ data.desc }}</p>
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
.image-container{
  object-fit: cover;
  width: 100%;
  img{
    object-fit: cover;
    display: block;
    height: 320px;
    max-height: 350px;
  }
}

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
  background: var(--Primary-Light);
  color: var(--Primary-active);
  border-radius: 20px;
}

</style>