<script setup lang="ts">
import Header from "../components/Header.vue";
import NavBar from "../components/FilterComponents/NavBar.vue";
import ImageCard from "../components/ImageCard.vue";
import Data from "../assets/CardData.json"
import {getDocs, collection} from "firebase/firestore"
import {db} from "../configs/FireBaseConfig.ts";
import {onMounted} from "vue";

const getData = async () =>{
  const result = await getDocs(collection(db,"Cards"))
  console.log(result)
  return result.docs
}

onMounted(() =>{
  getData()
})
</script>

<template>
  <Header/>
  <main class="w-full">
    <NavBar/>
  </main>
  <div class="w-full flex flex-wrap justify-center items-center">
    <div class="cards-container  bg-white mt-5 w-full justify-center items-center">
      <ImageCard :ImageData="Data"/>
    </div>
  </div>
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
}

@media (max-width: 1024px) {
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