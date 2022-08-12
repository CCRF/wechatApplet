import {Component} from "react"
import {View, Text} from "@tarojs/components"
import CardVoucher from "./cardvoucher/cardvoucher"
import {connect} from 'react-redux'
import {AtModal} from "taro-ui"
import "./index.scss"
import {getCardVoucherInfo} from "../../../actions/carvoucher";

@connect(({cardVoucher}) => ({cardVoucher}), {getCardVoucherInfo})
class CardIndex extends Component {
    constructor(props) {
        super(props);
        this.props.getCardVoucherInfo()
        this.state = {
            voucherName: "",
            detailShow: false,
        }
    }

    // 立即兑换按钮
    immediatelyConversion = (item, e) => {
        console.log("卡券aaa",item)
        // 获取对应卡券的限定商品，跳转到点餐页
        console.log("卡券限定商品",item.voucherLimit)
    }

    // 点击卡券图片显示限定商品信息
    showDetail = (item, e) => {
        const name = item.voucherName
        console.log("卡券名称",item.voucherName)
        this.setState({
            voucherName: name,
            detailShow: true,
        })
    }

    // 模态框关闭时操作
    handleClose = () => {
        this.state({
            detailShow: false,
        })
    }


    render() {
        const cardList = this.props.cardVoucher.cardVoucherInfo
        return (
            <View className="body">
                <CardVoucher
                    cardVoucherInfo={cardList}
                    showDetail={this.showDetail}
                    conversion={this.immediatelyConversion}
                />

                <View>
                    <AtModal
                        isOpened={this.state.detailShow}
                        title={this.state.voucherName}
                        // cancelText='取消'
                        // confirmText='确认'
                        closeOnClickOverlay
                        onCancel={this.handleClose}
                        // onConfirm={ this.handleConfirm }
                        content='限定商品说明'
                    />
                </View>
            </View>
        )
    }
}

export default CardIndex
