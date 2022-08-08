// 全局属性：redux里面需要共享的数据
const INIT_STATE = {
    currentOrderList: []
}

export default function currentOrder(previousState = INIT_STATE, action) {

    let {type, currentOrderList} = action;

    switch (type) {
        case 'getCurrentOrder':
            console.log("reducer: ",currentOrderList.data.data);
            return {
                ...previousState,
                currentOrderList: currentOrderList.data.data
            };
        default:
            return previousState;
    }
}
