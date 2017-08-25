export default function (state={
    fetching: false,
    fetched: false,
    eventsNearby: [],
    eventsRecent: [],
    eventsNearbyPage: 0,
    eventRecentPage: 0,
    currentCity: "",
    currentPosition: {},
    error: null
  },action){

    switch(action.type){
      case "FETCH_EVENTS_PENDING": {
        return {...state, fetching: true, fetched: false};
      }
      case "FETCH_EVENTS_REJECTED": {
        return {...state, fetching: false, fetched: false, error: action.payload};
      }
      case "FETCH_EVENTS_FULFILLED": {
        return {
          ...state, 
          fetching: false, 
          fetched: true, 
          eventsNearby: action.payload.data,
          eventsNearbyPage: action.payload.data.page
        };
      }
      case "GET_CURRENT_CITY_PENDING": {
        return {
          ...state,
          fetching: true, 
          fetched: false
        }
      }
      case "GET_CURRENT_CITY_FULFILLED": {
        let result = action.payload.data.results[0].address_components;
        let length = result.length;
        return {
          ...state,
          fetching: false, 
          fetched: true, 
          currentCity: result[length-3].long_name
        }
      }
      case "GET_CURRENT_CITY_REJECTED": {
        return {
          ...state,
          fetching: false, 
          fetched: false,
          error: action.payload
        }
      }
      case "GET_CURRENT_POSITION_PENDING": {
        return {
          ...state,
          fetching: true, 
          fetched: false
        }
      }
      case "GET_CURRENT_POSITION_FULFILLED": {
        return {
          ...state,
          fetching: false, 
          fetched: true, 
          currentPosition: action.payload.data.location
        }
      }
      case "GET_CURRENT_POSITION_REJECTED": {
        return {
          ...state,
          fetching: false, 
          fetched: false,
          error: action.payload
        }
      }
      case "CHANGE_LOCATION": {
        return {
          ...state,
          currentCity: action.payload
        }
      }
      case "FETCH_RECENT_EVENTS_FULFILLED": {
        return {
          ...state,
          fetching: false, 
          fetched: true, 
          eventsRecent: action.payload
        }
      }
      default:
        return state
  }
}