import {
  ADD_CUSTOMER_ORDER,
  GET_INFO, UPDATE_MEMBER_STATUS, UPDATE_PHONE
} from "../constants/memberInfo"
import Taro from "@tarojs/taro";
import {REDUCE_CARD} from "../constants/carvoucher";
import {dealWithDate} from "../pages/mber/util/phoneutil";
import {ADD_INTEGRAL} from "../constants/integralcenter";

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

// 订单生成
export const addCustomerOrder = (shoppingList,totalPrice) => {
  // 购物列表信息处理
  var goodList = ""
  shoppingList.map((item,index) => {
    goodList += item.shoppingName + "*" + item.foodNum + "+"
  })
  const gList = goodList.substring(0,goodList.length - 1)
  const orderTime = dealWithDate()
  return (dispatch) => {

    Taro.request({
      // url: 'http://localhost:8090/wx/addCustomerOrder',
      url: 'https://g1.glypro19.com/wx/addCustomerOrder',
      method: "POST",
      data: {
        startTime: orderTime,
        list: gList,
        amount: totalPrice,
        orderStatus: 1,
        message: ".....",
        customerId: Taro.getStorageSync("personalInfo").openId,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("是否增加成功",res.data.msg)
        dispatch({type: ADD_CUSTOMER_ORDER,data: res.data.msg})
      }
    })

  }
}

// 更新会员状态信息
export const updateMemberStatus = (memberStatus) => {
  // 可以在这里进行数据接收处理
  // 处理会员过期时间（不包含时分秒）
  const memberDated = dealWithDate()
  const mDated = memberDated.substring(0,10)
  return (dispatch) => {
    Taro.request({
      // url: 'http://localhost:8090/wx/updateCustomerMemberStatus',
      url: 'https://g1.glypro19.com/wx/updateCustomerMemberStatus',
      method: "POST",
      data: {
        openId: Taro.getStorageSync("personalInfo").openId,
        memberStatus:memberStatus,
        memberDated: mDated
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("更新会员状态",res.data.msg)
        console.log("更新会员状态信息",res.data)

        if (res.data.msg.includes("成功")) {
          const a = Taro.getStorageSync("personalInfo")
          const personalInfo = {
            avatar: a.avatar,
            code: a.code,
            encryptedData: a.encryptedData,
            expireTime: mDated,
            isMember: memberStatus,
            iv: a.iv,
            latestTime: a.latestTime,
            nickName: a.nickName,
            openId: a.openId,
            phoneNumber: a.phoneNumber,
            rawData: a.rawData,
            remark: a.remark,
            sessionKey: a.sessionKey,
            signature: a.signature,
            sum: a.sum,
          }
          // 重新设置个人信息
          Taro.setStorageSync("personalInfo",personalInfo)
          data.Info.isMember = memberStatus
        }

        console.log("会员状态更新是否成功",res.data.msg)
        dispatch({type: UPDATE_MEMBER_STATUS, data: data})
      }
    })
    // dispatch({type: UPDATE_MEMBER_STATUS, data: data.Info})
  }
}

export const getInfo = () => {
  // 可以在这里进行数据接收处理
  return (dispatch) => {
    dispatch({type: GET_INFO, data: data.Info})
  }
}

export const updatePhoneNumber = () => {

  const a = Taro.getStorageSync("personalInfo")
  const personalInfo = {
    avatar: a.avatar,
    code: a.code,
    encryptedData: a.encryptedData,
    expireTime: a.expireTime,
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
