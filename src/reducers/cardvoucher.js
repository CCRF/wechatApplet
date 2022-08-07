import {CARD_INFO} from "../constants/carvoucher"

const INITIAL_STATE = {
  cardVoucherInfo: []
}

export default function cardVoucher (state = INITIAL_STATE,action) {
  let {type,data} = action
  switch (type) {
    case CARD_INFO:
      return {
        ...state,
        cardVoucherInfo: data.cardVoucherInfo
      }
    default:
      return state
  }
}
