const INITIAL_STATE = {
    foodType: []
}
export default function orderingType(state = INITIAL_STATE, action) {

    let {type, data} = action

    switch (type) {
        case 'findAllType':
            return {
                ...state,
                foodType:data
            }
        default:
            return state
    }
}