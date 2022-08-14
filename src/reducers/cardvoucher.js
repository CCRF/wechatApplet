import {ADD_CARD, CARD_INFO, GER_LIMIT_GOODS, REDUCE_CARD} from "../constants/carvoucher"

const INITIAL_STATE = {
    cardVoucherInfo: [],
    limitGoods: [],
}

export default function cardVoucher(state = INITIAL_STATE, action) {
    let {type, data} = action
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
        case ADD_CARD:
            return {
                ...state,
                addMsg: data
            }
        case REDUCE_CARD:
            return {
                ...state,
                reduceMsg: data
            }
        case REDUCE_CARD:
            return {
                ...state,
                cardVoucherInfo: data
            }
        default:
            return state
    }
}
