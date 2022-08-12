import {Component} from "react"
import {connect} from "react-redux"
import {ScrollView, View, Text, Image, Button} from "@tarojs/components"
import {AtModal, AtNoticebar, AtToast} from 'taro-ui'
import {raiList} from "./staticdata/index"
import RaiView from "./raiview/raiview"
import SignInView from "./signinview/signinview";
import integralIcon from "../../../image/members/积分-实色.png";
import "./index.scss"

import {
    subtractIntegral,
    addIntegral,
    initSignInStatus,
    updateSignInStatus
} from "../../../actions/integralcenter";
import {addCardVoucherInfo, getCardVoucherInfo} from "../../../actions/carvoucher";

@connect(({integralCenter, cardVoucher}) => ({integralCenter, cardVoucher}), {
    subtractIntegral,
    addIntegral,
    initSignInStatus,
    updateSignInStatus,
    addCardVoucherInfo,
    getCardVoucherInfo
})
class Index extends Component {

    constructor(props) {
        super(props);
        this.props.initSignInStatus()
        this.state = {
            // 兑换卡券信息
            addCard: {

            },
            // 积分是否足够
            isConversion: false,
            // 兑换权益所需积分
            requiredIntegral: 0,
            // 模态框是否显示
            modelOpened: false,
            // 兑换提示框
            toastConversion: false,
            // 签到状态提示框
            toastSign: false,
            // 是否已签
            isSign: false,
            raiList: raiList,
        }
    }

    // 签到
    signIn = () => {
        const signInStatus = this.props.integralCenter.signInStatus
        const weekDay = new Date().getDay()

        // 判断今天是否已签 0未签，1已签
        if (signInStatus[weekDay - 1] === 0) {
            // 提示框变为签到成功文本
            this.state.isSign = true;
            // 发送积分增加请求
            this.props.addIntegral()
            // 并修改积分签到状态
            signInStatus[weekDay - 1] = 1
            this.props.updateSignInStatus(signInStatus.toString(),signInStatus)
        } else {
            // 提示框变为今天已签文本
            this.state.isSign = false;
        }

        // 弹出签到提示框
        this.setState({
            toastSign: true,
        })
    }

    // 签到状态提示框关闭后
    signToastClose = () => {
        this.state.toastSign = false;
    }

    // e对象放后面，前面参数对应传入值的顺序
    // 立即兑换
    conversion = (raiItem, e) => {
        this.state.raiList.map((item, index) => {
            if (item.raiId === raiItem.raiId) {
                console.log("选中卡券信息", item)
                // 卡券信息处理，
                // 卡券过期时间一律为七天之后
                // 获取当前时间，时间处理
                const date = new Date()
                date.setDate(date.getDate() + 7)
                const year = date.getFullYear()
                const month = date.getMonth() + 1
                const day = date.getDate()
                const Hours = date.getHours()
                const minutes = date.getMinutes()
                const second = date.getSeconds()
                const dated = year + "-" + month + "-" + day + " " + Hours + ":" + minutes + ":" + second
                console.log("卡券过期时间",dated)

                // 卡券信息整理
                const card = {
                    voucherId: "null",
                    openId: "15",
                    voucherName: raiItem.name,
                    voucherDated: dated,
                    voucherUrl: "../../.." + raiItem.img,
                    voucherType: raiItem.name,
                    voucherRai: raiItem.voucherRai,
                    voucherLimit: raiItem.goodsList
                }
                this.state.addCard = card

                // 弹出提示框是否兑换
                this.setState({
                    requiredIntegral: raiItem.integral,
                    modelOpened: true,
                })
            }
        })
    }


    // 模态框取消按钮
    conversionHandleCancel = () => {
        this.setState({
            modelOpened: false
        })
    }

