import axios from 'axios'
import config from '../../../config'
import { WeatherData, weatherDataInDay } from '@Weather'
import { getWeatherDataInDay } from '@/store/modules/utils'

export const numberIntervalPerDay = 8
export type weatherType = WeatherData
export type weatherStateType = {
  weather: weatherType | null;
  weatherDataInDays: weatherDataInDay [] [] | null;
  isWeatherLoading: boolean
}

export default {
  namespaced: true,
  state ():weatherStateType {
    return {
      weather: null,
      weatherDataInDays: null,
      isWeatherLoading: false
    }
  },
  mutations: {
    setWeather (state, payload) {
      state.weather = payload.weather
    },
    setWeatherDataInDays (state, payload) {
      state.weatherDataInDays = payload.weatherDataInDays
    },
    setIsWeatherLoading (state, payload) {
      state.isWeatherLoading = payload.isWeatherLoading
    }
  },
  actions: {
    async getWeather ({ commit, dispatch }, payload) {
      try {
        commit('setIsWeatherLoading', { isWeatherLoading: true })
        const { data } = await axios.get<WeatherData>(config.weatherApi, {
          params: {
            appid: config.apiKeyWeather,
            lat: payload.lat,
            lon: payload.lon,
            units: 'metric',
            lang: 'ru'
          },
          headers: { 'Access-Control-Allow-Origin': '*' }
        })
        const weatherDataInDays = getWeatherDataInDay(data, numberIntervalPerDay)

        commit('setWeather', { weather: data })
        commit('setWeatherDataInDays', { weatherDataInDays: weatherDataInDays })
      } catch (e) {
        alert('ошибка получения погоды')
      } finally {
        commit('setIsWeatherLoading', { isWeatherLoading: false })
      }
    }
  },

  getters: {
    weather (state: weatherStateType) {
      return state.weather
    },
    weatherDataInDays (state: weatherStateType) {
      return state.weatherDataInDays
    },
    isWeatherLoading (state: weatherStateType) {
      return state.isWeatherLoading
    }
  }
}
