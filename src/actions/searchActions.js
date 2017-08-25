var algoliasearch = require('algoliasearch');

var client = algoliasearch("VXMYN1ZQFQ","4ec6a0aea46dc16f20ca5384a5df9c65")
var events = client.initIndex("Events")


export function setDropDowns(options={}){
    return((dispatch) => {
        dispatch({
            type:"SET_DROP_DOWN",
            payload: {
                selectedLocation: options["selectedLocation"] || "",
                selectedGenre: options["selectedGenre"] || "",
                dropDownModalInput: true
            }
         })
        dispatch({
            type:"SHOW_SEARCH_MODAL",
            payload: options.presetValue
        })

    })
}

export function setDatesValues(value,options={}){
    return((dispatch)  => {
        dispatch({
            type: "SET_DATES_FROM_MODAL",
            payload: options
        })
        dispatch({
            type: "SHOW_SEARCH_MODAL",
            payload: value
        })
    })
}

export function setDropDownInputBoolean(options={}){
    return((dispatch) => {
        dispatch({
            type:"SET_DROP_DOWN_INPUT"
        })
        dispatch({
            type:"SHOW_SEARCH_MODAL",
            payload: options.presetValue
        })
    })
}

export function getFacets(){
    return(function(dispatch){
        events.search({
            facets: ['genreName', 'cityName']
        })
        .then(function(res){
                dispatch({
                    type: "SET_FACETS",
                    payload: res.facets
                })
        })
    })    
}
export function getResults(value, options={}){
    var dateFilter = ""
    if(options.fromDate != ""){
        dateFilter = '(showings > ' + 
                        options.fromDate + 
                        ' AND showings < ' + options.toDate
                        + ')'
    }
    
    return(function(dispatch){
        events.search({
            query: value,
            facets: ['genreName', 'cityName'],
            facetFilters:[
                            'genreName:' + options.genreName, 
                            'cityName:' + options.cityName],
            filters: dateFilter
        })
        .then(function(res){
            dispatch({
                type: "SET_RESULTS",
                payload:{
                    searchItem: value,
                    results: res.hits,
                    currentPage: res.page,
                    numberOfPages: res.nbPages,
                    facets: res.facets,
                    selectedLocation: options.cityName,
                    selectedGenre: options.genreName,
                    loadedMore: false,
                    fromDate: options.fromDate,
                    toDate: options.toDate,
                    resetFilters: options.resetFilters || false
                }
            })
        })
    })
}

export function getMoreResults(value,options={}){
    var dateFilter = ""
    if(options.fromDate != ""){
        dateFilter = '(showings > ' + 
                        options.fromDate + 
                        ' AND showings < ' + options.toDate
                        + ')'
    }
    return(function(dispatch){
        events.search({
            query: value,
            page: options.page,
            facets: ['genreName', 'cityName'],
            facetFilters:[
                            'genreName:' + options.genreName, 
                            'cityName:' + options.cityName],
            filters: dateFilter
        })
        .then(function(res){
            dispatch({
                type: "SET_RESULTS",
                payload:{
                    searchItem: options.value,
                    results: res.hits,
                    currentPage: res.page,
                    numberOfPages: res.nbPages,
                    facets: res.facets,
                    selectedLocation: options.cityName,
                    selectedGenre: options.genreName,
                    loadedMore: true,
                    fromDate: options.fromDate,
                    toDate: options.toDate,
                    resetFilters: options.resetFilters || false
                }
            })
        })
    })
}


