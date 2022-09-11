import { defineStore } from 'pinia';
import axios from 'axios';
import { RAPID_API, API_HOST, LANG, MIN_PAGE_SIZE } from '@/util/const';
import { LangType, PageSizeDir, IArticle } from '@/type';

interface IState {
    keyword: string;
    lang: LangType;
    articles: IArticle[];
    currentArticleId: string | null;
    page: number;
    totalPages: number;
}

export const useSearchStore = defineStore('searchStore', {
    state: (): IState => ({
        keyword: '',
        lang: LANG.en,
        articles: [],
        currentArticleId: null,
        page: MIN_PAGE_SIZE,
        totalPages: MIN_PAGE_SIZE
    }),

    getters: {
        // 리스트 클릭한 기사
        currentArticle(state) {
            return state.articles.filter(v => v._id === state.currentArticleId);
        }
    },

    actions: {
        // 키워드 변경
        setKeyword(keyword: string) {
            this.keyword = keyword;
        },

        // 언어 변경
        setLang(lang: LangType) {
            this.lang = lang;
        },

        // article 추가
        setArticles(articles = []) {
            Array.isArray(articles) && articles.length > 0 && this.articles.concat(articles);
        },

        // 페이지 사이즈
        setPageSize(dir: PageSizeDir) {
            dir === 'next' ? this.page++ : this.page--;
        },

        // article 초기화
        resetArticles() {
            this.page = MIN_PAGE_SIZE;
            this.totalPages = MIN_PAGE_SIZE;
            this.articles = [];
        },

        // search
        // lang: ko 로 변경하면 country: KR로 바뀌어 한국 기사만 나옴
        // lang: en에서 한국어 키워드로 검색하면 한국어 키워드 포함한 기사 출력 (영문 기사는 번역 필요)
        search(): Promise<boolean> | null {
            const keyword = encodeURIComponent(this.keyword);

            if(!keyword) {
                alert('검색어를 입력해주세요.');
                return null;
            }

            if(this.page > MIN_PAGE_SIZE && this.page >= this.totalPages) {
                alert('마지막 페이지입니다.');
                return null;
            }

            return new Promise<boolean>((resolve, reject) => {
                axios({
                    method: 'GET',
                    url: API_HOST,
                    params: {
                        q: keyword,
                        lang: this.lang,
                        page: this.page
                    },
                    headers: RAPID_API
                })
                .then(res => {
                    if(res.status === 200) {
                        this.totalPages = res.data.total_pages;
                        this.setArticles(res.data.articles);
                        resolve(true);
                    }

                    resolve(res.status === 200);
                })
                .catch(err => {
                    console.log('api 조회에 실패했습니다.', err);
                    resolve(false);
                });
            });
        }
    }
});