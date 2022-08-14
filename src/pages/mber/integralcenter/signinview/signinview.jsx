import {Component} from "react"
import {View, Text, Image} from "@tarojs/components"
import "./signinview.scss"
import integralIcon from "../../../../image/members/积分-实色.png";

class SignInView extends Component {
    render() {
        const list = this.props.list
        console.log("传回来的签到状态；", list)
        return (
            <View>
                {list.map((item, index) => {
                    return (
                        <View className="integralNumArea">
                            <View>
                                <View><Image src={integralIcon}/></View>
                                <View><Text>{this.props.signIntegral}</Text></View>
                                {item === 1 ? (
                                    <View><Text>已签</Text></View>
                                ) : (
                                    <View><Text>未签</Text></View>
                                )}
                            </View>
                        </View>
                    )
                })}
            </View>
        )
    }
}

export default SignInView
