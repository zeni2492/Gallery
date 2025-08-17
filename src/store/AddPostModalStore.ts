import {defineStore} from "pinia";

export const useAddPostModalStore = defineStore('useAddPostModalStore',{
    state: () => ({
        IsClosed: false,
    }),
    actions: {
        OpenModal(){
            this.IsClosed = true;
        },
        CloseModal(){
            this.IsClosed = false;
        }
    }
})