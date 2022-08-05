import {Component} from 'react'
import {View, Swiper, SwiperItem, Image,Text,} from '@tarojs/components'
import TabBar from "../common/tabBar";
import {AtActionSheet, AtIcon, AtBadge} from "taro-ui"
import "./index.css"


class HotSpot extends Component {
    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps)
    }

    componentWillUnmount() {
    }

    componentDidShow() {
    }

    componentDidHide() {
    }

    constructor(props) {
        super(props);
        this.state = {
            needFixed: false,
            KFCClassifies: [
                {
                    id: '1',
                    food: '汉堡',
                    img: 'https://s2.loli.net/2022/07/31/iUSx8kvcXRZGyhs.png'
                },
                {
                    id: '2',
                    food: '小吃',
                    img: 'https://s2.loli.net/2022/07/31/UjXvKQbfwmBpGrL.png'
                },
                {
                    id: '3',
                    food: '饮品',
                    img: 'https://s2.loli.net/2022/07/31/xFDn9ufTWPpXwOl.png'
                },
                {
                    id: '4',
                    food: '冰淇淋',
                    img: 'https://s2.loli.net/2022/07/31/XabN74kJpevgVWD.png'
                },
                {
                    id: '5',
                    food: '套餐',
                    img: 'https://s2.loli.net/2022/08/02/apqzbBIDWJRCMgw.png'
                },
            ],
            //是否展示去结算所在的view
            display: 'none',
            //订单数量
            count: 0,
            //是否弹出"选规格"的菜单窗口
            isOpened: false
        }
    }

    //绑定点击事件的方法
    handleKFCClassify = (KFCClassify) => {
        console.log(KFCClassify.id)
    }

    //点击“选规格弹出提示框”
    chooseFood = () => {
        this.setState({
            isOpened: true
        })
    }
    //菜单详情弹出层图标的返回按钮
    goBack=()=>{
        this.setState({
            isOpened:false
        })
    }


    render() {

        return (
            <View className='viewSwiper'>
                <Swiper
                    className='swiperImg'
                    indicatorActiveColor='#333'
                    circular
                    interval={4000}
                    autoplay>
                    <SwiperItem>
                        <Image src='https://s2.loli.net/2022/08/02/Vyb7TLziD6fpkUg.png' className='viewImage'></Image>
                    </SwiperItem>
                    <SwiperItem>
                        <Image src='https://s2.loli.net/2022/08/02/kQV4AonCpvjS26I.png' className='viewImage'></Image>
                    </SwiperItem>
                    <SwiperItem>
                        <Image src='https://s2.loli.net/2022/08/02/yPICFAZKzrtYvE5.png' className='viewImage'></Image>
                    </SwiperItem>
                </Swiper>

                {/*奶茶品种分类*/}
                <View id='classify'>
                    <View className='KFC-Classifies'>
                        {this.state.KFCClassifies.map(KFCClassify => (
                            <View className='KFC-Classify'>
                                <View onClick={() => this.handleKFCClassify(KFCClassify)}>
                                    <Image src={KFCClassify.img} className='KFCImg'></Image>
                                    <Text className='foodName'>{KFCClassify.food}</Text>
                                </View>
                            </View>
                        ))}
                        <View className='tips'>温馨提示</View>
                    </View>
                </View>

                {/*/!*奶茶详情信息*!不能使用ScrollView与顶部的Swiper会产生冲突导致swiper消失/*/}
                <View className='KFCDetail'>
                    <View className='ClassifySubModule'>
                        <Text className='tipsName'>汉堡</Text>
                        <View className='SubModuleSub'>
                            <Image src='https://s2.loli.net/2022/07/31/iUSx8kvcXRZGyhs.png' className='foodImg'></Image>
                            <View className='tipsFont'>孜然牛肉鸡腿双层堡</View>
                            <View className='price'>￥15</View>
                            <View className='choose' onClick={this.chooseFood}>选规格</View>
                        </View>

                        <View className='SubModuleSub'>
                            <Image src='https://s2.loli.net/2022/07/31/iUSx8kvcXRZGyhs.png' className='foodImg'></Image>
                            <View className='tipsFont'>孜然牛肉鸡腿双层堡</View>
                            <View className='price'>￥15</View>
                            <View className='choose' onClick={this.chooseFood}>选规格</View>
                        </View>
                    </View>
                </View>

                {/*点击"选规格"后的弹出层,使用ActionSheet活动面板*/}
                <AtActionSheet isOpened={this.state.isOpened}>
                    <View className='infoDisplay'>
                        <AtIcon value='chevron-down' size='30' color='black' className='back' onClick={this.goBack}></AtIcon>
                        <Image src='https://s2.loli.net/2022/07/31/iUSx8kvcXRZGyhs.png' className='infoImg'></Image>
                        {/*图片下出来加入购物车的一个模块*/}
                        <View className='InfoMain'>
                            <View className='foodInfo'>
                                <Text className='foodName'>孜然牛肉鸡腿双层堡{'\n'}</Text>
                                <Text className='foodDetail'>详情描述：该汉堡是一个大大阿达啊啊啊啊汉堡，非常好吃超级无极巨好吃{'\n'}</Text>
                                <Text className='foodPrice'>￥15</Text>
                            </View>
                        </View>
                        {/*弹出层的“加入购物车“模块*/}
                        <View className='shoppAdd'>
                            <AtIcon value='shopping-cart' size='40' color='block' className='shopAddIcon'></AtIcon>
                            <View className='addFoodPrice'>
                                <Text>￥</Text>
                            </View>
                            <View className='addFoodBackground'>
                                <Text className='addFood'>加入购物车</Text>
                            </View>
                        </View>
                    </View>
                </AtActionSheet>


                {/* 购物车模块*/}
                <View className='ShoppingCart' onClick={this.test}>
                    <AtBadge value={this.state.count}>
                        <AtIcon value='shopping-cart' size='40' color='block' className='shopIcon'></AtIcon>
                    </AtBadge>
                    <View className='Total'>
                        <Text>￥</Text>
                    </View>
                    <View className='giveMoneyBackground'>
                        <Text className='giveMoney'>去结算</Text>
                    </View>

                </View>

                <TabBar tabBarCurrent={1}/>

            </View>
        )
    }
}

export default HotSpot

