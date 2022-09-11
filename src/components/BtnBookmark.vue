<template>
    <button type="button">
        <template v-if="type === 'saveBookmark'">
            <span class="hidden">북마크</span>
        </template>
        <template v-else>
            
        </template>
    </button>
</template>
<script lang="ts" setup>
import { toRefs } from 'vue';

interface IProps {
    type: 'goBookmark' | 'saveBookmark';
}

const { type } = defineProps<IProps>();
</script>