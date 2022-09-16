<template>
    <div class="list-item">
        <figure>
            <router-link :to="`/view/${article._id}`">
                <img :src="article.media" alt="" />
            </router-link>
        </figure>
        <div class="content">
            <router-link :to="`/view/${article._id}`" @click="e => clickArticle(article)">
                <p class="title">{{ article.title }}</p>
                <p class="summary">{{ article.summary }}</p>
                <div class="info">
                    <p class="rights">{{ article.rights }}</p>
                    <p>{{ modifyDate(article.published_date) }}</p>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import { IArticle } from '@/type';

interface IProps {
    article: IArticle;
}

const props = defineProps<IProps>();
const { article } = toRefs(props);
const emit = defineEmits(['onClickArticle']);

// date 수정 (시간 제거)
const modifyDate = (date: string) => {
    return date.split(' ')[0] || date;
};

// 기사 클릭 - 현재 클릭한 기사 저장
const clickArticle = (article: IArticle) => {
    emit('onClickArticle', article);
};
</script>

<style lang="scss" scoped>
.list-item {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    width: 100%;
    padding: 15px 0 5px;
    overflow: hidden;

    figure {
        flex-shrink: 0;
        width: 100px;
        height: 100px;
        margin-right: 15px;
        overflow: hidden;
        border-radius: 10px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .content {
        width: 100%;

        .title,
        .summary {
            display:-webkit-box;
            -webkit-line-clamp: 2; 
            -webkit-box-orient:vertical; 
            overflow:hidden; 
            text-overflow:ellipsis;
            word-break: break-all;
        }

        .title {
            font-size: 14px;
            line-height: 1.5;
            font-weight: 700;
        }

        .summary {
            margin-top: 10px;
            font-size: 13px;
            line-height: 1.3;
        }

        .info {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            margin-top: 7px;

            p {
                display: inline-block;
                margin-bottom: 10px;
                font-size: 12px;
                color: #939292;

                &.rights {
                    font-weight: 500;
                    color: #009eff;
                }
            }
        }
    }
}    
</style>