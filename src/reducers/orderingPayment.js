const INIT_STATE={
    shoppingList:[]
}
export default function orderingPayment(state=INIT_STATE,action){
    let{type,data}=action
    switch (type){
        case 'orderingPay':
            return{
                ...state,
                shoppingList: data
            }
        default:
            return state

    }
}