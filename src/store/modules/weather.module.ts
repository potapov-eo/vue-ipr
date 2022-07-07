import axios from 'axios'
import config from "../../../config";
import {WeatherData, weatherDataInDay} from "@Weather";
import {getWeatherDataInDay} from "@/store/modules/utils";


export const numberIntervalPerDay = 8
export type weatherType = WeatherData
export type weatherStateType = {
  weather: weatherType | null;
  weatherDataInDays: weatherDataInDay [] [] | null;
}

export default {
  namespaced: true,
  state():weatherStateType {
    return {
      weather: null,
      weatherDataInDays: null
    }
  },
  mutations: {
    setWeather(state, payload) {
      state.weather = payload.weather
    },
    weatherDataInDays(state, payload) {
      state.weatherDataInDays = payload.weatherDataInDays
    },
  },
  actions: {
    async getWeather({ commit, dispatch }, payload) {
     // const [lon, lat] = payload.value.GeoObject.Point.pos.split(' ')
      try {
        const { data } = await axios.get<WeatherData>(config.weatherApi, {
          params: {
            appid: config.apiKeyWeather,
            lat:payload.lat,
            lon:payload.lon,
            units:'metric',
            lang: 'ru',
          }
        })
        const weatherDataInDays = getWeatherDataInDay(data, numberIntervalPerDay)

        commit('setWeather', {weather: data})
        commit('weatherDataInDays', {weatherDataInDays: weatherDataInDays})
      } catch (e) {
        alert('ошибка получения погоды')
      }
    }
  },

  getters: {
    weather(state: weatherStateType) {
      return state.weather
    },
    weatherDataInDays(state: weatherStateType) {
      return state.weatherDataInDays
    },
  }
}
