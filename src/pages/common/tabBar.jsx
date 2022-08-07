import {Component} from 'react';
import { AtTabBar }  from 'taro-ui'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'


class TabBar extends Component {

  handleClick (value) {
    console.log("tabBar ====" +value);
    switch (value) {
      case 0:
        Taro.reLaunch({
          url: '/pages/index/index'
        });
        break;
      case 1:
        Taro.reLaunch({
          url: `/pages/ordering/index` //'/pages/physicalIdentity/healthKnowledge'
        });
        break;
      case 2:
        Taro.reLaunch({
          url: '/pages/order/index'
        });
        break;
      case 3:
        Taro.reLaunch({
          url: '/pages/mber/member'
        });
        break;
      default:
        break;
    }
  }

  render() {
    let BASEURL=`https://www.juntaitec.cn/wechatapp/images/`
    return (
      <View>
        <AtTabBar
          fixed
          backgroundColor='#ffffff'
          color='#cccccc'
          selectedColor='#d40000'
          tabList={[
            { title: '首页', image: `${BASEURL}home.png`, selectedImage: `${BASEURL}homeSelected.png` },
            { title: '点餐', image: `${BASEURL}knowledge.png`, selectedImage: `${BASEURL}knowledgeSelected.png` },
            { title: '订单', image: `${BASEURL}health.png`, selectedImage: `${BASEURL}healthSelected.png` },
            { title: '我的', image: `${BASEURL}health.png`, selectedImage: `${BASEURL}healthSelected.png` }
          ]}
          onClick={this.handleClick.bind(this)}
          current={this.props.tabBarCurrent}
        />
      </View>
    );
  }
}

export default TabBar;
