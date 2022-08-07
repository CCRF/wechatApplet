import {Component} from "react"
import {View,Text,Image,Button} from "@tarojs/components"
import MySwiper from "../renewal/swiperitem/myswiper"
import "./membercenter.scss"
import T1 from "../../../asset/images/24280.jpg";
import T2 from "../../../asset/images/burger_focus.png";
import T3 from "../../../asset/images/eye.png";
import T4 from "../../../asset/images/heart2.png";
import Integral from "../../../image/members/integral.png"
import Taro from "@tarojs/taro";
class MemberCenter extends Component {
  constructor(props) {
    super(props);
    this.state={
      itemList: [
        [
          {url:T1,raiInfo:"升级大额红包"},
          {url:T1,raiInfo:"升级大额红包"},
          {url:T1,raiInfo:"升级大额红包"},
          {url:T1,raiInfo:"升级大额红包"}
        ],
        [
          {url:T2,raiInfo:"升级大额红包"},
          {url:T2,raiInfo:"升级大额红包"},
          {url:T2,raiInfo:"升级大额红包"},
          {url:T2,raiInfo:"升级大额红包"}
        ],
        [
          {url:T3,raiInfo:"升级大额红包"},
          {url:T3,raiInfo:"升级大额红包"},
          {url:T3,raiInfo:"升级大额红包"},
          {url:T3,raiInfo:"升级大额红包"}
        ],
        [
          {url:T4,raiInfo:"升级大额红包"},
          {url:T4,raiInfo:"升级大额红包"},
          {url:T4,raiInfo:"升级大额红包"},
          {url:T4,raiInfo:"升级大额红包"}
        ]
      ]
    }
  }

  changeToIntegralCenter = () => {
    Taro.navigateTo({
      url: "../integralcenter/index"
    }).then(r => {})
  }

  render() {
    return (
      <View className="main">
        <View className="gap"/>
        <View className="header">
          <View className="header-text1">手机号：13017017501</View>
          <View className="header-text2"><Text>积分值：</Text><Text>1919</Text></View>
          <View className="header-text3">差387享88元开通VIP</View>
        </View>
        <View className="body">
          <View className="integralArea">
            <View>积分值1919</View>
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

export default MemberCenter
