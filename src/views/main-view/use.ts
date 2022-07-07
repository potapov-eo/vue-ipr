import {ref} from "vue";
import moment from "moment";
// Todo очистка интервала
export const useTime = (weatherValue: any) => {
  const time = ref<string | null>(null)

  function getCurrentTimeString() {
    if (weatherValue.value?.city?.timezone) {
      const timezone = (new Date().getTimezoneOffset() * 60 + weatherValue.value?.city?.timezone) / 3600
      const localTime = new Date(Date.now() + timezone)
      return moment(localTime).add(timezone, 'hours').format(' HH:mm:ss')
    } else {
      return '----'
    }
  }

  setInterval(
    () => time.value = getCurrentTimeString(),
    1000
  )
  return time
}
