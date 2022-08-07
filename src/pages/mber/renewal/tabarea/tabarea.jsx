import {Component} from "react"
import {Button, Image, Text, View} from "@tarojs/components";
import MySwiper from "../swiperitem/myswiper"
import Hongbao from "../../../../image/members/红包.png";
import T1 from "../../../../asset/images/24280.jpg";
import T2 from "../../../../asset/images/burger_focus.png";
import T3 from "../../../../asset/images/eye.png";
import T4 from "../../../../asset/images/heart2.png";
import "./tabarea.scss"

class TabArea extends Component {

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
    render() {
      return (
        <View>
          {/*2.1.1、月卡区域*/}
          <View className="speech-bubble speech-bubble-bottom">
            <Text className="y-1">月卡</Text><Text className="y-2">Ұ{this.props.allPrice}</Text>
          </View>
          {/*2.1.2、续费权限区域*/}
          <View className="q-a">
            <View className="a-ta1"><Text>续费每月享6张红包，价值{this.props.totalPrice}元</Text></View>
            {/*2.1.2.1红包区域*/}
            <View className="h-a">
              <View className="t-ag">
                <Text className="t-g1">{this.props.singlePrice}元</Text><Text className="t-g11"> X </Text><Text className="t-g">6张</Text>
              </View>
              <View className="t-g2">
                <Image className="i-g" src={Hongbao}/>
                <Image className="i-g" src={Hongbao}/>
                <Image className="i-g" src={Hongbao}/>
              </View>
            </View>
            <View className="a-ta2"><Text>再享{this.props.raiNum}大权益</Text></View>
            {/*2.1.2.2 会员权限滑动视图*/}
            <View>
              <MySwiper
                itemList={this.state.itemList}
              />
            </View>
          </View>
          {/*2.1.3、支付详情区域*/}
          <View className="m-c"><Text>会员惊喜抵扣券</Text><Text className="m-c1">暂无可用</Text></View>
          <View className="p-m">
            <View className="p-m-t1">会员红包等权益将在67天后发放</View>
            {/*2.1.3.1支付按钮*/}
            <View className="pay-btn">
              <Button>Ұ<Text>15</Text>去支付</Button>
            </View>
            <View className="p-m-t2">放心支付，不自动续费</View>
          </View>
        </View>
      )
    }
}

export default TabArea
