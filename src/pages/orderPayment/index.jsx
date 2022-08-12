import {Component} from 'react'
import {Button, Image, Text, View} from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"
import {connect} from "react-redux";
import {getInfo} from "../../actions/memberInfo";
import "./index.css"



@connect(({memberInfo}) => ({
    memberInfo,
}), (dispatch) => ({
    getInfo() {
        dispatch(getInfo())
    },
}))

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shoppingList: [],
            price:0,
            isOpened:false,
            contain:''
        }
    }


    componentDidMount() {
        this.props.getInfo()
        const list = Taro.getStorageSync('shoppingList')
        const pay=Taro.getStorageSync('shoppingPay')
        this.setState({
            shoppingList: list,
            price:pay
        })

    }

    goBack = () => {
        console.log("取消当前订单")
        // 返回列表页面
        Taro.navigateBack({
            delta: 1 // 返回上一级页面。
        });
    }

    openContain=(food)=>{
        this.setState({
            isOpened:true,
            contain:food.shoppingContain
        })
    }
    close=()=>{
        this.setState({
            isOpened:false
        })
    }

    render() {
        return (
            <View>
                <View className='main'>
                    {this.state.shoppingList.map(food => (
                        <View className='food' onClick={this.test}>
                            <Image src={food.shoppingImg} className='img'></Image>
                            <View className='foodName'>{food.shoppingName}</View>
                            <View className='contain' onClick={()=>this.openContain(food)}>{food.shoppingContain}</View>
                            <View className='num'>x{food.foodNum}</View>
                            <View className='price'>￥{food.shoppingPrice*food.foodNum}</View>
                        </View>
                    ))}
                    <View className='red'>红包</View>
                    <View className='Vouchers'>可用券</View>
                </View>

                <View className='pay'>
                    <View className='goBack' onClick={()=>this.goBack()}>取消订单</View>
                    <View className='payment'>
                        <Text>￥{this.state.price.toFixed(2)}</Text>
                        <Text className='giveMoney'>支付</Text>
                    </View>
                </View>

                {/*查看套餐的类容*/}
                <AtModal isOpened={this.state.isOpened}>
                    <AtModalHeader>套餐内容</AtModalHeader>
                    <AtModalContent>
                        {this.state.contain}
                    </AtModalContent>
                    <AtModalAction> <Button onClick={this.close}>取消</Button></AtModalAction>
                </AtModal>
            </View>

        )
    }
}

export default Index