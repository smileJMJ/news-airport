<template>
    <div class="searchbar-wrap pd-common">
        <div class="searchbar-inner">
            <div class="searchLang">
                <button v-for="item in langArr" :key="item.lang" 
                    type="button" 
                    :class="{btn: true, active: lang === item.lang}"
                    @click="e => changeLang(item.lang)">
                    {{ item.name }}
                </button>
            </div>
            <div class="searchbar">
                <input type="text" v-model="tempKeyword" @keyup="onKeyup" placeholder="검색어 입력 (한국어/영어)" />
                <button type="button" class="btn-icon search" @click.prevent="searchKeyword">
                    <span class="hidden">검색</span>
                </button>
            </div>
        </div>
        <div class="filter-wrap">
            <div class="searchbar-inner">
                <span>발행일</span>
                <input type="date" v-model="tempFilterDate" @change="setFilterDate" placeholder="2022-09-20"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import { LangType } from '@/type';
import { LANG, API_LANG } from '@/util/const';

interface IProps {
    lang: LangType;
    currentTranslateLang: LangType;
    keyword?: string;
    filterDate?: string;
}

const props = defineProps<IProps>();
const { lang, currentTranslateLang, keyword, filterDate } = toRefs(props);
const tempKeyword = ref<string>(keyword.value || '');
const tempFilterDate = ref<string>(filterDate.value || '');
const emit = defineEmits(['onChangeLang', 'onSearchKeyword', 'onChangeFilterDate']);
const langArr = API_LANG[currentTranslateLang.value || LANG.ko];

// input callback
const onKeyup = (e: any) => {
    if(e.key === 'Enter' || e.keyCode === 13) {
        searchKeyword();
    }
};

// 검색 언어 변경
const changeLang = (lang: LangType) => {
    emit('onChangeLang', lang);
};

// 검색
const searchKeyword = () => {
    emit('onSearchKeyword', tempKeyword.value);
};

// 날짜 필터
const setFilterDate = () => {
    emit('onChangeFilterDate', tempFilterDate.value);
};
</script>

<style lang="scss" scoped>
.searchbar-wrap {
    position: sticky;
    left: 0;
    top: 0;
    background: #f5f7f8;

    .searchbar-inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 15px;
        padding-bottom: 15px;

        input {
            width: 100%;
            height: 40px;
            padding: 0 10px;
            font-family: 'Noto Sans KR';
            font-size: 14px;
            background: transparent;
            border: 0;
            border-bottom: 2px solid #009eff;
        }

        .searchbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            margin-left: 10px;

            .btn-icon {
                flex-shrink: 0;
                width: 40px;
                height: 40px;
                background: transparent;
                border-bottom: 2px solid #009eff;

                &::before {
                    content: '\e86f';
                    font-size: 25px;
                    color: #009eff;
                }
            }
        }

        .searchLang {
            flex-shrink: 0;

            .btn {
                display: inline-block;
                max-width: 60px;
                height: 40px;
                padding: 0 8px;
                font-size: 12px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                vertical-align: middle;
                background: #fff;
                transition: all .2s ease-out;

                &:nth-child(1) {
                    border-radius: 5px 0 0 5px;
                }
                &:nth-child(2) {
                    border-radius: 0 5px 5px 0;
                }

                &.active {
                    font-weight: 700;
                    color: #fff;
                    background: #009eff;
                }
            }
        }
    }
    
    .filter-wrap {
        span {
            flex-shrink: 0;
            margin-right: 15px;
            font-size: 14px;
        }
    }
}

</style>