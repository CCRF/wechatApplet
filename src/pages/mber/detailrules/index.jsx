import {Component} from "react"
import {View, Text} from "@tarojs/components"
import "./index.scss"
class Index extends Component {
  render() {
    return (
      <View>
        <View>
          <View className="body">
            <View className="title">会员权益细则</View>
            <View>
              <View>一、会员</View>
              <View className="oneContent">
                <View>
                  1、会员总共有两大类：一类是轻享会员，另一类是尊享会员。
                </View>
                <View>
                  2、开通轻享会员每月需要9元，开通尊享会员每月需要15元。
                </View>
                <View>
                  3、轻享会员享受折扣价九点五折，尊享会员享受折扣价九折，每次下单从总价计算折扣金额之后，可继续使用卡券。
                </View>
                <View>
                  4、轻享会员每月享有减3元红包六张，可在积分中心兑换对应的会员红包，普通用户不可兑换该红包。
                </View>
                <View>
                  5、尊享会员每月享有减6元红包六张，可在积分中心兑换对应的会员红包，普通用户不可兑换该红包。
                </View>
              </View>
            </View>
            <View>
              <View>二、积分</View>
              <View className="twoContent">
                <View>
                  1、轻享会员每天签到积分为10分，尊享会员每天签到积分·为20分。普通用户每天签到为5分。
                </View>
                <View>
                  2、积分获取渠道，暂时只能通过每天签到获取。其他渠道暂未开发。
                </View>
              </View>
            </View>
            <View>
              <View>三、卡券</View>
              <View className="threeContent">
                <View>
                  1、轻享会员、尊享会员拥有兑换对应红包的权益，在积分中心兑换后，可在卡券中心查看。
                </View>
                <View>
                  2、卡券类型分别有：
                  <View>
                    ①会员红包（轻享或尊享）：轻享减3元，尊享减6元，不限定商品
                  </View>
                  <View>
                    ②饮品代金券：减3元，限定饮品使用
                  </View>
                  <View>
                    ③冰激凌代金券：减3元，限定冰激凌商品使用
                  </View>
                  <View>
                    ④商品代金券：减4元，限定商品使用
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Index
