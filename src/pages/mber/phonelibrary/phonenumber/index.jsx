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
        // const phone_num = Taro.getStorageSync("personalInfo").phoneNumber
        this.setState({
            // phoneNum : phone_num
        })
    }

    render () {
        // const phoneNum = this.state.phoneNum
        // 先从Storage中查看是否有手机号，因为第一次绑定手机账号后，以后每次使用wx账号登录
        // 都能拿到手机号，就不用在绑定手机号了
        const phoneNumber = Taro.getStorageSync("personalInfo").phoneNumber
        return (
            <View>
                {phoneNumber === "" ? (
                    <View>
                        <BindPhone
                           checked={this.checkAndShowPhoneNum}
                        />
                    </View>
                    // <View>
                    //     <View>手机号：{phoneNumber}</View>
                    // </View>
                ) : (
                    <View>
                        <View>手机号：{phoneNumber}</View>
                    </View>

                    // <View>
                    // <BindPhone
                    // checked={this.checkAndShowPhoneNum}
                    // />
                    // </View>
                )}
            </View>


        )
    }
}

export default Index