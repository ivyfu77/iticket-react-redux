export default function(
    state={
        showModal: false,
        modal: "",
        list: [],
        title: "",
        className: "",
        show: false,
        presetValue: "",
        presetGenre: ""
    }, 
    action){
    
    switch (action.type) {
        case 'SHOW_SEARCH_MODAL':
            state = {...state, showModal:true, modal: "search" , presetValue: action.payload}
            break;
        case 'SHOW_SEARCH_MODAL_WITH_GENRE':
            state = {...state, showModal:true, modal:"search", presetGenre: action.payload}
            break;
        case 'EMPTY_PRESET_GENRE':
            state = {...state, presetGenre: ""};
            break;
        case "SHOW_DROP_DOWN_MODAL":
            state = {
                ...state, 
                showModal: true, 
                modal: 'dropDown', 
                list: action.payload.list,
                title: action.payload.title,
                presetValue: action.payload.presetValue
            }
            break;
        case "SHOW_DATES_MODAL":
            state= {
                ...state,
                showModal: true,
                modal: 'dates',
                presetValue: action.payload.presetValue
            }
            break;
        case 'HIDE_MODAL':
            state = {...state, showModal:false, presetGenre: ""}
            break;
    }
    return state
}