import {Component} from 'react'
import {View, Text, Button, Image} from '@tarojs/components'
import {connect} from "react-redux";
import {findAllFood} from "../../actions/ordering";
import Taro from '@tarojs/taro'
import { Swiper, SwiperItem } from '@tarojs/components'
import {AtIcon} from "taro-ui";
import "./index.scss"


@connect(({ordering}) => ({
    ordering,
}), (dispatch) => ({
    findAllFood() {
        dispatch(findAllFood())
    },
}))

class Index extends Component {
    constructor(props) {
        super(props);
        this.state={
            foodImg:[]
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps)
    }

    //数据将要挂载时触发的函数
    componentWillMount(){
        this.props.findAllFood()

        // {this.props.ordering.foodList.map(food=>{
        //     this.setState({
        //         foodImg:[...this.state.foodImg,food.picture]
        //     })
        // })}
    }

    componentDidMount() {

    }

    test = () => {
        console.log(this.state.foodImg)
    }
    order=()=>{
        Taro.switchTab({
            url: '/pages/ordering/index'
        })
    }

    render() {
        return (
            <View>
                <Swiper
                    className='swiperImg'
                    indicatorColor='#999'
                    indicatorActiveColor='#333'
                    circular
                    indicatorDots
                    interval={2000}
                    autoplay>
                    <SwiperItem>
                        <Image src={'https://g1.glypro19.com/img/hamburger/汁汁厚作和牛堡.png'} className='viewImage'></Image>
                    </SwiperItem>
                    <SwiperItem>
                       <Image src={'https://g1.glypro19.com/img/setmeal/汁汁厚作和牛堡单人餐.png'} className='viewImage'></Image>
                    </SwiperItem>
                    <SwiperItem>
                      <Image src={'https://g1.glypro19.com/img/hamburger/田园风味堡.png'} className='viewImage'></Image>
                    </SwiperItem>
                    <SwiperItem>
                        <Image src={'https://g1.glypro19.com/img/setmeal/田园午餐.png'} className='viewImage'></Image>
                    </SwiperItem>
                </Swiper>
                <Text className='tip'>中午好，肯德基用户</Text>
                <View className='order' onClick={()=>this.order()}>
                    <AtIcon value='shopping-cart' size='40' color='block' className='shopIcon'></AtIcon>
                    开始点餐
                </View>

                <View className='pageBom'>
                    <Image src={'https://g1.glypro19.com/img/setmeal/田园午餐.png'}></Image>
                </View>
            </View>
        )
    }
}

export default Index

