import moment from 'moment'
import { WeatherData, weatherDataInDay, WeatherListItem } from '@Weather'

export const getWeatherDataInDay = (data: WeatherData, numberIntervalPerDay: number) : weatherDataInDay [] [] => {
  const dates = Array.from(new Set(data.list.map(item => moment(item.dt_txt).format('L'))))
  const weatherDataInDays: weatherDataInDay[][] = dates.reduce((arr, date, i) => {
    let currentArr: WeatherListItem[] = data.list.filter(item => moment(item.dt_txt).format('L') === date)
    if (i === 0 && currentArr.length < numberIntervalPerDay) {
      const emptyWeatherItem = { dt_txt: date, isEmpty: true }
      currentArr = Array(numberIntervalPerDay - currentArr.length).fill(emptyWeatherItem).concat(currentArr)
    }
    if (i === dates.length - 1 && currentArr.length < numberIntervalPerDay) {
      const emptyWeatherItem = { dt_txt: date, isEmpty: true }
      currentArr = currentArr.concat(Array(numberIntervalPerDay - currentArr.length).fill(emptyWeatherItem))
    }
    arr.push(currentArr)
    return arr
  }, [] as weatherDataInDay[][])
  return weatherDataInDays
}
