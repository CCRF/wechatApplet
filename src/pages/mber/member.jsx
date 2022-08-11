import {Component} from "react"
import {View} from "@tarojs/components"
import BindPhone from "../personal/bindPhone/index"
import WxAccount from "../personal/wxaccount/index"
import "./member.scss"
// 记住首字母大写
import MemberPage from "./memberPage"
import Taro from "@tarojs/taro";
export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openId: ""
        }
    }

    handlerIn = () => {
        const handler_openId = Taro.getStorageSync("personalInfo").openId;
        console.log("函数调用了没有")
        this.setState({
            openId: handler_openId
        })
    }

  render() {
      const openId = this.state.openId
      // console.log("openId:",openId)
    return (
        <View>
            {/*{openId === "" ? (*/}
            {/*    <View>*/}
            {/*        <WxAccount*/}
            {/*            checked={this.handlerIn}*/}
            {/*        />*/}
            {/*        <BindPhone/>*/}
            {/*    </View>*/}
            {/*) : (*/}
            {/*    <MemberPage/>*/}
            {/*)}*/}
            <MemberPage/>
        </View>
    )
  }
}
