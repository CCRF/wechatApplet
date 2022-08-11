import {
  CARD_INFO, GER_LIMIT_GOODS
} from "../constants/carvoucher"
import Taro from "@tarojs/taro";

export const getCardVoucherInfo = () => {
  return (dispatch) => {
    Taro.request({
      url: 'http://localhost:8090/wx/getLimitGoods',
      data: {openId:15},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        dispatch({type: CARD_INFO, data: res.data.data})
      }
    })
    // dispatch({type:  CARD_INFO, data: data})
  }
}



