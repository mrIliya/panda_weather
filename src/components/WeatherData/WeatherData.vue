<script setup>
import { watchEffect, ref, onMounted, callWithErrorHandling } from 'vue'
import Chart from 'chart.js/auto'
import weather from '../../api/weather'
import { setStorage, getStorage } from '../../helpers/local'
import WarningModal from '../Modal/WarningModal.vue'

const props = defineProps({
    weatherData: Object,
    id: Number,
    favorites: Boolean,
})

const emits = defineEmits(['deleteItem', 'deleteFromFav'])

const mainWeather = ref([])
const weatherChart = ref(null)
const warningModal = ref(false)

const renameValues = () => {
    mainWeather.value = Object.entries(props.weatherData.main).map(
        ([key, value]) => {
            if (
                key === 'temp' ||
                key === 'feels_like' ||
                key === 'temp_min' ||
                key === 'temp_max'
            ) {
                if (key === 'temp') key = 'temperature'
                if (key === 'feels_like') key = 'feel like'
                if (key === 'temp_min') key = 'temp min'
                if (key === 'temp_max') key = 'temp max'
                return [key, value + ' deg']
            }
        }
    )
}

const initChart = async () => {
    const dayTemp = await weather.getData(
        props.weatherData.coord.lat,
        props.weatherData.coord.lon
    )

    const temp = dayTemp.map((item) => item.temp)
    const time = dayTemp.map((item) => {
        const time = new Date(item.dt).getHours()
        return time
    })

    const chartValue = weatherChart.value.getContext('2d')

    let chartStatus = Chart.getChart(weatherChart.value.id)
    if (chartStatus !== undefined) {
        chartStatus.destroy()
    }
    let newChart = new Chart(chartValue, {
        type: 'bar',
        data: {
            labels: time,
            datasets: [
                {
                    label: 'temperature',
                    data: temp,
                },
            ],
        },
        options: {},
    })
}

const deleteItemHandler = () => {
    emits('deleteItem', true)
}
const deleteFromFavHandler = () => {
    emits('deleteFromFav', true)
}

const toFavorites = () => {
    const cities = getStorage('fav')
    if (!cities) {
        setStorage('fav', [props.weatherData.name])
    } else {
        const existedCity = cities.find(
            (item) => item === props.weatherData.name
        )
        if (!existedCity) {
            if (cities.length < 5) {
                cities.push(props.weatherData.name)
                setStorage('fav', cities)
            } else {
                warningModal.value = true
            }
        }
    }
}

const closeModal = () => {
    warningModal.value = false
}

watchEffect(() => {
    if (props.weatherData.main) {
        renameValues()
        initChart()
    }
})

</script>
<template>
    <div class="weather">
        <div class="weather__top">
            <h2 class="weather__title">{{ props.weatherData.name }}</h2>
            <button
                v-if="!props.favorites"
                class="weather__remove"
                @click="deleteItemHandler"
            >
                -
            </button>
        </div>
        <div class="weather__buttons">
            <button
                v-if="!props.favorites"
                class="weather__btn"
                @click="toFavorites"
            >
                to fav
            </button>
            <button
                v-if="props.favorites"
                class="weather__btn"
                @click="deleteFromFavHandler"
            >
                delete
            </button>
        </div>
        <ul class="weather__list">
            <li class="weather__line" v-for="wather in mainWeather">
                <span class="weather__text" v-for="value in wather">{{
                    value
                }}</span>
            </li>
        </ul>

        <div class="weather__chart">
            <canvas
                class="weather__canvas"
                ref="weatherChart"
                :id="id"
            ></canvas>
        </div>
        <WarningModal v-if="warningModal" @closeModal="closeModal()" />
    </div>
</template>
<style lang="scss" scoped>
.weather {
    margin: 15px 0;
    border-radius: 15px;

    &__top {
        margin: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__list {
        margin: 0 20px 20px 20px;
        padding: 30px;
        background-color: rgba(10, 18, 36, 0.8);
        border-radius: 3px;
    }

    &__text {
        & + span {
            margin-left: 10px;
        }
    }

    &__chart {
        margin-bottom: 50px;
        padding: 0 5px;
    }

    &__remove {
        color: #fff;
        font-size: 35px;
        font-weight: 700;

        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__buttons {
        display: flex;
        align-items: center;
        margin: 0 20px;
    }

    &__btn {
        border: 1px solid #121212;
        border-radius: 3px 3px 0 0;

        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px;
        color: #fff;
    }
}

@media (max-width: 415px) {
    .weather {
        &__top {
            margin: 20px 10px;
        }

        &__list {
            padding: 30px 10px;
            margin: 0 0 20px 0;
        }

        &__buttons {
            margin: 0 10px;
        }
    }
}
</style>
