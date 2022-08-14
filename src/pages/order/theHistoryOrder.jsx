import {Component} from 'react'
import {Image, ScrollView, Text, View} from '@tarojs/components'
import './theHistoryOrder.css'
import {Current} from "@tarojs/taro";

import {connect} from "react-redux";

@connect(({historyOrder}) => ({historyOrder}))
class TheHistoryOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            c: 0
        }

    }

    componentWillMount() {
        const onlyHistoryOrder = Current.router.params.historyOrder;
        console.log("12134353514", onlyHistoryOrder)
        this.setState({
            c: onlyHistoryOrder
        })
    }


    xiangxiOrder = () => {
        this.xiangxiOrder()
    }


    render() {

        const a = 0

        return (
            <View className={'allType'}>
                <View className={'view_head'}>
                    <Text className={'text1'}>订单已完成</Text>
                    <Text className={'text2'}>订单已完成，祝您用餐愉快</Text>
                </View>

                <View className={'view_body'}>

                    {/*<View>*/}
                    {/*    <Text>这里是详细菜单信息</Text>*/}
                    {/*</View>*/}


                    {
                        this.props.historyOrder.historyOrderList.map((historyOrder, index) => {
                            //先写死，显示顾客订单为2时的订单信息
                            if (historyOrder.customerId == 2 && historyOrder.startTime == this.state.c) {
                                return (
                                    <View key={index}>
                                        <View>


                                            <View>
                                                <View className={'body_head'}>
                                                    <View>花江肯德基汉堡店》</View>
                                                    <Text className={'text3'}>桂林电子科技大学花江校区xx街A108-3</Text>

                                                    <View className={'v1'}>
                                                        <Text>订单内容：</Text>
                                                        {historyOrder.list}
                                                        ￥{historyOrder.amount}
                                                    </View>

                                                    <View>
                                                        共X件，合计￥{historyOrder.amount}
                                                        <Text>奖励xx</Text>
                                                        <Text>(欢迎您下次继续在本店下单)</Text>
                                                    </View>

                                                </View>


                                                <View className={'body_body'}>

                                                    <View>
                                                        <Text>下单时间：</Text>
                                                        {historyOrder.startTime}
                                                    </View>

                                                    <View>
                                                        <Text>订单状态：</Text>

                                                        {historyOrder.orderStatus == 1 ? (
                                                            <view>已经完成</view>
                                                        ) : (
                                                            <view>已失败（成功退单的）</view>
                                                        )}
                                                    </View>


                                                    <View>
                                                        <Text>订单备注</Text>
                                                        {historyOrder.message}
                                                    </View>


                                                </View>


                                            </View>


                                        </View>

                                    </View>
                                )
                            } else {
                                //暂时没有展示
                            }

                        })
                    }
                </View>


            </View>

        )
    }
}

export default TheHistoryOrder