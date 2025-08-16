<script setup lang="ts">
import Categories from "./Categories.vue";
import {ref} from "vue";
import {useCloseFilterStore} from "../../store/filterTogglerStore.ts";
import {storeToRefs} from "pinia";

const filterStore = useCloseFilterStore();
const { IsClosed } = storeToRefs(filterStore);
const categories = ref([
  { category: 'Город', id: 1, isActive: false },
  { category: 'Природа', id: 2, isActive: false },
  { category: 'Люди', id: 3, isActive: false },
  { category: 'Животные', id: 4, isActive: false },
  { category: 'Еда', id: 5, isActive: false },
  { category: 'Напитки', id: 6, isActive: false },
  { category: 'Архитектура', id: 7, isActive: false },
  { category: 'Искусство', id: 8, isActive: false },
]);
const hideCategories = ref<boolean>(false);

const hideCategoriesByClick = (): void => {
  hideCategories.value = !hideCategories.value;
  console.log(hideCategories.value)
}

const clearAllCategories = (): void => {
  categories.value = categories.value.map(category => ({
    ...category,
    isActive: false
  }));
};

const toggleCategory = (id: number): void => {
  categories.value = categories.value.map(category =>
      category.id === id
          ? { ...category, isActive: !category.isActive }
          : category
  );
};
</script>

<template>
  <div :class="{hideNavBar: IsClosed}" class="Navbar h-20 pt-2 items-baseline w-full justify-between flex px-24 flex-row overflow-hidden">
    <div class="Navbar-input-container w-full flex items-baseline">
      <h1 class="Navbar-title">Блог</h1>
      <div class="Navbar-input py-[8px] ml-10 px-[10px] bg-gray-200 rounded flex items-center">
        <span><img class="h-4" src="../../assets/icons/magnifier.svg" alt=""></span>
        <input class="bg-transparent text-gray-800 w-full p-1 outline-none" placeholder="Поиск"/>
      </div>
    </div>
    <div class="Navbar-controller-buttons flex items-center space-x-4">
      <p class="Navbar-clear-button text-gray-500 hover:text-gray-700 cursor-pointer"
         @click="clearAllCategories">Очистить</p>
      <p
          class="flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
          @click="hideCategoriesByClick"
      >
        Фильтр
        <img class="Navbar-filterArrow w-3 ml-1" src="../../assets/icons/FilterArrow.svg" alt="arrow">
      </p>
    </div>
  </div>
  <div :class="{hideNavBar: IsClosed}" class="categories-wrapper">
    <Categories
        :categories="categories"
        @toggle-category="toggleCategory"
        @clear-categories="clearAllCategories"
        :hideCategories="hideCategories"
    />
  </div>
</template>

<style scoped lang="scss">
.Navbar {
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: auto;
  @media (max-width: 800px) {
    padding: 20px 30px;
    .Navbar-clear-button {
      display: none;
    }
  }
  @media (max-width: 600px) {
    padding: 0 10px;
    margin-right: 20px;
    .Navbar-clear-button {
      display: flex;
    }
    .Navbar-input-container {
      display: flex;
      flex-direction: column;
      padding-bottom: 8px;
    }
    .Navbar-input {
      margin: 0;
    }
    .Navbar-controller-buttons {
      display: flex;
      position: absolute;
      right: 12px;
      top: 100px;
    }
  }
  @media (min-width: 800px) {
    &.hideNavBar {
      display: flex !important;
      height: auto !important;
      opacity: 1 !important;
    }
  }

  &.hideNavBar {
    @media (max-width: 800px) {
      height: 0;
      padding-top: 0;
      padding-bottom: 0;
      opacity: 0;
      overflow: hidden;
    }
  }

}


.Navbar-title {
  color: #181C32;
  font-weight: 700;
  font-size: 32px;
}

.Navbar-input {
  background: #F9F9F9;
  border-radius: 4px;
  width: 100%;
  @media (min-width: 800px) {
    max-width: 400px;
  }
}

.Navbar-filterArrow {
  margin-left: 4px;
}

.categories-wrapper {
  padding: 20px 95px;
  background: #fff;
  @media (max-width: 600px) {
    padding: 8px 10px;
  }
  @media (max-width: 800px) {
    padding: 10px 30px;
  }
}
</style>