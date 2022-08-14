import { Component } from 'react'
import {View, Text, Button} from '@tarojs/components'
import Taro from "@tarojs/taro";
import {connect} from "react-redux";
import {updatePhoneNumber} from "../../../actions/memberInfo";

@connect(({memberPage,}) => ({memberPage,}), {updatePhoneNumber,})
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

        var that = this

        const sessionKey = Taro.getStorageSync("personalInfo").sessionKey
        const openId = Taro.getStorageSync("personalInfo").openId

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
                        // sessionKey: that.state.sessionKey,
                        sessionKey: sessionKey,
                        // openId:that.state.openId
                        openId:openId
                    },
                    method: "post",
                    success: function (res) {

                        Taro.setStorageSync("phoneNumber",res.data.data.phoneNumber)
                        // 允许显示手机详情页
                        that.props.checked()
                        // 更新手机状态
                        that.props.updatePhoneNumber()
                        console.log("手机号是吗：",res.data.data.phoneNumber);
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
                <Button openType={"getPhoneNumber"} onGetPhoneNumber={getPhoneNumber} >绑定手机</Button>
            </View>
        )
    }
}

export default Personal