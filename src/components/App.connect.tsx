import App, { IAppStateProps, IAppDispatchProps } from './App'
import { IWeatherState } from '../types'
import { weatherGetAction } from '../actions'
import { connect } from 'react-redux'

function mapStateToDispatch(state: IWeatherState): IAppStateProps {
  return {
    weatherList: state.weatherList,
    loading: state.loading,
    errorMsg: state.errorMsg
  }
}

const mapDispatchToProps: IAppDispatchProps = {
  fetchWeather: weatherGetAction
}

export default connect(
  mapStateToDispatch,
  mapDispatchToProps
)(App)
