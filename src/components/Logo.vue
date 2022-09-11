<template>
    <h1>
        <router-link to="/">
            <span class="hidden">NewsAirport</span>
        </router-link>
    </h1>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
h1 {
    width: 200px;
    height: 40px;

    a {
        display: block;
        width: 100%;
        height: 100%;
        background: url('/img/logo.svg') no-repeat center center;
    }
}    
</style>