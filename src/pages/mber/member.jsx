import {Component} from "react"
import {View} from "@tarojs/components"
import BindPhone from "../personal/bindPhone/index"
import WxAccount from "../personal/wxaccount/index"
import "./member.scss"
// 记住首字母大写
import MemberPage from "./memberPage"
import Taro from "@tarojs/taro";
import {connect} from "react-redux";
import {getInfo} from "../../actions/memberInfo";
import {getInitIntegral,} from "../../actions/integralcenter";
import {getCardVoucherInfo} from "../../actions/carvoucher";
@connect((
    {
        memberPage,
        integralCenter,
        cardVoucher
    }) => (
        {
            memberPage,
            integralCenter,
            cardVoucher
        }),
    {
        getInfo,
        getInitIntegral,
        getCardVoucherInfo
    })
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
        // 加载个人界面信息
        console.log("加载个人信息")
        this.props.getInfo()
        // 界面初始化时，加载个人积分信息，卡券信息
        this.props.getInitIntegral()
        console.log("初始化个人积分")
        this.props.getCardVoucherInfo()
        console.log("初始化个人卡券")
    }

  render() {
      const openId = this.state.openId
      // console.log("openId:",openId)
    return (
        <View>
            {openId === "" ? (
                <View>
                    <WxAccount
                        checked={this.handlerIn}
                    />
                </View>
            ) : (
                <MemberPage/>
            )}
            {/*<MemberPage/>*/}
        </View>
    )
  }
}
