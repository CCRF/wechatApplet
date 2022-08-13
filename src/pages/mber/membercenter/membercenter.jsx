import {Component} from "react"
import {View,Text,Image,Button} from "@tarojs/components"
import MySwiper from "../renewal/swiperitem/myswiper"
import {itemList} from  "./staticdata/index"
import "./membercenter.scss"
import Integral from "../../../image/members/integral.png"
import Taro from "@tarojs/taro";
import {connect} from "react-redux";
class MemberCenter extends Component {
  constructor(props) {
    super(props);
    this.state={
      itemList
    }
  }

  changeToIntegralCenter = () => {
    Taro.navigateTo({
      url: "../integralcenter/index"
    }).then(r => {})
  }

  render() {
    const personalIntegral = this.props.personIntegral
    // 手机号预处理
    const phoneNumber = Taro.getStorageSync("personalInfo").phoneNumber
    const prePhoneNumber = phoneNumber.substring(0,3)
    const afterPhoneNumber = phoneNumber.substring(phoneNumber.length - 4,phoneNumber.length)
    const phone = prePhoneNumber + "******" + afterPhoneNumber

    return (
      <View className="main">
        <View className="gap"/>
        <View className="header">
          <View className="header-text1">手机号：{phone}</View>
          <View className="header-text2"><Text>积分值：</Text><Text>{personalIntegral}</Text></View>
          <View className="header-text3">差387享88元开通VIP</View>
        </View>
        <View className="body">
          <View className="integralArea">
            <View>积分值{personalIntegral}</View>
            <View>更省钱！开通88VIP预计年省1839元</View>
          </View>
          <View className="strategyArea">
            <View className="mySwiperArea">
            <MySwiper
              itemList={this.state.itemList}
            />
          </View>
            <View className="checkBtnArea">
            <Button onClick={this.changeToIntegralCenter} plain="true">
              <Text>积分值不足2000分，查看涨分攻略</Text>
            </Button>
          </View>
          </View>
        </View>
        <View className="foot">
          <View className="f-ImageArea">
            <Image src={Integral}/>
          </View>
        </View>
      </View>
    )
  }
}

const initIntegralOfMemberCenter = state => {
  return {
    personIntegral: state.integralCenter.personIntegral
  }
}
export default connect(initIntegralOfMemberCenter)(MemberCenter)