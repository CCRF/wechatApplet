import {Component} from "react"
import {View, Text, Image,Button} from "@tarojs/components"
import { AtList, AtListItem } from "taro-ui"
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"
import Icon from "../../../image/members/hha.png"
import "./index.scss"
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

  render () {
    const isOpened = this.state.isOpened
    return (
      <View>
        <AtList >
          <AtListItem arrow='right' note='描述信息' title='头像'/>
          <View className="test-ha" ><Image src={Icon}/></View>
          <AtListItem title='用户名' note='描述信息' />
          <AtListItem title='账号密码' note='描述信息' arrow='right' />
          <AtListItem title='手机号' note='描述信息' arrow='right' />
          <AtListItem title='微信账号' note='描述信息' arrow='right' />
          <AtListItem title='微信账号' note='描述信息' arrow='right' />
          <AtListItem title='注销账号' note='描述信息' arrow='right' />
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
