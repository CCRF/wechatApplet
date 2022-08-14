import Taro from "@tarojs/taro";

//修改订单状态
export const moderOrderState = (returnOrder) => {
    return (dispatch) => {
        Taro.request({
            url: 'http://localhost:8090/wx/moderOrderState',
            // url: 'https://g1.glypro19.com/wx/moderOrderState',
            method: "POST",
            // data: {openId:15,integral: 5},
            data:{
                id:returnOrder.id,
                state:returnOrder.state
            },
            header: {
                // 'content-type': 'application/json'
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                console.log(res.data.msg)
                console.log("修改成功",res.data)
                dispatch({type: 'getReturnOrder',returnOrderList:res})
            }
        })
        // dispatch({type: ADD_INTEGRAL})
    }
}