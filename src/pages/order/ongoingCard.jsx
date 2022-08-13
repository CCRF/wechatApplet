import {Component} from 'react'
import {Button, Image, ScrollView, Text, View} from '@tarojs/components'
import TabBar from "../common/tabBar";
import './ongoingCard.scss'

import {connect} from "react-redux";
import {getCurrentOrder} from "../../actions/currentOrder";
import Taro from "@tarojs/taro";


@connect(({currentOrder}) => ({currentOrder}), {getCurrentOrder})

class OngoingCard extends Component {

    constructor(props) {
        super(props);
        this.props.getCurrentOrder();
        this.state = {
        }
    }

    getCurrentOrder = () => {
        this.props.getCurrentOrder();
    }


    theCurrentOrder = (currentOrder) => {
        this.setState({
        })

        Taro.navigateTo({
            url:'./theCurrentOrder?currentOrder='+currentOrder.startTime
        })

    }




    render() {
        const scrollStyle = {height: '70%'}
        const scrollTop = 0
        const Threshold = 300

        const currentOrderList = this.props.currentOrder;
        console.log("当前订单如下：", currentOrderList)

        return (
            <View>
                {/*<View className={'btn'}>*/}
                {/*    <AtButton type='primary' size='normal' onClick={this.getCurrentOrder}>查询当前订单</AtButton>*/}
                {/*</View>*/}

                <View>
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
                                //先写死，显示顾客订单为2时的订单信息
                                if(currentOrder.customerId==1){
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