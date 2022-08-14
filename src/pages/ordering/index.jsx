import {Component} from 'react'
import {View, Swiper, SwiperItem, Image, Text, Button,} from '@tarojs/components'
import {AtActionSheet, AtIcon, AtBadge} from "taro-ui"
import "./index.css"
import {connect} from "react-redux";
import {findAllFood, findAllType, findCombo} from "../../actions/ordering";
import Taro from "@tarojs/taro";



@connect(({ordering}) => ({
    ordering,
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

@connect(({orderingCombo}) => ({
    orderingCombo
}), (dispatch) => ({
    findCombo() {
        dispatch(findCombo())
    }
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
        this.props.findCombo()
    }

    constructor(props) {
        super(props);
        this.state = {
            needFixed: false,
            //是否展示底部购物车的去结算
            display: 'none',
            //订单数量
            count: 0,
            //是否弹出"详情页"的菜单窗口
            isOpened: false,
            //购物车中的总金额
            totalPrice: 0.00,

            //存储弹出的活动面板中需要存储的相关数据,单品
            sheetImg: '',
            sheetName: '',
            sheetRemark: '',
            sheetPrice: '',
            sheetIsSale: '',
            //套餐
            // sheetFlavor:'',
            sheetContain: '',

            //存储购物车的信息
            shoppingCar: [],
            shoppingObj: {},

            //购物车是否展开
            isOpenCar: false,

            //购物车中商品的份数
            // foodNum:0,

            //将点击按钮后的商品名称添加在数组中
            foodAddName: [],

            //购物车中份数的加减后显示的份数
            // carNum:0
            nullNum: 'block',

            //判断是否有该商品的名字
            name: ''

        }
    }


    //单品菜单详情框
    chooseFood = (food) => {
        this.setState({
            isOpened: true,
            isOpenCar: false,
            //单品
            sheetImg: 'https://g1.glypro19.com/img/' + food.picture,
            sheetName: food.name,
            sheetRemark: food.remark,
            sheetPrice: food.price,
            // sheetFlavor:'',
            sheetContain: '',
            sheetIsSale: food.isSale,
        })
    }
    //弹出套餐详情框
    chooseCombo = (combo) => {
        this.setState({
            isOpened: true,
            isOpenCar: false,
            sheetImg:'https://g1.glypro19.com/img/setmeal/'+ combo.picture,
            sheetName: combo.name,
            sheetContain: combo.contain,
            sheetPrice: combo.price,
            sheetIsSale: ''
        })
    }


    //解决点击“加入购物车后",弹出父组件的商品提示框e.stopPropagation()
    addFood = (food, e) => {
        e.stopPropagation()
        this.setState({
            isOpenCar: false,
        })
        if (food.isSale === 1) {
            setTimeout(()=>{
                for (let i = 0; i <= this.state.foodAddName.length; i++) {
                    //第一次点击无数据时
                    if (this.state.foodAddName.length === 0) {
                        this.state.shoppingObj = {
                            shoppingImg: 'https://g1.glypro19.com/img/' + food.picture,
                            shoppingName: food.name,
                            shoppingContain: '',
                            shoppingPrice: food.price.toFixed(2),
                            foodNum: 1
                        };
                        this.setState({
                            shoppingCar: [...this.state.shoppingCar, this.state.shoppingObj],
                            foodAddName: [...this.state.foodAddName, food.name]
                        })
                        break
                    }
                    if (this.state.foodAddName[i] === food.name) {
                        const findData = this.state.shoppingCar.find(item => item.shoppingName === food.name)
                        const num = findData.foodNum + 1
                        const obj = Object.assign(findData, {foodNum: num})
                        break;
                    }
                    //遍历完所有数据无，再此点击事件之前无该数据
                    if (i === this.state.foodAddName.length - 1) {
                        this.state.shoppingObj = {
                            shoppingImg: 'https://g1.glypro19.com/img/' + food.picture,
                            shoppingName: food.name,
                            shoppingContain: '',
                            shoppingPrice: food.price.toFixed(2),
                            foodNum: 1
                        };
                        this.setState({
                            shoppingCar: [...this.state.shoppingCar, this.state.shoppingObj],
                            foodAddName: [...this.state.foodAddName, food.name]
                        })
                        break
                    }
                }
            },100)
            this.setState({
                isOpened: false,
                isOpenCar: false,
                display: 'block',
                count: this.state.count + 1,
                totalPrice: this.state.totalPrice+food.price,
            })
        } else {
            console.log("没有该餐品")
        }
    }

    //套餐加入购物车
    addComboFood = (combofood, e) => {
        e.stopPropagation()
        setTimeout(()=>{
            for (let i = 0; i <= this.state.foodAddName.length; i++) {
                //第一次点击无数据时
                if (this.state.foodAddName.length === 0) {
                    this.state.shoppingObj = {
                        shoppingImg:'https://g1.glypro19.com/img/setmeal/'+ combofood.picture,
                        shoppingName: combofood.name,
                        shoppingContain: combofood.contain,
                        shoppingPrice: combofood.price.toFixed(2),
                        foodNum: 1
                    };
                    this.setState({
                        shoppingCar: [...this.state.shoppingCar, this.state.shoppingObj],
                        foodAddName: [...this.state.foodAddName, combofood.name]
                    })
                    break
                }
                if (this.state.foodAddName[i] === combofood.name) {
                    const findData = this.state.shoppingCar.find(item => item.shoppingName === combofood.name)
                    const num = findData.foodNum + 1
                    const obj = Object.assign(findData, {foodNum: num});
                    break;
                }
                if (i === this.state.foodAddName.length - 1) {
                    this.state.shoppingObj = {
                        shoppingImg:'https://g1.glypro19.com/img/setmeal/'+ combofood.picture,
                        shoppingName: combofood.name,
                        shoppingContain:combofood.contain,
                        shoppingPrice: combofood.price.toFixed(2),
                        foodNum: 1
                    };
                    this.setState({
                        shoppingCar: [...this.state.shoppingCar, this.state.shoppingObj],
                        foodAddName: [...this.state.foodAddName, combofood.name]
                    })
                    break
                }
            }
        },100)
        let price=combofood.price
        price=Number(price.toFixed(2))
        this.setState({
            isOpened: false,
            display: 'block',
            count: this.state.count + 1,
            totalPrice: this.state.totalPrice + price,
        })
    }

    //菜单详情弹出层图标的返回按钮
    goBack = () => {
        this.setState({
            isOpened: false
        })
    }

    //弹出详情层的加入购物车,点击加入购物车后,将数据存储在每一个对象中,再将对象存储在数组中
    sheetAddFond = () => {
        for (let i = 0; i <= this.state.foodAddName.length; i++) {
            //第一次点击无数据时
            if (this.state.foodAddName.length === 0) {
                this.state.shoppingObj = {
                    shoppingImg: this.state.sheetImg,
                    shoppingName: this.state.sheetName,
                    shoppingContain: this.state.sheetContain,
                    shoppingPrice: this.state.sheetPrice,
                    foodNum: 1
                };
                this.setState({
                    shoppingCar: [...this.state.shoppingCar, this.state.shoppingObj],
                    foodAddName: [...this.state.foodAddName, this.state.sheetName]
                })
                break
            }
            if (this.state.foodAddName[i] === this.state.sheetName) {
                //找到已经存在的商品的数据信息
                const findData = this.state.shoppingCar.find(item => item.shoppingName === this.state.sheetName)
                const num = findData.foodNum + 1
                const obj = Object.assign(findData, {foodNum: num})
                break;
            }
            if (i === this.state.foodAddName.length - 1) {
                this.state.shoppingObj = {
                    shoppingImg: this.state.sheetImg,
                    shoppingName: this.state.sheetName,
                    shoppingContain: this.state.sheetContain,
                    shoppingPrice: this.state.sheetPrice,
                    foodNum: 1
                };
                this.setState({
                    shoppingCar: [...this.state.shoppingCar, this.state.shoppingObj],
                    foodAddName: [...this.state.foodAddName, this.state.sheetName]
                })
                break
            }
        }
        this.setState({
            isOpened: false,
            display: 'block',
            count: this.state.count + 1,
            totalPrice: this.state.totalPrice + this.state.sheetPrice,
        })
    }


    //查看加入购物车的信息
    showShopping = () => {
        console.log()
        if (this.state.isOpenCar === false) {
            this.setState({
                isOpenCar: true,
                isOpened: false,
            })
        } else {
            this.setState({
                isOpenCar: false,
                isOpened: false,
            })
        }
        if (this.state.shoppingCar.length === 0) {
            this.setState({
                isOpenCar: false,
            })
        }
    }

    //数量加
    addNum = (food, e) => {
        e.stopPropagation()
        const num = food.foodNum + 1
        const obj = Object.assign(food, {foodNum: num})
        // console.log("新更新的",food.foodNum)
        let price=food.shoppingPrice;
        price=parseFloat(price)
        this.setState({
            count: this.state.count + 1,
            totalPrice: this.state.totalPrice + price,
        })

    }
    //数量减
    minusNum = (food, e) => {
        const num = food.foodNum - 1
        const obj = Object.assign(food, {foodNum: num})
        //判断购物车中份数是否减为0,若该商品的份数为0,则界面中移除该商品,存储的数据信息也要删除
        const selfId = document.getElementById(e.target.id)
        const parentId = selfId.parentElement.parentElement
        if (num=== 0) {
            parentId.style.display = 'none'
            if(this.state.shoppingCar.length===1){
                this.setState({
                    isOpenCar: false,
                    display:'none'
                })
            }
            // 份数减为0时，删除该商品存入的数组名称,设置延时
            setTimeout(()=>{
                for (let i = 0; i < this.state.foodAddName.length; i++) {
                    if (this.state.foodAddName[i] === food.shoppingName) {
                        const newShoppingCar = this.state.foodAddName.splice(i, 1);
                    }
                }
                //份数减为0时删除该商品在数组中的信息
                for (let i = 0; i < this.state.shoppingCar.length; i++) {
                    if (this.state.shoppingCar[i] === food) {
                        const newShoppingCar = this.state.shoppingCar.splice(i, 1);
                    }
                }
            },1500)
        }else{
            parentId.style.display='block'
        }
        this.setState({
            count: this.state.count - 1,
            totalPrice: this.state.totalPrice - food.shoppingPrice,
        })
    }

    //购物车的结算功能
    orderPayment = (e) => {
        e.stopPropagation()
        this.setState({
            isOpenCar: false,
        })
        Taro.setStorageSync('shoppingList',this.state.shoppingCar)
        Taro.setStorageSync('shoppingPay',this.state. totalPrice)

        Taro.navigateTo({
            url: "/pages/orderPayment/index",
        })
    }

    pageTo=(index)=>{
        // 汉堡跳转
        if(index===0){
            Taro.pageScrollTo({
                scrollTop: 0,
                duration: 300
            })
        }
        //小吃的跳转
        if(index===1){
            Taro.pageScrollTo({
                scrollTop: 850,
                duration: 300
            })
        }
        //饮品
        if(index===2){
            Taro.pageScrollTo({
                scrollTop:1600,
                duration:300
            })
        }
        //冰淇凌
        if(index===3){
            Taro.pageScrollTo({
                scrollTop:2100,
                duration:300
            })
        }
    }
    combo = () => {
        Taro.pageScrollTo({
            scrollTop:2350,
            duration:300
        })
    }
    tip=()=>{
        Taro.pageScrollTo({
            scrollTop:4900,
            duration:300
        })
    }

    render() {

        return (
            <View className='viewSwiper'>
                <Swiper
                    className='swiperImg'
                    indicatorActiveColor='#333'
                    circular
                    interval={2000}
                    autoplay>
                    <SwiperItem>
                        <Image src='https://img.zcool.cn/community/0110df5d4a3ed6a80120695c9276eb.jpg@1280w_1l_2o_100sh.jpg' className='viewImage'></Image>
                    </SwiperItem>
                    <SwiperItem>
                        <Image src='https://bpic.588ku.com/back_origin_min_pic/19/10/22/769800f25603c8130e7f90f2b4ec2090.jpg' className='viewImage'></Image>
                    </SwiperItem>
                    <SwiperItem>
                        <Image src='https://img.zcool.cn/community/012a3c5cdd58aca801214168c206d0.jpg@1280w_1l_2o_100sh.jpg' className='viewImage'></Image>
                    </SwiperItem>
                </Swiper>

                {/*奶茶品种分类*/}
                <View id='classify'>
                    <View className='KFC-Classifies'>
                        {/*单品*/}
                        {this.props.orderingType.foodType.map((KFCClassify,index) => (
                            <View className='KFC-Classify' id={index} onClick={()=>this.pageTo(index)}>
                                <View>
                                    <Text className='foodName1'>{KFCClassify.name}</Text>
                                </View>
                            </View>
                        ))}
                        {/*套餐*/}
                        <View className='combo' onClick={()=>this.combo()}>套餐</View>
                        <View className='tips' onClick={()=>{this.tip()}}>温馨提示</View>
                    </View>
                </View>

                {/*/!*奶茶详情信息*!不能使用ScrollView与顶部的Swiper会产生冲突导致swiper消失/*/}
                <View className='KFCDetail'>
                    <View className='ClassifySubModule'>
                        {/*单品数据遍历*/}
                        {this.props.orderingType.foodType.map(type => (
                            <View>
                                <Text className='tipsName'>{type.name}</Text>
                                {this.props.ordering.foodList.map(food => (
                                    food.type.map(aa => (
                                        <View>
                                            {/*根据每个单品的type属性与findAllType中的类型进行匹配,类型相同则遍历数据*/}
                                            {aa.name === type.name &&
                                            <View className='SubModuleSub' onClick={() => this.chooseFood(food)}>
                                                <Image src={'https://g1.glypro19.com/img/' + food.picture}
                                                       className='foodImg'></Image>
                                                <View className='tipsFont'>{food.name}</View>
                                                <View className='price'>￥{food.price.toFixed(2)}</View>
                                                <View className='choose'
                                                      onClick={(e) => this.addFood(food, e)}>加入购物车</View>
                                            </View>
                                            }
                                        </View>
                                    ))
                                ))}
                            </View>
                        ))}
                        {/* 套餐数据遍历   */}
                        <View>
                            <Text className='tipsName'>套餐</Text>
                            {this.props.orderingCombo.comboList.map(comboFood => (
                                <View className='SubModuleSub' onClick={() => this.chooseCombo(comboFood)}>
                                    <Image src={'https://g1.glypro19.com/img/setmeal/'+comboFood.picture} className='foodImg'></Image>
                                    <View className='tipsFont'>{comboFood.name}</View>
                                    <View className='price'>￥{comboFood.price.toFixed(2)}</View>
                                    <View className='choose'
                                          onClick={(e) => this.addComboFood(comboFood, e)}>加入购物车</View>
                                </View>
                            ))}
                        </View>

                        {/* 温馨提示*/}
                        <View className='tipsBottom'>
                            已到到底啦
                        </View>
                        {/**/}
                    </View>
                </View>

                {/*弹出层,使用ActionSheet活动面板，弹出模板只有一个，所有商品共用*/}
                <AtActionSheet isOpened={this.state.isOpened}>
                    <View className='infoDisplay'>
                        <AtIcon value='chevron-down' size='30' color='black' className='back'
                                onClick={this.goBack}></AtIcon>
                        <Image src={this.state.sheetImg} className='infoImg'></Image>
                        {/*图片下出来加入购物车的一个模块*/}
                        <View className='InfoMain'>
                            <View className='foodInfo'>
                                <Text className='foodName'>{this.state.sheetName}{'\n'}</Text>
                                <Text>{this.state.sheetRemark}</Text>
                                <Text className='foodDetail'>{this.state.sheetContain}{'\n'}</Text>
                                <Text className='foodPrice'>￥{this.state.sheetPrice}</Text>
                            </View>
                        </View>
                        {/*弹出层的“加入购物车“模块*/}
                        <View className='shoppAdd' onClick={this.sheetAddFond}>
                            <AtIcon value='shopping-cart' size='40' color='block' className='shopAddIcon'></AtIcon>
                            <View className='addFoodPrice'>
                                <Text>￥{this.state.sheetPrice}</Text>
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
                        <Text>￥{this.state.totalPrice.toFixed(2)}</Text>
                    </View>
                    <View className='giveMoneyBackground' style={{display: this.state.display}}
                          onClick={this.orderPayment}>
                        <Text className='giveMoney'>去结算</Text>
                    </View>
                </View>

                {/*点击查看购物车信息*/}
                <AtActionSheet isOpened={this.state.isOpenCar} className='actionSheetCar'>
                    <View>
                        {/*购物车的数据*/}
                        <View className='shoppingShowInfo'>
                            {this.state.shoppingCar.map((food, index) => (
                                <View className='carMain' id={food.shoppingName} style={{display: 'block'}}>
                                    <Image src={food.shoppingImg} className='carImg'></Image>
                                    <Text className='carName'>{food.shoppingName}</Text>
                                    <Text className='carPrice'>￥{food.shoppingPrice}</Text>
                                    <View className='foodNum'>
                                        <Button className='minusBtn' id={'sub' + food.shoppingName}
                                                onClick={(e) => this.minusNum(food, e)}>-</Button>
                                        <Text>{food.foodNum}</Text>
                                        <Button className='addBtn' onClick={(e) => this.addNum(food, e)}>+</Button>
                                    </View>
                                </View>
                            ))}

                        </View>
                        {/*信息模块中的底部空白的部分*/}
                        <View className='shoppingBlack'></View>
                    </View>
                </AtActionSheet>

            </View>
        )
    }
}

export default HotSpot


