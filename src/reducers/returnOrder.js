// 全局属性：redux里面需要共享的数据

const INIT_STATE = {
    returnOrderList: []
}

export default function returnOrder(previousState = INIT_STATE, action) {

    let {type, returnOrderList} = action;

    switch (type) {
        case 'getReturnOrder':
            console.log("reducer: ",returnOrderList.data.data);
            return {
                ...previousState,
                returnOrderList: returnOrderList.data.data
            };
        default:
            return previousState;
    }
}
