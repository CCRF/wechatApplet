import {Component} from "react";
import {View} from "@tarojs/components"
import {AtAccordion} from 'taro-ui'

import "./index.scss"

class Index extends Component {

    render() {
        const cardList = this.props.list
        // 控制手风琴内容是否选中
        const accordionStatus = this.props.accordion
        // 可用券列表
        const a = []
        // 不可用券列表
        const b = []
        cardList.map((item,index) => {
            // 先判断是否是红包，红包不限定商品
            if (item.voucherName.includes("红包")) {
                a.push(item)
            } else {
                if (item.voucherLimit.length === 0) {
                    b.push(item)
                } else {
                    a.push(item)
                }
            }
        })


        return (
            <View>
                <AtAccordion
                    open={this.props.oneShow}
                    onClick={this.props.oneHandler.bind(this)}
                    title='可用券'
                >
                    {
                        a.map((item,index) => {
                            accordionStatus.push(false)
                            return (
                                <AtAccordion
                                    open
                                    className={accordionStatus[index] === false ? "test-a" : "test-b"}
                                    hasBorder="false"
                                    onClick={this.props.count.bind(this,item,index)}
                                    title={item.voucherName}
                                    note={item.voucherRai}
                                />
                            )
                        })
                    }
                </AtAccordion>
                <AtAccordion
                    open={this.props.twoShow}
                    onClick={this.props.twoHandler.bind(this)}
                    title='不可用券'
                    note="未包含指定商品"
                >
                    {
                        b.map((item,index) => {
                            return (
                                <AtAccordion
                                    open
                                    className="test-a"
                                    hasBorder="false"
                                    title={item.voucherName}
                                    note={item.voucherRai}
                                />
                            )
                        })
                    }

                </AtAccordion>
            </View>
        )
    }
}


export default Index