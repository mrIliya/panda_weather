import { weather } from '../../api'

const state = () => ({
    cityWeather: {},
})

export const getterTypesCityWeather = {
    getWeather: '{weather}[getter] Get weather',
}

export const mutationTypesCityWeather = {
    putWeather: '{weather}[mutation] Put weather',
}

export const actionTypesCityWeather = {
    fetchWeather: '{weather}[action] Load weather',
}

const getters = {
    [getterTypesCityWeather.getWeather]: (state) => state.cityWeather,
}

const mutations = {
    [mutationTypesCityWeather.putWeather](state, CityWeatherData) {
        state.cityWeather = CityWeatherData
    },
}

const actions = {
    async [actionTypesCityWeather.fetchWeather]({ commit },data) {

        try {
            const cityWeatherData =
                (await weather.getCityWeather(data)) || {}
            if (cityWeatherData.length !== 0)
                commit(mutationTypesCityWeather.putWeather, cityWeatherData)
        } catch (e) {
            console.error(e)
        }
    },
}

export default {
    state,
    getters,
    mutations,
    actions,
}
