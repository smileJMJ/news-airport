<template>
  <div class="wrap">
    <Header :type="headerType" />
    <router-view/>
  </div>
</template>
<script lang="ts" setup>
  import { computed, onMounted } from 'vue';
  import Header from '@/components/Header.vue';
  import { useUiStore } from '@/store/uiStore';
  import { HeaderType } from '@/type';

  const store = useUiStore();
  const headerType = computed<HeaderType>(() => store.headerType); // 번역 기능 사용을 위해 header는 상태변화가 없도록 router 바깥에 위치시킴
</script>