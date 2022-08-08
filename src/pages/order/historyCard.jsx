import {Component} from 'react'
import {Image, ScrollView, Text, View} from '@tarojs/components'
import TabBar from "../common/tabBar";
import './ongoingCard.scss'

import {connect} from "react-redux";
import {getHistoryOrder} from "../../actions/historyOrder";
import {AtAccordion, AtActionSheet, AtButton, AtIcon, AtList, AtListItem, AtRate} from "taro-ui";
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
        const scrollStyle = {height: '1050px'}
        const scrollTop = 0
        const Threshold = 300

        const historyOrderList = this.props.historyOrder;
        console.log("历史订单如下：", historyOrderList)


        return (
            <View>
                {/*<View className={'btn'}>*/}
                {/*    <AtButton type='primary' size='normal' onClick={this.getHistoryOrder}>查询当前订单</AtButton>*/}
                {/*</View>*/}

                <View>
                    <View>
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
                                //先写死，显示顾客订单为1时的订单信息
                                if (historyOrder.customerId == 1) {
                                    return (

                                        <View key={index}>
                                            <View>

                                                <View>
                                                    <View className={'allTitle'}>
                                                        <Text>外卖订单</Text>
                                                        <Text className={'iconfont icon-more'}>已经完成</Text>
                                                    </View>

                                                    <View className={'allMessage'}
                                                          onClick={() => this.theHistoryOrder(historyOrder)}>
                                                        <Text>花江肯德基汉堡店</Text>
                                                        <View className={'allType'}>
                                                            <Text>订单状态：</Text>

                                                            {historyOrder.orderStatus == 0 ? (
                                                                <view>进行中</view>
                                                            ) : (
                                                                <view>历史</view>
                                                            )}

                                                        </View>

                                                        <View className={'allType'}>
                                                            <Text>消费金额：</Text>
                                                            {historyOrder.amount}
                                                        </View>

                                                        <View className={'allType'}>
                                                            <Text>创建时间：</Text>
                                                            {historyOrder.startTime}
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
                    </ScrollView>


                </View>

            </View>

        )
    }
}

export default OngoingCard