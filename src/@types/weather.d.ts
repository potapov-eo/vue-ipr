declare module '@Weather' {

  export interface IWeatherMain {
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

  export interface IWeather {
    id: number;
    main: string;
    description: string;
    icon: string;
  }

  export interface IWeatherClouds {
    all: number;
  }

  export interface IWeatherWind {
    speed: number;
    deg: number;
    gust: number;
  }

  export interface IWeatherRain {
    '3h': number;
  }

  export interface ISys {
    pod: string;
  }

  export interface IWeatherList {
    dt: number;
    dt_txt: string;
    main: IWeatherMain;
    weather: IWeather[];
    clouds: IWeatherClouds;
    wind: IWeatherWind;
    visibility: number;
    pop: number;
    rain: IWeatherRain;
    sys: ISys;

  }

  export interface ICoordWeatherCity {
    lat: number;
    lon: number;
  }

  export interface IWeatherCity {
    id: number;
    name: string;
    coord: ICoordWeatherCity;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  }

  export interface IWeatherData {
    cod: string;
    message: number;
    cnt: number;
    list: IWeatherList[];
    city: IWeatherCity;
  }

}
