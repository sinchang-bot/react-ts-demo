import { IWeather } from '../types'

export enum WeatherActionTypes {
  FETCH_WEATHER_START = 'FETCH_WEATHER_START',
  FETCH_WEATHER_DONE = 'FETCH_WEATHER_DONE',
  FETCH_WEATHER_ERROR = 'FETCH_WEATHER_ERROR',
  WOEID_SET = 'WOEID_SET',
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

export interface IWoeidSetAction {
  type: WeatherActionTypes.WOEID_SET
  payload: {
    woeid: number
  }
}

export const woeidSetAction = (woeid: number): IWoeidSetAction => ({
  type: WeatherActionTypes.WOEID_SET,
  payload: {
    woeid
  }
})

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
  | IWoeidSetAction