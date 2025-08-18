<script setup lang="ts">
import {ref} from "vue";
import {useTags} from "../composables/useTags.ts";
import {useAddPostModalStore} from "../store/AddPostModalStore.ts";
import Button from "./Button.vue";
import {collection,addDoc,getDocs} from "firebase/firestore";
import {db} from "../configs/FireBaseConfig.ts";
import {useSearchStore} from "../store/SearchStore.ts";

const SearchStore = useSearchStore();
const CloseModal = useAddPostModalStore()
const { tags, newTag, addTag, removeTag } = useTags();

const newPost = ref({
  title: "",
  desc: "",
  img: "",
  Date: new Date(),
  tags: tags.value,
  Duration: "",
  comments: "0",
  fullDescription: ""
});


const SendData = async () => {
  try {
    const payload = {
      ...newPost.value,
      titleLower:newPost.value.title.toLowerCase(),
    }
    const docRef = await addDoc(collection(db, "Cards"), payload);
    SearchStore.searchResults = await getDocs(collection(db, "Cards"))
    console.log("Document written with ID: ", docRef);
    CloseModal.CloseModal()
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
</script>

<template>
  <div class="w-full h-screen z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"  @click.self="CloseModal.CloseModal">
    <div
         class="modal rounded-md fixed top-1/2
         left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white
         w-1/2 h-auto z-10 cursor-default px-6 pt-[15px]
         flex flex-col pb-12 min-w-80 max-h-[90vh] overflow-y-auto"
         @click.self="CloseModal.CloseModal"
    >

      <div class="modal-dialog w-full flex justify-between items-start">
        <div class="modal-header">
          <h1 class="text-xl font-semibold">Создать новый пост</h1>
        </div>
        <button @click="CloseModal.CloseModal" class="CloseButton mt-2">
          <img src="../assets/icons/Close.svg" alt="close">
        </button>
      </div>

      <div class="modal-body flex flex-col gap-4 mt-4">
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-1">Заголовок</label>
          <input v-model="newPost.title"
                 maxlength="100"
                 class="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                 placeholder="Введите заголовок">
        </div>

        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-1">Краткое описание</label>
          <input v-model="newPost.desc"
                 maxlength="150"
                 class="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                 placeholder="Введите краткое описание">
        </div>

        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-1">Полное описание</label>
          <textarea v-model="newPost.fullDescription"
                    class="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 h-24"
                    placeholder="Введите полное описание"></textarea>
        </div>

        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-1">Ссылка на изображение</label>
          <input v-model="newPost.img"
                 class="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                 placeholder="Введите URL изображения">
        </div>

        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-1">Длительность</label>
          <input v-model="newPost.Duration"
                 class="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                 maxlength="20"
                 placeholder="Например: 5 мин чтения">
        </div>

        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-1">Теги</label>
          <div class="flex gap-2">
            <input v-model="newTag"
                   @keyup.enter="addTag"
                   class="flex-1 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                   placeholder="Добавьте тег">
            <button @click="addTag"
                    class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Добавить
            </button>
          </div>
          <div class="flex flex-wrap gap-2 mt-2">
            <span v-for="(tag, index) in newPost.tags" :key="index"
                  class="tag px-3 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center">
              {{ tag }}
              <button @click="removeTag(index)" class="ml-1 text-blue-600 hover:text-blue-800">
                ×
              </button>
            </span>
          </div>
        </div>

      </div>

      <div class="w-full flex justify-end gap-3 mt-6">
        <Button @click="CloseModal.CloseModal" :IsPrimaryButton="false">Отмена</Button>
        <Button @click="SendData" :IsPrimaryButton="true">Опубликовать</Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  box-shadow: 0 4px 8px 1000px rgba(0, 0, 0, 0.52);
}

@media (max-width: 400px) {
  .modal {
    width: 100%;
    height: 100vh;
    max-height: 100vh;
  }
}

.CloseButton {
  position: absolute;
  width: 12px;
  right: 8px;
  top: 15px;
}

.tag {
  background: var(--Primary-Light);
  color: var(--Primary-active);
  border-radius: 20px;
}
</style>