import {
  GET_INFO
} from "../constants/memberInfo"

let data = {
  Info:{
    phone: "2222222222222",
    isMember: true,
    level: "Lv3",
    dated:"2022.09.29",
    isRenewal: "不自动续费",
    Renewal: "立即续费",
    payed: "12223",
  }
}

export const getInfo = () => {
  // 可以在这里进行数据接收处理
  return (dispatch) => {
    console.log("action")
    dispatch({type: GET_INFO, data: data})
  }
}
