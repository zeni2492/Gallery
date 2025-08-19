<script setup lang="ts">
import {ref,onMounted,onUnmounted} from "vue";
import {useCloseFilterStore} from "../store/filterTogglerStore.ts";
import {useAddPostModalStore} from "../store/AddPostModalStore.ts";


const toggleFiltersClick = useCloseFilterStore();
const OpenModal = useAddPostModalStore()
const activeButton = ref<string>('blog')

const setActive = (active: string): void => {
  activeButton.value = active
}

onMounted(() => {
  toggleFiltersClick.checkScreenSize();
  window.addEventListener('resize', toggleFiltersClick.checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', toggleFiltersClick.checkScreenSize);
});
</script>

<template>
<header class="header w-full bg-black px-14 py-4">
  <main class="header-container flex flex-row items-center">
    <button @click="toggleFiltersClick.ToggleFilters" class="cursor-pointer">
      <img class="header-mobile-btn hidden mr-2" src="../assets/icons/asideIcon.svg" alt="aside">
    </button>
    <img src="../assets/Logo.svg" alt="logo">
    <div class="header-nav-buttons text-white flex ml-20 gap-x-5 items-center">
      <h3
          :class="{active: activeButton === 'main'}"
          class="cursor-pointer"
          @click="setActive('main')"
      >
        Главная
      </h3>
      <h3
          :class="{active: activeButton === 'blog'}"
          @click="setActive('blog')"
          class="cursor-pointer">Блог</h3>
    </div>
    <div class="text-white w-full flex justify-end">
      <button @click="OpenModal.OpenModal">Добавить пост</button>
    </div>
  </main>
</header>
</template>

<style scoped lang="scss">

  @media screen and (max-width: 800px) {
    .header{
      padding: 30px 22px;
    }
    .header-mobile-btn{
      display: flex;
      margin-right:35px;
    }
    .header-nav-buttons{
      display: none;
    }
  }

  .active{
    background: #191919;
    color: var(--Primary);
    padding: 8px 14px;
    border-radius: 8px;
    transition: background .2s ease;
  }

</style>