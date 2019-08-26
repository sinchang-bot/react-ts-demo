export interface IWeather {
  weather_state_name: string
  applicable_date: string
  the_temp: number
}

export interface IWeatherState {
  weatherList: IWeather[]
  loading: boolean
  errorMsg: string
  woeid: number
}
