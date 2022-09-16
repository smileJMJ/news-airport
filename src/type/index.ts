declare global {
    interface Window {
      google: any;
      googleTranslateElementInit: () => void;
      localStorage: any;
    }
}

// 언어
export type LangType = 'ko' | 'en';

// pagesize 방향
export type PageSizeDir = 'prev' | 'next';

// 기사
export interface IArticle {
    title: string;
    author: string;
    published_data: string;
    published_date_precision: string;
    link: string;
    clean_url: string;
    summary: string;
    rights: string;
    rank: number;
    topic: string;
    country: string;
    language: string;
    authors: string;
    media: string;
    is_opinion: boolean;
    twitter_account: string;
    _score: number;
    _id: string;
}