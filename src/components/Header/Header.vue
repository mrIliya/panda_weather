<script setup>
const links = [
    { id: 'home', name: 'Home' },
    { id: 'favorites', name: 'Favorites' },
]
</script>
<template>
    <header class="header">
        <nav class="header-nav">
            <ul class="header-nav__list">
                <li
                    class="header-nav__line"
                    v-for="link in links"
                    :key="link.id"
                >
                    <router-link
                        active-class="active-link"
                        :to="{ name: link.name, hash: link.hash }"
                    >
                        <button class="header-nav__link">
                            {{ link.name }}
                        </button>
                    </router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>
<style lang="scss" scoped>
.header-nav {
    &__list {
        height: 50px;
        display: flex;
    }

    &__line {
        & + li {
            margin-left: 20px;
        }
    }

    &__link {
        padding: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

.active-link {
    .header-nav__link {
        color: #fff;
    }
}
</style>
