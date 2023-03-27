<script setup>
import Header from './components/Header/Header.vue'
</script>

<template>
    <main class="main">
        <div class="logo">Panda Weather</div>
        <Header />
        <router-view />
    </main>
</template>

<style scoped></style>
