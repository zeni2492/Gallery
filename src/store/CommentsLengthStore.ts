import {defineStore} from "pinia";

export const useCommentsLengthStore = defineStore("commentsLengthStore", {
    state: () => ({
        commentsLength: 0,
    }),

    actions:{
        setCommentsLength (commentsLength: number) {
            if (commentsLength <= 1) {
                this.commentsLength = commentsLength;
            }
        }
    }
})