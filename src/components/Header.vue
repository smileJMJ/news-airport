<template>
    <header :class="type">
        <button v-if="type !== 'default'" type="button" class="btn-icon back pd-common" @click="goBack">
            <span class="hidden">뒤로가기</span>
        </button>
        <router-link v-if="type === 'default'" to="/bookmark" class="btn-icon goBookmark pd-common">
            <span class="hidden">북마크 이동</span>
        </router-link>
        <Logo class="logo" />
        <Translate />
    </header>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import { useRouter } from 'vue-router';
import Logo from '@/components/Logo.vue';
import Translate from '@/components/Translate.vue';

interface IProps {
    type: 'default' | 'back' | 'saveBookmark'
}

const props = defineProps<IProps>();
const { type = 'default' } = toRefs(props);
const router = useRouter();

const goBack = (e: any) => {
    router.back();
};

</script>

<style lang="scss" scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #f5f5f5;

    .logo {
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 5;
        transform: translate(-50%, -50%);
    }

    .btn-icon {
        &::before {
            font-size: 24px;
        }

        &.back::before {
            content: '\e879';
        }

        &.goBookmark::before,
        &.bookmark::before {
            content: '\e814';
        }
    }
}
</style>