import { defineStore } from 'pinia';
import axios from 'axios';
import { RAPID_API, API_HOST, LANG, MIN_PAGE_SIZE, MAX_ARTICLE_SIZE } from '@/util/const';
import { LangType, PageSizeDir, IArticle } from '@/type';

interface IState {
    keyword: string;
    lang: LangType;
    articles: IArticle[];
    originArticles: IArticle[];
    currentArticle: IArticle | null;
    filterDate: string | null;
    page: number;
    totalPages: number;
}

export const useSearchStore = defineStore('searchStore', {
    state: (): IState => ({
        keyword: '',
        lang: LANG.en,
        articles: [],
        originArticles: [],
        currentArticle: null,
        filterDate: null,
        page: MIN_PAGE_SIZE,
        totalPages: MIN_PAGE_SIZE
    }),

    getters: {
        // 마지막 페이지 여부
        isLastPage(state): boolean {
            return (state.totalPages > MIN_PAGE_SIZE && state.page >= state.totalPages) ||
            (state.totalPages === MIN_PAGE_SIZE && state.articles.length < MAX_ARTICLE_SIZE);
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
            if(Array.isArray(articles) && articles.length > 0) {
                const sortArticles = articles.sort((a: IArticle, b: IArticle) => new Date(b.published_date) - new Date(a.published_date)); // 날짜순 정렬
                this.originArticles = [...this.originArticles, ...sortArticles];
                
                this.setDateFilterData();
            }
        },

        // 필터 날짜
        setFilterDate(date: string) {
            this.filterDate = date;
            this.setDateFilterData();
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
            this.originArticles = [];
        },

        // 클릭한 기사 데이터
        setCurrentArticle(article: IArticle) {
            this.currentArticle = article;
        },

        // search
        // lang: ko 로 변경하면 country: KR로 바뀌어 한국 기사만 나옴
        // lang: en에서 한국어 키워드로 검색하면 한국어 키워드 포함한 기사 출력 (영문 기사는 번역 필요)
        search(): Promise<boolean> | null {
            return new Promise<boolean>((resolve, reject) => {
                axios({
                    method: 'GET',
                    url: API_HOST,
                    params: {
                        q: this.keyword,
                        lang: this.lang,
                        page: this.page
                    },
                    headers: RAPID_API
                })
                .then(res => {
                    const isSuccess = res.status === 200 && res.data.status === 'ok';

                    if(isSuccess) { // 검색결과가 없을 때 res.data.status = 'No matches for your search.'로 내려옴
                        const { total_pages, articles } = res.data;
                        this.totalPages = total_pages;
                        this.setArticles(articles);
                        resolve(true);
                    }

                    resolve(isSuccess);
                })
                .catch(err => {
                    console.log('api 조회에 실패했습니다.', err);
                    resolve(false);
                });
            });
        },

        // // 필터 데이터
        setDateFilterData() {
            const originArticles = [...this.originArticles];

            if(this.filterDate) {
                this.articles = originArticles.filter(v => new Date(v.published_date) >= new Date(`${this.filterDate} 00:00`));
            } else {
                this.articles = originArticles;
            }
        }
    }
});