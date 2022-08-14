import {Component} from "react"
import {ScrollView, Swiper, SwiperItem, Image, Text, View, Button} from "@tarojs/components"
import './skip.scss'
import {connect} from "react-redux";
import {getCurrentOrder} from "../../actions/currentOrder";
import {getHistoryOrder} from "../../actions/historyOrder";

import OngoingCard from "./ongoingCard";
import HistoryCard from "./historyCard";
import ReturnCard from "./returnCard";
import Taro from "@tarojs/taro";


@connect(({currentOrder}) => ({currentOrder}), {getCurrentOrder})
@connect(({historyOrder}) => ({historyOrder}), {getHistoryOrder})
class skip extends Component {
    isOnGoing;

    constructor(props) {
        super(props);
        this.props.getCurrentOrder();
        this.props.getHistoryOrder();
        this.state = {}

    }

    toCarShop =()=>{
        Taro.switchTab({
            url:'../ordering/index'
        })
    }


    render() {
        const open_id = Taro.getStorageSync("personalInfo").openId

        //测试用的
        // const open_id ='oiMdq5v1ieICMBK7K7dGq6f3yIN8'
        console.log("用户id", open_id)

        let currentCustomerNum = 0
        let historyCustomerNum=0

        const currentOrderList = this.props.currentOrder;
        console.log(currentOrderList)

        const historyOrderList = this.props.historyOrder;
        console.log(historyOrderList)

        //判断是否有已经下达的订单
        this.props.currentOrder.currentOrderList.map((theCurrentOrder, index) => {
            // console.log("123425347", theCurrentOrder)

            if (theCurrentOrder.customerId == open_id) {
                currentCustomerNum = currentCustomerNum + 1;
            }
        })
        console.log("当前用户ID的有的当前订单数",currentCustomerNum)

        this.props.historyOrder.historyOrderList.map((theHistoryOrder, index) => {
            // console.log("123425347", theCurrentOrder)

            if (theHistoryOrder.customerId == open_id) {
                historyCustomerNum = historyCustomerNum + 1;
            }
        })
        console.log("当前用户ID的有的历史订单数",historyCustomerNum)


        // console.log(customerNum)

        const isOnGoing = this.props.isOnGoing
        let status = null

        //先写死错误的方式，应当根据有没有当前订单去判断显示的界面（这里还不知道这么弄，先设置一个达不到的长度length）
        if (isOnGoing == 'ongoingcard') {
            if (currentOrderList != null && currentCustomerNum > 0) {
                status =
                    <View className={'allOrder1'}>
                        <OngoingCard>
                        </OngoingCard>
                    </View>
            } else {
                status =
                    <View className={'noneOrder'}>
                        <View>
                            <Text className={'text1'} >
                                您当前没有订单，快去点一份喜欢汉堡吧~
                            </Text>
                        </View>

                        <View>
                            <Button size={"mini"} className={'btn1'} onClick={this.toCarShop}>去点一份</Button>
                        </View>

                        {/*<Button onClick={this.toCarShop}>去点一份</Button>*/}

                    </View>
            }

            //
            // if(isOnGoing=='ongoingcard'){
            //     status=
            //         <View className={'allOrder'}>
            //             <OngoingCard>
            //             </OngoingCard>
            //         </View>
        } else if (isOnGoing == 'historycard') {

            if (currentOrderList != null && historyCustomerNum > 0) {
                status =
                    <View className={'allOrder2'}>
                        <HistoryCard>
                        </HistoryCard>
                    </View>
            } else {
                status =
                    <View className={'noneOrder'}>
                        <View>
                            <Text className={'text1'} >
                                您还没有订单，快去点一份喜欢汉堡吧~
                            </Text>
                        </View>

                        <View>
                            <Button size={"mini"} className={'btn1'} onClick={this.toCarShop}>去点一份</Button>
                        </View>

                        {/*<Button onClick={this.toCarShop}>去点一份</Button>*/}

                    </View>
            }


        } else {

            if (currentOrderList != null && currentCustomerNum > 0) {
                status =
                    <View className={'allOrder1'}>
                        <ReturnCard>

                        </ReturnCard>
                    </View>
            } else {
                status =
                    <View className={'noneOrder'}>
                        <View>
                            <Text className={'text1'} >
                                您还没有可退订单，快去点一份喜欢汉堡吧~
                            </Text>
                        </View>

                        <View>
                            <Button size={"mini"} className={'btn1'} onClick={this.toCarShop}> 去点一份</Button>
                        </View>

                        {/*<Button onClick={this.toCarShop}>去点一份</Button>*/}

                    </View>
            }

        }

        return (
            <View className={'P_order_P'}>
                {status}
            </View>

        )


    }
}

export default skip