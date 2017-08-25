export default function(
    state={
        event: {}
    }, 
    action){
    
    switch (action.type) {
        case 'SET_EVENT':
            return {...state, event: action.payload}
        case 'GET_EVENT':
            return state
        default:
            return state
    }
}