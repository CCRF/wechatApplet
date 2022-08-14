import {ADD_CUSTOMER_ORDER, GET_INFO, UPDATE_MEMBER_STATUS, UPDATE_PHONE} from "../constants/memberInfo"

const INITIAL_STATE = {
  Info: {}
}
export default function memberPage(state = INITIAL_STATE, action) {
  let {type,data} = action

  switch (type) {
    case GET_INFO:
      return {
        ...state,
        Info: data
      }
    case UPDATE_PHONE:
      return {
        ...state,
        Info: data.Info
      }
    case UPDATE_MEMBER_STATUS:
      return {
        ...state,
        Info: data.Info
      }
    case ADD_CUSTOMER_ORDER:
      return {
        ...state,
        msg: data
      }
    default:
      return state
  }
}
