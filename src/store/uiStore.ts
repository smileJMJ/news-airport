import { defineStore } from 'pinia';
import { LangType, HeaderType } from '@/type';
import { TL_LANG } from '@/util/const';
import { getCookie } from '@/util/Cookie';


interface IState {
    headerType: HeaderType;
    currentTranslateLang: LangType | null;
    translateLayerOpen: boolean;
}

// 초기 번역어는 cookie내 googtrans 값으로 알 수 있음
const transCookie = getCookie()?.googtrans?.split('/');
const transCookieVal = transCookie?.length > 0 ? transCookie[transCookie.length - 1] : null;

export const useUiStore = defineStore('uiStore', {
    state: (): IState => ({
        headerType: 'default',
        //currentTranslateLang: transCookieVal in TL_LANG ? transCookieVal : null,
        currentTranslateLang: null,
        translateLayerOpen: false
    }),
    
    actions: {
        setHeaderType(headerType: HeaderType) {
            this.headerType = headerType;
        },

        setCurrentTranslateLang(lang: LangType) {
            this.currentTranslateLang = lang;
        },

        setTranslateLayerOpen(isOpen: boolean) {
            this.translateLayerOpen = isOpen;
        }
    }
});