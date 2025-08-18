<script setup lang="ts">
import type {ImageCardData} from "../Types/CardType.ts";
import {ref,onMounted} from "vue";
import {useModal} from "../composables/useModal.ts";
import Button from "./Button.vue";
import AdditionalData from "./CardComponents/AdditionalData.vue";
import {addDoc, collection, getDocs, query, where,orderBy} from "firebase/firestore";
import {db} from "../configs/FireBaseConfig.ts";
import {formatter} from "../composables/useFormatter.ts";

const props = defineProps<{
  ImageData : ImageCardData
}>()

interface IComments {
  id: string;
  text: string;
  author: string;
  createdAt: string;
}

const emit = defineEmits(['close', 'submit']);
const Comments = ref<string>("")
const CommentStorage = ref<IComments[]>([])

const ClearComments = (event:MouseEvent) =>{
  event.preventDefault()
  Comments.value = "";
}

const { closeOnBackdrop } = useModal(emit);

const handleClose = () => emit('close');

const handleSubmit = async() => {
    try {
      const commentsRef = collection(db, "comments");

      await addDoc(commentsRef, {
        postId: props.ImageData.id,
        text: Comments.value,
        author: 'Гость',
        createdAt: formatter(new Date(),undefined, true)
      });

      await getComments()
      console.log("Комментарий добавлен!");
      Comments.value = "";
    } catch (e) {
      console.error("Ошибка: ", e);
    }
}


const getComments = async () => {
  try{
    const commentsRef = collection(db, "comments");

    const q = query(
        commentsRef,
        where("postId", "==", props.ImageData.id),
        orderBy("createdAt", "desc") // Сортируем по дате создания (новые сначала)
    );

    const querySnapshot = await getDocs(q);
    CommentStorage.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log(CommentStorage.value)
  }
  catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  getComments();
})
</script>

<template>
  <div
      class="modal-overlay fixed inset-0 bg-black bg-opacity-50 z-50"
      @click.self="handleClose"
  >
    <div @click.stop="closeOnBackdrop"
         class="modal rounded-md fixed top-1/2
         left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white
         w-1/2 overflow-auto z-10 cursor-default px-[15px] pt-[15px]
         flex flex-col  pb-12 min-w-80"
    >
      <div class="modal-dialog w-full flex justify-between items-start   ">
        <div class="modal-header">
          <h1 class="font-semibold text-2xl">{{props.ImageData.title}}</h1>
          <div class="additionalData flex gap-2 items-center">
            <AdditionalData :Date="props.ImageData.Date" :Comments="props.ImageData.comments" :Duration="props.ImageData.Duration" :postId="props.ImageData.id"/>
          </div>
        </div>
        <button @click="handleClose" class="CloseButton mt-2"><img src="../assets/icons/Close.svg" alt="close"></button>
      </div>
      <div class="modal-body flex flex-col items-center justify-center mt-4">
        <img class="w-full rounded-lg" :src="ImageData.img" alt="">
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
        <h2 class="mt-4 text-[#181C32] font-semibold">Комментариев {{CommentStorage.length}}</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group relative">
            <textarea :class="{danger : Comments.length > 250}" v-model="Comments" placeholder="Введите комментарий" class="CommentsInput w-full py-4 px-4 outline-none border border-gray-300 rounded-md transition-all resize-none"/>
             <button class="CloseButton" @click="ClearComments"><img src="../assets/icons/Close.svg" alt=""></button>
             <p class="text-gray-600 text-xs">{{Comments.length}} из 250 символов</p>
          </div>
          <div class="w-full flex justify-end gap-3 mt-2">
            <Button @click="handleClose" :IsPrimaryButton="false">Отмена</Button>
            <Button  type="submit" :IsPrimaryButton="true">Опубликовать</Button>
          </div>
        </form>
        <div v-for="comment in CommentStorage" :key="comment.id" class="w-full ">
          <div class=" flex flex-row border-gray-900 gap-2 items-start mt-3">
            <img class="w-10" src="../assets/icons/user-circle-svgrepo-com.svg" alt="">
            <div class="flex flex-col w-full pr-20">
              <h2 class="font-semibold text-gray-900 text-base break-words">{{comment.author}}</h2>
              <h3 class="font-medium text-sm text-gray-800 break-words whitespace-pre-wrap">{{comment.text}}</h3>
              <p class="font-medium text-xs text-gray-500">{{comment.createdAt}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal{
  box-shadow: 0 4px 8px 1000px rgba(0, 0, 0, 0.15);
  z-index: 100;
  height: auto;
  max-height: 800px;
  min-width: 400px;
  overflow-x: hidden;
  @media (max-width: 490px) {
        width: 100%;
        height: 100vh !important;
    max-height: 100vh !important;
  }

}

.tag{
  background: var(--Primary-Light);
  color: var(--Primary-active);
  border-radius: 20px;
}

.CommentsInput{
  transition: height 0.6s;
  height: 60px;

  &:focus{
    height: 112px;
    border: 1px solid var(--Primary-active);
    box-shadow: 0 0 0 2px #3E97FF52;
  }
  &.danger:focus{
    height: 112px;
    border: 1px solid var(--Danger);
    box-shadow: 0 0 0 2px rgba(241, 65, 108, 0.6);
  }
}

.CloseButton{
  position: absolute;
  width: 12px;
  right: 16px;
  top: 8px;
  @media (max-width: 1524px) {
    right: 16px;
  }
}

</style>