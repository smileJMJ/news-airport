<template>
    <BookmarkList :useDelete="true" />
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import Header from '@/components/Header.vue';
import BookmarkList from './BookmarkList.vue';
import { useUiStore } from '@/store/uiStore';

const uiStore = useUiStore();
onMounted(() => {
    uiStore.setHeaderType('back');
});
</script>