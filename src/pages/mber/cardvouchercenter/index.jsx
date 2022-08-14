import {Component} from "react"
import {View} from "@tarojs/components"
import CardVoucher from "./cardvoucher/cardvoucher"
import {connect} from 'react-redux'
import {AtFloatLayout } from "taro-ui"
import "./index.scss"

class CardIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limitGoods: [],
            voucherName: "",
            detailShow: false,
        }
    }

    // 立即兑换按钮
    immediatelyConversion = (item, e) => {
        console.log("卡券aaa",item)
        // 获取对应卡券的限定商品，跳转到点餐页
    }

    // 点击卡券图片显示限定商品信息
    showDetail = (item, e) => {
        const name = item.voucherName
        if (item === "") {
            console.log("卡券中心showDetail方法item为空")
        } else {
            console.log("是否包含有红包",item.voucherName.includes("红包"))
            if (item.voucherName.includes("红包")){
                this.state.limitGoods = [{name: "全部商品都可使用",price: " 价格详情请看点餐页"}]
            } else {
                this.state.limitGoods = item.voucherLimit
            }
        }


        this.setState({
            voucherName: name,
            detailShow: true,
        })
    }

    // 模态框关闭时操作
    handleClose = () => {
        this.setState({
            detailShow: false,
        })
        console.log("关闭后操作")
    }

    render() {
        const cardList = this.props.cardVoucherInfo
        console.log('卡券信息',cardList)
        return (
            <View className="body">
                <CardVoucher
                    cardVoucherInfo={cardList}
                    showDetail={this.showDetail}
                    conversion={this.immediatelyConversion}
                />

                <View>
                    <AtFloatLayout isOpened={this.state.detailShow} title={this.state.voucherName} onClose={this.handleClose.bind(this)}>
                        <View>

                            {this.state.limitGoods.map((item,index) => {
                                return (
                                    <View>
                                        <View>商品名：{item.name}</View>
                                        <View>价格：{item.price}</View>
                                    </View>
                                )
                            })}
                        </View>
                    </AtFloatLayout>

                </View>
            </View>
        )
    }
}

const getCardVoucherInfoList = state => {
    return {
        cardVoucherInfo: state.cardVoucher.cardVoucherInfo
    }
}

export default connect(getCardVoucherInfoList)(CardIndex)