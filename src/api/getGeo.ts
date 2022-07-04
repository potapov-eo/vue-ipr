import axios from "axios";
import config from "../../config";
import {GeoResponse} from "@Geo";

export const getCityList = async (Multiselect ) => {
  const searchValue = Multiselect.value.search

  if (searchValue.length > 2) {
    try {
      const {data} = await axios.get<GeoResponse>(config.geoApi, {
        params: {
          apikey: config.apiKeyGeo,
          format: 'json',
          geocode: searchValue
        }
      })
      const optionsList = data ? data.response.GeoObjectCollection.featureMember.map(item => ({
        ...item,
        label: `${item.GeoObject.name}, ${item.GeoObject.description}`
      })): []
      return optionsList

    } catch (e) {
      throw new Error('ошибка получения геокодинга')
    }
  }else {
    return []
  }
}
