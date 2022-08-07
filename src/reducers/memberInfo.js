import {GET_INFO} from "../constants/memberInfo"

const INITIAL_STATE = {
  Info: {}
}
export default function memberPage(state = INITIAL_STATE, action) {
  let {type,data} = action
  console.log("大数据aaa",data);
  switch (type) {
    case GET_INFO:
      return {
        ...state,
        Info: data.Info
      }
    default:
      return state
  }
}
