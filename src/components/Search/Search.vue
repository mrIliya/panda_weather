<script setup>
import { onMounted, ref } from 'vue'
import WeatherData from '../WeatherData/WeatherData.vue'
import weather from '../../api/weather'

const placeholder = ref('search')
const searchInput = ref(null)
const autocomplete = ref()
const weatherData = ref({})

const props = defineProps({
    id: Number,
})

const emits = defineEmits(['deleteItem'])

const placeholderHandler = ({ target }) => {
    target === searchInput.value
        ? (placeholder.value = '')
        : (placeholder.value = 'search')
}

const cityHandler = async () => {
    autocomplete.value.addListener('place_changed', async () => {
        const place = await autocomplete.value.getPlace()
        weatherData.value = await weather.getCityWeather(place.name)
    })
}

const deleteHandler = () => {
    emits('deleteItem', true)
}

onMounted(async () => {
    weatherData.value = await weather.getCityWeather('London')
    autocomplete.value = new google.maps.places.Autocomplete(searchInput.value)
})
</script>
<template>
    <div class="search" @click="placeholderHandler">
        <input
            @input="cityHandler"
            ref="searchInput"
            type="text"
            class="search__input"
            :placeholder="placeholder"
            @click="placeholderHandler"
            autocomplete="on"
        />
    </div>
    <WeatherData
        v-if="weatherData"
        :weatherData="weatherData"
        :id="id"
        @deleteItem="deleteHandler"
    />
    <div class="search__error" v-if="!weatherData">no data</div>
</template>
<style lang="scss" scoped>
.search {
    &__input {
        max-width: 300px;
        width: 100%;
        height: 50px;
        outline-color: #fff;
        outline-width: 0.5px;
        border: transparent;
        border-radius: 20px;
        padding: 5px 20px;
    }

    &__error {
        font-size: 25px;
        height: 300px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
