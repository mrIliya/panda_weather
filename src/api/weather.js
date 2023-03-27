import axios from './axios'

export default {
    getCityWeather: async (city) => {
        return axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c1f88ed0fc13b105d27f8a132bbe3abe&units=metric`)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    },
    getData: async (lat, lon) => {
        return axios
            .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=dayli&appid=c1f88ed0fc13b105d27f8a132bbe3abe&units=metric`)
            .then((res) => res.data.hourly)
            .catch((error) => console.log(error))
    }
}