import {Component} from "react"
import {Image, Swiper, SwiperItem, Text, View} from "@tarojs/components";
import "./myswiper.scss"

class MySwiper extends Component {
  render() {
    return (
      <View>
        <Swiper
          className='test-h'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
        >
          {this.props.itemList.map((item, index) => {
            return (
              <SwiperItem>
                {item.map((r, index) => {
                  return (
                    <View className="img-at">
                        <Image className="img-t" src={r.url}></Image>
                        <View className="i-hg">{r.raiInfo}</View>
                    </View>
                  )
                })}
              </SwiperItem>
            )
          })}
        </Swiper>
      </View>
    )
  }
}

export default MySwiper
