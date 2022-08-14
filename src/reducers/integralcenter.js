import {
  ADD_INTEGRAL,
  INIT_INTEGRAL,
  INIT_SIGN_IN_STATUS,
  SUBTRACT_INTEGRAL, UPDATE_SIGN_IN_STATUS
} from "../constants/integralcenter"

const INITIAL_STATE = {
  personIntegral: 0,
  signInStatus: [],
}

export default function integralCenter (state = INITIAL_STATE,action) {
  let {type,data} = action

  switch (type) {
    case ADD_INTEGRAL:
      return {
        ...state,
        personIntegral: state.personIntegral + data
      }
    case INIT_INTEGRAL:
      return {
        ...state,
        personIntegral: data

      }
    case INIT_SIGN_IN_STATUS:
      return {
        ...state,
        signInStatus: data,
      }
    case SUBTRACT_INTEGRAL:
      return {
        ...state,
        personIntegral: state.personIntegral - data.requiredIntegral
      }
    case UPDATE_SIGN_IN_STATUS:
      return {
        ...state,
        signInStatus: data
      }
    default:
      return state
  }
}
