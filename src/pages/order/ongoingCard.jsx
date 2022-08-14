import {Component} from 'react'
import {Image, ScrollView, Text, View} from '@tarojs/components'
import './returnCard.scss'

import {connect} from "react-redux";
import {getCurrentOrder} from "../../actions/currentOrder";
import Taro from "@tarojs/taro";

@connect(({currentOrder}) => ({currentOrder}), {getCurrentOrder})
class OnGoingCard extends Component {


    constructor(props) {
        super(props);
        this.getCurrentOrder();
        this.state = {}
    }

    getCurrentOrder = () => {
        this.props.getCurrentOrder();
    }


    theCurrentOrder = (currentOrder) => {
        this.setState({})

        Taro.navigateTo({
            url: './theCurrentOrder?currentOrder=' + currentOrder.startTime
        })

    }

    toReturnCard = () => {

    }


    render() {
        const scrollStyle = {height: '70%'}
        const scrollTop = 0
        const Threshold = 300

        const open_id = Taro.getStorageSync("personalInfo").openId

        const currentOrderList = this.props.currentOrder;

        console.log("当前订单如下：", currentOrderList)


        return (
            <View>
                {/*<View className={'btn'}>*/}
                {/*    <AtButton type='primary' size='normal' onClick={this.getCurrentOrder}>查询当前订单</AtButton>*/}
                {/*</View>*/}

                <View className={'allPage'}>
                    <View>
                        <text>您的当前订单如下：</text>
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
                            this.props.currentOrder.currentOrderList.map((currentOrder, index) => {
                                //测试数据
                                // if (currentOrder.customerId == 'oiMdq5v1ieICMBK7K7dGq6f3yIN8') {
                                //真实数据
                                    if (currentOrder.customerId == open_id) {
                                    return (

                                        <View key={index}>
                                            <View>
                                                {/*每个模块的样式*/}
                                                <View className={'everyOrder'}>

                                                    <View className={'allTitle'}>
                                                        <Text>外卖订单</Text>

                                                        <View >
                                                            <View className={'allType'}>
                                                                {currentOrder.orderStatus == 0 ? (
                                                                    <view className={'v1'}>商家已接单</view>
                                                                ) : (
                                                                    <view className={'v2'}>已失败（成功退单的）</view>
                                                                )}
                                                            </View>

                                                        </View>
                                                    </View>

                                                    <View className={'allMessage'}
                                                          onClick={() => this.theCurrentOrder(currentOrder)}>

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
                                                                {currentOrder.list.length!=" "?(
                                                                    <View>
                                                                        {currentOrder.list}
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
                                                                {currentOrder.startTime}
                                                            </View>
                                                            <View>
                                                                ￥{currentOrder.amount}
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

                        {/*<View className={'tipsBottom'}>*/}
                        {/*    已到到底啦*/}
                        {/*</View>*/}
                    </ScrollView>


                </View>

            </View>

        )
    }
}


export default OnGoingCard