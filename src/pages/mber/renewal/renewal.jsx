import {Component} from "react"
import {Button, View, Text, Image, SwiperItem, Swiper} from "@tarojs/components"
import {AtModal, AtModalAction, AtModalContent, AtModalHeader, AtTabs, AtTabsPane, AtToast} from 'taro-ui'
import {connect} from "react-redux"
import {redPackedList1, redPackedList2} from "./redpacket";
import Crown from "../../../image/members/皇冠.png"
import TabArea from "./tabarea/tabarea"
import Ques from "../../../image/members/问小.png"
import Answ from "../../../image/members/答小.png"

import "./renewal.scss"
import Taro from "@tarojs/taro";
import {addVoucher, checkPhone} from "../util/phoneutil";
import {addCardVoucherInfo,getCardVoucherInfo} from "../../../actions/carvoucher";
import {updateMemberStatus} from "../../../actions/memberInfo";

@connect(({cardVoucher,memberPage}) => ({cardVoucher,memberPage}), {
    addCardVoucherInfo,
    getCardVoucherInfo,
    updateMemberStatus
})
class Renewal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toast: false ,
            allPrice: 0,
            disable: false,
            payModelText: "",
            payModelView: false,
            current: 0,
            data: this.props.Info
        }
    }

    handleClick(value) {
        console.log("Store数据树", this.state.data)
        this.setState({
            current: value
        })
    }

    // 支付按钮
    iPayment = (allPrice, e) => {
        this.state.allPrice = allPrice
        // 判断是否是会员，如果是则要等到结束后才能开通
        const member = Taro.getStorageSync("personalInfo").isMember
        if (member === 0) {
            console.log("支付金额为", allPrice)
            if (allPrice === 15) {
                this.state.payModelText = "开通可获得六张6元红包"
                console.log("开通尊享会员", this.state.payModelText)
            } else if (allPrice === 9) {
                this.state.payModelText = "开通可获得六张3元红包"
                console.log("开通轻享会员", this.state.payModelText)
            } else {
                console.log("支付金额为null")
            }
        } else {
            // 您已是会员，下月再来开通
            this.state.payModelText = "您已是会员，下月再来开通"
            this.state.disable = true
        }

        this.setState({
            payModelView: true
        })
    }

    // 确认支付
    confirmPay = () => {
        // 确认支付后，相应红包增加六张
        const openPrice = this.state.allPrice
        if (openPrice !== "") {
            if (openPrice === 9) {
                redPackedList1.map((item,index) => {
                    const bCard = addVoucher(item)
                    // 进行卡券增加操作
                    this.props.addCardVoucherInfo(bCard)
                    console.log("要更新的卡券信息-轻享",bCard)
                })
            } else if (openPrice === 15) {
                redPackedList2.map((item,index) => {
                    const aCard = addVoucher(item)
                    // 进行卡券增加操作
                    this.props.addCardVoucherInfo(aCard)
                    console.log("要更新的卡券信息-尊享",aCard)
                })
            }
        } else {
            console.log("支付金额为空")
        }

        this.setState({
            payModelView: false,
            toast: true
        })

        // 延迟两秒执行
        setTimeout(() => {
            // 将该卡券信息添加到数据库，然后在这里在发一次请求数据库个人卡券信息
            // 更新全局卡券信息
            this.props.getCardVoucherInfo()
            // 更新会员状态和过期日期
            if (this.state.allPrice === 15) {
                this.props.updateMemberStatus(2)
            } else if (this.state.allPrice === 9) {
                this.props.updateMemberStatus(1)
            }

        }, 1000)

    }

    // 取消支付
    cancelPay = () => {
        this.setState({
            payModelView: false,
        })
    }

    // 默认3秒关闭，关闭后操作
    toastViewClose = () => {
        this.setState({
            toast: false
        })
    }


    render() {
        const tabList = [{title: '超级会员'}, {title: '会员轻享'}]
        const phone = checkPhone(this.state.data.phone)
        return (
            <View>
                {/*1、头部区域*/}
                <View className="header">
                    <View className="i-a"><View><Image src={Crown}/></View></View>
                    <View className="p-a">
                        <View>{phone}</View>
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
                                    singlePrice={6}
                                    raiNum={4}
                                    discount={"九折折扣"}
                                    double={"1.5倍"}
                                    payment={this.iPayment}
                                />
                            </AtTabsPane>
                            {/*tab区域二*/}
                            <AtTabsPane current={this.state.current} index={1}>
                                <TabArea
                                    allPrice={9}
                                    totalPrice={18}
                                    singlePrice={3}
                                    raiNum={4}
                                    discount={"九五折折扣"}
                                    double={"2倍"}
                                    payment={this.iPayment}
                                />
                            </AtTabsPane>
                        </AtTabs>
                    </View>

                    {/*是否支付界面*/}
                    <AtModal isOpened={this.state.payModelView}>
                        <AtModalHeader>是否支付</AtModalHeader>
                        <AtModalContent>
                            <View>
                                {this.state.payModelText}
                            </View>
                        </AtModalContent>
                        <AtModalAction>
                            <Button onClick={this.cancelPay}>取消支付</Button>
                            <Button disabled={this.state.disable} onClick={this.confirmPay}>确认支付</Button>
                        </AtModalAction>
                    </AtModal>
                    <AtToast onClose={this.toastViewClose}  isOpened={this.state.toast} text="支付成功"
                             status="success"/>
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
