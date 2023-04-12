<script setup>
import { ref } from 'vue'
import Search from '../components/Search/Search.vue'
const blocks = ref([0])
const blockCount = ref(1)

const addItem = () => {
    if (blocks.value.length === 5) return
    blocks.value.push(blockCount.value++)
}

const deleteItem = (index) => {
    if (blocks.value.length === 1) return
    blocks.value.splice(index, 1)
}

</script>

<template>
    <section class="home section">
        <button class="home__add" @click="addItem">+</button>

        <div class="home__content" v-for="block in blocks" :key="block">
            <Search :key="block" :id="block" @deleteItem="deleteItem(block)" />
        </div>
    </section>
</template>

<style lang="scss" scoped>
.home {
    position: relative;

    &__add {
        width: 40px;
        height: 40px;
        color: #fff;
        font-size: 35px;
        font-weight: 700;

        display: flex;
        justify-content: center;
        align-items: center;

        position: absolute;
        top: 30px;
        right: 40px;
    }
}

@media (max-width: 415px) {
    .home {
        &__add {
            right: 20px;
        }
    }
}
</style>
