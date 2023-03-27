import { createStore } from 'vuex'
import cityWeather from './modules/weather'

export default createStore({
    modules: {
        cityWeather,
    },
})
