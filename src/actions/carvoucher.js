import {
  ADD_CARD,
  CARD_INFO, GER_LIMIT_GOODS, REDUCE_CARD
} from "../constants/carvoucher"
import Taro from "@tarojs/taro";

// 获取个人卡券
export const getCardVoucherInfo = () => {
  return (dispatch) => {
    Taro.request({
      // url: 'http://localhost:8090/wx/getLimitGoods',
      url: 'https://g1.glypro19.com/wx/getLimitGoods',
      data: {openId:Taro.getStorageSync("personalInfo").openId},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("删除后更新卡券信息",res)
        dispatch({type: CARD_INFO, data: res.data.data})
      }
    })
    // dispatch({type:  CARD_INFO, data: data})
  }
}

// 卡券增加
export const addCardVoucherInfo = (voucher) => {
  console.log("需增加卡券信息",voucher)
  // 解析卡券信息，保存到数据库
  return (dispatch) => {
    Taro.request({
      url: 'https://g1.glypro19.com/wx/addCustomerCardVoucher',
      // url: 'http://localhost:8090/wx/addCustomerCardVoucher',
      method: "POST",
      data: {
        "voucherId": voucher.voucherId,
        "openId": voucher.openId,
        "voucherName": voucher.voucherName,
        "voucherDated": voucher.voucherDated,
        "voucherUrl": voucher.voucherUrl,
        "voucherType": voucher.voucherName,
        "voucherRai": voucher.voucherRai,
        "voucherLimit": voucher.voucherLimit,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("卡卷是否添加成功",res.data.msg)
        dispatch({type: ADD_CARD, data: res.data.msg})
      }
    })
  }
}

// 卡券减少
export const reduceCardVoucherInfo = (voucherId) => {
    return (dispatch) => {
      Taro.request({
        // url: 'http://localhost:8090/wx/deleteCustomerCardVoucher',
        url: 'https://g1.glypro19.com/wx/deleteCustomerCardVoucher',
        method: "POST",
        data: {voucherId:voucherId},
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log("卡券是否删除成功",res.data.msg)
          dispatch({type: REDUCE_CARD, data: res.data.msg})
        }
      })
  }
}




