<script setup lang="ts">
import Header from "../components/Header.vue";
import NavBar from "../components/FilterComponents/NavBar.vue";
import ImageCard from "../components/ImageCard.vue";
import {onMounted, computed} from "vue";
import AddPostModal from "../components/AddPostModal.vue";
import { useAddPostModalStore } from "../store/AddPostModalStore";
import {storeToRefs} from "pinia"
import {useSearchStore} from "../store/SearchStore.ts";
import NotFound from "../components/NotFound.vue";

const OpenModal = useAddPostModalStore()
const SearchStore = useSearchStore()

const {IsClosed} = storeToRefs(OpenModal)
const {searchResults, loading} = storeToRefs(SearchStore);

const DisplayedData = computed(() => {
  return searchResults.value
})

onMounted(() =>{
  SearchStore.searchCards('', [])
})
</script>

<template>
  <Header/>
  <div class="w-full">
    <NavBar/>
  </div>
  <div class="w-full flex flex-wrap justify-center items-center">
    <div v-if="DisplayedData.length > 0 && !loading" class="cards-container bg-white mt-5 w-full justify-center items-start">
      <ImageCard
          v-for="card in DisplayedData"
          :key="card.id"
          :ImageData="[card]"
      />
    </div>
    <div v-else-if="loading">Загрузка...</div>
    <div v-else>
      <NotFound/>
    </div>
  </div>
  <AddPostModal v-if="IsClosed"/>
</template>

<style scoped>
body {
  width: 100%;
  height: 100%;
  background: #ba2121;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  margin-right: 50px;
  margin-left: 50px;
  border-radius: 12px;
  @media (max-width: 400px) {
    margin-left: 10px;
    margin-right: 10px;
  }
}

@media (max-width: 1180px) {
  .cards-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .cards-container {
    grid-template-columns: 1fr;
  }
}
</style>