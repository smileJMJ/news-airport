import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/pages/Main.vue';
import View from '@/pages/View.vue';
import Bookmark from '@/pages/Bookmark.vue';

const routes = [
    {
        path: '/',
        name: 'Main',
        component: Main
    },
    {
        path: '/view/:id',
        name: 'View',
        component: View
    },{
        path: '/bookmark',
        name: 'Bookmark',
        component: Bookmark
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});