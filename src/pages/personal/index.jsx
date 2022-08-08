import { Component } from 'react'
import {View, Text, Button} from '@tarojs/components'
import Taro from "@tarojs/taro";



class Personal extends Component {
    constructor(args) {
        super(args);
        this.state={
            sessionKey:"ss",
            openId:"op"
        }
    }

    componentWillReceiveProps (nextProps) {
        console.log(this.props, nextProps)
    }

    componentWillUnmount () { }

    componentDidShow () { }

    componentDidHide () { }

    render () {
        var that = this;

        function getUserProfile1(){
            console.log(that.state.sessionKey);
            console.log("1111");
            wx.getUserProfile({
                desc: '展示用户信息',
                success: (res1) =>{
                    //res1.signature = babcb0b9e91f5b329d3a3c68e2653bf6fbca35ca
                    // signature: res1.signature
                    // rawData: res1.rawData

                    console.log("res1",res1)
                    // getInfo(res.userInfo, res)


                    var url = 'https://g1.glypro19.com/wx/login'
                    // var url = 'http://localhost:8090/wx/login'
                    wx.showLoading({title:"登录中", mask:"true"})

                    wx.login({
                        success (res2){
                            // res2中有code
                            console.log("login成功,res2",res2);
                            console.log("code" , res2.code)
                            console.log("rawData" , res1.rawData)
                            console.log("signature" , res1.signature)

                            if (res2.code){
                                wx.request({
                                    url: url,
                                    data: {
                                        code: res2.code,
                                        rawData: res1.rawData,
                                        signature: res1.signature
                                    },
                                    method:"POST",

                                    success: (res3)=>{
                                        console.log("res3",res3);
                                        console.log(res3.data);
                                        that.state.sessionKey = res3.data.data.sessionKey;
                                        that.state.openId = res3.data.data.openId;
                                        Taro.setStorageSync("aaa","a");
                                        const a = Taro.getStorageSync("aaa")
                                        console.log("bbbbbbbbbb",a)
                                        if (res3.data.code === 200){
                                            let userInfo = Object.assign(res1, res3.data)
                                            console.log("登录成功！")
                                            console.log(userInfo);
                                            //userInfo 里有 {encryptedData, iv...}

                                            wx.hideLoading();
                                            wx.stopPullDownRefresh();
                                        }else{
                                            wx.showToast({title: "登录失败！",icon:"error",duration:2000})
                                            wx.hideLoading()
                                            wx.stopPullDownRefresh()
                                        }
                                    }
                                })
                            }else{
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


        function getPhoneNumber(e) {
            console.log("手机")
            console.log(e)
            console.log(e.detail.errMsg == "getPhoneNumber:ok");
            if (e.detail.errMsg == "getPhoneNumber:ok") {
                wx.request({
                    // url: 'http://localhost:8090/wx/getPhoneNumber',
                    url: 'https://g1.glypro19.com/wx/getPhoneNumber',
                    data: {
                        encryptedData: e.detail.encryptedData,
                        iv: e.detail.iv,
                        sessionKey: that.state.sessionKey,
                        openId:that.state.openId
                    },
                    method: "post",
                    success: function (res) {
                        console.log(res);
                    }
                })
            }
            ;
        }

        function bindgetphonenumber(e) {
            console.log("bind");
        }

        return (
            <View>
                <View><Text>个人信息展示</Text></View>
                <Button onClick={getUserProfile1}>测试</Button>
                <Button openType={"getPhoneNumber"} onGetPhoneNumber={getPhoneNumber} >绑定手机</Button>
            </View>
        )
    }
}

export default Personal