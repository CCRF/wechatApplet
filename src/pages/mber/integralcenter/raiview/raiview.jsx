import {Component} from "react"
import {Button, Image, View} from "@tarojs/components";
import integralIcon from "../../../../image/members/积分-实色.png";
import "./raiview.scss"
import Taro from "@tarojs/taro";

class RaiView extends Component {

  // e对象放后面，前面参数对应传入值的顺序
  // 立即兑换
  // conversion = (name,raiId,e) => {
  //   this.props.raiList.map ((item,index) => {
  //     if (item.raiId === raiId){
  //       console.log(raiId,"个权益")
  //     }
  //   })
  // }

  render() {
    return (
      <View className="main">
        {this.props.raiList.map((item, index) => {
          return (
            <View className="raiArea">
              {/*<View className="integralImgArea"><Image src={item.img}/>{item.integral}积分</View>*/}
              <View className="integralImgArea"><Image src={integralIcon}/>{item.integral}积分</View>
              <View className="raiImgArea">
                <Image src={item.img}/>
              </View>
              <View className="raiNameArea">{item.name}</View>
              <View className="raiBtnArea">
                <Button onClick={this.props.conversion.bind(this,item)} plain="true">立即兑换</Button>
              </View>
            </View>
          )
        })}
      </View>
    )
  }
}

export default RaiView
