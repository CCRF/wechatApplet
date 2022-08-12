import Taro from "@tarojs/taro";
import {Component} from "react"
import {connect} from 'react-redux'
import {ScrollView, Swiper, SwiperItem, Image, Text, View, Button} from "@tarojs/components"
import {AtGrid} from "taro-ui"
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
// @connect(({memberPage}) => ({memberPage}), {getInfo})
class MemberPage extends Component {
    constructor(props) {
        super(props);
        // this.props.getInfo()
        this.state = {
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
                    value: '新品首发'
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


    render() {
        // const list = this.props.memberPage.Info
        const list = this.state.info

        // 手机号预处理
        const phoneNumber = Taro.getStorageSync("personalInfo").phoneNumber
        const prePhoneNumber = phoneNumber.substring(0,3)
        const afterPhoneNumber = phoneNumber.substring(phoneNumber.length - 4,phoneNumber.length)
        const phone = prePhoneNumber + "******" + afterPhoneNumber

        console.log("memberPage信息1", list)

        return (
            <View className="main">
                <View className="header">
                    <Image className="Logo" src={Logo}/>
                    <View className="mInfo">
                        {
                            phoneNumber === "" ? (
                                <View className="phone">手机号：未绑定</View>
                                // <View className="phone">手机号：{phone}</View>
                            ) : (
                                <View className="phone">手机号：{phone}</View>
                                // <View className="phone">手机号：未绑定</View>
                            )
                        }

                        {
                            list.isMember === 0 ? (
                                <Text className="dated">会员已过期 </Text>
                            ) : list.isMember === 1 ? (
                                <Text className="dated">轻享会员 > </Text>
                            ) : (
                                <Text className="dated">尊享会员 > </Text>
                            )
                        }
                    </View>
                    <View className="saved">
                        <Text>已消费</Text>
                        <Text className="boldText">{list.payed}</Text>
                        <Text>元 ></Text>
                    </View>

                    {this.state.show ? (
                        <View className="immediately"><Button onClick={this.Renewal} size="mini"
                                                              plain="true">立即支付</Button></View>
                    ) : (
                        <View className="immediately"><Button onClick={this.Renewal} size="mini"
                                                              plain="true">立即续费</Button></View>
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
