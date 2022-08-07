import {
  CARD_INFO
} from "../constants/carvoucher"
import cardVoucherImg from "../image/members/cardVoncher.png";

let data = {
  cardVoucherInfo: [
    {
      img: cardVoucherImg,
      name: "买一送一",
      dated: "2022.08.26"
    },
    {
      img: cardVoucherImg,
      name: "买一送一",
      dated: "2022.08.26"
    },
    {
      img: cardVoucherImg,
      name: "买一送一",
      dated: "2022.08.26"
    },
    {
      img: cardVoucherImg,
      name: "买一送一",
      dated: "2022.08.26"
    },
  ]
}

export const getCardVoucherInfo = () => {
  return (dispatch) => {
    dispatch({type:  CARD_INFO, data: data})
  }

}



