export function hideModal(){
    return {
        type: "HIDE_MODAL"
    }
    
}

export function showSearchModal(presetValue){
    return {
        type: "SHOW_SEARCH_MODAL",
        payload: presetValue
    }
}

export function showSearchModalWithGenre(value){
    return {
        type: "SHOW_SEARCH_MODAL_WITH_GENRE",
        payload: value
    }
}

export function emptyPresetGenre() {
  return {
    type: "EMPTY_PRESET_GENRE"
  }
}
export function showDropDownModal(options={}){
    return{
        type: "SHOW_DROP_DOWN_MODAL",
        payload: {
            list: options.list,
            title: options.title,
            presetValue: options.presetValue
        }
    }
}

export function showDatesModal(options={}){
    return {
        type: "SHOW_DATES_MODAL",
        payload: {
            presetValue: options.presetValue || ""
        }
    }
}