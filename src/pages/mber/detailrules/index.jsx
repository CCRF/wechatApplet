import {Component} from "react"
import {View, Text} from "@tarojs/components"
import "./index.scss"
class Index extends Component {
  render() {
    return (
      <View>
        <View>
          <View className="header">
            <View>一、会员权益规则</View>
            <View>
              <Text>会员等级明细</Text>
              <Text>.......</Text>
            </View>
            <View>
              <Text>会员成长值说明</Text>
              <Text>.......</Text>
            </View>
            <View>
              <Text>会员权益细则</Text>
              <Text>.......</Text>
            </View>
          </View>
          <View>
            <View>二、会员红包，卡卷消费者规则</View>
            <View>
              <View>
                <Text>权益说明</Text>
                <Text>......</Text>
                <Text>红包，卡券获取</Text>
                <Text>......</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Index
