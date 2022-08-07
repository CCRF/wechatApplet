import {Component} from "react"
import {View, Text} from "@tarojs/components"
import CardVoucher from "./cardvoucher"
import {connect} from 'react-redux'
import "./index.scss"
import {getCardVoucherInfo} from "../../../actions/carvoucher";

@connect(({cardVoucher}) => ({cardVoucher}),{getCardVoucherInfo})
class CardIndex extends Component {
  constructor(props) {
    super(props);
    this.props.getCardVoucherInfo()
  }
  render() {
    const cardList = this.props.cardVoucher.cardVoucherInfo
    return (
      <View className="body">
        <CardVoucher
          cardVoucherInfo={cardList}
        />
      </View>
    )
  }
}

export default CardIndex
