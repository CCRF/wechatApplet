import {Component} from "react";
import {View} from "@tarojs/components"
import {AtAccordion} from 'taro-ui'

import "./index.scss"

class Index extends Component {

    render() {
        const cardList = this.props.list
        // 控制手风琴内容折叠
        const accordionStatus = this.props.accordion
        return (
            <View>
                <AtAccordion
                    open={this.props.oneShow}
                    onClick={this.props.oneHandler.bind(this)}
                    title='可用券'
                >
                    {
                        cardList.map((item, index) => {
                            accordionStatus.push(false)
                            return (
                                <AtAccordion
                                    className="test-a"
                                    open={accordionStatus[index]}
                                    onClick={this.props.twoHandler.bind(this,index)}
                                    title={item.voucherName}
                                    note={item.voucherRai}
                                >
                                    {
                                        item.voucherLimit.map((limit, lIndex) => {
                                            return (
                                                <View onClick={this.props.count.bind(this,item,limit)} className="cardNameArea">
                                                    <View>{limit.name}</View>
                                                </View>
                                            )
                                        })
                                    }

                                </AtAccordion>
                            )
                        })
                    }
                </AtAccordion>
            </View>
        )
    }
}


export default Index