<template>
    <div class="list-wrap pd-common">
        <h2>북마크</h2>
        <ul v-if="Array.isArray(bookmarkArticles) && bookmarkArticles.length > 0">
            <li v-for="article in bookmarkArticles" :key="article._id">
                <ListItem :article="article" @onClickArticle="clickArticle" />
                <button v-if="useDelete" 
                    type="button" 
                    class="btn-icon delete"
                    @click="e => deleteArticle(article)">
                    <span class="hidden">삭제</span>
                </button>
            </li>
        </ul>
        <div v-else class="no-result">
            <span class="icon"></span>
            <p>북마크한 기사가 없습니다.</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue';
import ListItem from '@/components/ListItem.vue';
import { useBookmarkStore } from '@/store/bookmarkStore';
import { useSearchStore } from '@/store/searchStore';
import { IArticle } from '@/type';

interface IProps {
    useDelete?: boolean;
}

const props = defineProps<IProps>();
const { useDelete } = toRefs(props);
const store = useBookmarkStore();
const searchStore = useSearchStore();
const bookmarkArticles = computed<IArticle[]>(() => store.bookmarkArticles);

// 기사 클릭 - 현재 기사 데이터 저장
const clickArticle = (article: IArticle) => {
    searchStore.setCurrentArticle(article);
};

// 기사 삭제
const deleteArticle = (article: IArticle) => {
    store.removeBookmarkArticle(article);
};
</script>

<style lang="scss" setup>
.list-wrap {
    padding-top: 20px;
    padding-bottom: 20px;

    li {
        display: flex;
        justify-content: space-between;
        align-items: stretch;

        .btn-icon.delete {
            flex-shrink: 0;
            width: 40px;
            margin-left: 10px;
            color: #009eff;

            &::before {
                content: '\e811';
            }
        }
    }
}    
</style>