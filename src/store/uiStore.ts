import { defineStore } from 'pinia';
import { LangType } from '@/type';
import { LANG } from '@/util/const';


interface IState {
    currentTranslateLang: LangType;
    translateLayerOpen: boolean;
}

export const useUiStore = defineStore('uiStore', {
    state: (): IState => ({
        currentTranslateLang: LANG.ko,
        translateLayerOpen: false
    }),
    
    actions: {
        setCurrentTranslateLang(lang: LangType) {
            this.currentTranslateLang = lang;
        },

        setTranslateLayerOpen(isOpen: boolean) {
            this.translateLayerOpen = isOpen;
        }
    }
});