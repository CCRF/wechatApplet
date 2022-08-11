import {CARD_INFO, GER_LIMIT_GOODS} from "../constants/carvoucher"

const INITIAL_STATE = {
  cardVoucherInfo: [],
  limitGoods: []
}

export default function cardVoucher (state = INITIAL_STATE,action) {
  let {type,data} = action
  switch (type) {
    case CARD_INFO:
      return {
        ...state,
        cardVoucherInfo: data
      }
    case GER_LIMIT_GOODS:
      return {
        ...state,
        limitGoods: data
      }
    default:
      return state
  }
}
