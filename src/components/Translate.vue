<template>
    <div id="google_translate_element" class="hidden"></div>
    <button type="button" class="btn-icon pd-common translate" @click="toggleTlLang">
        <span class="hidden">번역</span>
    </button>
    <div v-show="translateLayerOpen" class="translate-layer pd-common">
        <p>번역어를 선택해주세요.</p>
        <ul>
            <li v-for="item in TL_LANG[currentTranslateLang || LANG.ko]" :key="item.lang"
                :class="currentTranslateLang === item.lang ? 'active' : ''">
                <button type="button" @click="e => changeTlLang(item.lang)">{{ item.name }}</button>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUpdated } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';
import { useUiStore } from '@/store/uiStore';
import { LangType } from '@/type';
import { TL_LANG, LANG } from '@/util/const';

const store = useUiStore();
const currentTranslateLang = computed<LangType | null>(() => store.currentTranslateLang);
const translateLayerOpen = computed<boolean>(() => store.translateLayerOpen);

window.googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement({
            pageLanguage: currentTranslateLang.value,
            includedLanguages: 'en,ko',
            autoDisplay: false
        }, 'google_translate_element');
};

// 번역 언어 선택 레이어 오픈
const toggleTlLang = () => {
    store.setTranslateLayerOpen(!translateLayerOpen.value);
};

// 번역 언어 선택 레이어 닫기
const closeTlLang = () => {
    store.setTranslateLayerOpen(false);
};

// 번역 언어 변경
const changeTlLang = (lang: LangType) => {
    const $combo = document.querySelector('.goog-te-combo');

    if(!$combo) {
        alert('현재 번역 서비스를 이용하실 수 없습니다.');
        return;
    }

    store.setCurrentTranslateLang(lang);
    $combo.value = lang;
    $combo.dispatchEvent(new Event('change'));
    closeTlLang();
};
</script>

<style lang="scss" scoped>
.btn-icon.translate {
    &::before {
        content: '\e853';
        font-size: 20px;
    }
}
.translate-layer {
    position: absolute;
    right: 0;
    top: 100%;
    z-index: 10;
    width: 100%;
    text-align: center;
    background: #333;
    box-shadow: -2px 3px 10px rgba(0,0,0,0.1);

    p {
        margin: 15px 0;
        font-weight: 500;
        color: #fff;
    }

    li {
        padding: 10px 0;

        &.active {
            button {
                font-weight: 700;
                color: #009eff;
            }
        }

        button {
            display: block;
            width: 100%;
            font-size: 14px;
            color: #fff;
        }
    }
}
</style>