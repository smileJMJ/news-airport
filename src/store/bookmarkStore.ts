import { defineStore } from 'pinia';
import { getLocalStorage, setLocalStorage } from '@/util/LocalStorage';
import { LocalStorageKeyName } from '@/util/const';
import { IArticle } from '@/type';

interface IState {
    bookmarkArticles: IArticle[]
}

export const useBookmarkStore = defineStore('bookmarkStore', {
    state: () => ({
        bookmarkArticles: getLocalStorage(LocalStorageKeyName) || []
    }),

    actions: {
        setBookmarkArticles(article: IArticle) {
            this.bookmarkArticles.push(article);
            setLocalStorage(LocalStorageKeyName, this.bookmarkArticles);
        },

        removeBookmarkArticle(article: IArticle) {
            const idx = this.bookmarkArticles.findIndex(v => v?._id === article?._id);
            idx >= 0 && this.bookmarkArticles.splice(idx, 1);
            setLocalStorage(LocalStorageKeyName, this.bookmarkArticles);
        }
    }
});