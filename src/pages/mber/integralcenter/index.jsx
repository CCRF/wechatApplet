import {Component} from "react"
import {connect} from "react-redux"
import {ScrollView, View, Text, Image, Button} from "@tarojs/components"
import {AtModal, AtNoticebar, AtToast} from 'taro-ui'
import RaiView from "./raiview/raiview"
import SignInView from "./signinview/signinview";
import integralIcon from "../../../image/members/积分-实色.png";
import "./index.scss"

import {
  subtractIntegral,
  addIntegral,
  getInitIntegral,
  initSignInStatus
} from "../../../actions/integralcenter";

@connect(({integralCenter}) => ({integralCenter}), {
  subtractIntegral,
  addIntegral,
  getInitIntegral,
  initSignInStatus
})
class Index extends Component {

  constructor(props) {
    super(props);
    this.props.getInitIntegral()
    this.props.initSignInStatus()
    this.state = {
      // 兑换权益所需积分
      requiredIntegral: 0,
      // 模态框是否显示
      modelOpened: false,
      // 兑换提示框
      toastConversion: false,
      // 签到状态提示框
      toastSign: false,
      raiList: [
        {
          raiId: 1,
          img: integralIcon,
          name: "爱奇艺VIP会员黄金季卡",
          integral: "288",
        },
        {
          raiId: 2,
          img: integralIcon,
          name: "爱奇艺VIP会员黄金季卡",
          integral: "298"
        },
        {
          raiId: 3,
          img: integralIcon,
          name: "爱奇艺VIP会员黄金季卡",
          integral: "308"
        },
        {
          raiId: 4,
          img: integralIcon,
          name: "爱奇艺VIP会员黄金季卡",
          integral: "318"
        },
        {
          raiId: 5,
          img: integralIcon,
          name: "爱奇艺VIP会员黄金季卡",
          integral: "328"
        }
      ]
    }
  }


  // 签到
  signIn = () => {
    const signInStatus = this.props.integralCenter.signInStatus
    const weekDay = new Date().getDate()
    console.log("签到状态：", signInStatus[weekDay - 1])
    // 判断今天是否已签 0未签，1已签
    if (signInStatus[weekDay - 1] === 0) {
      // 是未签，发送积分增加请求
      this.props.addIntegral()
    } else {
      // 弹出提示框，提示今天已签
      this.setState({
        toastSign: true,
        toastConversion: false,
      })
    }
  }

  // e对象放后面，前面参数对应传入值的顺序
  // 立即兑换
  conversion = (raiItem, e) => {
    this.state.raiList.map((item, index) => {
      if (item.raiId === raiItem.raiId) {
        // 弹出提示框是否兑换
        this.setState({
          toastConversion: false,
          requiredIntegral: raiItem.integral,
          modelOpened: true,
          toastSign: false,
        })
      }
    })
  }

  // 模态框取消按钮
  handleCancel = () => {
    this.setState({
      modelOpened: false
    })
  }

  // 模态框确认按钮
  handleConfirm = () => {
    // 个人积分相应减少
    this.props.subtractIntegral(this.state.requiredIntegral)
    this.setState({
      modelOpened: false,
      toastConversion: true
    })
  }


  render() {

    const personalIntegral = this.props.integralCenter.personIntegral

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
            <AtToast isOpened={this.state.toastSign} text={ this.state.toastSign === true ? "今天已签" : "签到成功"}/>
          </View>
          <SignInView/>
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
            <AtToast isOpened={this.state.toastConversion} status="success" text="兑换成功"/>
          </ScrollView>
        </View>
        <View>
          <AtModal
            isOpened={this.state.modelOpened}
            cancelText='取消'
            confirmText='确认'
            onCancel={this.handleCancel}
            onConfirm={this.handleConfirm}
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

export default Index


