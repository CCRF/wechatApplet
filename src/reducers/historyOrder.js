// 全局属性：redux里面需要共享的数据
const INIT_STATE = {
    historyOrderList: []
}

export default function historyOrder(previousState = INIT_STATE, action) {

    let {type, historyOrderList} = action;

    switch (type) {
        case 'getHistoryOrder':
            console.log("reducer: ",historyOrderList.data.data);
            return {
                ...previousState,
                historyOrderList: historyOrderList.data.data
            };
        default:
            return previousState;
    }
}
