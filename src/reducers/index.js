import { combineReducers } from 'redux'
import counter from './counter'
import ordering from './ordering'
import orderingType from "./orderingType";
import currentOrder from "./currentOrder";
import historyOrder from "./historyOrder";
import memberPage from "./memberInfo"
import cardVoucher from "./cardvoucher"
import integralCenter from "./integralcenter"

export default combineReducers({
  counter,
  ordering,
  orderingType,
  currentOrder,
  historyOrder,
  memberPage,
  cardVoucher,
  integralCenter,
})
