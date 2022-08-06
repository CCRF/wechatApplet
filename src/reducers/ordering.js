const INITIAL_STATE = {
    foodList: []
}
export default function ordering(state = INITIAL_STATE, action) {

    let {type, data} = action

    switch (type) {
        case 'findAllFood':
            return {
                ...state,
                foodList:data
            }
        default:
            return state
    }
}