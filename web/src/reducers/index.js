import { combineReducers } from 'redux'
import repeatReducer from './repeatReducer'
import estimateReducer from './estimateReducer'

export default combineReducers({
  repeat: repeatReducer,
  estimate: estimateReducer,
})
