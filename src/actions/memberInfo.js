import {
  GET_INFO
} from "../constants/memberInfo"
import Taro from "@tarojs/taro";

let data = {
  Info:{
    phone: Taro.getStorageSync("personalInfo").phoneNumber,
    wxName: Taro.getStorageSync("personalInfo").nickName,
    avatar: Taro.getStorageSync("personalInfo").avatar,
    isMember: 2,
    dated:"2022.09.29",
    payed: "12223",
  }
}

export const getInfo = () => {
  // 可以在这里进行数据接收处理
  return (dispatch) => {
    // Taro.request({
    //   url: 'http://localhost:8090/wx/getCustomerIntegral',
    //   data: {openId:15},
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (data) {
    //     dispatch({type: GET_INFO, data: data})
    //   }
    // })
    // console.log("actionInfo",data)
    dispatch({type: GET_INFO, data: data})
  }
}
