const INIT_STATE={
    comboList:[]
}

export default function findCombo(state=INIT_STATE,action){
    let {type,data}=action

    switch (type){
        case 'findCombo':
            return{
                ...state,
                comboList:data
            }
        default:
            return state
    }
}
