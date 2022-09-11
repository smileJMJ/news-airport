<template>
    <div class="searchbar-wrap pd-common">
        <div class="searchbar">
            <input type="text" v-model="keyword" @change="changeKeyword" placeholder="검색어 입력 (영어/한국어)" />
            <button type="button" class="btn-icon search" @click.prevent="searchKeyword">
                <span class="hidden">검색</span>
            </button>
        </div>
        <div class="searchLang">
            <button v-for="item in langArr" :key="item.lang" 
                type="button" 
                :class="{btn: true, active: lang === item.lang}"
                @click="e => changeLang(item.lang)">
                {{ item.name }}
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import { LangType } from '@/type';
import { LANG, TL_LANG } from '@/util/const';

interface IProps {
    lang: LangType;
    currentTranslateLang: LangType;
}

const props = defineProps<IProps>();
const { lang, currentTranslateLang } = toRefs(props);
const keyword = ref<string>('');
const emit = defineEmits(['onChangeLang', 'onSearchKeyword']);
const langArr = TL_LANG[currentTranslateLang.value];

// 검색 언어 변경
const changeLang = (lang: LangType) => {
    emit('onChangeLang', lang);
};

// 검색
const searchKeyword = () => {
    emit('onSearchKeyword', keyword.value);
};
</script>

<style lang="scss" scoped>
.searchbar-wrap {
    padding-top: 15px;
    padding-bottom: 15px;
    background: #f5f7f8;

    .searchbar {
        display: flex;
        justify-content: space-between;
        align-items: center;

        input {
            width: 100%;
            height: 40px;
            padding: 0 10px;
            background: transparent;
            border: 0;
            border-bottom: 2px solid #009eff;
        }

        .btn-icon {
            flex-shrink: 0;
            width: 40px;
            height: 40px;
            background: transparent;
            border-bottom: 2px solid #009eff;

            &::before {
                content: '\e86f';
                font-size: 32px;
                color: #009eff;
            }
        }
    }

    .searchLang {
        .btn {
            &.active {
                font-weight: 700;
                color: #009eff;
            }
        }
    }
}
</style>