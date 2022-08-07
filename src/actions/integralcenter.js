import {
  ADD_INTEGRAL,
  INIT_INTEGRAL,
  INIT_SIGN_IN_STATUS,
  SUBTRACT_INTEGRAL,} from "../constants/integralcenter"

// 获取个人积分
let data = {
  personIntegral: 2000,
  // 1 已签，0 未签
  signInStatus: [1,1,0,0,0,0,1]
}

export const addIntegral = () => {
    return (dispatch) => {
      dispatch({type: ADD_INTEGRAL})
  }
}

export const getInitIntegral = () => {
  return (dispatch) => {
    dispatch({type: INIT_INTEGRAL,data: data})
  }
}

export const initSignInStatus = () => {
  return (dispatch) => {
    dispatch({type: INIT_SIGN_IN_STATUS,data: data})
  }
}

export const subtractIntegral = (requiredIntegral) => {
  return (dispatch) => {
    console.log("所需积分",requiredIntegral)
    dispatch({type: SUBTRACT_INTEGRAL, data: {requiredIntegral}})
  }
}
