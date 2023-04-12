<script setup>
import HeaderSM from './components/Header/HeaderSM.vue'
import HeaderMain from './components/Header/HeaderMain.vue'
</script>

<template>
    <main class="main">
        <HeaderMain/>
        <div class="logo">Panda Weather</div>
        <HeaderSM />
        <router-view />
    </main>
</template>

<style scoped></style>
