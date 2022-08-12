import {Component} from "react"
import {View, Text, Image,Button} from "@tarojs/components"
import { AtList, AtListItem } from "taro-ui"
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"
import Icon from "../../../image/members/hha.png"
import "./index.scss"
import Taro from "@tarojs/taro";
class Index extends Component {

  constructor(props) {
    super(props);
    this.state= {
      isOpened: false
    }
  }

  withDrawFromTheAccount = () => {
    this.state.isOpened = true;
    this.setState({

    })
  }

  handleClose = (e) => {
   console.log(e)
  }

  handleCancel = (e) => {
    this.state.isOpened = false;
    this.setState({

    })
    console.log(e)
  }

  handleConfirm = (e) => {
    this.state.isOpened = false;
    this.setState({

    })
    console.log(e)
  }

  changeToPhoneDetail = () => {
    Taro.navigateTo({
      url: "./phonenumber/index"
    })
  }

  render () {
    const isOpened = this.state.isOpened
    const icon = Taro.getStorageSync("personalInfo").avatar
    const wxName = Taro.getStorageSync("personalInfo").nickName
    // 手机号预处理
    const phoneNumber = Taro.getStorageSync("personalInfo").phoneNumber
    const prePhoneNumber = phoneNumber.substring(0,3)
    const afterPhoneNumber = phoneNumber.substring(phoneNumber.length - 4,phoneNumber.length)
    const phone = "手机号：" + prePhoneNumber + "******" + afterPhoneNumber

    console.log("能否拿到数据",Taro.getStorageSync("personalInfo"))
    return (
      <View>
        <AtList >
          <AtListItem arrow='right' title='头像'/>
          <View className="test-ha" ><Image src={icon}/></View>
          <AtListItem title={wxName} />
          {
            phoneNumber === "" ? (
                <AtListItem onClick={this.changeToPhoneDetail} title="?????" note='未绑定手机号' arrow='right' />
                // <AtListItem onClick={this.changeToPhoneDetail}  title={phone}  arrow='right' />
            ) : (
                <AtListItem onClick={this.changeToPhoneDetail}  title={phone}  arrow='right' />
                // <AtListItem onClick={this.changeToPhoneDetail} title="?????" note='未绑定手机号' arrow='right' />
            )
          }
        </AtList>
        <View className="exitArea"><Button onClick={this.withDrawFromTheAccount}>退出当前账号</Button></View>
        <View>
          <AtModal
            isOpened={isOpened}
            title='标题'
            cancelText='取消'
            confirmText='确认'
            onClose={ this.handleClose }
            onCancel={ this.handleCancel }
            onConfirm={ this.handleConfirm }
            content='退出登录后将无法查看订单，重新登录后即可查看'
          />
        </View>
      </View>
    )
  }
}

export default Index
