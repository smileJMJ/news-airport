<template>
    <Header type="saveBookmark" />
    <section v-if="currentArticle" class="article-wrap pd-common">
        <h1>{{ currentArticle.title }}</h1>
        <div class="info">
            <p v-if="currentArticle.rights" class="rights">{{ currentArticle.rights }}</p>
            <p v-if="currentArticle.published_date">{{ currentArticle.published_date }}</p>
            <!-- <p v-if="currentArticle.author">{{ currentArticle.author }}</p> -->
        </div>
        <figure v-if="currentArticle.media">
            <img :src="currentArticle.media" alt="" />
        </figure>
        <div class="summary">
            {{ currentArticle.summary }}
        </div>
        <div class="btn-wrap">
            <a :href="currentArticle.link" target="_blank">기사 원문 보기</a>
            <button type="button" :class="['btn-icon', 'bookmark', isSavedBookmark ? 'active' : '']" @click="saveBookmark">북마크</button>
        </div>
    </section>
</template>
<script lang="ts" setup>
import { computed, watch, onMounted } from 'vue';
import { useRouter, onBeforeRouteUpdate } from 'vue-router';
import Header from '@/components/Header.vue';
import { useSearchStore } from '@/store/searchStore';
import { useBookmarkStore } from '@/store/bookmarkStore';
import { IArticle } from '@/type';

const store = useSearchStore();
const bookmarkStore = useBookmarkStore();
const router = useRouter();
const currentArticle = computed<IArticle>(() => store.currentArticle);
const isSavedBookmark = computed<boolean>(() => bookmarkStore.bookmarkArticles.filter(v => v._id === currentArticle.value._id)?.length > 0);

// 메인페이지로 이동
const goMain = () => {
    router.replace('/');
};

// 북마크 저장
const saveBookmark = () => {
    console.log('isSavedBookmark.value', isSavedBookmark.value); 
    isSavedBookmark.value ? bookmarkStore.removeBookmarkArticle(currentArticle.value) : bookmarkStore.setBookmarkArticles(currentArticle.value);
};

onMounted(() => {
    if(!currentArticle.value) {
        goMain();
    }
});

watch(currentArticle, (current, prev) => {
    if(!current) {
        goMain();
    }
});
</script>

<style lang="scss" scoped>
    .article-wrap {
        padding-top: 20px;
        padding-bottom: 40px;

        h1 {
            font-size: 18px;
            line-height: 1.3;
            word-break: break-all;
        }

        .info {
            display: flex;
            justify-content: space-between;
            align-items: stretch;
            flex-wrap: wrap;
            margin-top: 15px;

            p {
                font-size: 14px;
                color: #939292;

                &.rights {
                    margin-bottom: 10px;
                    font-weight: 500;
                    color: #009eff;
                }
            }
        }

        figure {
            width: 100%;
            margin-top: 20px;

            img {
                width: 100%;
            }
        }

        .summary {
            margin-top: 20px;
            font-size: 15px;
            line-height: 1.5;
            word-break: break-all;
        }

        .btn-wrap {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 30px;

            a, .btn-icon.bookmark {
                display: inline-block;
                height: 36px;
                padding: 0 15px;
                font-size: 14px;
                line-height: 34px;
                border-radius: 8px;
            }

            a {
                color: #009eff;
                border: 1px solid #009eff;
            }

            .btn-icon.bookmark {
                color: #333;
                border: 1px solid #333;

                &::before {
                    content: '\e814';
                    margin-right: 5px;
                }

                &.active {
                    color: #009eff;
                    border-color: #009eff;
                }
            }
        }
    }
</style>