import {Component} from 'react'
import {Button, Image, ScrollView, Text, View} from '@tarojs/components'
import Taro, {Current} from "@tarojs/taro";
import {connect} from "react-redux";
import {moderOrderState} from "../../actions/returnOrder";
import currentOrder from "../../reducers/currentOrder";

import './theReturnOrder.css'
import {AtModal, AtModalAction, AtModalContent, AtModalHeader} from "taro-ui";

@connect(({returnOrder}) => (returnOrder), {moderOrderState})
@connect(({currentOrder}) => ({currentOrder}))
class TheReturnOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpened: {
                isReturn: false,
                isSuccess: false,
            },

            onlyCurrentOrder: 0,
            returnOrderList: {
                id: 2334,
                state: 2
            }
        }

    }

    componentWillMount() {
        const onlyCurrentOrder = Current.router.params.currentOrder;
        console.log("12134353514", onlyCurrentOrder)
        this.setState({
            onlyCurrentOrder: onlyCurrentOrder
        })
    }

    handleClose = (e) => {
        console.log(e)
    }

    handleCancel = (e) => {
        this.state.isReturn = false;
        this.setState({})
        console.log(e)
    }

    handleCancel2 = (e) => {
        this.state.isSuccess = false;
        this.setState({})
        console.log(e)
    }




    toReturn = (currentOrder) => {
        this.setState({
            isReturn: true
        })
    }

    CheckReturnOrder = () => {
        console.log("可以检查当前可退订单")
        Taro.switchTab({
            url: '../ordering/index'
        })
    }


    toReturnCard = (currentOrder) => {
        console.log("退单了")
        console.log("当前Id", currentOrder)
        console.log("当前的订单状态", currentOrder.orderStatus)
        currentOrder.orderStatus = -1
        this.state.returnOrderList.id = currentOrder.id
        this.state.returnOrderList.state = currentOrder.orderStatus
        console.log("修改后的订单状态", this.state.returnOrderList)
        this.props.moderOrderState(this.state.returnOrderList)
        this.setState({
            isReturn: false,
            isSuccess: true
        })

    }


    render() {

        const open_id = Taro.getStorageSync("personalInfo").openId


        return (
            <View className={'allType'}>
                <View>


                    <View className={'view_head'}>
                        <Text className={'text1'}>可退单~</Text>
                    </View>

                    <View>
                        {
                            this.props.currentOrder.currentOrderList.map((currentOrder, index) => {
                                //测试数据
                                if (currentOrder.customerId == 'oiMdq5v1ieICMBK7K7dGq6f3yIN8' && currentOrder.startTime == this.state.onlyCurrentOrder) {

                                    //真实数据
                                    // if (currentOrder.customerId == open_id && currentOrder.startTime == this.state.onlyCurrentOrder) {
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
                                                                <text className={'textLeft'}>商家已接单</text>
                                                            ) : (
                                                                <text className={'textReturnOrder'}>已失败（成功退单的）</text>
                                                            )}
                                                        </View>


                                                        <View>
                                                            <Text className={'textJianGe'}>订单备注:</Text>
                                                            <Text className={'textLeft'}>{currentOrder.message}</Text>

                                                        </View>


                                                        <View>
                                                            <Button className={'btn1'}
                                                                    onClick={this.toReturn.bind(this, currentOrder)}>退单</Button>
                                                        </View>


                                                        <AtModal isOpened={this.state.isReturn}>

                                                            <AtModalHeader>退单</AtModalHeader>
                                                            <AtModalContent>
                                                                是否退单
                                                            </AtModalContent>

                                                            <AtModalAction>
                                                                <Button
                                                                    onClick={this.toReturnCard.bind(this, currentOrder)}>确定</Button>

                                                                <Button onClick={this.handleCancel}>取消</Button>

                                                            </AtModalAction>

                                                        </AtModal>

                                                        <AtModal isOpened={this.state.isSuccess}>
                                                            <AtModalHeader>退单结果</AtModalHeader>
                                                            <AtModalContent>
                                                                退单成功，是否重新点一份
                                                            </AtModalContent>
                                                            <AtModalAction>
                                                                <Button onClick={this.CheckReturnOrder}>确定</Button>
                                                                <Button onClick={this.handleCancel2}>取消</Button>
                                                            </AtModalAction>
                                                        </AtModal>


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

export default TheReturnOrder