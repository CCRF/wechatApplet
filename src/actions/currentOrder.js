import Taro from "@tarojs/taro";

export const getCurrentOrder = () => {
    return (dispatch) => {
        Taro.request({
            url: 'https://g1.glypro19.com/wx/getCurrentOrder', //仅为示例，并非真实的接口地址
            data: {},
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                // 调reducer修改数据
                console.log("action执行")
                dispatch({type: 'getCurrentOrder', currentOrderList: res})
            }
        })
    }
}
