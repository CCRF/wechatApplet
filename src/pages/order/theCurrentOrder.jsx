import {Component} from 'react'
import {Image, ScrollView, Text, View} from '@tarojs/components'
import Taro, {Current} from "@tarojs/taro";
import {connect} from "react-redux";
import currentOrder from "../../reducers/currentOrder";

import './theCurrentOrder.css'

@connect(({currentOrder}) => ({currentOrder}))
class TheCurrentOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            onlyCurrentOrder: 0
        }

    }

    componentWillMount() {
        const onlyCurrentOrder = Current.router.params.currentOrder;
        console.log("12134353514", onlyCurrentOrder)
        this.setState({
            onlyCurrentOrder: onlyCurrentOrder
        })
    }


    xiangxiOrder = () => {
        this.xiangxiOrder()
    }


    render() {
        const open_id = Taro.getStorageSync("personalInfo").openId


        return (
            <View className={'allType2'}>
                <View>


                    <View className={'view_head'}>
                        <Text className={'text1'}>Happy</Text>
                    </View>

                    <View>
                        {
                            this.props.currentOrder.currentOrderList.map((currentOrder, index) => {
                                //测试数据
                                if (currentOrder.customerId == 'oiMdq5v1ieICMBK7K7dGq6f3yIN8' && currentOrder.startTime == this.state.onlyCurrentOrder) {

                                //真实数据
                                // if (currentOrder.customerId == 'oiMdq5v1ieICMBK7K7dGq6f3yIN8' && currentOrder.startTime == this.state.onlyCurrentOrder) {
                                    return (
                                        <View key={index}>
                                            <View>


                                                <View>
                                                    <View className={'body_head'}>
                                                        <View className={'everyLine'}>花江肯德基汉堡店》</View>
                                                        <Text className={'text3'}>桂林电子科技大学花江校区xx街A108-3</Text>

                                                        <View className={'everyView'}>
                                                            <View>
                                                                {currentOrder.list}
                                                            </View>

                                                            <View>
                                                                ￥{currentOrder.amount}
                                                            </View>

                                                        </View>
                                                        <View className={'inLine'}>

                                                        </View>


                                                        <View className={'text4'}>
                                                            <View>共X件，合计
                                                                <Text
                                                                    className={'textBig'}>￥{currentOrder.amount}</Text>
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
                                                            <Text className={'textLeft'}>{currentOrder.startTime}</Text>

                                                        </View>

                                                        <View>
                                                            <Text className={'textJianGe'}>订单编号:</Text>
                                                            <Text className={'textLeft'}>{currentOrder.id}</Text>
                                                        </View>

                                                        <View>
                                                            <Text className={'textJianGe'}>订单状态：</Text>

                                                            {currentOrder.orderStatus == 0 ? (
                                                                <text className={'textLeft'}>老板正在为您备餐</text>
                                                            ) : (
                                                                <text className={'textLeft'}>已失败（成功退单的）</text>
                                                            )}
                                                        </View>


                                                        <View>
                                                            <Text className={'textJianGe'}>订单备注:</Text>
                                                            <Text className={'textLeft'}>{currentOrder.message}</Text>

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

export default TheCurrentOrder