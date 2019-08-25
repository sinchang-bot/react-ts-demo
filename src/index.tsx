import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { ActionType } from 'typesafe-actions'
import { createEpicMiddleware } from 'redux-observable' 

import App from './components/App.connect'
import weatherReducer, { initialState } from './reducers'
import epics from './epics'
import * as actions from './actions'
import { IWeatherState } from './types'

type Action = ActionType<typeof actions>

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
  }
}

const composeEnhancers = (
  window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

const epicMiddleware = createEpicMiddleware<Action, Action, IWeatherState>()

const store = createStore(
  weatherReducer,
  initialState,
  composeEnhancers(applyMiddleware(epicMiddleware))
)

epicMiddleware.run(epics)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
)
