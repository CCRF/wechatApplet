import {Component} from "react"
import {View, Text,Image,Button} from "@tarojs/components"
import "./cardvouncher.scss"
class CardVoucher extends Component {
  render() {
    return (
      <View>
        {this.props.cardVoucherInfo.map((item,index) => {
          return (
            <View>
              <View className="gap"/>
              <View className="main">
                <Image src={item.img}/>
                <View className="cardVoucherArea">
                  <Text>{item.name}</Text>
                  <Text>截止时间: </Text>
                  <Text>{item.dated}</Text>
                  <Text>VIP专享</Text>
                  <View className="immediatelyBtn"><Button>立即使用</Button></View>
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
