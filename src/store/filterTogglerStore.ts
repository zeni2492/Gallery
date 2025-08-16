import {defineStore} from "pinia";

export const useCloseFilterStore = defineStore('CloseFilterStore',{
    state: () => ({
        IsClosed: false,
        isMobile: window.innerWidth < 800
    }),
    actions: {
        ToggleFilters(){
            this.IsClosed = !this.IsClosed;
            console.log(this.IsClosed);
        },
        checkScreenSize() {
            this.isMobile = window.innerWidth < 800;
            if (!this.isMobile) {
                this.IsClosed = false;
            }
        }
    }
})