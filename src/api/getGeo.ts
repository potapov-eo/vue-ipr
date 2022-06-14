import axios from "axios";
import config from "../../config";

export const getCityList = async (Multiselect ) => {
  const searchValue = Multiselect.value.search

  if (searchValue.length > 2) {
    try {
      const {data} = await axios.get(config.geoApi, {
        params: {
          apikey: config.apiKeyGeo,
          format: 'json',
          geocode: searchValue
        }
      })
      return data
    } catch (e) {
      throw new Error('ошибка получения геокодинга')
    }
  }
}
