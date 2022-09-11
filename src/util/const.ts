import { LangType } from '@/type';

// RastApi INFO
export const RAPID_API = {
    'X-RapidAPI-Host': 'free-news.p.rapidapi.com',
    'X-RapidAPI-Key': 'f060844d9dmsh0b1d8ffd0842bafp131c65jsnd1b3268c129b'
};

// API
export const API_HOST = 'https://free-news.p.rapidapi.com/v1/search';

// API 언어 종류
export const LANG: {[key: string]: LangType} = {
    ko: 'ko',
    en: 'en'
};

// page size
export const MIN_PAGE_SIZE = 1;

// 번역 언어 종류
export const TL_LANG = {
    ko: [
        {lang: 'ko', name: '한국어'},
        {lang: 'en', name: '영어'}
    ],
    en: [
        {lang: 'ko', name: 'Korean'},
        {lang: 'en', name: 'English'}
    ]
}