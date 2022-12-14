import {Component} from 'react'
import { View} from '@tarojs/components'
import './index.scss'
import Skip from './skip'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderType: 'ongoingcard'
        }
    }

    componentWillUnmount() {
    }

    componentDidShow() {
    }

    componentDidHide() {
    }

    tabChange = (e) => {
        var type = e.currentTarget.dataset.id;
        this.state.orderType = type
        console.log(type);
        this.setState({})

    }


    render() {
        return (
            <View className={'page'}>

                {/*头部*/}
                <View className={'P_title'}>
                    <View className={this.state.orderType == 'ongoingcard' ? 'P_active P_ongoingcard' : 'P_ongoingcard'}
                          onClick={this.tabChange} data-id={'ongoingcard'}>
                        当前订单
                    </View>
                    <View className={this.state.orderType == 'historycard' ? 'P_active P_historycard' : 'P_historycard'}
                          onClick={this.tabChange} data-id={'historycard'}>
                        历史订单
                    </View>
                    <View className={this.state.orderType == 'returncard' ? 'P_active P_returncard' : 'P_returncard'}
                          onClick={this.tabChange} data-id={'returncard'}>
                        可退订单
                    </View>
                </View>

                {/*中间订单列表显示区域*/}
                <View className={'allOrderView'}>
                    <Skip isOnGoing={this.state.orderType}></Skip>
                </View>


            </View>
        )
    }
}

export default Home

