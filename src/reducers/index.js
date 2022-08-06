import { combineReducers } from 'redux'
import counter from './counter'
import ordering from './ordering'
import orderingType from "./orderingType";

export default combineReducers({
  counter,
  ordering,
  orderingType

})
