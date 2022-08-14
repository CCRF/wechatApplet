import Taro from "@tarojs/taro";
import {Component} from "react"
import {connect} from 'react-redux'
import {ScrollView, Swiper, SwiperItem, Image, Text, View, Button} from "@tarojs/components"
import {AtGrid} from "taro-ui"
import {checkPhone} from "./util/phoneutil";
import Logo from "../../image/members/hha.png"
import Gift1 from "../../image/members/gift1.jpg"
import Gift2 from "../../image/members/gift2.jpg"

import Gift3 from "../../image/members/gift3.png"
import "./memberPage.scss"
import {getInfo} from "../../actions/memberInfo";

//方式一
// @connect(({memberPage}) => ({
//   memberPage
// }),(dispatch) => ({
//   getInfo () {
//     dispatch(getInfo())
//   }
// }))
@connect(({memberPage}) => ({memberPage}), {getInfo})
class MemberPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMem: 0,
            info: this.props.Info,
            show: false,
            KFCGift: {
                gift1: Gift1,
                gift2: Gift2,
                gift3: Gift3,
            },
            data: [
                {
                    image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                    value: '会员中心',
                    onClick: this.ChangeToMemberCenter
                },
                {
                    image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
                    value: '卡卷中心',
                    onClick: this.ChangeToCardVoucherCenter
                },
                {
                    image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
                    value: '会员细则',
                    onClick: this.ChangeToDetailRules
                },
                {
                    image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
                    value: '新品首发',
                    onClick: this.ChangeToNewGoods
                },
                {
                    image: 'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
                    value: '积分中心',
                    onClick: this.ChangeToIntegralCenter
                },
                {
                    image: 'https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png',
                    value: '手机馆',
                    onClick: this.ChangeToPhoneLibrary
                }
            ]
        }
    }
    componentDidMount() {
        const memberBol = Taro.getStorageSync("personalInfo").isMember
        console.log("componentDidMount中的会员状态：",memberBol)
        if (memberBol === 0) {
            this.state.show = true
            this.state.isMem = "会员已过期"
        } else if (memberBol === 1) {
            this.state.show = false
            this.state.isMem = "轻享会员"
        } else if (memberBol === 2) {
            this.state.show = false
            this.state.isMem = "尊享会员"
        } else {
            console.log("我的界面，会员状态为空")
        }

        this.setState({

        })
    }


    // componentWillReceiveProps(nextProps){
    //     console.log("随着props不同刷新界面")
    //     this.setState({
    //         ...nextProps
    //     })
    // }


    // 立即续费
    Renewal = () => {
        Taro.navigateTo({
            url: "./renewal/renewal"
        }).then(r => {
        });
    }

    handleClick = (value, index, e) => {
        this.state.data.map((item, index) => {
                if (item.value === value.value && item.onClick != null) {
                    const fn = item.onClick
                    return fn()
                }
            }
        )
    }
    // 会员中心
    ChangeToMemberCenter = () => {
        Taro.navigateTo({
            url: "./membercenter/membercenter"
        })
    }
    // 会员细则
    ChangeToDetailRules = () => {
        Taro.navigateTo({
            url: "./detailrules/index"
        })
    }
    //卡券中心
    ChangeToCardVoucherCenter = () => {
        Taro.navigateTo({
            url: "./cardvouchercenter/index"
        })
    }

    //积分中心
    ChangeToIntegralCenter = () => {
        Taro.navigateTo({
            url: "./integralcenter/index"
        })
    }

    //手机馆
    ChangeToPhoneLibrary = () => {
        Taro.navigateTo({
            url: "./phonelibrary/index"
        })
    }

    // 新品首发
    ChangeToNewGoods = () => {
        Taro.switchTab({
            url: "../index/index"
        }).then(r => {
        })
    }

    render() {
        // const list = this.props.memberPage.Info
        const list = this.state.info

        // 查看该用户是否绑定手机
        const phoneNumberFromStorage = Taro.getStorageSync("personalInfo").phoneNumber
        console.log("页面刷新个人信息",Taro.getStorageSync("personalInfo"))
        const phone = checkPhone(phoneNumberFromStorage)
        console.log("我的界面检查手机号：",phone)
        console.log("我的界面检查会员状态：",this.state.isMem)

        return (
            <View className="main">
                <View className="header">
                    <Image className="Logo" src={list.avatar}/>
                    <View className="mInfo">
                        {
                            phone === "" ? (
                                <View className="phone">手机号{phone}</View>
                                // <View className="phone">手机号：{phone}</View>
                            ) : (
                                <View className="phone">手机号：{phone}</View>
                                // <View className="phone">手机号：未绑定</View>
                            )
                        }
                        <Text className="dated">{this.state.isMem} > </Text>
                    </View>
                    <View className="saved">
                        <Text>已消费</Text>
                        <Text className="boldText">{list.payed}</Text>
                        <Text>元 ></Text>
                    </View>

                    {this.state.show ? (
                        <View className="immediately"><Button onClick={this.Renewal} size="mini"
                                                              plain="true">立即开通</Button></View>
                    ) : (
                        <View className="immediately"><Button onClick={this.Renewal} size="mini"
                                                              plain="true">开通中心</Button></View>
                    )}

                </View>
                <View className="test-a"><Text>权益中心</Text></View>
                <View className="gridPane">
                    <AtGrid
                        data={this.state.data}
                        onClick={this.handleClick.bind(this)}
                    />
                </View>
                <View className="test-a"><Text>热门推荐</Text></View>
                <View>
                    <Swiper
                        className='test-h'
                        indicatorColor='#999'
                        indicatorActiveColor='#333'
                        circular="true"
                        indicatorDots="true"
                        autoplay="true">
                        <SwiperItem>
                            <View className='demo-text demo-text-1'>
                                <Image src='../../image/members/gift1.jpg'/>
                            </View>
                        </SwiperItem>
                        <SwiperItem>
                            <View className='demo-text demo-text-2'>
                                <Image src={this.state.KFCGift.gift2}/>
                            </View>
                        </SwiperItem>
                        <SwiperItem>
                            <View className='demo-text demo-text-3'>
                                <Image src={this.state.KFCGift.gift3}/>
                            </View>
                        </SwiperItem>
                    </Swiper>
                </View>
            </View>
        )
    }
}

// export default MemberPage

const getData = state => {
    return {
        Info: state.memberPage.Info
    }
}
export default connect(getData)(MemberPage)
