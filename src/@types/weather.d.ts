declare module '@Weather' {

  export interface WeatherMain {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  }

  export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
  }

  export interface WeatherClouds {
    all: number;
  }

  export interface WeatherWind {
    speed: number;
    deg: number;
    gust: number;
  }

  export interface WeatherRain {
    '3h': number;
  }

  export interface Sys {
    pod: string;
  }

  export interface WeatherListItem {
    dt: number;
    dt_txt: string;
    main: WeatherMain;
    weather: Weather[];
    clouds: WeatherClouds;
    wind: WeatherWind;
    visibility: number;
    pop: number;
    rain: WeatherRain;
    sys: Sys;

  }

  export interface CoordWeatherCity {
    lat: number;
    lon: number;
  }

  export interface WeatherCity {
    id: number;
    name: string;
    coord: CoordWeatherCity;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  }

  export interface WeatherData {
    cod: string;
    message: number;
    cnt: number;
    list: WeatherListItem[];
    city: WeatherCity;
  }
  export type weatherDataInDay = WeatherListItem | {
    dt_txt: string;
    isEmpty : boolean
  }

}
