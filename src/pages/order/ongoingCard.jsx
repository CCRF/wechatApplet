import {Component} from 'react'
import {Image, ScrollView, Text, View} from '@tarojs/components'
import TabBar from "../common/tabBar";
import './ongoingCard.scss'

import {connect} from "react-redux";
import {getCurrentOrder} from "../../actions/currentOrder";
import {AtAccordion, AtActionSheet, AtButton, AtIcon, AtList, AtListItem, AtRate} from "taro-ui";
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
        const scrollStyle = {height: '1050px'}
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
                                //先写死，显示顾客订单为1时的订单信息
                                if(currentOrder.customerId==1){
                                    return (
                                        <View key={index}>
                                            <View >
                                                <View className={'allTitle'}>
                                                    <Text>外卖订单</Text>
                                                    <Text className={'iconfont icon-more'}>商家已经接单</Text>
                                                </View>


                                                <View className={'allMessage'}
                                                      onClick={() => this.theCurrentOrder(currentOrder)}>
                                                    <Text>花江肯德基汉堡店</Text>
                                                    <View className={'allType'}>
                                                        <Text>订单状态：</Text>

                                                        {currentOrder.orderStatus == 0 ? (
                                                            <view>进行中</view>
                                                        ) : (
                                                            <view>历史</view>
                                                        )}

                                                    </View>

                                                    <View className={'allType'}>
                                                        <Text>消费金额：</Text>
                                                        {currentOrder.amount}
                                                    </View>


                                                    <View className={'allType'}>
                                                        <Text>创建时间：</Text>
                                                        {currentOrder.startTime}
                                                    </View>

                                                </View>


                                            </View>

                                        </View>
                                    )
                                }else {

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