import {Component} from "react"
import {Button, View, Text, Image, SwiperItem, Swiper} from "@tarojs/components"
import {AtTabs, AtTabsPane} from 'taro-ui'
import {connect} from "react-redux"
import Crown from "../../../image/members/皇冠.png"
import TabArea from "./tabarea/tabarea"
import Ques from "../../../image/members/问小.png"
import Answ from "../../../image/members/答小.png"

import "./renewal.scss"

class Renewal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      data: this.props.Info
    }
  }

  handleClick(value) {
    console.log("Store数据树",this.state.data.Info)
    this.setState({
      current: value
    })
  }

  render() {
    const tabList = [{title: '超级会员'}, {title: '会员轻享'}]
    return (
      <View>
        {/*1、头部区域*/}
        <View className="header">
          <View className="i-a"><View><Image src={Crown}/></View></View>
          <View className="p-a">
            <View>{this.state.data.phone}</View>
            <View><Text className="t-a">当前会员有效期至{this.state.data.dated}</Text></View>
          </View>
        </View>
        {/*1、主体区域*/}
        <View className="a-t1">
          {/*1、tab区域*/}
          <View className="at-t">
            <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
              {/*2.1、tab区域一*/}
              <AtTabsPane current={this.state.current} index={0}>
                <TabArea
                  allPrice={15}
                  totalPrice={30}
                  singlePrice={5}
                  raiNum={9}
                />
              </AtTabsPane>
              {/*tab区域二*/}
              <AtTabsPane current={this.state.current} index={1}>
               <TabArea
                 allPrice={9}
                 totalPrice={18}
                 singlePrice={3}
                 raiNum={2}
               />
              </AtTabsPane>
            </AtTabs>
          </View>
        </View>
        {/*1、问答区域*/}
        <View className="f-a">
          <View className="f-a-ar1">
            <Image className="f-a-i1" src={Ques}/><View className="f-a-t1"><Text>如何立即获得会员红包</Text></View>
          </View>
          <View className="f-a-ar2">
            <Image className="f-a-i1" src={Answ}/><View className="f-a-t2"><Text>可在会员有效期内购买加量包，红包秒到账</Text></View>
          </View>
          <Text className="f-a-t3">去购买 ></Text>
        </View>
      </View>
    )
  }
}

const getInfo = state => {
  return {
    Info: state.memberPage.Info
  }
}
export default connect(getInfo)(Renewal)
