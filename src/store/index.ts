import { createStore } from 'vuex'
import weather from './modules/weather.module'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    weather
  },
  strict: process.env.NODE_ENV !== 'production'
})
