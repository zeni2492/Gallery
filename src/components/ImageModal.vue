<script setup lang="ts">
import type {ImageCardData} from "../Types/CardType.ts";
import {ref,onMounted, onUnmounted} from "vue";
import {useModal} from "../composables/useModal.ts";
import {useTags} from "../composables/useTags.ts";
import Button from "./Button.vue";
import AdditionalData from "./CardComponents/AdditionalData.vue";

const props = defineProps<{
  ImageData : ImageCardData
}>()
const emit = defineEmits(['close', 'submit']);
const Comments = ref<string>("")

const ClearComments = (event:MouseEvent) =>{
  event.preventDefault()
  Comments.value = "";
}

const { closeOnBackdrop } = useModal(emit);
const { tags } = useTags();

const newPost = ref<Omit<ImageCardData, 'id'>>({
  title: "",
  desc: "",
  img: "",
  Date: new Date().toLocaleDateString(),
  tags: tags.value,
  Duration: "",
  comments: "0",
  fullDescription: ""
});

const handleClose = () => emit('close');

const handleSubmit = () => {
  emit('submit', {
    ...newPost.value,
    tags: tags.value,
  });
  handleClose();
};
</script>

<template>
  <div
      class="modal-overlay fixed inset-0 bg-black bg-opacity-50 z-50"
      @click.self="handleClose"
  >
    <div @click.stop="closeOnBackdrop"
         class="modal rounded-md fixed top-1/2
         left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white
         w-1/3 h-auto z-10 cursor-default px-[15px] pt-[15px]
         flex flex-col  pb-12 min-w-80"
    >
      <div class="modal-dialog w-full flex justify-between items-start   ">
        <div class="modal-header">
          <h1 class="font-semibold text-2xl">{{props.ImageData.title}}</h1>
          <div class="additionalData flex gap-2 items-center">
            <AdditionalData :Date="props.ImageData.Date" :Comments="props.ImageData.Duration" :Duration="props.ImageData.comments"/>
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
        <h2 class="mt-4 text-[#181C32] font-semibold">Комментариев {{5}}</h2>
        <form>
          <div class="form-group relative">
            <textarea maxlength="250" v-model="Comments" placeholder="Введите комментарий" class="CommentsInput w-full py-4 px-4 outline-none border border-gray-300 rounded-md transition-all resize-none"/>
             <button class="CloseButton" @click="ClearComments"><img src="../assets/icons/Close.svg" alt=""></button>
             <p class="text-gray-600 text-xs">{{Comments.length}} из 250 символов</p>
          </div>
          <div class="w-full flex justify-end gap-3 mt-2">
            <Button @click="handleClose" :IsPrimaryButton="false">Отмена</Button>
            <Button :IsPrimaryButton="true">Опубликовать</Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal{
  box-shadow: 0 4px 8px 1000px rgba(0, 0, 0, 0.15);
  z-index: 100;
  @media (max-width: 450px) {
        width: 100%;
        height: 100vh;
  }
}

.tag{
  background: #EEF6FF;
  color: #2884EF;
  border-radius: 20px;
}

.CommentsInput{
  transition: height 0.6s;
  height: 60px;
  &:focus{
    height: 112px;
    border: 1px solid #2884EF;
    box-shadow: 0px 0px 0px 2px #3E97FF52;
  }
}

.CloseButton{
  position: absolute;
  width: 12px;
  right: 6px;
  top: 15px;
}

</style>