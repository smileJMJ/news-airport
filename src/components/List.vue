<template>
    <div class="list-wrap pd-common">
        <ul>
            <li v-for="item in articles" :key="item._id">
                <figure>
                    <router-link :to="`/view/${item._id}`">
                        <img :src="item.media" alt="" />
                    </router-link>
                </figure>
                <div class="content">
                    <router-link :to="`/view/${item._id}`">
                        <p class="title">{{ item.title }}</p>
                        <p class="summary">{{ item.summary }}</p>
                        <div class="info">
                            <p>{{ item.rights }}</p>
                            <p>{{ modifyDate(item.published_date) }}</p>
                        </div>
                    </router-link>
                </div>
            </li>
        </ul>
        <div v-if="!isLastPage && articles.length > 0" class="more-wrap">
            <button type="button" class="btn-icon" @click="moreArticles">더보기</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import { IArticle } from '@/type';

interface IProps {
    articles: IArticle[];
    isLastPage: boolean;
}

const props = defineProps<IProps>();
const { articles } = toRefs(props);
const emit = defineEmits(['onMoreArticles']);

// date 수정 (시간 제거)
const modifyDate = (date: string) => {
    return date.split(' ')[0] || date;
};

// 더보기 버튼 클릭
const moreArticles = () => {
    emit('onMoreArticles');
};
</script>

<style lang="scss" scoped>
.list-wrap {
    li {
        display: flex;
        justify-content: space-between;
        align-items: stretch;
        padding: 15px 0;

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
                margin-top: 7px;

                p {
                    display: inline-block;
                    font-size: 12px;
                    color: #939292;

                    &:first-child {
                        margin-right: 10px;
                    }
                }
            }
        }
    }

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