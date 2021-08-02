import { combineReducers } from 'redux'
import repeatReducer from './repeatReducer'

export default combineReducers({
  repeat: repeatReducer,
})
