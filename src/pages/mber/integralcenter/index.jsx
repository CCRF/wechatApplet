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
  getInitIntegral,
  initSignInStatus,
  updateSignInStatus
} from "../../../actions/integralcenter";

@connect(({integralCenter}) => ({integralCenter}), {
  subtractIntegral,
  addIntegral,
  getInitIntegral,
  initSignInStatus,
  updateSignInStatus
})
class Index extends Component {

  constructor(props) {
    super(props);
    this.props.getInitIntegral()
    this.props.initSignInStatus()
    this.state = {
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
      this.setState({
        isSign: true
      })
      // 发送积分增加请求
      this.props.addIntegral()
      // 并修改积分签到状态
      signInStatus[weekDay - 1] = 1
      this.props.updateSignInStatus(signInStatus.toString())
    } else {
      // 提示框变为今天已签文本
      this.setState({
        isSign: false
      })
    }

    // 弹出签到提示框
    this.setState({
      toastSign: true,
    })
    // 2秒后关闭提示框
    setTimeout(() => {
      console.log("2秒后关闭")
      this.setState({
        toastSign: false
      })
    }, 2000)
  }

  // e对象放后面，前面参数对应传入值的顺序
  // 立即兑换
  conversion = (raiItem, e) => {
    this.state.raiList.map((item, index) => {
      if (item.raiId === raiItem.raiId) {
        // 弹出提示框是否兑换
        this.setState({
          requiredIntegral: raiItem.integral,
          modelOpened: true,
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
    console.log("是否能兑换",this.state.isConversion)
    const isConversion = this.props.integralCenter.personIntegral < this.state.requiredIntegral
    if (isConversion) {
      // 显示 提示积分不足
      this.setState({
        isConversion: false
      })

    } else {

      // 显示 提示兑换成功
      this.setState({
        isConversion: true
      })
      // 个人积分相应减少
      this.props.subtractIntegral(this.state.requiredIntegral)
    }

    this.setState({
      modelOpened: false,
      toastConversion: true
    })

    // 2秒后关闭提示框
    setTimeout(() => {
      console.log("2秒后关闭")
      this.setState({
        toastConversion: false
      })
    }, 2000)
  }


  render() {
    const personalIntegral = this.props.integralCenter.personIntegral
    console.log("个人积分",personalIntegral)
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
            <AtToast isOpened={this.state.toastSign} text={ this.state.isSign === true ? "签到成功" : "今天已签"}/>
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
            {
              this.state.isConversion === false ? (
                  <AtToast isOpened={this.state.toastConversion} status="success" text="积分不足"/>
              ) : (
                  <AtToast isOpened={this.state.toastConversion} status="success" text="兑换成功"/>
              )
            }
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


