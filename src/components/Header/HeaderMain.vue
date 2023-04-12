<script setup>
import anime from 'animejs/lib/anime.es.js'
import { ref } from 'vue'

const mode = ref(false)

const buttonHandler = () => {
    const moonPath =
        'M16.5 25C16.5 40.1878 27.5 55 27.5 55C12.3122 55 0 42.6878 0 27.5C0 12.3122 12.3122 0 27.5 0C27.5 0 16.5 9.81217 16.5 25Z'
    const sunPath =
        'M55 27.5C55 42.6878 42.6878 55 27.5 55C12.3122 55 0 42.6878 0 27.5C0 12.3122 12.3122 0 27.5 0C42.6878 0 55 12.3122 55 27.5Z'
    const timeline = anime.timeline({
        duration: 750,
        easing: 'easeOutExpo',
    })

    mode.value = !mode.value

    if (mode.value) {
        // adding dark mode
        timeline
            .add({
                targets: '.sun',
                fill: '#DAFCFC',
            })
            .add({
                targets: '.sun',
                d: [{ value: moonPath }],
            })
            .add({
                targets: '.header__theme',
                rotate: 330,
            })
            .add(
                {
                    targets: 'body',
                    backgroundColor: 'rgba(10, 18, 36, 0.8)',
                    color: '#fff',
                },
                '-= 550'
            )
    } else {
        // adding light mode
        timeline
            .add({
                targets: '.header__theme',
                rotate: 0,
            })
            .add({
                targets: '.sun',
                d: [{ value: sunPath }],
            })
            .add({
                targets: '.sun',
                fill: '#FBB910',
            })
            .add(
                {
                    targets: 'body',
                    backgroundColor: '#FFF',
                    color: '#000',
                },
                '-= 550'
            )
    }
}
</script>
<template>
    <header class="header">
        <button class="header__theme" type="button" @click="buttonHandler()">
            <svg
                id="sun"
                width="30"
                height="30"
                viewBox="0 0 55 55"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    class="sun"
                    d="M55 27.5C55 42.6878 42.6878 55 27.5 55C12.3122 55 0 42.6878 0 27.5C0 12.3122 12.3122 0 27.5 0C42.6878 0 55 12.3122 55 27.5Z"
                    fill="#FBB910"
                />
            </svg>
        </button>
    </header>
</template>
<style lang="scss" scoped>
.header {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 10px 0;

    &__theme {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
    }
}
</style>
