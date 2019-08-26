import { Epic, combineEpics } from 'redux-observable'
import axios from 'axios'
import {
  WeatherAction,
  WeatherActionTypes,
  weatherSetAction,
  woeidSetAction,
  weatherErrorAction
} from '../actions'
import { IWeatherState } from '../types'
import { mergeMap, map, catchError, filter } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { isOfType } from 'typesafe-actions'

const API_HOST = 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api'

const woeidEpic: Epic<WeatherAction, WeatherAction, IWeatherState> = (
  actions$,
  state$
) =>
  actions$.pipe(
    filter(isOfType(WeatherActionTypes.FETCH_WEATHER_START)),
    mergeMap(action =>
      from(
        axios(
          `${API_HOST}/location/search/?query=${action.payload.cityName}`
        )
      ).pipe(
        map((res) => {
          return woeidSetAction(res.data[0].woeid)
        }),
        catchError(() => of(weatherErrorAction('error')))
      )
    )
  )

const weatherEpic: Epic<WeatherAction, WeatherAction, IWeatherState> = (
    actions$,
    state$
  ) =>
    actions$.pipe(
      filter(isOfType(WeatherActionTypes.WOEID_SET)),
      mergeMap(action =>
        from(
          axios(
            `${API_HOST}/location/${state$.value.woeid}`
          )
        ).pipe(
          map((res) => {
            return weatherSetAction(res.data.consolidated_weather)
          }),
          catchError(() => of(weatherErrorAction('error')))
        )
      )
    )

const rootEpics = combineEpics(weatherEpic, woeidEpic)

export default rootEpics
