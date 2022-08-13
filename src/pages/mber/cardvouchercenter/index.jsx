import {Component} from "react"
import {View} from "@tarojs/components"
import CardVoucher from "./cardvoucher/cardvoucher"
import {connect} from 'react-redux'
import {AtFloatLayout } from "taro-ui"
import "./index.scss"
import {getCardVoucherInfo} from "../../../actions/carvoucher";

@connect(({cardVoucher}) => ({cardVoucher}), {getCardVoucherInfo})
class CardIndex extends Component {
    constructor(props) {
        super(props);
        // this.props.getCardVoucherInfo()
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
        this.state.limitGoods = item.voucherLimit
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
        const cardList = this.props.cardVoucher.cardVoucherInfo
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

export default CardIndex
