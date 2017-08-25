export default function(
    state={
        searchItem: "",
        genreFacets: {},
        locationFacets:{},
        results: [],
        numberOfPages: 0,
        currentPage: 0,
        selectedLocation: "",
        selectedGenre: "",
        resetFilters: false,
        fromDate: "",
        toDate: "",
        dropDownModalInput: false
    },
    action){
        
    switch(action.type){
        case "SET_FACETS":
            state = {...state, genreFacets: action.payload.genreName, locationFacets: action.payload.cityName }
            break;
        case "SET_RESULTS":
            if(action.payload.loadedMore){
                var newSetResults = [].concat(state.results, action.payload.results)
                 state = {
                        ...state, 
                        results: newSetResults,
                }
            }else{
                state = {
                        ...state, 
                        results: action.payload.results,
                    }
            }
            state = {
                ...state,
                searchItem: action.payload.searchItem,
                numberOfPages: action.payload.numberOfPages,
                currentPage: action.payload.currentPage,
                genreFacets: action.payload.facets.genreName || {},
                locationFacets: action.payload.facets.cityName || {},
                selectedGenre: action.payload.selectedGenre,
                selectedLocation: action.payload.selectedLocation,
                fromDate: action.payload.fromDate,
                toDate: action.payload.toDate,
                resetFilters: action.payload.resetFilters,
                dropDownModalInput: action.payload.dropDownModalInput || false
            }
            break;
        case "SET_DROP_DOWN":
            state = {
                ...state,
                selectedGenre: action.payload.selectedGenre,
                selectedLocation: action.payload.selectedLocation,
                dropDownModalInput: action.payload.dropDownModalInput
            }
            break;
        case "SET_DROP_DOWN_INPUT":
            state = {
                ...state,
                dropDownModalInput: true
            }
            break;
        case "SET_DATES_FROM_MODAL":
            state ={
                ...state,
                fromDate: action.payload.fromDate,
                toDate: action.payload.toDate,
                dropDownModalInput: true
            }
            break;
        case "CLEAR_DATES":
            state = {
                ...state,
                fromDate: "",
                toDate: ""
            }
            break
    }
    return state;
    
}