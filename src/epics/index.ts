import { Epic, combineEpics } from 'redux-observable'
import {
  WeatherAction,
  WeatherActionTypes,
  weatherSetAction,
  weatherErrorAction
} from '../actions'
import { IWeatherState } from '../types'
import { ajax } from 'rxjs/ajax'
import { mergeMap, map, catchError, filter } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { isOfType } from 'typesafe-actions'

const weatherEpic: Epic<WeatherAction, WeatherAction, IWeatherState> = (
  actions$,
  state$
) =>
  actions$.pipe(
    filter(isOfType(WeatherActionTypes.FETCH_WEATHER_START)),
    // TODO
    mergeMap(action =>
      from(
        ajax.getJSON(
          `https://www.metaweather.com/api/location/search/?query=${action.payload.cityName}`
        )
      ).pipe(
        map(() => weatherSetAction([])),
        catchError(() => of(weatherErrorAction('error')))
      )
    )
  )

const rootEpics = combineEpics(weatherEpic)

export default rootEpics
