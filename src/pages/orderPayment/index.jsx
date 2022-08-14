import {Component} from 'react'
import {Button, Image, Text, View, Textarea} from "@tarojs/components";
import Taro from "@tarojs/taro";
import UsableCardVoucher from "./usablecardvoucher/index"
import {AtToast, AtModal, AtModalHeader, AtModalContent, AtModalAction} from "taro-ui"
import {connect} from "react-redux";
import "./index.scss"
import {getCardVoucherInfo, reduceCardVoucherInfo} from "../../actions/carvoucher";
import {addCustomerOrder} from "../../actions/memberInfo";

@connect(({cardVoucher, memberPage}) => ({cardVoucher, memberPage}), {
    getCardVoucherInfo,
    reduceCardVoucherInfo,
    addCustomerOrder
})
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 上一次使用券之后的价格
            beforeTotalPrice: 0,
            // 保存第一次价格
            firstPrice: 0,
            // 备注文本框内容
            value: "",
            // 上一次点击卡券下标值
            beforeClickValue: '嘿嘿',
            // 提示支付成功
            toastView: false,
            // 是否支付模态框显示状态
            payModelView: false,
            // 获取限定商品所属的卡券名称
            vName: "",
            // 获取限定商品所属的卡券id，用于使用后删除
            voucherId: "",
            // 手风琴折叠转态
            accordion: [],
            // 上一次选中商品的价格
            beforePrice: 0,
            oneView: false,
            twoView: false,
            dealWithCardList: [],
            // 卡券信息列表
            cardList: [],
            shoppingList: [],
            price: 0,
            isOpened: false,
            contain: ''
        }
    }


    componentDidMount() {
        // 获取卡券信息列表
        this.state.cardList = this.props.voucherList
        // 每次进入此页面时，上一次权益商品价格都清零
        this.state.beforePrice = 0
        // 清空手风琴状态
        this.state.accordion = []
        // 获取未使用的总价
        this.state.firstPrice = Taro.getStorageSync('shoppingPay')

        // 深拷贝
        var cList = JSON.parse(JSON.stringify(this.state.cardList))
        console.log("深拷贝", cList)

        const list = Taro.getStorageSync('shoppingList')
        const pay = Taro.getStorageSync('shoppingPay')
        this.checkVoucherGoods(list, cList)
        this.setState({
            shoppingList: list,
            price: pay,
        })

    }

    goBack = () => {
        console.log("取消当前订单")
        // 返回列表页面
        Taro.navigateBack({
            delta: 1 // 返回上一级页面。
        });
    }

    openContain = (food) => {
        this.setState({
            isOpened: true,
            contain: food.shoppingContain
        })
    }
    close = () => {
        this.setState({
            isOpened: false
        })
    }

    // 判断卡券可以使用的商品
    checkVoucherGoods = (shoppingList, vList, e) => {
        // 查看购物车商品有哪些，然后匹配卡券对应的限定商品
        // 说白了就是将不存在购物车列表商品的卡券限定商品剔除掉，
        // 留下存在的，然后就可以选择卡券使用商品，进行支付金额的改变
        console.log("购物车列表", shoppingList)
        // 深拷贝
        const voucherList = JSON.parse(JSON.stringify(vList))
        console.log("卡券列表", voucherList)

        voucherList.map((voucherItem, voucherIndex) => {
            // 保留限定商品index
            const limitIndex = []
            const c = []
            voucherItem.voucherLimit.map((lItem, lIndex) => {
                const name = lItem.name
                console.log("限定商品名称", name)
                shoppingList.map((sItem, sIndex) => {
                    const sName = sItem.shoppingName
                    if (name === sName) {
                        // 保留限定商品index
                        limitIndex.push(lIndex)
                        return true
                    }
                })
            })

            // 限定商品列表重新赋值
            limitIndex.map((g, i) => {
                // console.log("要保留的id",g)
                c.push(voucherItem.voucherLimit[g])
            })

            console.log("重新赋值", c)

            // 将新的限定商品列表赋值给原来的列表
            voucherItem.voucherLimit = c

        })
        this.state.dealWithCardList = voucherList
        console.log("筛选之后", voucherList)
    }

    // 控制可用券手风琴是否折叠
    oneShow = (e) => {
        const oneBol = this.state.oneView
        this.setState({
            oneView: !oneBol,
        })
    }


    // 控制可用券内容手风琴是否折叠
    twoShow = () => {
        const twoBol = this.state.twoView
        this.setState({
            twoView: !twoBol,
        })
    }

    // 计算所选中的商品价格，同步到总价
    countPrice = (vItem, accordionIndex) => {

        // 获取选中状态
        var accordionList = this.state.accordion

        // 否，则记录这一次点击的卡券区域下标值，改变当前点击的卡券区域颜色，其他恢复为原色
        // this.state.beforeClickValue = accordionIndex
        // 修改手风琴选中的颜色
        const isBol = !accordionList[accordionIndex]
        // 将不是当前点击的卡券区域全部变为原色
        accordionList = this.state.accordion.fill(false)
        accordionList[accordionIndex] = isBol
        // 更新
        this.setState({
            accordion: accordionList,
        })

        console.log("要计算的商品权益", vItem.voucherRai)

        // 保留选中之后预计要删除的卡券id
        this.state.voucherId = vItem.voucherId
        // 保留选中之后预计要删除的卡券名称
        this.state.vName = vItem.voucherName
        const rai = vItem.voucherRai

        // 折扣价
        var raiPrice = 0
        switch (rai) {
            case "减3元":
                raiPrice = 3
                break
            case "减4元":
                raiPrice = 4
                break
            case "减6元":
                raiPrice = 6
                break
        }

        // 判断是否是第一次进入此页面
        if (this.state.beforePrice === 0) {
            console.log("第一次进来", raiPrice)
            // 先保存好第一次选中的商品价格权益
            this.state.beforePrice = raiPrice
            const payed = this.state.price
            // 保存上一次使用券之后的总价
            this.state.beforeTotalPrice = payed - raiPrice
            this.setState({
                price: payed - raiPrice
            })
        } else {
            console.log("第二次进来后", raiPrice)
            // const payed = this.state.price + this.state.beforePrice
            const payed = this.state.beforeTotalPrice + this.state.beforePrice
            // 保存好第二次选中以后的商品价格权益
            this.state.beforePrice = raiPrice
            console.log("挖会更好好的1",this.state.price)
            // 保存上一次使用券之后的总价
            this.state.beforeTotalPrice = payed - raiPrice
            this.setState({
                price: payed - raiPrice
            })
            console.log("挖会更好好的2",this.state.price)
        }
    }

    // 立即支付
    immediatelyPay = () => {
        // 跳出是否支付界面
        this.setState({
            payModelView: true
        })
    }

    // 取消支付
    cancelPay = () => {
        this.setState({
            payModelView: false
        })
    }

    // 确认支付
    confirmPay = () => {
        // 获取要删除的卡券id
        const vId = this.state.voucherId
        // 进行卡券删除
        this.props.reduceCardVoucherInfo(vId)
        // 订单生成，加入数据库
        this.props.addCustomerOrder(this.state.shoppingList,
            this.state.price.toFixed(2), this.state.value)
        setTimeout(() => {
            // 进行全局卡券信息更新，同步卡券中心
            this.props.getCardVoucherInfo()
        }, 1000)

        this.setState({
            payModelView: false,
            toastView: true,
        })
    }

    // 默认3秒关闭，关闭后操作
    toastViewClose = () => {
        this.setState({
            toastView: false
        })
        Taro.switchTab({
            url: "../ordering/index"
        }).then(r => {
        })
    }

    // 多行文本框值监听
    changeValue = (e) => {
        this.setState({
            value: e.detail.value
        })
    }

    // 取消使用卡券
    cancelUseCard = () => {
        const cList = this.state.accordion.fill(false)
        this.setState({
            accordion: cList,
            price: this.state.firstPrice
        })
    }


    render() {
        const shoppingList = this.state.shoppingList
        return (
            <View>
                <View className='main'>
                    {this.state.shoppingList.map(food => (
                        <View className='food' onClick={this.test}>
                            <Image src={food.shoppingImg} className='img'></Image>
                            <View className='foodName'>{food.shoppingName}</View>
                            <View className='contain'
                                  onClick={() => this.openContain(food)}>{food.shoppingContain}</View>
                            <View className='num'>x{food.foodNum}</View>
                            <View className='price'>￥{food.shoppingPrice * food.foodNum}</View>
                        </View>
                    ))}

                    <View>
                        <View style="margin: 0 0 0 15px">备注:</View>
                        <Textarea
                            style="margin: 0 auto;background:#fff;width:85%;height:80px;padding:0 30rpx"
                            autoHeight
                            placeholder="限200字"
                            maxlength={200}
                            value={this.state.value}
                            onInput={this.changeValue}
                        />
                        <View>
                            <Button style="width: 150px;font-size: 15px" onClick={this.cancelUseCard}>取消使用卡券</Button>
                        </View>
                    </View>

                    {/*可用卡券界面*/}
                    <View>
                        <UsableCardVoucher
                            list={this.state.dealWithCardList}
                            accordion={this.state.accordion}
                            oneHandler={this.oneShow}
                            twoHandler={this.twoShow}
                            oneShow={this.state.oneView}
                            twoShow={this.state.twoView}
                            count={this.countPrice}
                        />
                    </View>
                </View>

                <View className='pay'>
                    <View className='goBack' onClick={() => this.goBack()}>取消订单</View>
                    <View className='payment'>
                        <Text>￥{this.state.price.toFixed(2)}</Text>
                        <Text onClick={this.immediatelyPay} className='giveMoney'>支付</Text>
                    </View>
                </View>

                {/*查看套餐的类容*/}
                <AtModal isOpened={this.state.isOpened}>
                    <AtModalHeader>套餐内容</AtModalHeader>
                    <AtModalContent>
                        {this.state.contain === "" ? "这个不是套餐" : this.state.contain}
                    </AtModalContent>
                    <AtModalAction> <Button onClick={this.close}>取消</Button></AtModalAction>
                </AtModal>


                {/*是否支付界面*/}
                <AtModal isOpened={this.state.payModelView}>
                    <AtModalHeader>是否支付</AtModalHeader>
                    <AtModalContent>
                        <View>
                            支付后会消耗一张：{this.state.vName}
                        </View>
                    </AtModalContent>
                    <AtModalAction>
                        <Button onClick={this.cancelPay}>取消支付</Button>
                        <Button onClick={this.confirmPay}>确认支付</Button>
                    </AtModalAction>
                </AtModal>

                <AtToast hasMask="true" onClose={this.toastViewClose} isOpened={this.state.toastView} text="支付成功" icon="{icon}"
                         status="success"/>

            </View>

        )
    }
}

const getCardVoucherList = state => {
    return {
        voucherList: state.cardVoucher.cardVoucherInfo
    }
}
export default connect(getCardVoucherList)(Index)