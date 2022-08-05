import Taro from "@tarojs/taro";

//使用全局变量
//获得全部食物的信息
export const findAllFood=()=>{
    return (dispatch)=>{
        Taro.request({
            url: 'https://g1.glypro19.com/wx/findAllGoods',
            data: {},
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                dispatch({type:'findAllFood',data:res.data.data})
            }
        })
    }

}

//获得所有餐品的分类信息
export const findAllType=()=>{
    Taro.request({
        url: 'https://g1.glypro19.com/wx/findAllType',
        data: {},
        header: {
            'content-type': 'application/json'
        },
        success: function (res) {
            console.log(res.data.data)
        }
    })
}

//获得所有套餐的信息
export const findCombo=()=>{
    Taro.request({
        url: 'https://g1.glypro19.com/wx/findCombo',
        data: {},
        header: {
            'content-type': 'application/json'
        },
        success: function (res) {
            console.log(res.data)
        }
    })
}

//将购买的订单信息传送到后台
export const buyFood=()=>{
    Taro.request({
        url: 'https://g1.glypro19.com/wx/insert',
        data: {},
        header: {
            'content-type': 'application/json'
        },
        success: function (res) {
            console.log(res.data)
        }
    })
}