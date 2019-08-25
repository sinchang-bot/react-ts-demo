import { IWeather } from '../types'

export enum WeatherActionTypes {
  FETCH_WEATHER_START = 'FETCH_WEATHER_START',
  FETCH_WEATHER_DONE = 'FETCH_WEATHER_DONE',
  FETCH_WEATHER_ERROR = 'FETCH_WEATHER_ERROR'
}

export interface IWeatherGetAction {
  type: WeatherActionTypes.FETCH_WEATHER_START
  payload: {
    cityName: string
  }
}

export interface IWeatherSetAction {
  type: WeatherActionTypes.FETCH_WEATHER_DONE
  payload: {
    weatherList: IWeather[]
  }
}

export interface IWeatherErrorAction {
  type: WeatherActionTypes.FETCH_WEATHER_ERROR
  payload: {
    errorMsg: string
  }
}

export const weatherGetAction = (cityName: string): IWeatherGetAction => ({
  type: WeatherActionTypes.FETCH_WEATHER_START,
  payload: {
    cityName
  }
})

export const weatherSetAction = (
  weatherList: IWeather[]
): IWeatherSetAction => ({
  type: WeatherActionTypes.FETCH_WEATHER_DONE,
  payload: {
    weatherList
  }
})

export const weatherErrorAction = (errorMsg: string): IWeatherErrorAction => ({
  type: WeatherActionTypes.FETCH_WEATHER_ERROR,
  payload: {
    errorMsg
  }
})

export type WeatherAction =
  | IWeatherGetAction
  | IWeatherSetAction
  | IWeatherErrorAction
