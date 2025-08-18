<script setup lang="ts">
interface ICategory {
  id: number;
  category: string;
  isActive: boolean;
}

const props = defineProps<{
  categories: ICategory[];
  hideCategories: boolean;
}>();

const emit = defineEmits(['toggle-category', 'clear-categories']);

const activateButton = (id: number): void => {
  emit('toggle-category', id);
};
</script>

<template>
  <div :class="{hiddenCategories : props.hideCategories}" class="categories-container">
    <div
        v-for="category in props.categories"
        :key="category.id"
        class="category-item cursor-pointer"
        :class="{ active: category.isActive }"
        @click="activateButton(category.id)"
    >
      {{ category.category }}
      <img
          v-if="!category.isActive"
          class="ml-2"
          src="../../assets/icons/plus.svg"
          alt=""
      >
      <img
          v-if="category.isActive"
          class="ml-2"
          src="../../assets/icons/activeButton.svg"
          alt=""
      >
    </div>
  </div>
</template>

<style scoped>
.categories-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.hiddenCategories {
  height: 0;
  overflow: hidden;
  padding: 0 !important;
}

.category-item {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: #E3F2FD;
  color: var(--Primary-active);
  padding: 6px 12px;
  margin: 0;
  border-radius: 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  font-weight: 500;

  &:hover {
    background: #BEE3F8;
  }
}

.active {
  background: var(--Primary);
  color: #fff;
}
</style>