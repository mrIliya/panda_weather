<script setup>
import { onMounted, ref } from 'vue'
import { setStorage, getStorage } from '../helpers/local'
import weather from '../api/weather'
import WeatherData from '../components/WeatherData/WeatherData.vue'
import ConfirmModal from '../components/Modal/ConfirmModal.vue'

const favCities = ref([])
const weatherData = ref([])
const confirmModal = ref(false)
const itemToDelete = ref('')

const initFavList = async () => {
    favCities.value = await getStorage('fav')

    for (const city of favCities.value) {
        await weather
            .getCityWeather(city)
            .then((res) => weatherData.value.push(res))
    }
}

const deleteFromFav = async (name) => {
    confirmModal.value = true
    itemToDelete.value = name
}

const confirmDeleting = () => {
    confirmModal.value = false

    const cities = getStorage('fav')

    const cityList = cities.filter((item) => item !== itemToDelete.value)
    weatherData.value = weatherData.value.filter((item) => item.name !== itemToDelete.value)
    setStorage('fav', cityList)
}

const closeModal = () => {
    confirmModal.value = false
}

onMounted(async () => {
    await initFavList()
})
</script>
<template>
    <section class="favorites section">
        <div v-if="weatherData.length === 0" class="favorites__message">
            no favorites yet
        </div>
        <WeatherData
            v-for="weather in weatherData"
            :weatherData="weather"
            :id="weather.id"
            :key="weather.id"
            @deleteFromFav="deleteFromFav(weather.name)"
            :favorites="true"
        />
        <ConfirmModal
            v-if="confirmModal"
            @closeModal="closeModal()"
            @confirmDeleting="confirmDeleting()"
        />
    </section>
</template>
<style lang="scss" scoped>
.favorites {
    &__message {
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-transform: capitalize;
    }
}
</style>
