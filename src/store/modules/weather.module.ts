import axios from 'axios'
import config from "../../../config";

export type weatherType = any
export type weatherStateType = {
  weather: weatherType
}

export default {
  namespaced: true,
  state() {
    return {
      weather: null
    }
  },
  mutations: {
    setWeather(state, payload) {
      state.weather = payload.weather
    },
  },
  actions: {
    async getWeather({ commit, dispatch }, payload) {
      const [lon, lat] = payload.value.GeoObject.Point.pos.split(' ')
      try {
        const { data } = await axios.get(config.weatherApi, {
          params: {
            appid: config.apiKeyWeather,
            lat,
            lon
          }
        })
        commit('setWeather', {weather: data})
      } catch (e) {
        alert('ошибка получения погоды')
      }
    }
  },
  getters: {
    weather(state) {
      return state.weather
    },
  }
}
