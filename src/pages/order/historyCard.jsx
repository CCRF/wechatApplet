import {Component} from 'react'
import {Image, ScrollView, Text, View} from '@tarojs/components'
import './historyCard.scss'

import {connect} from "react-redux";
import {getHistoryOrder} from "../../actions/historyOrder";
import Taro from "@tarojs/taro";


@connect(({historyOrder}) => ({historyOrder}), {getHistoryOrder})

class OngoingCard extends Component {

    constructor(props) {
        super(props);
        this.props.getHistoryOrder();
        this.state = {}
    }

    getHistoryOrder = () => {
        this.props.getHistoryOrder();
    }


    theHistoryOrder = (historyOrder) => {
        this.setState({})

        Taro.navigateTo({
            url: './theHistoryOrder?historyOrder=' + historyOrder.startTime
        })

    }


    render() {
        const scrollStyle = {height: '70%'}
        const scrollTop = 0
        const Threshold = 300

        const open_id = Taro.getStorageSync("personalInfo").openId


        // const scrollStyle2 = {width: '300px'}

        const historyOrderList = this.props.historyOrder;
        console.log("历史订单如下：", historyOrderList)


        return (
            <View className={'allPage'}>
                {/*<View className={'btn'}>*/}
                {/*    <AtButton type='primary' size='normal' onClick={this.getHistoryOrder}>查询当前订单</AtButton>*/}
                {/*</View>*/}

                <View>
                    <View >
                        <text>您的历史订单如下：</text>
                    </View>
                    <ScrollView
                        className='hos-list'
                        scrollY
                        scrollWithAnimation
                        scrollTop={scrollTop}
                        style={scrollStyle}
                        lowerThreshold={Threshold}
                        upperThreshold={Threshold}
                    >
                        {
                            this.props.historyOrder.historyOrderList.map((historyOrder, index) => {
                                //测试
                                // if (historyOrder.customerId == 'oiMdq5v1ieICMBK7K7dGq6f3yIN8') {

                                //真实
                                if (historyOrder.customerId == open_id) {
                                    return (

                                        <View key={index}>
                                            <View>
                                                {/*每个模块的样式*/}
                                                <View className={'everyOrder'}>

                                                    <View className={'allTitle'}>
                                                        <Text>订单</Text>

                                                        <View >
                                                            <View className={'allType'}>
                                                                {historyOrder.orderStatus == 1 ? (
                                                                    <view className={'v1'}>已完成</view>
                                                                ) : (
                                                                    <view className={'v2'}>已失败（成功退单的）</view>
                                                                )}
                                                            </View>

                                                        </View>
                                                    </View>

                                                    <View className={'allMessage'}
                                                          onClick={() => this.theHistoryOrder(historyOrder)}>

                                                        <Text>花江肯德基汉堡店   </Text>

                                                        <View className={'allType'}>

                                                            <Text>订单内容：</Text>

                                                            {/*<ScrollView*/}
                                                            {/*scrollX*/}
                                                            {/*className='hos-list'*/}
                                                            {/*scrollWithAnimation*/}
                                                            {/*scrollTop={scrollTop}*/}
                                                            {/*style={scrollStyle2}*/}
                                                            {/*lowerThreshold={Threshold}*/}
                                                            {/*upperThreshold={Threshold}*/}
                                                            {/*>*/}
                                                            <View>
                                                                {historyOrder.list.length!=" "?(
                                                                    <View>
                                                                        {historyOrder.list}
                                                                    </View>
                                                                ) :(
                                                                    <View>
                                                                        无
                                                                    </View>
                                                                )}
                                                            </View>

                                                            {/*</ScrollView>*/}

                                                        </View>
                                                        <View className={'allType'}>
                                                            <View className={'v3'}>
                                                                {historyOrder.startTime}
                                                            </View>
                                                            <View>
                                                                ￥{historyOrder.amount}
                                                            </View>


                                                        </View>

                                                    </View>

                                                </View>

                                            </View>
                                        </View>

                                    )
                                } else {

                                }

                            })
                        }

                        <View className={'tipsBottom'}>
                            已到到底啦
                        </View>
                    </ScrollView>


                </View>

            </View>

        )
    }
}

export default OngoingCard