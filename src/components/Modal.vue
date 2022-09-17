<template>
    <div v-if="modalOpen" class="modal-wrap">
        <div class="modal">
            <slot></slot>
            <div class="btn-wrap">
                <button type="button" @click="closeModal">닫기</button>
            </div>
        </div>
        <span class="bg" @click="closeModal"></span>
    </div>
</template>
<script lang="ts" setup>
import { computed, watch } from 'vue';
import { useUiStore } from '@/store/uiStore';

const store = useUiStore();
const modalOpen = computed<boolean>(() => store.modalOpen);
const closeModal = () => {
    store.setModalOpen(false);
}

watch(modalOpen, (newValue) => {
    document.querySelector('body').style.overflow = newValue ? 'hidden' : 'auto';
});
</script>
<style lang="scss" scoped>
    .modal-wrap {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100vh;

        .modal {
            position: relative;
            width: 80%;
            min-height: 120px;
            padding: 20px;
            font-size: 14px;
            line-height: 1.4;
            text-align: center;
            overflow: hidden;
            background-color: #fff;
            border-radius: 10px;

            .btn-wrap {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;

                button {
                    width: 100%;
                    height: 50px;
                    line-height: 50px;
                    font-size: 14px;
                    font-weight: 500;
                    color: #fff;
                    background-color: #009eff;
                }
            }
        }
        
        .bg {
            position: absolute;
            left: 0;
            top: 0;
            z-index: -1;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
        }
    }
</style>