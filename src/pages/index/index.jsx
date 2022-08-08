import {Component} from 'react'
import {View, Text} from '@tarojs/components'


class Index extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  render() {
    return (
      <View>
        <View><Text>Hello, 主页</Text></View>
      </View>
    )
  }
}

export default Index

