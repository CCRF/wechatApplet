import {Component} from 'react'
import {Image, ScrollView, Text, View} from '@tarojs/components'
import './theHistoryOrder.css'
import {Current} from "@tarojs/taro";

import {connect} from "react-redux";

@connect(({historyOrder}) => ({historyOrder}))
class TheHistoryOrder extends Component {

    constructor(props) {
        super(props);
        this.state={
            c: 0
        }

    }

    componentWillMount() {
        const onlyHistoryOrder=Current.router.params.historyOrder;
        console.log("12134353514",onlyHistoryOrder)
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
            <View className={'btn3'}>
                <View>
                    <Text>这里是详细菜单信息</Text>
                </View>


                {
                    this.props.historyOrder.historyOrderList.map((historyOrder, index) => {
                        //先写死，显示顾客订单为1时的订单信息
                        if(historyOrder.customerId==1&&historyOrder.startTime==this.state.c){
                            return (
                                <View key={index}>
                                    <View className={'SubModuleSub'}>


                                        <View className={'person'}
                                              onClick={() => this.theHistoryOrder(historyOrder)}>
                                            <Text>花江肯德基汉堡店</Text>
                                            <View>
                                                <Text>订单状态：</Text>

                                                {historyOrder.orderStatus == 0 ? (
                                                    <view>进行中</view>
                                                ) : (
                                                    <view>历史</view>
                                                )}

                                            </View>

                                            <View>
                                                <Text>消费金额：</Text>
                                                {historyOrder.amount}
                                            </View>

                                            <View>
                                                <Text>订单内容：</Text>
                                                {historyOrder.list}
                                            </View>

                                            <View>
                                                <Text>订单备注</Text>
                                                {historyOrder.message}
                                            </View>

                                            <View>
                                                <Text>创建时间：</Text>
                                                {historyOrder.startTime}
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

export default TheHistoryOrder