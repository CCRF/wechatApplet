import {Component} from 'react'
import {View, Text, Image} from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Swiper, SwiperItem } from '@tarojs/components'
import {AtIcon} from "taro-ui";
import img1 from "../../image/members/肯德基新人礼1.jpg"
import img2 from "../../image/members/肯德基新人礼3.jpg"
import "./index.scss"


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionKey: "ss",
            openId: "op",
            login:'登录',
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps)
    }


    order=()=>{
        Taro.switchTab({
            url: '/pages/ordering/index'
        })
    }

    getUserProfile=() => {
        var that = this;
        wx.getUserProfile({
            desc: '展示用户信息',
            success: (res1) => {
                var url = 'https://g1.glypro19.com/wx/login'
                wx.showLoading({title: "登录中", mask: "true"})

                wx.login({
                    success(res2) {
                        // res2中有code
                        console.log("login成功,res2", res2);
                        console.log("code", res2.code)
                        console.log("rawData", res1.rawData)
                        console.log("signature", res1.signature)

                        if (res2.code) {
                            wx.request({
                                url: url,
                                data: {
                                    code: res2.code,
                                    rawData: res1.rawData,
                                    signature: res1.signature
                                },
                                method: "POST",

                                success: (res3) => {
                                    console.log("res3", res3);
                                    console.log(res3.data);
                                    that.state.sessionKey = res3.data.data.sessionKey;
                                    that.state.openId = res3.data.data.openId;
                                    Taro.setStorageSync("personalInfo", res3.data.data);
                                    if (res3.data.code === 200) {
                                        let userInfo = Object.assign(res1, res3.data)
                                        that.setState({
                                            login:'欢迎您，'+userInfo.userInfo.nickName+'用户'
                                        })
                                        wx.hideLoading();
                                        wx.stopPullDownRefresh();
                                    } else {
                                        wx.showToast({title: "登录失败！", icon: "error", duration: 2000})
                                        wx.hideLoading()
                                        wx.stopPullDownRefresh()
                                    }
                                }
                            })
                        } else {
                            console.log('登录失败！' + res2.errMsg)
                        }
                    }
                })
            },
            fail: (err) => {
                console.log(err)
            }
        })
    }

    render() {
        function bindgetphonenumber(e) {
            console.log("bind");
        }
        return (
            <View>
                <View className='login'>
                    <Text className='loginName' onClick={this.getUserProfile}>{this.state.login}</Text>
                    <AtIcon value='user' size='25' color='crimson'></AtIcon>
                </View>
                <Swiper
                    className='swiperImg'
                    indicatorColor='#999'
                    indicatorActiveColor='#333'
                    circular
                    indicatorDots
                    interval={3000}
                    autoplay>
                    <SwiperItem>
                        <Image src='https://www.tcgame.com.cn/ueditor/php/upload/image/20200109/1578535441865811.jpg' className='viewImage'></Image>
                    </SwiperItem>
                    <SwiperItem>
                        <Image src='https://tse1-mm.cn.bing.net/th/id/OIP-C.brFP40v9uFbwi_wq9FlmkQAAAA?pid=ImgDet&rs=1' className='viewImage'></Image>
                    </SwiperItem>
                    <SwiperItem>
                        <Image src='https://fb-prod.oss-cn-shanghai.aliyuncs.com/uploads/images/202008/57bd30805ebad5781f1fd9e7e80ee304.jpg' className='viewImage'></Image>
                    </SwiperItem>
                    <SwiperItem>
                        <Image src='https://img.zhisheji.com/FgLc_BlacJ2z-C7Xdm1pipxUHg9x?imageMogr2/thumbnail/600x/crop/!600x375a0a331' className='viewImage'></Image>
                    </SwiperItem>
                </Swiper>
                <Text className='tip'>您好，花江汉堡店用户</Text>
                <View className='order' onClick={()=>this.order()}>
                    <AtIcon value='shopping-cart' size='40' color='block' className='shopIcon'></AtIcon>
                    开始点餐
                </View>

                <View className='pageBom'>
                    <Image src={img1} className='img1'></Image>
                    <Image src={img2} className='img1'></Image>
                </View>
            </View>
        )
    }
}

export default Index

