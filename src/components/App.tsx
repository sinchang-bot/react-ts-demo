import * as React from 'react'
import { IWeather } from '../types'

export interface IAppStateProps {
  weatherList: IWeather[]
  loading: boolean
  errorMsg: string
}

export interface IAppDispatchProps {
  fetchWeather: (cityName: string) => void
}

export interface IAppOwnState {
  cityName: string
}

type AppProps = IAppDispatchProps & IAppStateProps

export default class App extends React.Component<AppProps, IAppOwnState> {
  constructor(props: AppProps) {
    super(props)

    this.state = {
      cityName: ''
    }
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      cityName: e.target.value
    })
  }

  onClick = () => {
    if (!this.state.cityName) return
    this.props.fetchWeather(this.state.cityName)
  }

  render() {
    const { weatherList, loading, errorMsg } = this.props
    return (
      <React.Fragment>
        {errorMsg && <div className="red">{errorMsg}</div>}
        {loading && <div>loading...</div>}
        <form action="">
          <input
            type="text"
            name="city"
            onChange={this.onChange}
            value={this.state.cityName}
          />
          <button type="button" onClick={ this.onClick }>Search</button>
        </form>
        <ul>
          { weatherList.map(weather => (
            <li>
              <p>Date: { weather.applicable_date }</p>
              <p>Temp: { weather.the_temp }</p>
              <p>Weather: { weather.weather_state_name }</p>
            </li>
          ))}
        </ul>
      </React.Fragment>
    )
  }
}
