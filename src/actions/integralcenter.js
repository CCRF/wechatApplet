import {
  ADD_INTEGRAL,
  INIT_INTEGRAL,
  INIT_SIGN_IN_STATUS,
  SUBTRACT_INTEGRAL, UPDATE_SIGN_IN_STATUS,
} from "../constants/integralcenter"
import Taro from "@tarojs/taro";
import {CARD_INFO} from "../constants/carvoucher";

// 获取个人积分
let data = {
  personIntegral: 2000,
  // 1 已签，0 未签
  signInStatus: [1,1,0,0,0,0,1]
}

// 积分增加
export const addIntegral = () => {
    return (dispatch) => {
      Taro.request({
        // url: 'http://localhost:8090/wx/addCustomerIntegral',
        url: 'https://g1.glypro19.com/wx/addCustomerIntegral',
        method: "POST",
        data: {openId:15,integral: 5},
        header: {
          // 'content-type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log("是否增加成功",res.data.msg)
          dispatch({type: ADD_INTEGRAL})
        }
      })
      // dispatch({type: ADD_INTEGRAL})
  }
}

// 初始化个人积分
export const getInitIntegral = () => {
  return (dispatch) => {
    Taro.request({
      // url: 'http://localhost:8090/wx/getCustomerIntegral',
      url: 'https://g1.glypro19.com/wx/getCustomerIntegral',
      data: {openId:15},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("初始化积分1",res.data.data)
        dispatch({type: INIT_INTEGRAL, data: res.data.data})
      }
    })
    // dispatch({type: INIT_INTEGRAL,data: data})
  }
}

// 初始化个人签到状态
export const initSignInStatus = () => {
  return (dispatch) => {
    Taro.request({
      // url: 'http://localhost:8090/wx/getCustomerSignInStatus',
      url: 'https://g1.glypro19.com/wx/getCustomerSignInStatus',
      data: {openId:15},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log("获取到的签到状态字符串",res)
        // 字符串转数组
        const signStatus = []
        const str = res.data.msg.split(",")
        str.map((item,index) => {
          signStatus[index] = parseInt(item)
        })
        dispatch({type: INIT_SIGN_IN_STATUS, data: signStatus})
      }
    })

    // dispatch({type: INIT_SIGN_IN_STATUS,data: data})
  }
}

// 积分减少
export const subtractIntegral = (requiredIntegral) => {
  return (dispatch) => {
    // console.log("所需积分",requiredIntegral)
    Taro.request({
      // url: 'http://localhost:8090/wx/reduceCustomerIntegral',
      url: 'https://g1.glypro19.com/wx/reduceCustomerIntegral',
      method: "POST",
      data: {openId:15,integral: requiredIntegral},
      header: {
        // 'content-type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("是否减少成功",res.data.msg)
        dispatch({type: SUBTRACT_INTEGRAL, data: {requiredIntegral}})
      }
    })

    // dispatch({type: SUBTRACT_INTEGRAL, data: {requiredIntegral}})
  }
}

// 更新个人签到状态
export const updateSignInStatus = (signStatus,signStatusArray) => {
  console.log("更新的签到状态action",signStatus)
  return (dispatch) => {

    Taro.request({
      // url: 'http://localhost:8090/wx/updateCustomerSignInStatus',
      url: 'https://g1.glypro19.com/wx/updateCustomerSignInStatus',
      method: "POST",
      data: {openId:15,signInStatus:signStatus},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("是否更新成功",res.data.msg)

        dispatch({type: UPDATE_SIGN_IN_STATUS, data: signStatusArray})
      }
    })

  }
}
