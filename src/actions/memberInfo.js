import {
  GET_INFO
} from "../constants/memberInfo"
import Taro from "@tarojs/taro";

let data = {
  Info:{
    phone: Taro.getStorageSync("personalInfo").phoneNumber,
    wxName: Taro.getStorageSync("personalInfo").nickName,
    avatar: Taro.getStorageSync("personalInfo").avatar,
    isMember: Taro.getStorageSync("personalInfo").isMember,
    dated:Taro.getStorageSync("personalInfo").expireTime,
    payed: Taro.getStorageSync("personalInfo").sum,
  }
}

export const getInfo = () => {
  // 可以在这里进行数据接收处理
  return (dispatch) => {
    dispatch({type: GET_INFO, data: data})
  }
}
