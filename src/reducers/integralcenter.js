import {
  ADD_INTEGRAL,
  INIT_INTEGRAL,
  INIT_SIGN_IN_STATUS,
  SUBTRACT_INTEGRAL
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
        personIntegral: state.personIntegral + 5
      }
    case INIT_INTEGRAL:
      return {
        ...state,
        personIntegral: data.personIntegral

      }
    case INIT_SIGN_IN_STATUS:
      return {
        ...state,
        signInStatus: data.signInStatus,
      }
    case SUBTRACT_INTEGRAL:
      return {
        ...state,
        personIntegral: state.personIntegral - data.requiredIntegral
      }
    default:
      return state
  }
}
