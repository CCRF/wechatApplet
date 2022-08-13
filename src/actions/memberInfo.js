import {
  GET_INFO, UPDATE_PHONE
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

export const updatePhoneNumber = () => {

  const a = Taro.getStorageSync("personalInfo")
  console.log("xagaag阿士大夫",Taro.getStorageSync("phoneNumber"))
  const personalInfo = {
    avatar: a.avatar,
    code: a.code,
    encryptedData: a.encryptedData,
    isMember: a.isMember,
    iv: a.iv,
    latestTime: a.latestTime,
    nickName: a.nickName,
    openId: a.openId,
    phoneNumber: Taro.getStorageSync("phoneNumber"),
    rawData: a.rawData,
    remark: a.remark,
    sessionKey: a.sessionKey,
    signature: a.signature,
    sum: a.sum,
  }

  // 重新设置个人信息
  Taro.setStorageSync("personalInfo",personalInfo)
  data.Info.phone = Taro.getStorageSync("phoneNumber")
  return (dispatch) => {
    dispatch({type: UPDATE_PHONE,data: data})
  }
}