    // 模态框确认按钮
    conversionHandleConfirm = () => {
        // console.log("是否能兑换", this.state.isConversion)
        const isConversion = this.props.integralCenter.personIntegral < this.state.requiredIntegral
        console.log("是否能兑换", isConversion)
        if (isConversion) {
            // 显示 提示积分不足
            this.state.isConversion = false;
            this.props.addCardVoucherInfo(this.state.addCard)
            this.props.getCardVoucherInfo()
            console.log("要更新的卡券信息",this.state.addCard)

        } else {
            // 显示 提示兑换成功
            this.state.isConversin = true;
            // 进行卡券增加操作
            // this.props.addCardVoucheInfo(this.state.addCard)
            // 将该卡券信息添加到数据库，然后在这里在发一次请求数据库个人卡券信息
            this.props.getCardVoucherInfo()
            // 更新全局卡券信息


            // 个人积分相应减少
            this.props.subtractIntegral(this.state.requiredIntegral)
        }
        // 弹出兑换状态提示框
        this.setState({
            modelOpened: false,
            toastConversion: true
        })
    }

    // 兑换状态提示框关闭时操作
    conversionToastClose = () => {
        this.setState({
            toastConversion: false
        })
    }


    render() {
        const personalIntegral = this.props.integralCenter.personIntegral
        console.log("个人积分", personalIntegral)
        return (
            <View className="body">
                <View className="header">
                    <View className="integralNum">
                        <View><Text>{personalIntegral}</Text></View>
                        <View><Image src={integralIcon}/></View>
                    </View>
                    <View className="integralText">
                        <View><Text>可用积分：{personalIntegral}</Text></View>
                    </View>
                </View>
                <View className="signInArea">
                    <View>
                        <View className="signIn">
                            <View><Text>签到领积分</Text></View>
                            <View><Text>连签7天额外领取50积分</Text></View>
                        </View>
                        <View className="signInBtnArea"><Button onClick={this.signIn}>立即签到</Button></View>
                        <AtToast onClose={this.signToastClose} isOpened={this.state.toastSign}
                                 text={this.state.isSign === true ? "签到成功" : "今天已签"}/>
                    </View>
                    <SignInView
                        list={this.props.integralCenter.signInStatus}
                    />
                </View>
                <View className="taskArea">
                    <View className="taskText"><Text>做任务领取通讯福利积分</Text></View>
                    <View className="task">
                        <View className="taskTextArea">
                            <View><Text>去话费充值会场逛逛</Text></View>
                            <View><Text>浏览完成后可获得2积分</Text></View>
                        </View>
                        <View className="taskBtnArea"><Button>立即前往</Button></View>
                    </View>
                </View>
                <View className="conversionArea">
                    <View className="conversionAreaGap"/>
                    <View className="conversionAreaGap1"><Text>权益积分兑换</Text></View>
                    <ScrollView
                        className='scrollview'
                        scrollX="true"
                        scrollWithAnimation
                    >
                        <RaiView
                            raiList={this.state.raiList}
                            conversion={this.conversion}
                        />
                        {
                            this.state.isConversion === false ? (
                                <AtToast onClose={this.conversionToastClose} isOpened={this.state.toastConversion} status="success" text="积分不足"/>
                            ) : (
                                <AtToast onClose={this.conversionToastClose} isOpened={this.state.toastConversion} status="success" text="兑换成功"/>
                            )
                        }
                    </ScrollView>
                </View>
                <View>
                    <AtModal
                        isOpened={this.state.modelOpened}
                        cancelText='取消'
                        confirmText='确认'
                        onCancel={this.conversionHandleCancel}
                        onConfirm={this.conversionHandleConfirm}
                        content='是否要兑换'
                    />
                </View>
                <AtNoticebar marquee>
                    这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
                </AtNoticebar>
                <AtNoticebar marquee>
                    这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
                </AtNoticebar>
            </View>
        )
    }
}

// const initIntegral = state => {
//   return {
//     Info: state.integralCenter.personIntegral
//   }
// }
// export default connect(initIntegral)(Index)

export default Index



