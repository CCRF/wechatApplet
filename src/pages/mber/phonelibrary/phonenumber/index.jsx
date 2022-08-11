import {Component} from "react"
import {View} from "@tarojs/components"
import BindPhone from "../../../personal/bindPhone/index"
import Taro from "@tarojs/taro";

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phoneNum: ""
        }
    }

    checkAndShowPhoneNum = () => {
        const phone_num = Taro.getStorageSync("personalInfo").phoneNumber
        this.setState({
            phoneNum : phone_num
        })
    }

    render () {
        const phoneNum = this.state.phoneNum
        console.log("aaaaasssssssssss")
        return (
            <View>
                {phoneNum === "" ? (
                    <View>
                        <BindPhone
                           checked={this.checkAndShowPhoneNum}
                        />
                    </View>
                ) : (
                    <View>
                        <View>手机号：{this.state.phoneNum}</View>
                        <View>更换绑定</View>
                    </View>
                )}
            </View>


        )
    }
}

export default Index