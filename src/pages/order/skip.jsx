import {Component} from "react"
import {ScrollView, Swiper, SwiperItem, Image, Text, View, Button} from "@tarojs/components"
import './skip.scss'
import {getCurrentOrder} from "../../actions/currentOrder";

import OngoingCard from "./ongoingCard";
import HistoryCard from "./historyCard";
import ReturnCard from "./returnCard";


@connect(({currentOrder}) => ({currentOrder}),{getCurrentOrder})
class skip extends Component {
    isOnGoing;
    constructor(props) {
        super(props);
        this.state={
        }

    }

    // toCarShop =()=>{
    //     Taro.switchTab({
    //         url:'../ordering/index'
    //     })
    // }


    render() {
        const open_id = Taro.getStorageSync("personalInfo").openId
        console.log("用户id",open_id)

        const currentOrderList = this.props.currentOrder;
        const isOnGoing = this.props.isOnGoing
        let status =null

        //先写死错误的方式，应当根据有没有当前订单去判断显示的界面（这里还不知道这么弄，先设置一个达不到的长度length）
        if(isOnGoing=='ongoingcard'){
            // if (currentOrderList!=null&&currentOrderList.length==100){
            if (currentOrderList!=null&&currentOrderList.length==100){
                status=
                    <View className={'allOrder'}>
                        <OngoingCard>
                        </OngoingCard>
                    </View>
            }else {
                status=
                    <View className={'noneOrder'}>
                        <View >
                            <Text className={'text1'}>
                                您还没有订单，快去点一份喜欢汉堡吧~
                            </Text>
                        </View>

                        <View >
                            <Button size={"mini"} className={'btn1'}>去点一份</Button>
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
        } else if(isOnGoing=='historycard'){
            status=
            <View className={'allOrder'}>
                <HistoryCard>
                </HistoryCard>
            </View>

        }else {
            status=
                <View className={'allOrder'}>
                    <ReturnCard>

                    </ReturnCard>
                </View>
        }

        return (
            <View className={'P_order_P' }>
                {status}
            </View>

        )


    }
}

export default skip