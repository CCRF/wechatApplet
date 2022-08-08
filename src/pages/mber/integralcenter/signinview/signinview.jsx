import {Component} from "react"
import { View, Text, Image} from "@tarojs/components"
import "./signinview.scss"
import integralIcon from "../../../../image/members/积分-实色.png";

class SignInView extends Component {
  render() {
    const list = [1,1,0,0,0,0,1]
    return (
      <View className="integralNumArea">
        {list.map((item, index) => {
          return (
            <View>
              <View><Image src={integralIcon}/></View>
              <View><Text>5</Text></View>
              {item === 1 ? (
                <View><Text>已签</Text></View>
              ) : (
                <View><Text>未签</Text></View>
              )}
            </View>
          )
        })}
      </View>
    )
  }
}

export default SignInView
