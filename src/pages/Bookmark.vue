<template>
    <Header type="back" />
    <BookmarkList :useDelete="true" />
</template>
<script lang="ts" setup>
import Header from '@/components/Header.vue';
import BookmarkList from './BookmarkList.vue';
</script>