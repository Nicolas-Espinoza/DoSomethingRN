import { combineReducers } from 'redux'
import taskReducer from './taskReducer'

const mainReducer = combineReducers({
  taskReducer
})

export default mainReducer