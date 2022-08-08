import Taro from "@tarojs/taro";
import {Component} from "react"
import { connect } from 'react-redux'
import {ScrollView, Swiper, SwiperItem, Image, Text, View, Button} from "@tarojs/components"
import {AtGrid} from "taro-ui"
import {Order} from "./index"
import './skip.scss'

import OngoingCard from "./ongoingCard";
import HistoryCard from "./historyCard";
import ReturnCard from "./returnCard";

class skip extends Component {
    isOnGoing;
    constructor(props) {
        super(props);
        this.state={
        }

    }


    render() {


        const isOnGoing = this.props.isOnGoing
        let status =null
        if(isOnGoing=='ongoingcard'){
            status=
                <View className={'allOrder'}>
                    <OngoingCard>
                    </OngoingCard>
                </View>
        }else if(isOnGoing=='historycard'){
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