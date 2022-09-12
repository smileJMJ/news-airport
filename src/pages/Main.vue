<template>
    <Header type="default" />
    <SearchBar 
        :keyword="keyword"
        :lang="lang"
        :currentTranslateLang="currentTranslateLang"
        @onChangeLang="changeLang" 
        @onSearchKeyword="searchKeyword" />
    <List 
        v-if="isSearchSuccess"
        :articles="articles" 
        :isLastPage="isLastPage" 
        @onMoreArticles="moreArticles" />
    <div v-else-if="isSearchSuccess === false" class="no-result pd-common">
        <span class="icon"></span>
        <p>검색 결과가 존재하지 않습니다.<br/>
        다른 검색어를 입력해주세요.</p>
    </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useSearchStore } from '@/store/searchStore';
import { useUiStore } from '@/store/uiStore';
import Header from '@/components/Header.vue';
import SearchBar from '@/components/SearchBar.vue';
import List from '@/components/List.vue';
import { LangType, IArticle } from '@/type';

const store = useSearchStore();
const uiStore = useUiStore();
const keyword = computed<string>(() => store.keyword);
const lang = computed<LangType>(() => store.lang);
const articles = computed<IArticle[]>(() => store.articles);
const isLastPage = computed<boolean>(() => store.isLastPage);
const currentTranslateLang = computed<LangType>(() => uiStore.currentTranslateLang);
let isSearchSuccess = ref<boolean>();

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
    isSearchSuccess.value = await store.search();
};

// 더보기
const moreArticles = async () => {
    store.setPageSize('next');
    isSearchSuccess.value = await store.search();
};
</script>

<style lang="scss" scoped>
    .no-result {
        width: 100%;
        margin: 30px 0;
        font-size: 14px;
        line-height: 1.5;
        text-align: center;

        .icon {
            display: block;
            margin-bottom: 20px;
            text-align: center;

            &::before {
                display: inline-block;
                content: '\e84b';
                font-family: 'Linearicons-Free';
                font-size: 50px;
            }
        }
    }
</style>