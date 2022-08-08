import {Component} from 'react'
import {Image, ScrollView, Text, View} from '@tarojs/components'
import  {Current} from "@tarojs/taro";
import {connect} from "react-redux";
import currentOrder from "../../reducers/currentOrder";

import './theCurrentOrder.css'

@connect(({currentOrder}) => ({currentOrder}))
class TheCurrentOrder extends Component {

    constructor(props) {
        super(props);
        this.state={
            onlyCurrentOrder: 0
        }

    }

    componentWillMount() {
        const onlyCurrentOrder=Current.router.params.currentOrder;
        console.log("12134353514",onlyCurrentOrder)
        this.setState({
            onlyCurrentOrder: onlyCurrentOrder
        })
    }


    xiangxiOrder = () => {
        this.xiangxiOrder()
    }


    render() {


        return (
            <View className={'btn3'}>
                <View>
                    <Text>这里是详细菜单信息</Text>
                </View>


                {
                    this.props.currentOrder.currentOrderList.map((currentOrder, index) => {
                        //先写死，显示顾客订单为1时的订单信息
                        if(currentOrder.customerId==1&&currentOrder.startTime==this.state.onlyCurrentOrder){
                            return (
                                <View key={index}>
                                    <View >
                                        <View className={'allTitle'}>
                                            <Text>外卖订单</Text>
                                            <Text className={'iconfont icon-more'}>商家已经接单</Text>
                                        </View>


                                        <View className={'allMessage'}
                                              onClick={() => this.xiangxiOrder(currentOrder)}>
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
                                                <Text>订单内容：</Text>
                                                {currentOrder.list}
                                            </View>

                                            <View className={'allType'}>
                                                <Text>订单备注</Text>
                                                {currentOrder.message}
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
                            //暂时没有展示
                        }

                    })
                }
                {

                }



            </View>

        )
    }
}

export default TheCurrentOrder