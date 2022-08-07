import { combineReducers } from 'redux'
import counter from './counter'
import ordering from './ordering'
import orderingType from "./orderingType";
import memberPage from "./memberInfo"
import cardVoucher from "./cardvoucher"
import integralCenter from "./integralcenter"

export default combineReducers({
  counter,
  ordering,
  orderingType,
  memberPage,
  cardVoucher,
  integralCenter,
})
