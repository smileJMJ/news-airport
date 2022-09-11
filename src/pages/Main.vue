<template>
    <Header type="default" />
    <SearchBar 
        :lang="lang"
        :currentTranslateLang="currentTranslateLang"
        @onChangeLang="changeLang" 
        @onSearchKeyword="searchKeyword" />
    
    <button type="button" @click="moreArticles">더보기</button>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useSearchStore } from '@/store/searchStore';
import { useUiStore } from '@/store/uiStore';
import Header from '@/components/Header.vue';
import SearchBar from '@/components/SearchBar.vue';
import { LangType } from '@/type';

const store = useSearchStore();
const uiStore = useUiStore();
const lang = computed<LangType>(() => store.lang);
const currentTranslateLang = computed<LangType>(() => uiStore.currentTranslateLang);

// 검색 언어 변경
const changeLang = (lang: LangType) => {
    console.log('changeLang', lang);
    store.setLang(lang);
};

// 검색
const searchKeyword = async (keyword: string) => {
    console.log('검색', keyword);

    if(!keyword) {
        alert('검색어를 입력해주세요.');
        return;
    }
    
    store.setKeyword(keyword);
    store.resetArticles();
    const isSuccess = await store.search();
};

// 더보기
const moreArticles = async () => {
    store.setPageSize('next');
    const isSuccess = await store.search();
};
</script>