import {Component} from "react"
import {View, Text,Image,Button} from "@tarojs/components"
import "./cardvouncher.scss"
class CardVoucher extends Component {
  render() {
    // console.log("真拿到了吗",this.props.cardVoucherInfo)
    return (
      <View>
        {this.props.cardVoucherInfo.map((item,index) => {
          return (
            <View>
              <View className="gap"/>
              <View className="main">
                <Image onClick={this.props.showDetail.bind(this,item)} src={item.voucherUrl}/>
                <View className="cardVoucherArea">
                  <Text>{item.voucherName}</Text>
                  <View>截止时间:</View>
                  <View>{item.voucherDated}</View>
                  <View>VIP专享</View>
                  <View className="immediatelyBtn"><Button onClick={this.props.conversion.bind(this,item)}>立即使用</Button></View>
                </View>
              </View>
            </View>
          )
        })}
      </View>
    )
  }
}

export default CardVoucher
