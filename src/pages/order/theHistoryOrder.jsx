import {Component} from 'react'
import {Image, ScrollView, Text, View} from '@tarojs/components'
import './theHistoryOrder.css'
import Taro, {Current} from "@tarojs/taro";

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

        const open_id = Taro.getStorageSync("personalInfo").openId

        const a = 0

        return (
            <View className={'allType2'}>

                <View >

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
                                //测试数据
                                // if (historyOrder.customerId == 'oiMdq5v1ieICMBK7K7dGq6f3yIN8' && historyOrder.startTime == this.state.c) {

                                    //真实数据
                                if (historyOrder.customerId == open_id && historyOrder.startTime == this.state.c) {
                                    return (
                                        <View key={index}>
                                            <View>


                                                <View>
                                                    <View className={'body_head'}>
                                                        <View className={'everyLine'}>花江肯德基汉堡店》</View>
                                                        <Text className={'text3'}>桂林电子科技大学花江校区xx街A108-3</Text>

                                                        <View className={'everyView'}>
                                                            <View>
                                                                {historyOrder.list}
                                                            </View>

                                                            <View>
                                                                ￥{historyOrder.amount}
                                                            </View>

                                                        </View>
                                                        <View className={'inLine'}>

                                                        </View>


                                                        <View className={'text4'}>
                                                            <View>共X件，合计
                                                                <Text className={'textBig'}>￥{historyOrder.amount}</Text>
                                                            </View>
                                                            <View>
                                                                <Text className={'text5'}>奖励xx</Text>
                                                                <Text className={'text6'}>(欢迎您下次继续在本店下单)</Text>
                                                            </View>

                                                        </View>

                                                    </View>


                                                    <View className={'body_body'}>

                                                        <View>
                                                            <Text className={'textJianGe'}>下单时间：</Text>
                                                            <Text className={'textLeft'}>{historyOrder.startTime}</Text>

                                                        </View>

                                                        <View >
                                                            <Text className={'textJianGe'}>订单编号:</Text>
                                                            <Text className={'textLeft'}>{historyOrder.id}</Text>
                                                        </View>

                                                        <View>
                                                            <Text className={'textJianGe'}>订单状态：</Text>

                                                            {historyOrder.orderStatus == 1 ? (
                                                                <text className={'textLeft'}>已经完成</text>
                                                            ) : (
                                                                <text className={'textLeft'}>已失败（成功退单的）</text>
                                                            )}
                                                        </View>


                                                        <View >
                                                            <Text className={'textJianGe'}>订单备注:</Text>
                                                            <Text className={'textLeft'}>{historyOrder.message}</Text>

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


            </View>

        )
    }
}

export default TheHistoryOrder