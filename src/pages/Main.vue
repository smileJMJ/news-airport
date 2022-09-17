<template>
    <SearchBar 
        :keyword="keyword"
        :lang="lang"
        :currentTranslateLang="currentTranslateLang"
        @onChangeLang="changeLang" 
        @onSearchKeyword="searchKeyword" />
    <div v-if="articles.length > 0" class="list-wrap pd-common">
        <ul>
            <li v-for="item in articles" :key="item._id">
                <ListItem :article="item" @onClickArticle="clickArticle" />
            </li>
        </ul>
        <div v-if="!isLastPage && articles.length > 0" class="more-wrap">
            <button type="button" class="btn-icon" @click="moreArticles">더보기</button>
        </div>
    </div>
    <div v-else-if="isSearchSuccess === false && articles.length === 0" class="no-result pd-common">
        <span class="icon"></span>
        <p>검색 결과가 존재하지 않습니다.<br/>
        다른 검색어를 입력해주세요.</p>
    </div>
    <div v-else-if="isSearching" class="no-result searching pd-common">
        <span class="icon"></span>
        <p>검색 중입니다.</p>
    </div>
    <div v-else class="bookmark-wrap">
        <BookmarkList />
    </div>
    <Modal>
        <p>검색어를 입력해주세요.</p>
    </Modal>
</template>
<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue';
import { useSearchStore } from '@/store/searchStore';
import { useUiStore } from '@/store/uiStore';
import SearchBar from '@/components/SearchBar.vue';
import ListItem from '@/components/ListItem.vue';
import BookmarkList from '@/pages/BookmarkList.vue';
import Modal from '@/components/Modal.vue';
import { LangType, IArticle } from '@/type';

const store = useSearchStore();
const uiStore = useUiStore();
const keyword = computed<string>(() => store.keyword);
const lang = computed<LangType>(() => store.lang);
const articles = computed<IArticle[]>(() => store.articles);
const isLastPage = computed<boolean>(() => store.isLastPage);
const currentTranslateLang = computed<LangType>(() => uiStore.currentTranslateLang);
let isSearchSuccess = ref<boolean>();
let isSearching = ref<boolean>();

onMounted(() => {
    uiStore.setHeaderType('default');
});

// 검색 언어 변경
const changeLang = (lang: LangType) => {
    store.setLang(lang);
};

// 검색
const searchKeyword = async (keyword: string) => {
    if(!keyword) {
        uiStore.setModalOpen(true);
        return;
    }
    
    store.setKeyword(keyword);
    store.resetArticles();
    isSearching.value = true;
    isSearchSuccess.value = await store.search();
    isSearching.value = false;
};

// 기사 클릭 - 현재 기사 데이터 저장
const clickArticle = (article: IArticle) => {
    store.setCurrentArticle(article);
};

// 더보기
const moreArticles = async () => {
    store.setPageSize('next');
    isSearchSuccess.value = await store.search();
};
</script>

<style lang="scss" scoped>
// list
.list-wrap {
    .more-wrap {
        padding: 30px 0;
        width: 100%;

        button {
            width: 100%;
            height: 40px;
            font-size: 14px;
            border: 1px solid #333;
            border-radius: 5px;

            &::after {
                content: '\e874';
                margin-left: 10px;
                vertical-align: middle;
            }
        }
    }
}
</style>