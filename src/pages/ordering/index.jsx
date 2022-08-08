import {Component} from 'react'
import {View, Swiper, SwiperItem, Image, Text, ScrollView,} from '@tarojs/components'
import {AtActionSheet, AtIcon, AtBadge} from "taro-ui"
import "./index.css"
import {connect} from "react-redux";
import {findAllFood, findAllType} from "../../actions/ordering";


@connect(({ordering}) => ({
    ordering
}), (dispatch) => ({
    findAllFood() {
        console.log("点击查询食物")
        dispatch(findAllFood())
    },
}))

@connect(({orderingType}) => ({
    orderingType
}), (dispatch) => ({
    findAllType() {
        dispatch(findAllType())
    },
}))

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

    componentDidMount() {
        this.props.findAllFood()
        this.props.findAllType()

    }

    constructor(props) {
        super(props);
        this.state = {
            needFixed: false,
            //是否展示底部购物车的去结算
            display: 'none',
            //订单数量
            count: 0,
            //是否弹出"选规格"的菜单窗口
            isOpened: false,
            //购物车中的总金额
            totalPrice:0.00,

            //存储弹出的活动面板中需要存储的相关数据
            sheetImg:'',
            sheetName:'',
            sheetRemark:'',
            sheetPrice:'',
            sheetIsSale:'',

            //存储购物车的信息
            shoppingCar:[],

            //购物车是否展开
            isOpenCar:false
        }
    }


    //点击每一个子菜单所在小方块弹出商品提示框”
    chooseFood = (food) => {
        this.setState({
            isOpened: true,
            isOpenCar:false,
            //'https://g1.glypro19.com/img/'+
            sheetImg:food.picture,
            sheetName:food.name,
            sheetRemark:food.remark,
            sheetPrice:food.price,
            sheetIsSale:food.isSale
        })
    }

    //解决点击“加入购物车后",弹出父组件的商品提示框e.stopPropagation()
    addFood=(food,e)=>{
        e.stopPropagation()
        if(food.isSale==1){
            console.log("有该餐品")
            this.setState({
                //点击加入购物车后，底部的结算窗口弹出"去结算"
                isOpened:false,
                display:'block',
                count:this.state.count+1,
                totalPrice:this.state.totalPrice+food.price,
            })

        }else{
            console.log("该餐品已没有")
        }
        console.log("价格",this.totalPrice)
    }

    //解决加入购物车的总金额出现小数点后7位
    transPrice=()=>{
        const totalPrice=this.state.totalPrice.toFixed(2)
        this.setState({
            totalPrice:totalPrice
        })
        console.log(this.state.totalPrice)
    }
    //菜单详情弹出层图标的返回按钮
    goBack=()=>{
        this.setState({
            isOpened:false
        })
    }

    //查看加入购物车的信息
    showShopping=()=>{
        console.log("购物车")
        console.log(this.state.isOpenCar)
        if(this.state.isOpenCar===false){
            this.setState({
                isOpenCar:true
            })
        }else{
            this.setState({
                isOpenCar:false
            })
        }

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
                        {this.props.orderingType.foodType.map(KFCClassify => (
                            <View className='KFC-Classify'>
                                <View>
                                    {/*<Image src={this.props.ordering..} className='KFCImg'></Image>*/}
                                    <Text className='foodName'>{KFCClassify.name}</Text>
                                </View>
                            </View>
                        ))}
                        <View className='tips'>温馨提示</View>
                        <View className='tips' onClick={this.transPrice}>查看数据</View>
                    </View>
                </View>

                {/*/!*奶茶详情信息*!不能使用ScrollView与顶部的Swiper会产生冲突导致swiper消失/*/}
                <View className='KFCDetail'>
                    <View className='ClassifySubModule'>
                        {this.props.orderingType.foodType.map(type=>(
                            <View>
                                <Text className='tipsName'>{type.name}</Text>
                                {this.props.ordering.foodList.map(food=>(
                                    food.type.map(aa=>(
                                        <View>
                                            {aa.name==type.name&&
                                                <View className='SubModuleSub' onClick={()=>this.chooseFood(food)}>
                                                    {/*'https://g1.glypro19.com/img/'+*/}
                                                    <Image src={food.picture}className='foodImg'></Image>
                                                    <View className='tipsFont'>{food.name}</View>
                                                    <View className='price'>￥{food.price}</View>
                                                    <View className='choose' onClick={(e)=>this.addFood(food,e)}>加入购物车</View>
                                                </View>
                                            }
                                        </View>
                                    ))
                                ))}
                            </View>
                        ))}
                    {/* 温馨提示*/}
                        <View className='tipsBottom'>
                            已到到底啦
                        </View>
                    {/**/}
                    </View>
                </View>

                {/*点击"选规格"后的弹出层,使用ActionSheet活动面板，弹出模板只有一个，所有商品共用*/}
                <AtActionSheet isOpened={this.state.isOpened}>
                    <View className='infoDisplay'>
                        <AtIcon value='chevron-down' size='30' color='black' className='back' onClick={this.goBack}></AtIcon>
                        <Image src={this.state.sheetImg} className='infoImg'></Image>
                        {/*图片下出来加入购物车的一个模块*/}
                        <View className='InfoMain'>
                            <View className='foodInfo'>
                                <Text className='foodName'>{this.state.sheetName}{'\n'}</Text>
                                <Text className='foodDetail'>{this.state.sheetRemark}{'\n'}</Text>
                                <Text className='foodPrice'>￥{this.state.sheetPrice}</Text>
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
                <View className='ShoppingCart' onClick={this.showShopping}>
                    <AtBadge value={this.state.count}>
                        <AtIcon value='shopping-cart' size='40' color='block' className='shopIcon'></AtIcon>
                    </AtBadge>
                    <View className='Total'>
                        <Text>￥{this.state.totalPrice}</Text>
                    </View>
                    <View className='giveMoneyBackground' style={{display:this.state.display}}>
                        <Text className='giveMoney'>去结算</Text>
                    </View>
                </View>

                {/*点击查看购物车信息*/}
                <AtActionSheet isOpened={this.state.isOpenCar} className='actionSheetCar'>
                    <View>
                        {/*购物车的数据*/}
                        <View className='shoppingShowInfo'>
                            1111
                            <ScrollView className='scrollview'>
                                <View>A</View>
                                <View>B</View>
                                <View>C</View>
                                <View>C</View>
                                <View>C</View>
                                <View>C</View>
                                <View>C</View>
                                <View>C</View>
                                <View>C</View>
                                <View>C</View>
                                <View>C</View>
                                <View>C</View>
                                <View>C</View>
                                <View>C</View>
                                <View>C</View>
                                <View>C</View>
                                <View>C</View>
                                <View>C</View>
                                <View>C</View>
                                <View>C</View>
                                <View>C</View>
                                <View>C</View>
                                <View>C</View>
                                <View>C</View>
                                <View>C</View>
                                <View>C</View>
                                <View>C</View>
                                <View>C</View>
                                <View>C</View>
                                <View>C</View>
                                <View>C</View>
                                <View>C</View>
                                <View>C</View>
                            </ScrollView>
                        </View>
                        {/*信息模块中的底部空白的部分*/}
                        <View className='shoppingBlack'>2222</View>
                    </View>
                </AtActionSheet>

            </View>
        )
    }
}

export default HotSpot

